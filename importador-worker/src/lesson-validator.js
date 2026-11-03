// Regras de uma aula nova. Usado pelo Worker, pela página do importador e pela GitHub Action.
export const TOPIC_IDS = ['ACID', 'AGEN', 'PROT', 'NORM'];
export const TYPE_CYCLE = ['multiple', 'boolean', 'combo', 'multi', 'drag'];
export const ALLOWED_TOTALS = [10, 20, 30, 40, 50];
export const LEVELS = ['Fácil', 'Médio', 'Difícil'];

const MOJIBAKE = /Ã[\u0080-¿‘-›]|Â[\u0080-¿]|â€|�|\u001c/;
const HTML_TAG = /<\/?[a-zA-Z!]/;
const PLACEHOLDER = /^(Alternativa [A-D]|Opção \d|Item \d|Definição \d)$/i;
const SOURCE_REFERENCE = /\b(segundo|de acordo com|conforme|citad[oa]s? n[oa]|apresentad[oa]s? n[oa]|n[oa]) (a |o )?(aula|texto|material|apostila|referência bibliográfica)\b/i;
const SLUG = /^aula-[a-z0-9]+(-[a-z0-9]+)*$/;
const HEX_COLOR = /^#[0-9a-fA-F]{6}$/;
const MAX_QUESTION = 600;
const MAX_OPTION = 300;

export function normalizeLessonNumber(value) {
  return String(value ?? '').trim().toLowerCase();
}

export function isValidLessonNumber(value) {
  return /^[0-9]+(-[a-z0-9]+)*$/.test(normalizeLessonNumber(value));
}

export function lessonSlug(numero) {
  return `aula-${normalizeLessonNumber(numero)}`;
}

export function lessonId(numero) {
  return `Aula-${normalizeLessonNumber(numero)}`;
}

export function lessonTitle(numero, nome) {
  return `AULA ${normalizeLessonNumber(numero)} - ${String(nome ?? '').trim()}`.toLocaleUpperCase('pt-BR');
}

// Mesma normalização usada pelo ranking em ranking-manager.js.
export function normalizeRankingId(value) {
  return String(value ?? '').trim().toLowerCase().replace(/[^a-z0-9]/g, '');
}

// N questões em 4 blocos seguidos; os tipos reiniciam o ciclo em cada bloco.
export function expectedLayout(total) {
  const base = Math.floor(total / TOPIC_IDS.length);
  const rest = total % TOPIC_IDS.length;
  const layout = [];

  TOPIC_IDS.forEach((topic, topicIndex) => {
    const size = base + (topicIndex < rest ? 1 : 0);
    for (let i = 0; i < size; i += 1) {
      const isLastOfBlock = i === size - 1;
      const next = TOPIC_IDS[topicIndex + 1];
      layout.push({
        topic,
        type: TYPE_CYCLE[i % TYPE_CYCLE.length],
        trans: isLastOfBlock && next ? next : undefined
      });
    }
  });

  return layout;
}

function isFilled(value) {
  return typeof value === 'string' && value.trim() !== '';
}

function checkText(value, label, max, errors) {
  if (!isFilled(value)) {
    errors.push(`${label} está vazio.`);
    return;
  }
  if (value.length > max) errors.push(`${label} passa de ${max} caracteres.`);
  if (MOJIBAKE.test(value)) errors.push(`${label} tem acentuação corrompida.`);
  if (HTML_TAG.test(value)) errors.push(`${label} contém uma marcação HTML; escreva sem os sinais < e >.`);
  if (PLACEHOLDER.test(value.trim())) errors.push(`${label} contém um texto genérico de exemplo.`);
}

function checkOptions(options, label, min, errors) {
  if (!Array.isArray(options) || options.length < min) {
    errors.push(`${label} precisa de ao menos ${min} opções.`);
    return false;
  }
  options.forEach((option, i) => checkText(option, `${label}, opção ${i + 1},`, MAX_OPTION, errors));
  const unique = new Set(options.map((option) => String(option).trim().toLowerCase()));
  if (unique.size !== options.length) errors.push(`${label} tem opções repetidas.`);
  return true;
}

function checkQuestion(q, index, layoutEntry, errors) {
  const label = `Questão ${index + 1}`;
  if (!q || typeof q !== 'object') {
    errors.push(`${label} é inválida.`);
    return;
  }

  if (q.topics !== layoutEntry.topic) errors.push(`${label} deveria estar no tópico ${layoutEntry.topic}.`);
  if (q.type !== layoutEntry.type) errors.push(`${label} deveria ser do tipo ${layoutEntry.type}.`);
  if ((q.trans ?? undefined) !== layoutEntry.trans) errors.push(`${label} tem a transição de tópico incorreta.`);

  checkText(q.questions, `${label}: o enunciado`, MAX_QUESTION, errors);
  checkText(q.tip, `${label}: a dica`, MAX_QUESTION, errors);
  if (isFilled(q.questions) && SOURCE_REFERENCE.test(q.questions)) {
    errors.push(`${label} cita a aula ou o material; o aluno não tem esse material em mãos.`);
  }

  if (q.type === 'multiple' || q.type === 'boolean') {
    const min = q.type === 'boolean' ? 2 : 3;
    if (checkOptions(q.answers, label, min, errors) && !q.answers.includes(q.correct)) {
      errors.push(`${label}: a resposta certa não está entre as opções.`);
    }
    if (q.type === 'boolean' && JSON.stringify(q.answers) !== JSON.stringify(['Verdadeiro', 'Falso'])) {
      errors.push(`${label} deve ter as opções Verdadeiro e Falso.`);
    }
  }

  if (q.type === 'combo') {
    if ((String(q.questions).match(/\[COMBO\]/g) || []).length !== 1) {
      errors.push(`${label} precisa ter exatamente uma lacuna [COMBO].`);
    }
    if (checkOptions(q.options, label, 3, errors)) {
      if (!q.options.includes(q.correct)) errors.push(`${label}: a resposta certa não está entre as opções.`);
      if (q.options.some((option) => String(option).includes('"'))) errors.push(`${label} não pode ter aspas duplas nas opções.`);
    }
  }

  if (q.type === 'multi') {
    if (checkOptions(q.answers, label, 3, errors)) {
      const correct = q.correct;
      if (!Array.isArray(correct) || correct.length < 2) {
        errors.push(`${label} precisa de ao menos 2 respostas certas.`);
      } else {
        if (correct.some((c) => !q.answers.includes(c))) errors.push(`${label}: uma resposta certa não está entre as opções.`);
        if (new Set(correct).size !== correct.length) errors.push(`${label} tem respostas certas repetidas.`);
        if (correct.length >= q.answers.length) errors.push(`${label} precisa de ao menos uma opção errada.`);
      }
    }
  }

  if (q.type === 'drag') {
    if (q.correct !== 'drag') errors.push(`${label} tem a resposta do tipo arrastar incorreta.`);
    const items = Array.isArray(q.items) ? q.items : [];
    const zones = Array.isArray(q.zones) ? q.zones : [];
    if (items.length !== 4 || zones.length !== 4) {
      errors.push(`${label} precisa de 4 itens e 4 zonas.`);
    } else {
      const zoneIds = new Set(zones.map((zone) => zone?.id));
      const itemIds = new Set(items.map((item) => item?.id));
      if (zoneIds.size !== 4 || itemIds.size !== 4) errors.push(`${label} tem itens ou zonas repetidos.`);
      if (new Set(items.map((item) => item?.match)).size !== 4 || items.some((item) => !zoneIds.has(item?.match))) {
        errors.push(`${label} tem um item sem zona correspondente.`);
      }
      items.forEach((item, i) => checkText(item?.txt, `${label}, item ${i + 1},`, MAX_OPTION, errors));
      zones.forEach((zone, i) => checkText(zone?.label, `${label}, zona ${i + 1},`, MAX_OPTION, errors));
    }
  }
}

// Devolve a lista de problemas em português; lista vazia significa aula válida.
export function validateLesson(lesson) {
  const errors = [];
  const info = lesson?.lesson_info;

  if (!SLUG.test(String(lesson?.slug ?? ''))) errors.push('O identificador da aula é inválido.');
  if (!info || typeof info !== 'object') return [...errors, 'Faltam os dados da aula.'];

  if (normalizeRankingId(info.id) !== normalizeRankingId(lesson.slug)) errors.push('O ID da aula não corresponde ao identificador.');
  checkText(info.title, 'O título da aula', 200, errors);

  const topics = Array.isArray(info.topics) ? info.topics : [];
  if (JSON.stringify(topics.map((t) => t?.id)) !== JSON.stringify(TOPIC_IDS)) {
    errors.push(`A aula precisa dos tópicos ${TOPIC_IDS.join(', ')}, nessa ordem.`);
  }
  topics.forEach((topic, i) => {
    checkText(topic?.name, `Tópico ${i + 1}: o nome`, 120, errors);
    checkText(topic?.desc, `Tópico ${i + 1}: a descrição`, 300, errors);
    if (!HEX_COLOR.test(String(topic?.color ?? ''))) errors.push(`Tópico ${i + 1}: a cor é inválida.`);
    if (!String(topic?.img_url ?? '').startsWith('https://images.unsplash.com/')) errors.push(`Tópico ${i + 1}: a imagem é inválida.`);
  });

  const sokoban = info.sokoban;
  if (!Array.isArray(sokoban) || sokoban.length !== 4 || sokoban.some((letter) => !/^[A-Z]$/.test(letter))) {
    errors.push('A palavra do Sokoban precisa ter exatamente 4 letras maiúsculas.');
  }

  const questions = lesson.questions;
  if (!Array.isArray(questions) || !ALLOWED_TOTALS.includes(questions.length)) {
    errors.push(`A aula precisa ter ${ALLOWED_TOTALS.join(', ')} questões; veio com ${Array.isArray(questions) ? questions.length : 0}.`);
    return errors;
  }

  const layout = expectedLayout(questions.length);
  questions.forEach((q, i) => checkQuestion(q, i, layout[i], errors));
  return errors;
}

// Slug e ID não podem repetir, com a mesma comparação usada pelo jogo e pelo ranking.
export function findDuplicate(lessons, slug, id) {
  const wantedSlug = String(slug ?? '').trim().toLowerCase();
  const wantedId = normalizeRankingId(id);
  for (const lesson of lessons) {
    if (String(lesson?.slug ?? '').trim().toLowerCase() === wantedSlug) return `Já existe uma aula com o identificador ${lesson.slug}.`;
    if (normalizeRankingId(lesson?.lesson_info?.id) === wantedId) return `O ID ${id} já é usado pela aula ${lesson.slug}.`;
  }
  return null;
}
