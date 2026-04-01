# Configuracao de Filtro por Aula no Ranking

## Como funciona

O ranking usa o identificador da aula (`lesson_info.id`) para filtrar os resultados no mesmo Firebase.

Agora o conteudo das aulas pode ficar em **um unico arquivo**:

- [sst/lessons/course-data.json](sst/lessons/course-data.json)

Cada aula e selecionada por slug via URL:

- `core/index.html?aula=aula-11`
- `core/index.html?aula=aula-12`

## Estrutura recomendada (arquivo unico)

Exemplo resumido:

```json
{
  "version": 1,
  "defaultLesson": "aula-11",
  "lessons": [
    {
      "slug": "aula-11",
      "lesson_info": {
        "id": "Aula-11",
        "title": "AULA 11 - ..."
      },
      "questions": []
    }
  ]
}
```

Com isso:

- o loader busca a aula pelo `slug` da URL
- os novos scores salvam `lesson = lesson_info.id`
- o ranking mostra apenas a aula atual

## Estrutura de score salva

```json
{
  "name": "JOAO SILVA",
  "score": 5000,
  "correct": 45,
  "total": 50,
  "accuracy": 90,
  "gameTime": 58,
  "timestamp": 1699564800000,
  "date": "10/11/2023",
  "lesson": "Aula-14"
}
```

## Arquivos envolvidos

- [sst/core/js/model.js](sst/core/js/model.js)
- [sst/core/js/controller.js](sst/core/js/controller.js)
- [sst/core/js/ranking-manager.js](sst/core/js/ranking-manager.js)
- [sst/lessons/course-data.json](sst/lessons/course-data.json)

## Compatibilidade

O loader ainda possui fallback para formato antigo por pasta (`sst/lessons/aula-xx/data.json`),
mas o padrao oficial do projeto agora e manter somente `sst/lessons/course-data.json`.

## Vantagens

- Um unico motor em [sst/core](sst/core)
- Um unico arquivo para todas as aulas do curso
- Escala melhor para 200+ aulas
- Um unico banco Firebase para varias aulas
- Ranking isolado por aula automaticamente
