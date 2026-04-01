# ⚡ Quick Start - Quiz Dinâmico

## 🚀 Iniciar em 3 Passos

### 1️⃣ Abrir o Quiz
Acesse: **`sst/index.html`** em seu navegador

### 2️⃣ (OPCIONAL) Configurar Ranking
Para ativar ranking compartilhado entre alunos:
- Abra: **`sst/FIREBASE-SETUP.md`**
- Siga os passos (leva ~5 minutos)

### 3️⃣ Jogar! 
- Digite seu nome
- Clique em "INICIAR JORNADA"
- Responda as perguntas
- Veja seu ranking 🏆

---

## 📝 Informações Rápidas

| Item | Detalhes |
|------|----------|
| **Tipo** | Quiz educativo gamificado |
| **Tecnologia** | HTML5 + CSS3 + JavaScript ES6 |
| **Backend** | Firebase Realtime (opcional) |
| **Pontos** | 100 por resposta correta |
| **Tempo** | ~15-20 min por sessão |
| **Compatibilidade** | Chrome, Firefox, Safari, Edge |

---

## ❓ Dúvidas Frequentes

### "O ranking não funciona!"
- Complete o setup do Firebase em **sst/FIREBASE-SETUP.md**
- Verifique se as credenciais estão em `sst/core/js/firebase-config.js`
- Abra console (F12) e procure por erros

### "Como adicionar mais perguntas?"
- Edite o arquivo único `sst/lessons/course-data.json`
- Localize a aula pelo `slug` e adicione novos objetos no array `questions`
- Siga o padrão dos existentes

### "Como mudar pontos por acerto?"
- Abra `sst/core/js/model.js`
- Procure por `this.pointsPerCorrect = 100`
- Mude o número

### "Como resetar ranking?"
- Firebase Console → Realtime Database
- Delete a pasta `scores`

---

## 📚 Documentação Completa

- **README.md** - Guia completo do projeto
- **sst/FIREBASE-SETUP.md** - Setup detalhado Firebase
- **sst/LESSON_FILTER_SETUP.md** - Filtro do ranking por aula
- **sst/lessons/course-data.json** - Conteúdo de todas as aulas
- **sst/core/js/controller.js** - Lógica principal

---

**Boa sorte na jornada! 🚀**
