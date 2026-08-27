const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { logger } = require('firebase-functions');
const { db } = require('./admin');
const { gradeAnswer } = require('./validators/grading');

// Callable: submitAnswer({ slug, qid, response })
//
// Único lugar do sistema que compara a resposta do aluno com o gabarito.
// O cliente nunca recebe lessons_answers — só o resultado desta função.
//
// Idempotente por design: a primeira tentativa de cada (uid, slug, qid) é a
// que vale. Reenvios devolvem o mesmo resultado já gravado, em vez de
// regradear — fecha a porta óbvia de "tentar até acertar" por script.
exports.submitAnswer = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'É preciso estar logado com Google para responder.');
  }

  const uid = request.auth.uid;
  const slug = String(request.data?.slug || '').trim().toLowerCase();
  const qid = String(request.data?.qid || '').trim();
  const selectedValue = request.data?.response;

  if (!slug || !qid) {
    throw new HttpsError('invalid-argument', 'Informe slug e qid.');
  }

  const attemptRef = db.collection('attempts').doc(uid).collection('lessons').doc(slug).collection('questions').doc(qid);

  const existing = await attemptRef.get();
  if (existing.exists) {
    const data = existing.data();
    return { ...data.result, tip: data.tip, alreadyAnswered: true };
  }

  const [publicSnap, answersSnap] = await Promise.all([
    db.collection('lessons_public').doc(slug).get(),
    db.collection('lessons_answers').doc(slug).get(),
  ]);

  if (!publicSnap.exists || !answersSnap.exists) {
    throw new HttpsError('not-found', `Aula "${slug}" não encontrada.`);
  }

  const question = (publicSnap.data().questions || []).find((q) => q.qid === qid);
  const answerRecord = (answersSnap.data().questions || {})[qid];
  if (!question || !answerRecord) {
    throw new HttpsError('not-found', `Pergunta "${qid}" não encontrada na aula "${slug}".`);
  }

  const result = gradeAnswer({
    type: question.type,
    answerRecord,
    items: question.items || [],
    selectedValue,
    pointsPerCorrect: answerRecord.points || 200,
  });

  await attemptRef.set({
    result,
    response: selectedValue,
    tip: answerRecord.tip || '',
    answeredAt: Date.now(),
  });

  logger.info('submitAnswer', { uid, slug, qid, isCorrect: result.isCorrect });

  return { ...result, tip: answerRecord.tip || '', alreadyAnswered: false };
});
