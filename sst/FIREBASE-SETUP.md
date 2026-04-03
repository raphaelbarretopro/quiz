# Configuracao Firebase + Login Google

Este projeto agora exige login com Google para liberar o quiz e o ranking.

## 1. Criar o projeto Firebase

1. Acesse https://console.firebase.google.com
2. Clique em "Criar projeto"
3. Nome sugerido: quiz-sst
4. Google Analytics: opcional
5. Conclua a criacao

## 2. Registrar app Web e copiar firebaseConfig

1. Projeto > Configuracoes (engrenagem)
2. Aba Geral > Seus apps
3. Adicione app web (</>) se necessario
4. Copie o objeto `firebaseConfig`

Arquivo do projeto:

- `sst/core/js/firebase-config.js`

Substitua todos os campos (`apiKey`, `authDomain`, `projectId`, `appId`, `databaseURL`, etc.) pelos dados reais do seu projeto.

## 3. Habilitar Authentication com Google (obrigatorio)

1. No Firebase Console: Build > Authentication
2. Aba Sign-in method
3. Ative o provedor Google
4. Configure email de suporte do projeto
5. Salve

Sem isso, o erro tipico e `auth/operation-not-allowed`.

## 4. Dominios autorizados (obrigatorio)

1. Firebase Authentication > Settings > Authorized domains
2. Garanta que os dominios usados no teste/deploy estao listados:
   - `localhost`
   - `127.0.0.1`
   - dominio de producao (quando publicar)

Sem isso, o erro tipico e `auth/unauthorized-domain`.

## 5. Realtime Database

1. Build > Realtime Database
2. Clique em "Criar banco de dados"
3. Regiao sugerida: us-central1
4. Crie o banco

## 6. Regras seguras do Realtime Database

Use regras exigindo usuario autenticado:

```json
{
  "rules": {
    "scores": {
      ".read": "auth != null",
      ".write": "auth != null",
      "$scoreId": {
        ".validate": "newData.hasChildren(['name', 'score', 'correct', 'total', 'accuracy', 'timestamp', 'date'])"
      }
    }
  }
}
```

Publique as regras.

## 7. Google Cloud: APIs e chave da web

No projeto vinculado do Google Cloud:

1. APIs e Servicos > Biblioteca
2. Verifique se estas APIs estao habilitadas:
   - Identity Toolkit API
   - Secure Token API
3. APIs e Servicos > Credenciais > API key usada no firebaseConfig
4. Se houver restricao por HTTP referrer, inclua os hosts usados no app (localhost, 127.0.0.1 e dominio de deploy)

Sem isso, erros comuns:

- `auth/api-key-not-valid-please-pass-a-valid-api-key`
- `API key not valid`

## 8. Como testar corretamente

1. Execute com servidor local (nao use `file://`)
2. Abra `sst/index.html`
3. Clique em "Entrar com Google"
4. Verifique se o status mostra usuario logado
5. Inicie o quiz e confirme leitura/escrita no ranking

## Troubleshooting rapido

- Erro de API key invalida:
  - confirme o `firebaseConfig` no arquivo `sst/core/js/firebase-config.js`
  - revise restricoes da API key no Google Cloud
- Erro de dominio nao autorizado:
  - adicione dominio em Authentication > Settings > Authorized domains
- Botao login nao funciona em popup:
  - o app faz fallback para redirect; aguarde retorno da pagina
