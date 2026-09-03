const test = require('node:test');
const assert = require('node:assert/strict');
const { gradeAnswer } = require('../src/validators/grading');

test('drag: acerto parcial não valida a questão, mas pontua os itens certos', () => {
  const result = gradeAnswer({
    type: 'drag',
    answerRecord: { match: { d1: 'z1', d2: 'z2', d3: 'z3', d4: 'z4' } },
    items: [{ id: 'd1' }, { id: 'd2' }, { id: 'd3' }, { id: 'd4' }],
    selectedValue: { d1: 'z1', d2: 'z2', d3: 'z3', d4: 'zX' },
  });
  assert.equal(result.isCorrect, false);
  assert.equal(result.correctCount, 3);
  assert.equal(result.totalItems, 4);
  assert.equal(result.pointsAwarded, 600);
});

test('drag: bijeção completa correta', () => {
  const result = gradeAnswer({
    type: 'drag',
    answerRecord: { match: { d1: 'z1', d2: 'z2', d3: 'z3', d4: 'z4' } },
    items: [{ id: 'd1' }, { id: 'd2' }, { id: 'd3' }, { id: 'd4' }],
    selectedValue: { d1: 'z1', d2: 'z2', d3: 'z3', d4: 'z4' },
  });
  assert.equal(result.isCorrect, true);
  assert.equal(result.pointsAwarded, 800);
});

test('multiple: comparação ignora maiúsculas/espaços extras', () => {
  const result = gradeAnswer({
    type: 'multiple',
    answerRecord: { correct: 'Depressoras' },
    selectedValue: '  depressoras',
  });
  assert.equal(result.isCorrect, true);
});

test('multi: só conta correto quando o conjunto selecionado bate exatamente', () => {
  const partial = gradeAnswer({
    type: 'multi',
    answerRecord: { correct: ['A', 'B', 'C'] },
    selectedValue: ['A', 'C'],
  });
  assert.equal(partial.isCorrect, false);
  assert.equal(partial.correctCount, 2);

  const full = gradeAnswer({
    type: 'multi',
    answerRecord: { correct: ['A', 'B', 'C'] },
    selectedValue: ['C', 'A', 'B'],
  });
  assert.equal(full.isCorrect, true);
});
