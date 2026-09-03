// Validação estrutural de uma aula e separação em conteúdo público / gabarito privado.
//
// Usado em dois lugares:
//   - scripts/migrate-course-data.js (migração do course-data.json legado)
//   - functions/src/lessons.js (publishLesson, antes de gravar no Firestore)
//
// A regra de bijeção para questões `drag` reproduz o mesmo diagnóstico feito
// manualmente em sst/lessons/course-data.json: items.length deve ser igual a
// zones.length, cada item.match deve apontar para um zone.id único, e todo
// zone.id deve ser usado por exatamente um item.

const QUESTION_TYPES = ['multiple', 'boolean', 'combo', 'multi', 'drag'];

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function validateDragBijection(question, errors, path) {
  const items = Array.isArray(question.items) ? question.items : [];
  const zones = Array.isArray(question.zones) ? question.zones : [];

  if (items.length === 0 || zones.length === 0) {
    errors.push(`${path}: questão drag precisa de items e zones não vazios.`);
    return;
  }

  if (items.length !== zones.length) {
    errors.push(
      `${path}: items.length (${items.length}) != zones.length (${zones.length}) — bijeção quebrada.`
    );
  }

  const zoneIds = zones.map((z) => z.id);
  const zoneIdSet = new Set(zoneIds);
  if (zoneIdSet.size !== zoneIds.length) {
    errors.push(`${path}: há zone.id duplicado em zones.`);
  }

  const matches = items.map((it) => it.match);
  const matchSet = new Set(matches);
  if (matchSet.size !== matches.length) {
    errors.push(`${path}: dois items compartilham o mesmo match (não é bijeção 1:1).`);
  }

  const zoneIdSorted = [...zoneIds].sort();
  const matchesSorted = [...matches].sort();
  if (JSON.stringify(zoneIdSorted) !== JSON.stringify(matchesSorted)) {
    errors.push(`${path}: o conjunto de item.match não corresponde exatamente ao conjunto de zone.id (zona órfã ou item sem zona).`);
  }

  items.forEach((it, idx) => {
    if (!isNonEmptyString(it.id)) errors.push(`${path}: items[${idx}].id ausente.`);
    if (!isNonEmptyString(it.txt)) errors.push(`${path}: items[${idx}].txt ausente.`);
    if (!isNonEmptyString(it.match)) errors.push(`${path}: items[${idx}].match ausente.`);
  });
  zones.forEach((z, idx) => {
    if (!isNonEmptyString(z.id)) errors.push(`${path}: zones[${idx}].id ausente.`);
    if (!isNonEmptyString(z.label)) errors.push(`${path}: zones[${idx}].label ausente.`);
  });
}

function validateQuestion(question, index, errors) {
  const path = `questions[${index}]`;

  if (!isNonEmptyString(question.type) || !QUESTION_TYPES.includes(question.type)) {
    errors.push(`${path}: type ausente ou inválido (esperado um de ${QUESTION_TYPES.join(', ')}).`);
    return;
  }
  if (!isNonEmptyString(question.questions)) {
    errors.push(`${path}: enunciado (campo "questions") ausente.`);
  }

  switch (question.type) {
    case 'multiple':
    case 'boolean': {
      const answers = Array.isArray(question.answers) ? question.answers : [];
      if (answers.length < 2) errors.push(`${path}: answers precisa ter ao menos 2 opções.`);
      if (!isNonEmptyString(question.correct)) errors.push(`${path}: correct ausente.`);
      else if (!answers.includes(question.correct)) errors.push(`${path}: correct não está entre answers.`);
      break;
    }
    case 'combo': {
      const options = Array.isArray(question.options) ? question.options : [];
      if (options.length < 2) errors.push(`${path}: options precisa ter ao menos 2 opções.`);
      if (!isNonEmptyString(question.correct)) errors.push(`${path}: correct ausente.`);
      else if (!options.includes(question.correct)) errors.push(`${path}: correct não está entre options.`);
      break;
    }
    case 'multi': {
      const answers = Array.isArray(question.answers) ? question.answers : [];
      const correct = Array.isArray(question.correct) ? question.correct : [];
      if (answers.length < 2) errors.push(`${path}: answers precisa ter ao menos 2 opções.`);
      if (correct.length === 0) errors.push(`${path}: correct precisa ter ao menos 1 item.`);
      correct.forEach((c) => {
        if (!answers.includes(c)) errors.push(`${path}: correct contém "${c}" que não está em answers.`);
      });
      break;
    }
    case 'drag':
      validateDragBijection(question, errors, path);
      break;
    default:
      break;
  }
}

function validateLesson(lesson) {
  const errors = [];

  if (!lesson || typeof lesson !== 'object') {
    return { valid: false, errors: ['Aula inválida: não é um objeto.'] };
  }
  if (!isNonEmptyString(lesson.slug)) {
    errors.push('slug ausente ou vazio.');
  }
  if (!lesson.lesson_info || typeof lesson.lesson_info !== 'object') {
    errors.push('lesson_info ausente.');
  } else {
    if (!isNonEmptyString(lesson.lesson_info.id)) errors.push('lesson_info.id ausente.');
    if (!isNonEmptyString(lesson.lesson_info.title)) errors.push('lesson_info.title ausente.');
    if (!Array.isArray(lesson.lesson_info.topics) || lesson.lesson_info.topics.length === 0) {
      errors.push('lesson_info.topics ausente ou vazio.');
    }
  }
  if (!Array.isArray(lesson.questions) || lesson.questions.length === 0) {
    errors.push('questions ausente ou vazio.');
  } else {
    lesson.questions.forEach((q, idx) => validateQuestion(q, idx, errors));
  }

  return { valid: errors.length === 0, errors };
}

// Garante um qid estável por pergunta (usado para casar o doc público com o
// doc privado, e como chave da tentativa do aluno em `attempts`).
function assignQuestionIds(lesson) {
  const questions = Array.isArray(lesson.questions) ? lesson.questions : [];
  questions.forEach((q, idx) => {
    if (!isNonEmptyString(q.qid)) {
      q.qid = `q${String(idx).padStart(3, '0')}`;
    }
  });
  return lesson;
}

// Remove do objeto os campos que revelam a resposta correta, mantendo o
// restante do conteúdo (enunciado, opções, itens/zonas) intacto.
function stripAnswerFields(question) {
  // eslint-disable-next-line no-unused-vars -- descarta os campos de gabarito, mantém o resto
  const { correct, tip, points, ...publicFields } = question;

  if (publicFields.type === 'drag' && Array.isArray(publicFields.items)) {
    // eslint-disable-next-line no-unused-vars -- descarta o mapeamento correto de cada item
    publicFields.items = publicFields.items.map(({ match, ...rest }) => rest);
  }

  return publicFields;
}

function buildAnswerRecord(question) {
  const record = { tip: question.tip || '' };
  if (typeof question.points === 'number') record.points = question.points;

  if (question.type === 'drag') {
    const items = Array.isArray(question.items) ? question.items : [];
    record.match = items.reduce((acc, item) => {
      acc[item.id] = item.match;
      return acc;
    }, {});
  } else {
    record.correct = question.correct;
  }

  return record;
}

// Divide uma aula (formato legado, com gabarito embutido) em:
//   - publicLesson: enviado ao cliente (lessons_public/{slug})
//   - answerMap: nunca enviado ao cliente (lessons_answers/{slug}), indexado por qid
function splitLesson(lesson) {
  assignQuestionIds(lesson);

  const answerMap = {};
  const publicQuestions = lesson.questions.map((q) => {
    answerMap[q.qid] = buildAnswerRecord(q);
    return stripAnswerFields(q);
  });

  const publicLesson = {
    slug: lesson.slug,
    lesson_info: lesson.lesson_info,
    questions: publicQuestions,
  };

  return { publicLesson, answerMap };
}

module.exports = {
  QUESTION_TYPES,
  validateLesson,
  assignQuestionIds,
  splitLesson,
};
