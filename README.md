# Quiz SST - Plataforma de Quiz Gamificado

Projeto web de quiz educativo gamificado para Segurança no Trabalho em TI, com arquitetura MVC, conteúdo por aula em arquivo único e painel de importação/validação para expansão do curso.

## Acesso Rápido

- Launcher: [sst/index.html](./sst/index.html)
- Importador de aulas: [sst/tools/lesson-importer.html](./sst/tools/lesson-importer.html)

## Links de Acesso por Aula

- Aula 11: [sst/core/index.html?aula=aula-11](./sst/core/index.html?aula=aula-11)
- Aula 12: [sst/core/index.html?aula=aula-12](./sst/core/index.html?aula=aula-12)
- Aula 13: [sst/core/index.html?aula=aula-13](./sst/core/index.html?aula=aula-13)
- Aula 14: [sst/core/index.html?aula=aula-14](./sst/core/index.html?aula=aula-14)
- Aula 15: [sst/core/index.html?aula=aula-15](./sst/core/index.html?aula=aula-15)

## Tecnologias Utilizadas

### Front-end

- HTML5
- CSS3
- JavaScript ES Modules
- UI responsiva com animações CSS

### Arquitetura e Organização

- Arquitetura MVC
- Conteúdo centralizado em JSON único: [sst/lessons/course-data.json](./sst/lessons/course-data.json)
- Filtro por aula via query string (`?aula=aula-xx`)

### Banco e Serviços

- Firebase Realtime Database (ranking)
- Firebase Authentication (login anônimo)

### APIs Web usadas no app

- Fetch API
- Drag and Drop API (questões `drag`)
- Blob API (download de JSON)
- URLSearchParams
- File System Access API (quando suportada)
- Web Audio API / HTMLAudioElement

### Ferramentas de Conteúdo (Importador)

- PDF.js (extração de texto de PDF)
- Integração com APIs de IA:
  - Gemini API (preset nativo)
  - OpenAI-compatible APIs
  - GitHub Models (preset dedicado)

### Ambiente e Publicação

- VS Code + Live Server
- Python HTTP Server (`python -m http.server`)
- GitHub + GitHub Pages

## Estrutura do Projeto

```text
quiz/
  LICENSE
  QUICK-START.md
  README.md
  sst/
    index.html
    core/
      index.html
      css/
      js/
        controller.js
        model.js
        view.js
        ranking-manager.js
        firebase-config.js
    lessons/
      course-data.json
    tools/
      lesson-importer.html
    FIREBASE-SETUP.md
    LESSON_FILTER_SETUP.md
```

## Como Executar Localmente

Como o projeto usa `fetch`, rode com servidor HTTP local.

### Opção 1 - Live Server (VS Code)

1. Abra o projeto no VS Code.
2. Execute o arquivo [sst/index.html](./sst/index.html) com Live Server.

### Opção 2 - Python

```bash
python -m http.server 5500
```

Depois abra:

- `http://localhost:5500/sst/`
- `http://localhost:5500/sst/core/index.html?aula=aula-11`
- `http://localhost:5500/sst/core/index.html?aula=aula-12`
- `http://localhost:5500/sst/core/index.html?aula=aula-13`
- `http://localhost:5500/sst/core/index.html?aula=aula-14`
- `http://localhost:5500/sst/core/index.html?aula=aula-15`

## Criação de Novas Aulas

Fluxo recomendado:

1. Abrir [sst/tools/lesson-importer.html](./sst/tools/lesson-importer.html).
2. Gerar/colar JSON da nova aula.
3. Validar estrutura e consistência.
4. Inserir no [sst/lessons/course-data.json](./sst/lessons/course-data.json).

Validações principais do importador:

- `slug` e `lesson_info.id` únicos.
- Estrutura de `topics` e `questions`.
- Suporte aos tipos: `multiple`, `boolean`, `drag`, `combo`, `multi`.
- Modo estrito com 50 perguntas e alternância de tipos.

## Firebase e Ranking

- O quiz funciona sem Firebase, mas o ranking em nuvem depende da configuração correta.
- Guia: [sst/FIREBASE-SETUP.md](./sst/FIREBASE-SETUP.md)
- Filtro por aula: [sst/LESSON_FILTER_SETUP.md](./sst/LESSON_FILTER_SETUP.md)

## Créditos

Conteúdo didático e condução pedagógica: Professor Raphael Barreto - Firjan SENAI.

## Licença

Consulte [LICENSE](./LICENSE).