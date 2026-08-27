// Porta server-side de Controller.evaluateAnswer (sst/core/js/controller.js:631-692).
//
// Roda dentro da Cloud Function submitAnswer, que é a única parte do sistema
// com acesso ao documento de lessons_answers. O cliente nunca executa esta
// comparação — só envia a resposta escolhida e recebe o resultado.

function normalizeAnswerValue(value) {
  return String(value ?? '')
    .normalize('NFKC')
    .trim()
    .replace(/\s+/g, ' ')
    .toLowerCase();
}

function normalizeAnswerList(value) {
  const list = Array.isArray(value) ? value : [value];
  return [...new Set(list.map((item) => normalizeAnswerValue(item)).filter(Boolean))].sort();
}

// answerRecord: documento privado da pergunta (lessons_answers/{slug}.{qid}),
//   { correct } para multiple/boolean/combo/multi, { match } para drag.
// items: array público de items (só para drag, para saber o total e os ids).
// selectedValue: o que o aluno enviou (string, array ou mapa itemId -> zoneId).
function gradeAnswer({ type, answerRecord, items = [], selectedValue, pointsPerCorrect = 200 }) {
  if (type === 'multi') {
    const correctAnswers = normalizeAnswerList(answerRecord.correct);
    const selectedAnswers = normalizeAnswerList(selectedValue);
    const correctSet = new Set(correctAnswers);
    const selectedSet = new Set(selectedAnswers);
    const correctCount = [...selectedSet].filter((answer) => correctSet.has(answer)).length;
    const totalItems = correctAnswers.length;

    return {
      isCorrect: totalItems > 0 && correctCount === totalItems && selectedSet.size === correctSet.size,
      pointsAwarded: correctCount * pointsPerCorrect,
      correctCount,
      totalItems,
    };
  }

  if (type === 'drag') {
    const assignments =
      selectedValue && typeof selectedValue === 'object' && !Array.isArray(selectedValue) ? selectedValue : {};
    const match = answerRecord.match || {};
    const correctCount = items.filter((item) => {
      const assignedZone = assignments[item.id];
      return normalizeAnswerValue(assignedZone) === normalizeAnswerValue(match[item.id]);
    }).length;
    const totalItems = items.length;

    return {
      isCorrect: totalItems > 0 && correctCount === totalItems,
      pointsAwarded: correctCount * pointsPerCorrect,
      correctCount,
      totalItems,
    };
  }

  const isCorrect =
    Array.isArray(answerRecord.correct) || Array.isArray(selectedValue)
      ? JSON.stringify(normalizeAnswerList(answerRecord.correct)) === JSON.stringify(normalizeAnswerList(selectedValue))
      : normalizeAnswerValue(answerRecord.correct) === normalizeAnswerValue(selectedValue);

  return {
    isCorrect,
    pointsAwarded: isCorrect ? pointsPerCorrect : 0,
    correctCount: isCorrect ? 1 : 0,
    totalItems: 1,
  };
}

module.exports = { gradeAnswer, normalizeAnswerValue, normalizeAnswerList };
