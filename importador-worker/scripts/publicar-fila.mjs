// Executado pela GitHub Action: insere as aulas da fila no fim do course-data.json.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { findDuplicate, validateLesson } from '../src/lesson-validator.js';

const COURSE_FILE = 'sst/lessons/course-data.json';
const QUEUE_DIR = '.importador/fila';
const ERRORS_DIR = '.importador/erros';

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

export function processQueue(root = '.') {
  const queueDir = path.join(root, QUEUE_DIR);
  const errorsDir = path.join(root, ERRORS_DIR);
  const coursePath = path.join(root, COURSE_FILE);
  if (!fs.existsSync(queueDir)) return { publicadas: [], recusadas: [] };

  const result = { publicadas: [], recusadas: [] };
  const files = fs.readdirSync(queueDir).filter((name) => name.endsWith('.json')).sort();

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
  const result = processQueue();
  console.log(JSON.stringify(result));
  if (process.env.GITHUB_OUTPUT) {
    const label = [...result.publicadas.map((slug) => `adiciona ${slug}`), ...result.recusadas.map((slug) => `recusa ${slug}`)].join(', ');
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `resumo=${label}\n`);
  }
}
