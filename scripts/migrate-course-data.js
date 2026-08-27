#!/usr/bin/env node
// Migra sst/lessons/course-data.json (formato legado, gabarito embutido) para
// o modelo v2 de Firestore: lessons_public / lessons_answers / course_meta.
//
// Uso:
//   node scripts/migrate-course-data.js                  # dry-run (padrão)
//   node scripts/migrate-course-data.js --upload          # grava no Firestore
//   node scripts/migrate-course-data.js --upload --project quiz-sst-staging
//
// Dry-run não precisa de credenciais do Firebase: só valida cada aula (schema
// completo + bijeção items/zones de toda questão drag) e escreve o resultado
// da divisão público/privado em migration-output/ para inspeção manual.
//
// Upload precisa de credenciais Admin válidas no ambiente (GOOGLE_APPLICATION_
// CREDENTIALS apontando para a service account, ou `firebase login` local com
// Application Default Credentials).
//
// Nenhuma aula com erro de validação é enviada — a migração é "tudo ou nada"
// por aula, nunca grava um lessons_public sem o lessons_answers correspondente.

const fs = require('fs');
const path = require('path');
const { validateLesson, splitLesson } = require('../functions/src/validators/lessonSchema');

const ROOT = path.resolve(__dirname, '..');
const SOURCE = path.join(ROOT, 'sst/lessons/course-data.json');
const OUTPUT_DIR = path.join(ROOT, 'migration-output');

function loadCourseData() {
  const raw = fs.readFileSync(SOURCE, 'utf8').replace(/^﻿/, '');
  return JSON.parse(raw);
}

function writeJson(filePath, data) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
}

async function uploadToFirestore(validLessons, defaultLesson, projectId) {
  // Import tardio: firebase-admin só é necessário no modo --upload, para o
  // dry-run funcionar sem a dependência instalada.
  const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
  const { getFirestore } = require('firebase-admin/firestore');

  const appOptions = { credential: applicationDefault() };
  if (projectId) appOptions.projectId = projectId;
  initializeApp(appOptions);
  const db = getFirestore();

  const CHUNK = 400; // margem sob o limite de 500 ops por batch do Firestore
  for (let i = 0; i < validLessons.length; i += CHUNK) {
    const slice = validLessons.slice(i, i + CHUNK);
    const batch = db.batch();
    for (const { publicLesson, answerMap } of slice) {
      batch.set(db.collection('lessons_public').doc(publicLesson.slug), publicLesson);
      batch.set(db.collection('lessons_answers').doc(publicLesson.slug), { questions: answerMap });
    }
    await batch.commit();
    console.log(`  batch gravado: ${slice.length} aulas (${i + slice.length}/${validLessons.length})`);
  }

  await db.collection('course_meta').doc('config').set({ defaultLesson, migratedAt: Date.now() });
  console.log(`  course_meta/config.defaultLesson = "${defaultLesson}"`);

  return cert; // referenciado só para evitar warning de import não usado em setups sem cert()
}

async function main() {
  const args = process.argv.slice(2);
  const shouldUpload = args.includes('--upload');
  const projectArgIdx = args.indexOf('--project');
  const projectId = projectArgIdx !== -1 ? args[projectArgIdx + 1] : undefined;

  const data = loadCourseData();
  const lessons = Array.isArray(data.lessons) ? data.lessons : [];
  console.log(`Lendo ${lessons.length} aulas de ${path.relative(ROOT, SOURCE)}...`);

  const valid = [];
  const invalid = [];

  for (const lesson of lessons) {
    const clone = JSON.parse(JSON.stringify(lesson));
    const { valid: isValid, errors } = validateLesson(clone);
    if (!isValid) {
      invalid.push({ slug: clone.slug, errors });
      continue;
    }
    const { publicLesson, answerMap } = splitLesson(clone);
    valid.push({ publicLesson, answerMap });
  }

  console.log(`\nValidação: ${valid.length} ok, ${invalid.length} com erro.`);
  if (invalid.length) {
    console.log('\nAulas NÃO migradas (corrija e rode de novo):');
    for (const item of invalid) {
      console.log(`  - ${item.slug}:`);
      item.errors.forEach((e) => console.log(`      ${e}`));
    }
  }

  // Sempre escreve a saída local, mesmo em modo --upload, como registro do
  // que foi enviado.
  writeJson(path.join(OUTPUT_DIR, 'course_meta.json'), { defaultLesson: data.defaultLesson });
  for (const { publicLesson } of valid) {
    writeJson(path.join(OUTPUT_DIR, 'lessons_public', `${publicLesson.slug}.json`), publicLesson);
  }
  for (const { answerMap, publicLesson } of valid) {
    writeJson(path.join(OUTPUT_DIR, 'lessons_answers', `${publicLesson.slug}.json`), { questions: answerMap });
  }
  console.log(`\nSaída local escrita em ${path.relative(ROOT, OUTPUT_DIR)}/`);

  if (shouldUpload) {
    if (!valid.length) {
      console.log('\nNada para enviar (nenhuma aula válida).');
      return;
    }
    console.log(`\nEnviando ${valid.length} aulas ao Firestore${projectId ? ` (projeto ${projectId})` : ''}...`);
    await uploadToFirestore(valid, data.defaultLesson, projectId);
    console.log('\nUpload concluído.');
  } else {
    console.log('\nModo dry-run (padrão) — nada foi enviado ao Firestore. Rode com --upload para gravar.');
  }
}

main().catch((err) => {
  console.error('Falha na migração:', err);
  process.exitCode = 1;
});
