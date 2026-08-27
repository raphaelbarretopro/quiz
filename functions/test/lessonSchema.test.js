const test = require('node:test');
const assert = require('node:assert/strict');
const { validateLesson, splitLesson } = require('../src/validators/lessonSchema');

function makeDragLesson(overrides = {}) {
  return {
    slug: 'aula-teste',
    lesson_info: { id: 'Aula-Teste', title: 'Aula de Teste', topics: [{ id: 'ACID' }] },
    questions: [
      {
        type: 'drag',
        topics: 'ACID',
        questions: 'Relacione:',
        items: [
          { id: 'd1', txt: 'Item 1', match: 'z1' },
          { id: 'd2', txt: 'Item 2', match: 'z2' },
        ],
        zones: [
          { id: 'z1', label: 'Zona 1' },
          { id: 'z2', label: 'Zona 2' },
        ],
        correct: 'drag',
        tip: 'Dica.',
      },
    ],
    ...overrides,
  };
}

test('drag válido (bijeção completa) passa na validação', () => {
  const { valid, errors } = validateLesson(makeDragLesson());
  assert.equal(valid, true, errors.join(' | '));
});

test('drag com mais items do que zones é rejeitado (bug original)', () => {
  const lesson = makeDragLesson();
  lesson.questions[0].items.push({ id: 'd3', txt: 'Item 3', match: 'z1' });
  const { valid, errors } = validateLesson(lesson);
  assert.equal(valid, false);
  assert.ok(errors.some((e) => e.includes('bijeção quebrada')));
});

test('splitLesson nunca deixa "match" ou "correct" no lado público', () => {
  const { publicLesson, answerMap } = splitLesson(makeDragLesson());
  const publicJson = JSON.stringify(publicLesson);

  assert.ok(!publicJson.includes('"match"'));
  assert.ok(publicJson.includes('z1')); // zone ids continuam públicos (não são segredo)
  const qid = publicLesson.questions[0].qid;
  assert.deepEqual(answerMap[qid].match, { d1: 'z1', d2: 'z2' });
});

test('multiple sem correct entre as opções é rejeitado', () => {
  const lesson = makeDragLesson({
    questions: [
      { type: 'multiple', questions: 'Pergunta?', answers: ['A', 'B'], correct: 'C', tip: '' },
    ],
  });
  const { valid, errors } = validateLesson(lesson);
  assert.equal(valid, false);
  assert.ok(errors.some((e) => e.includes('não está entre answers')));
});
