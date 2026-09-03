const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { logger } = require('firebase-functions');
const { db } = require('./admin');
const { validateLesson, splitLesson } = require('./validators/lessonSchema');

function requireAdmin(request) {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'É preciso estar logado.');
  }
  if (request.auth.token?.role !== 'admin') {
    throw new HttpsError('permission-denied', 'Esta ação requer papel de administrador.');
  }
}

function requireSignedIn(request) {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'É preciso estar logado com Google para acessar o conteúdo da aula.');
  }
}

// Callable: getLessonPublic({ slug? })
// Lê lessons_public/{slug} — nunca lessons_answers. Se slug não for informado,
// usa course_meta/config.defaultLesson (equivalente ao antigo defaultLesson
// no topo do course-data.json).
exports.getLessonPublic = onCall(async (request) => {
  requireSignedIn(request);

  let slug = String(request.data?.slug || '').trim().toLowerCase();
  if (!slug) {
    const configSnap = await db.collection('course_meta').doc('config').get();
    slug = String(configSnap.data()?.defaultLesson || '').trim().toLowerCase();
  }
  if (!slug) {
    throw new HttpsError('failed-precondition', 'Nenhuma aula padrão configurada (course_meta/config.defaultLesson).');
  }

  const snap = await db.collection('lessons_public').doc(slug).get();
  if (!snap.exists) {
    throw new HttpsError('not-found', `Aula "${slug}" não encontrada.`);
  }

  return snap.data();
});

// Callable: saveDraft({ lesson })
// Admin-only. Grava o JSON bruto da aula (com gabarito embutido) em
// lessons_draft/{slug} — coleção legível só por admins (ver firestore.rules) —
// para permitir revisão/preview antes de publicar de fato.
exports.saveDraft = onCall(async (request) => {
  requireAdmin(request);

  const lesson = request.data?.lesson;
  const { valid, errors } = validateLesson(lesson);
  if (!valid) {
    throw new HttpsError('invalid-argument', `Aula inválida: ${errors.join(' | ')}`);
  }

  await db
    .collection('lessons_draft')
    .doc(lesson.slug)
    .set({ ...lesson, savedBy: request.auth.token.email, savedAt: Date.now() });

  logger.info('saveDraft', { slug: lesson.slug, by: request.auth.token.email });
  return { ok: true, slug: lesson.slug };
});

// Callable: publishLesson({ lesson })
// Admin-only. Valida (schema completo + bijeção items/zones de toda questão
// drag), separa em público/privado e grava as três coleções:
//   - lessons_public/{slug}   -> visível a qualquer aluno autenticado
//   - lessons_answers/{slug}  -> nunca lido pelo cliente
//   - lessons_history/{slug}/versions/{timestamp} -> snapshot bruto p/ rollback
async function publishLessonInternal({ lesson, publishedBy }) {
  const { valid, errors } = validateLesson(lesson);
  if (!valid) {
    throw new HttpsError('invalid-argument', `Aula inválida, publicação recusada: ${errors.join(' | ')}`);
  }

  const { publicLesson, answerMap } = splitLesson(lesson);
  const now = Date.now();

  const batch = db.batch();
  batch.set(db.collection('lessons_public').doc(lesson.slug), publicLesson);
  batch.set(db.collection('lessons_answers').doc(lesson.slug), { questions: answerMap });
  batch.set(db.collection('lessons_history').doc(lesson.slug).collection('versions').doc(String(now)), {
    ...lesson,
    publishedBy,
    publishedAt: now,
  });
  await batch.commit();

  logger.info('publishLesson', { slug: lesson.slug, by: publishedBy, questions: lesson.questions.length });
  return { ok: true, slug: lesson.slug, publishedAt: now };
}

exports.publishLesson = onCall(async (request) => {
  requireAdmin(request);
  return publishLessonInternal({ lesson: request.data?.lesson, publishedBy: request.auth.token.email });
});

// Callable: rollbackLesson({ slug, versionId })
// Admin-only. Republica uma versão anterior gravada em lessons_history.
exports.rollbackLesson = onCall(async (request) => {
  requireAdmin(request);

  const slug = String(request.data?.slug || '').trim().toLowerCase();
  const versionId = String(request.data?.versionId || '').trim();
  if (!slug || !versionId) {
    throw new HttpsError('invalid-argument', 'Informe slug e versionId.');
  }

  const versionSnap = await db.collection('lessons_history').doc(slug).collection('versions').doc(versionId).get();
  if (!versionSnap.exists) {
    throw new HttpsError('not-found', `Versão "${versionId}" da aula "${slug}" não encontrada.`);
  }

  // eslint-disable-next-line no-unused-vars -- descarta metadados da versão, mantém só o conteúdo da aula
  const { publishedBy, publishedAt, ...lesson } = versionSnap.data();
  return publishLessonInternal({ lesson, publishedBy: `${request.auth.token.email} (rollback de ${versionId})` });
});
