# Configuração de Filtro por Aula no Ranking

## Como Funciona

A partir de agora, o sistema utiliza um **identificador de aula** para filtrar automaticamente os jogadores que pontuaram especificamente naquela aula. Isso permite usar um único banco de dados no Firebase, mas com dados isolados por aula.

## Configuração (Muito Simples!)

### Mudar de Aula em Um Único Arquivo

Abra o arquivo **`data.json`** e altere o campo `id` em `lesson_info`:

```json
{
  "lesson_info": {
    "id": "Aula-12",
    "title": "AULA 12 - ...",
    "topics": [...]
  },
  "questions": [...]
}
```

**Pronto!** Ao fazer isso:
- ✅ Todas as perguntas dessa aula serão carregadas
- ✅ O ranking filtrará automaticamente por "Aula-12"
- ✅ Os novos scores serão salvos com a ID "Aula-12"

Não precisa mexer em nenhum outro arquivo!

## Como os Dados São Salvos

Quando um jogador termina o quiz, o score é salvo no Firebase com a seguinte estrutura:

```json
{
  "name": "JOÃO SILVA",
  "score": 5000,
  "correct": 45,
  "total": 50,
  "accuracy": 90,
  "gameTime": 58,
  "timestamp": 1699564800000,
  "date": "10/11/2023",
  "lesson": "Aula-12"
}
```

**O campo `lesson` é automaticamente preenchido** com o valor de `lesson_info.id` do `data.json`.

## Como o Ranking Filtra

- **`subscribeToTopScores()`** - Mostra apenas os top 15 da aula atual
- **`getTopScores()`** - Busca scores apenas da aula atual

O filtro é automático: se `data.json` tem `"id": "Aula-12"`, o ranking mostra apenas quem pontuou em "Aula-12".

## Compatibilidade

O sistema é **retrocompatível** com scores antigos:
- Scores salvos antes dessa implementação (sem o campo `lesson`) continuam sendo exibidos
- Novos scores têm o campo `lesson` preenchido automaticamente

## Vantagens

✅ **Um único arquivo para mudar de aula** (`data.json`)  
✅ Um único banco Firebase para todas as aulas  
✅ Ranking isolado por aula  
✅ Dados históricos preservados  
✅ Nenhuma alteração em código necessária

## Fluxo Automático

1. Controller carrega `data.json`
2. Model extrai `lesson_info.id`
3. RankingManager recebe o `id` e configura filtro
4. Todos os scores salvos incluem este `id`
5. Ranking mostra apenas dados da aula atual

## Estrutura Modificada

- **[data.json](../data.json)** - Adicionado campo `id` em `lesson_info`
- **[model.js](model.js)** - Novo método `getLessonId()`
- **[controller.js](controller.js)** - Lê `lessonId` do Model e configura RankingManager
- **[ranking-manager.js](ranking-manager.js)** - Filtra scores por aula
