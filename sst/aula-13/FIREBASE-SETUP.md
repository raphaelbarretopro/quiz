# ⚙️ Configuração Firebase - Guia Passo a Passo

## 🚀 Por que Firebase?

O Firebase permite que todos os alunos vejam um **ranking em tempo real** sem precisar de um banco de dados tradicional. É grátis e seguro!

---

## 📋 Passo 1: Criar Projeto Firebase

1. Acesse: **https://console.firebase.google.com**
2. Clique em **"Criar projeto"**
3. Digite o nome: `quiz-sst`
4. Desabilite "Google Analytics" (opcional, mas recomendado)
5. Clique em **"Criar projeto"** e aguarde ~30 segundos

---

## 🗄️ Passo 2: Criar Realtime Database

### 📍 Localizando o Realtime Database

A interface do Firebase mudou. Siga **um destes caminhos**:

#### Opção A: Menu lateral (Recomendado)
1. Na barra esquerda, procure por **"Build"** ou **"Criar"**
2. Clique em **"Build"** para expandir as opções
3. Procure por **"Realtime Database"** (pode estar como "Database" ou "Banco de Dados")
4. Clique em **"Realtime Database"**

#### Opção B: Se não encontrar no menu
1. Clique em **"Todos os produtos"** (na barra lateral)
2. Na seção **"Build"**, procure por **"Realtime Database"**
3. Clique nele

#### Opção C: Procura rápida
1. Clique na lupa 🔍 no topo esquerdo
2. Digite: `Realtime Database` ou `Database`
3. Clique no resultado

### Criar o Banco de Dados

1. Após acessar **"Realtime Database"**, clique em **"Criar banco de dados"** (botão azul)
2. Selecione a **região**: `us-central1` (recomendado)
3. **IMPORTANTE**: Escolha **"Iniciar em modo de teste"** (libera leitura/escrita)
4. Clique em **"Ativar"** e aguarde a criação (~1 minuto)

✅ Agora você terá uma URL como: `https://quiz-sst-xxxxx.firebaseio.com`

---

## 🔑 Passo 3: Obter Credenciais

1. Volte para a página inicial do projeto
2. Clique no ícone ⚙️ **"Configurações do Projeto"** (canto superior)
3. Na aba **"Geral"**, procure por **"Seus apps"**
4. Se não houver, clique em **"</>"** para adicionar um app web
5. Copie o `firebaseConfig` (deve parecer com isso):

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "quiz-sst-xxxxx.firebaseapp.com",
  databaseURL: "https://quiz-sst-xxxxx.firebaseio.com",
  projectId: "quiz-sst-xxxxx",
  storageBucket: "quiz-sst-xxxxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

---

## 📝 Passo 4: Colar as Credenciais

1. Abra o arquivo: **`js/firebase-config.js`**
2. Substitua os valores de placeholder pelas credenciais copiadas:

```javascript
const firebaseConfig = {
    apiKey: "COLE_AQUI_API_KEY",
    authDomain: "COLE_AQUI_AUTH_DOMAIN",
    databaseURL: "COLE_AQUI_DATABASE_URL",
    projectId: "COLE_AQUI_PROJECT_ID",
    storageBucket: "COLE_AQUI_STORAGE_BUCKET",
    messagingSenderId: "COLE_AQUI_MESSAGING_SENDER_ID",
    appId: "COLE_AQUI_APP_ID"
};
```

3. Salve o arquivo (Ctrl+S)

---

## 🔒 Passo 5: Configurar Regras de Segurança (Importante!)

Para a sala de aula, você precisa liberar a escrita apenas neste jogo:

1. No Firebase Console, vá em **"Realtime Database"**
2. Clique na aba **"Regras"**
3. Substitua o conteúdo por:

```json
{
  "rules": {
    "scores": {
      ".read": true,
      ".write": true,
      "$uid": {
        ".validate": "newData.hasChildren(['name', 'score', 'correct', 'total', 'accuracy', 'timestamp', 'date'])"
      }
    }
  }
}
```

4. Clique em **"Publicar"**

⚠️ **AVISO**: Isso permite que qualquer pessoa escreva. Para produção real, implemente autenticação. Para sala de aula é seguro.

---

## ✅ Passo 6: Testar

1. Abra o quiz: `https://seu-dominio.github.io/quiz/sst/index.html`
2. Complete um quiz
3. Clique em **"VER RANKING GLOBAL"**
4. Você deve ver seus pontos! 🎉

---

## 🆘 Troubleshooting

### ❌ "Firebase não está configurado"
- Verifique se os valores em `firebase-config.js` estão corretos
- Abra o console do navegador (F12) e procure por erros

### ❌ Dados não são salvos
- Verifique se o Realtime Database está ativo
- Verifique as **Regras de Banco de Dados** (passo 5)
- Teste com um navegador anônimo

### ❌ Ranking aparece vazio
- Aguarde alguns segundos (sincronização)
- Atualize a página (F5)
- Verifique se outro aluno completou o quiz

---

## 📊 Ver Dados no Firebase Console

1. Firebase Console → Projeto → **"Realtime Database"**
2. Clique na pasta **"scores"**
3. Você verá todos os resultados dos alunos em JSON

---

## 🎓 Dicas para Professor

- **Monitore em tempo real**: Deixe a aba do Firebase Console aberta enquanto os alunos jogam
- **Exporte resultados**: Click com botão direito em "scores" → "Exportar JSON" para fazer relatório
- **Resete dados**: Delete a pasta "scores" para um novo ciclo de aulas

---

**Pronto! Seu sistema de ranking está configurado! 🚀**
