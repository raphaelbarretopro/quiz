// Executado pela GitHub Action: insere as aulas da fila no fim do course-data.json.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { findDuplicate, validateLesson } from '../src/lesson-validator.js';

const COURSE_FILE = 'sst/lessons/course-data.json';
const QUEUE_DIR = '.importador/fila';
const ERRORS_DIR = '.importador/erros';
const PUBLISHED_DIR = '.importador/publicadas';
const DELETE_DIR = '.importador/exclusao';

// Insere a aula antes do "]" que fecha a lista lessons, preservando o restante do arquivo.
export function appendLessonText(courseText, lesson) {
  const newline = courseText.includes('\r\n') ? '\r\n' : '\n';
  const match = courseText.match(/\}\s*\]\s*\}\s*$/);
  if (!match) throw new Error('O final do course-data.json não está no formato esperado.');

  const indented = JSON.stringify(lesson, null, 2)
    .split('\n')
    .map((line) => `    ${line}`)
    .join(newline);
  const insertAt = match.index + 1;
  return `${courseText.slice(0, insertAt)},${newline}${indented}${courseText.slice(insertAt)}`;
}

function parseCourse(text) {
  return JSON.parse(text.replace(/^﻿/, ''));
}

// Só aceita o novo conteúdo se as aulas anteriores continuarem idênticas.
export function insertLesson(courseText, lesson) {
  const erros = validateLesson(lesson);
  if (erros.length) throw new Error(erros.slice(0, 5).join(' '));

  const before = parseCourse(courseText);
  const duplicate = findDuplicate(before.lessons, lesson.slug, lesson.lesson_info.id);
  if (duplicate) throw new Error(duplicate);

  const updatedText = appendLessonText(courseText, lesson);
  const after = parseCourse(updatedText);
  const intact = after.lessons.length === before.lessons.length + 1
    && JSON.stringify(after.lessons.slice(0, -1)) === JSON.stringify(before.lessons)
    && JSON.stringify(after.lessons[after.lessons.length - 1]) === JSON.stringify(lesson);
  if (!intact) throw new Error('A inserção alteraria outras aulas e foi cancelada.');

  return updatedText;
}

// Encontra o objeto da aula no texto, sem confundir chaves que aparecem dentro de strings.
function findLessonSpan(courseText, slug) {
  const match = courseText.match(new RegExp(`\\{\\s*"slug"\\s*:\\s*"${slug}"`));
  if (!match) throw new Error(`A aula ${slug} não foi encontrada no curso.`);

  let depth = 0;
  let inString = false;
  for (let i = match.index; i < courseText.length; i += 1) {
    const char = courseText[i];
    if (inString) {
      if (char === '\\') i += 1;
      else if (char === '"') inString = false;
    } else if (char === '"') {
      inString = true;
    } else if (char === '{') {
      depth += 1;
    } else if (char === '}') {
      depth -= 1;
      if (depth === 0) return { start: match.index, end: i + 1 };
    }
  }
  throw new Error(`A aula ${slug} está malformada no curso.`);
}

// Só aceita o novo conteúdo se as demais aulas continuarem idênticas.
export function removeLesson(courseText, slug) {
  const before = parseCourse(courseText);
  let { start, end } = findLessonSpan(courseText, slug);

  const previous = courseText.slice(0, start).match(/,\s*$/);
  if (previous) {
    start = previous.index;
  } else {
    const next = courseText.slice(end).match(/^\s*,\s*/);
    if (next) end += next[0].length;
  }

  const updatedText = courseText.slice(0, start) + courseText.slice(end);
  const after = parseCourse(updatedText);
  const expected = before.lessons.filter((lesson) => lesson.slug !== slug);
  const intact = after.lessons.length === before.lessons.length - 1
    && JSON.stringify(after.lessons) === JSON.stringify(expected);
  if (!intact) throw new Error('A exclusão alteraria outras aulas e foi cancelada.');

  return updatedText;
}

function listRequests(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((name) => name.endsWith('.json')).sort();
}

export function processDeletions(root = '.') {
  const deleteDir = path.join(root, DELETE_DIR);
  const errorsDir = path.join(root, ERRORS_DIR);
  const publishedDir = path.join(root, PUBLISHED_DIR);
  const coursePath = path.join(root, COURSE_FILE);
  const result = { excluidas: [], naoExcluidas: [] };

  for (const name of listRequests(deleteDir)) {
    const slug = name.replace(/\.json$/, '');
    const publishedPath = path.join(publishedDir, name);
    const errorPath = path.join(errorsDir, name);

    try {
      // As aulas antigas não têm esse registro e por isso não podem ser excluídas por aqui.
      if (!fs.existsSync(publishedPath)) throw new Error('Só é possível excluir aulas publicadas pelo importador.');
      fs.writeFileSync(coursePath, removeLesson(fs.readFileSync(coursePath, 'utf8'), slug));
      fs.rmSync(publishedPath);
      fs.rmSync(errorPath, { force: true });
      result.excluidas.push(slug);
    } catch (error) {
      fs.mkdirSync(errorsDir, { recursive: true });
      fs.writeFileSync(errorPath, `${JSON.stringify({ erro: error.message }, null, 2)}\n`);
      result.naoExcluidas.push(slug);
    }
    fs.rmSync(path.join(deleteDir, name));
  }

  return result;
}

export function processQueue(root = '.') {
  const queueDir = path.join(root, QUEUE_DIR);
  const errorsDir = path.join(root, ERRORS_DIR);
  const publishedDir = path.join(root, PUBLISHED_DIR);
  const coursePath = path.join(root, COURSE_FILE);

  const result = { publicadas: [], recusadas: [] };
  const files = listRequests(queueDir);

  for (const name of files) {
    const queuePath = path.join(queueDir, name);
    const slug = name.replace(/\.json$/, '');
    const errorPath = path.join(errorsDir, name);
    const raw = fs.readFileSync(queuePath, 'utf8');

    try {
      const lesson = JSON.parse(raw);
      if (lesson.slug !== slug) throw new Error('O arquivo da fila não corresponde à aula.');
      fs.writeFileSync(coursePath, insertLesson(fs.readFileSync(coursePath, 'utf8'), lesson));
      fs.rmSync(errorPath, { force: true });
      fs.mkdirSync(publishedDir, { recursive: true });
      fs.writeFileSync(path.join(publishedDir, name), `${JSON.stringify({ publicadaEm: new Date().toISOString() })}\n`);
      result.publicadas.push(slug);
    } catch (error) {
      fs.mkdirSync(errorsDir, { recursive: true });
      fs.writeFileSync(errorPath, `${JSON.stringify({ erro: error.message, conteudo: raw }, null, 2)}\n`);
      result.recusadas.push(slug);
    }
    fs.rmSync(queuePath);
  }

  return result;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const result = { ...processQueue(), ...processDeletions() };
  console.log(JSON.stringify(result));
  if (process.env.GITHUB_OUTPUT) {
    const label = [
      ...result.publicadas.map((slug) => `adiciona ${slug}`),
      ...result.recusadas.map((slug) => `recusa ${slug}`),
      ...result.excluidas.map((slug) => `exclui ${slug}`),
      ...result.naoExcluidas.map((slug) => `recusa excluir ${slug}`)
    ].join(', ');
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `resumo=${label}\n`);
  }
}
