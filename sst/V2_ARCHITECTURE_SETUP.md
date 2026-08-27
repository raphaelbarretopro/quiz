# Quiz SST v2 — Setup da nova arquitetura (Fases 0-2)

Este documento cobre o que foi construído até aqui na branch `dev` (backend
que ainda não está ligado ao app — o quiz continua lendo
`sst/lessons/course-data.json` normalmente) e os passos manuais que só podem
ser feitos por quem tem acesso ao Console do Firebase/Google Cloud.

O plano completo (8 fases) está descrito na proposta de arquitetura
compartilhada na conversa; este arquivo documenta a implementação conforme
ela avança.

## O que já existe nesta branch

```
firebase.json              # config do projeto Firebase (functions, firestore, database, emulators)
.firebaserc                # aliases de projeto (default/prod = quiz-sst; staging a preencher)
firestore.rules            # regras: lessons_public legível por autenticado,
                            # lessons_answers/draft/history nunca lidos pelo cliente
firestore.indexes.json     # vazio por enquanto
database.rules.json        # mesma regra do Realtime DB já documentada em FIREBASE-SETUP.md,
                            # agora versionada em vez de só existir no Console

functions/
  package.json
  .env.example              # copiar para .env com os e-mails de bootstrap de admin
  index.js                  # exporta as Cloud Functions
  src/
    admin.js                 # inicializa o Admin SDK (Firestore + Auth)
    roles.js                 # grantAdminRole — concede a custom claim role=admin
    lessons.js                # getLessonPublic, saveDraft, publishLesson, rollbackLesson
    answers.js                 # submitAnswer — única função que lê o gabarito
    validators/
      lessonSchema.js          # validação de schema + bijeção items/zones (drag)
      grading.js                # porta server-side de Controller.evaluateAnswer

scripts/
  migrate-course-data.js     # divide course-data.json em lessons_public/lessons_answers
```

Nada nesta lista ainda é lido pelo `sst/core/*` — a Fase 3 (trocar
`Model.loadData()` para chamar `getLessonPublic`) é o próximo passo depois
que a infraestrutura abaixo estiver provisionada.

## Passos manuais obrigatórios (Console)

Estes passos não podem ser feitos por aqui — precisam de login no Firebase
Console/Google Cloud com permissão de owner/editor no projeto.

### 1. Upgrade para o plano Blaze

Cloud Functions exige billing habilitado (mesmo permanecendo dentro da faixa
gratuita de uso). Firebase Console → ⚙️ → **Uso e faturamento** → fazer
upgrade do projeto `quiz-sst` para **Blaze (pay as you go)**.

### 2. Ativar o Firestore

Firebase Console → **Build → Firestore Database** → Criar banco de dados →
modo produção → região `southamerica-east1` (mesma região configurada em
`functions/index.js`; usar outra região exige ajustar esse arquivo também).

### 3. Criar o projeto de staging

Recomendado antes de tocar em produção: criar um segundo projeto Firebase
(ex. `quiz-sst-staging`) com os mesmos passos 1-2, e atualizar o alias
`staging` em `.firebaserc` com o ID real.

### 4. Definir o e-mail do primeiro admin

Copiar `functions/.env.example` para `functions/.env` e preencher
`BOOTSTRAP_ADMIN_EMAILS` com o(s) e-mail(s) Google que poderão virar admin a
primeira vez (chamando `grantAdminRole` sem `targetEmail`, uma única vez —
depois disso, novos admins só são promovidos por um admin já existente).

### 5. Instalar o Firebase CLI e autenticar

```bash
npm install -g firebase-tools
firebase login
cd functions && npm install
```

### 6. Rodar tudo local com emuladores (recomendado antes de qualquer deploy)

```bash
firebase emulators:start
```

Isso sobe Auth, Firestore, Realtime Database e Functions localmente — nada
toca no projeto real do Firebase.

### 7. Deploy das regras e das functions (staging primeiro)

```bash
firebase deploy --only firestore:rules,database,functions --project staging
# depois de validar:
firebase deploy --only firestore:rules,database,functions --project prod
```

## Como rodar a migração dos dados

O script não precisa de credenciais para o modo dry-run — ele só valida e
mostra o resultado da divisão público/privado localmente:

```bash
node scripts/migrate-course-data.js
```

Isso escreve `migration-output/lessons_public/*.json` e
`migration-output/lessons_answers/*.json` (pasta ignorada pelo git) para
inspeção manual antes de qualquer envio real.

Quando a infraestrutura acima estiver pronta e você tiver credenciais Admin
no ambiente (`gcloud auth application-default login` ou
`GOOGLE_APPLICATION_CREDENTIALS` apontando para uma service account):

```bash
node scripts/migrate-course-data.js --upload --project quiz-sst-staging
```

### Achado importante da última rodada de validação

O validador (`functions/src/validators/lessonSchema.js`) é mais completo do
que a checagem de bijeção usada para corrigir as 8 aulas de drag
anteriormente — ele também confere se `correct` está presente e se bate
exatamente com uma das opções em `answers`/`options`. Rodando contra o
`course-data.json` atual, **9 aulas têm 12 perguntas com esse problema**
(campo `correct` ausente, ou com um valor que não aparece, ao pé da letra,
em `answers`/`options` — provavelmente divergência de digitação):

`aula-14`, `aula-19`, `aula-43`, `aula-54`, `aula-62`, `aula-64`, `aula-66`,
`aula-67`, `aula-93`.

O script de migração **pula automaticamente** qualquer aula com erro de
validação (nunca migra parcialmente) — então essas 9 aulas hoje ficam de
fora da migração até serem corrigidas. É um problema de conteúdo, não de
estrutura (diferente do bug de bijeção): requer decidir qual é a resposta
certa em cada caso, então não foi corrigido automaticamente. Rode
`node scripts/migrate-course-data.js` a qualquer momento para ver a lista
atualizada com o texto exato de cada pergunta afetada.

## Próximos passos (Fase 3 em diante)

Com a infraestrutura provisionada e os dados migrados para staging:

1. Trocar `Model.loadData()` para chamar a Cloud Function `getLessonPublic`
   via `httpsCallable`, mantendo a mesma interface pública do `Model`.
2. Refatorar `Controller.evaluateAnswer` (linhas 631-692 de
   `sst/core/js/controller.js`) para chamar `submitAnswer` em vez de comparar
   localmente — esse é o passo que efetivamente tira o gabarito do
   navegador.
3. Só depois disso construir a UI do painel administrativo
   (`sst/admin/`), evoluindo o `lesson-importer.html` atual para chamar
   `saveDraft`/`publishLesson` em vez de "baixar JSON".
