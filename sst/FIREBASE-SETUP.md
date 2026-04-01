# Configuracao Firebase - Guia Passo a Passo

## Por que Firebase?

O Firebase permite ranking em tempo real sem banco tradicional. E opcional: o quiz funciona sem ele.

## Passo 1: Criar Projeto Firebase

1. Acesse https://console.firebase.google.com
2. Clique em "Criar projeto"
3. Nome sugerido: quiz-sst
4. Google Analytics: opcional
5. Clique em "Criar projeto"

## Passo 2: Criar Realtime Database

1. No menu Build, abra Realtime Database
2. Clique em "Criar banco de dados"
3. Regiao sugerida: us-central1
4. Selecione "Iniciar em modo de teste"
5. Clique em "Ativar"

## Passo 3: Obter Credenciais Web

1. Projeto > Configuracoes (engrenagem)
2. Aba Geral > Seus apps
3. Adicione app web (</>) se necessario
4. Copie o objeto firebaseConfig

## Passo 4: Colar Credenciais no Projeto

Arquivo:

- sst/core/js/firebase-config.js

Substitua os valores do objeto firebaseConfig pelos dados do seu projeto.

## Passo 5: Regras (Sala de Aula)

No Realtime Database > Regras, use:

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

Publique as regras.

## Passo 6: Testar

1. Abra sst/index.html
2. Jogue ate o fim
3. Veja o ranking

## Troubleshooting rapido

- "Firebase nao configurado": revise sst/core/js/firebase-config.js
- Ranking vazio: confira regras e se ha dados em scores
- Erro no console: abra F12 e valide mensagens

## Observacao

Para uso publico/producão, configure autenticacao e regras restritivas.
