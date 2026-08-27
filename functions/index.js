const { setGlobalOptions } = require('firebase-functions/v2');

// Região única para todas as functions — mantém latência previsível e evita
// custo cruzado entre regiões. Ajustar aqui caso a base de alunos esteja
// concentrada em outra região.
setGlobalOptions({ region: 'southamerica-east1', maxInstances: 10 });

const { grantAdminRole } = require('./src/roles');
const { getLessonPublic, saveDraft, publishLesson, rollbackLesson } = require('./src/lessons');
const { submitAnswer } = require('./src/answers');

module.exports = {
  grantAdminRole,
  getLessonPublic,
  saveDraft,
  publishLesson,
  rollbackLesson,
  submitAnswer,
};
