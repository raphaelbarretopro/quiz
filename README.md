# Quis Dinâmico - Quiz SST

Projeto de quiz educativo gamificado para Seguranca no Trabalho em TI, com narrativa por eras, desafios interativos, mini-games e ranking em tempo real.

## Acesso Rapido

- Launcher geral: [Abrir sst/index.html](./sst/index.html)
- App unificado (aula 11): [Abrir](./sst/core/index.html?aula=aula-11)
- App unificado (aula 12): [Abrir](./sst/core/index.html?aula=aula-12)
- App unificado (aula 13): [Abrir](./sst/core/index.html?aula=aula-13)
- Importador grafico de aulas: [Abrir](./sst/tools/lesson-importer.html)

## Tecnologias (Logo + Cor)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Firebase Realtime Database](https://img.shields.io/badge/Firebase%20Realtime-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-121013?style=for-the-badge&logo=github&logoColor=white)
![Google Fonts](https://img.shields.io/badge/Google%20Fonts-4285F4?style=for-the-badge&logo=googlefonts&logoColor=white)
![Arquitetura MVC](https://img.shields.io/badge/Arquitetura-MVC-0A66C2?style=for-the-badge)

## Cores do Projeto

### Paleta Base (UI)

- Primaria: `#00d4ff`
- Borda neon: `#00e5ff`
- Destaque ouro: `#ffd700`
- Fundo base: `#050a10`
- Painel: `rgba(10, 20, 30, 0.95)`
- Texto: `#f0f0f0`

### Cores por Era (dados da aula)

- ACID - Acidentes de Trabalho: `#e74c3c`
- AGEN - Agentes Agressores: `#f1c40f`
- PROT - EPI e EPC: `#3498db`
- NORM - Normas e Regras: `#2ecc71`

## Analise do Projeto

### Estrutura Geral

- Arquitetura unificada com nucleo compartilhado em `sst/core`
- Conteudo de todas as aulas concentrado em `sst/lessons/course-data.json`
- Aplicacao continua em arquitetura MVC com modulos ES

### Arquitetura

- `sst/core/js/model.js`: estado do jogo, carregamento dinamico por `?aula=`, regras e Sokoban
- `sst/core/js/view.js`: renderizacao da interface, audio, mini-games e modais
- `sst/core/js/controller.js`: orquestracao do fluxo, timers, progresso, bonus e encerramento
- `sst/core/js/ranking-manager.js`: persistencia e leitura de ranking no Firebase Realtime
- `sst/lessons/course-data.json`: banco unico com todas as aulas e metadados

### Funcionalidades Principais

- 50 perguntas por aula (`data.json`)
- Tipos de questao: `multiple`, `boolean`, `combo`, `multi`, `drag`
- Roleta de eras + transicoes narrativas
- Mini-game Sokoban entre mudancas de tema
- Bonus estilo caca-niquel por sequencia de acertos
- Bonus especiais inspirados em PAC-MAN, Enduro e T-Rex
- Ranking Top 15 em tempo real por aula
- Controle de tempo total da partida e tempo por desafio
- Interface responsiva com efeitos visuais e trilhas sonoras

### Diferencas Entre Aulas

- As diferencas ficam concentradas no `course-data.json` em `sst/lessons`
- IDs de aula atuais:
  - `Aula-11`
  - `Aula-12`
  - `Aula-13`
- Motor, assets, CSS e JavaScript sao compartilhados no `core`

## Como Executar Localmente

Como o app usa `fetch` para carregar `data.json`, abra com servidor local HTTP.

### Opcao 1: Live Server (VS Code)

1. Abra o projeto no VS Code.
2. Abra um dos arquivos:
  - `sst/index.html` (recomendado)
  - `sst/core/index.html?aula=aula-11`
  - `sst/core/index.html?aula=aula-12`
  - `sst/core/index.html?aula=aula-13`
3. Execute com Live Server.

### Opcao 2: Python

```bash
cd sst
python -m http.server 5500
```

Depois, abra no navegador:

- `http://localhost:5500/sst/` (launcher)
- `http://localhost:5500/sst/core/index.html?aula=aula-11`
- `http://localhost:5500/sst/core/index.html?aula=aula-12`
- `http://localhost:5500/sst/core/index.html?aula=aula-13`

## Ranking e Firebase

- O ranking e opcional para funcionamento do quiz
- Sem Firebase, o jogo continua operando localmente
- Com Firebase, o Top 15 e atualizado em tempo real
- Filtro por aula baseado em `lesson_info.id`

Guias de configuracao:

- Firebase: [FIREBASE-SETUP](./sst/FIREBASE-SETUP.md)
- Filtro por aula: [LESSON_FILTER_SETUP](./sst/LESSON_FILTER_SETUP.md)

## Estrutura de Pastas

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
        style.css
      js/
        controller.js
        model.js
        view.js
        ranking-manager.js
        firebase-config.js
      assets/
        audio/
        img/
    lessons/
      course-data.json
    FIREBASE-SETUP.md
    LESSON_FILTER_SETUP.md
```

## Como criar nova aula

1. Abra [sst/tools/lesson-importer.html](./sst/tools/lesson-importer.html) para colar o JSON da nova aula, validar a estrutura e gerar o `course-data.json` atualizado.
2. Se preferir editar manualmente, adicione um novo item em `lessons` com `slug` unico (ex.: `aula-14`) e `lesson_info.id` unico (ex.: `Aula-14`).
3. Adicione o link no `sst/index.html` apontando para `core/index.html?aula=aula-14`.
4. Nao duplique `css`, `js`, `audio` ou `img`: tudo fica no `sst/core`.

### Validacao grafica

- A ferramenta valida `slug`, `lesson_info.id`, `lesson_info.title`, `topics` e `questions`.
- Tambem verifica conflitos de `slug` e de `lesson_info.id` antes de inserir a nova aula.
- O arquivo final continua no mesmo padrao do projeto: JSON valido com identacao de 2 espacos.
- Em navegadores Chromium/Edge recentes, a ferramenta permite salvar o JSON atualizado direto no disco; nos demais casos, basta baixar o arquivo gerado.

### Geracao por PDF

- O importador agora possui modo de geracao por PDF + IA em `sst/tools/lesson-importer.html`.
- Fluxo: anexar PDF da aula (conteudo), extrair texto e gerar automaticamente o JSON da nova aula.
- No modo estrito, a validacao exige exatamente 50 perguntas com alternancia fixa de tipos: `multiple`, `boolean`, `drag`, `combo`, `multi`.
- A chave de API e informada apenas na tela local do navegador e nao e persistida no projeto.
- Para Gemini, use o preset da tela (provedor `gemini`) e informe sua chave; o importador envia para a API no formato nativo do Google.

## Creditos

Conteudo didatico e conducao pedagogica: Professor Raphael Barreto - Firjan SENAI.

## Licenca

Consulte [LICENSE](./LICENSE).