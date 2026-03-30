# Saga do Futuro - Quiz SST

Projeto de quiz educativo gamificado para Seguranca no Trabalho em TI, com narrativa por eras, desafios interativos, mini-games e ranking em tempo real.

## Acesso Rapido

- Aula 11 (index): [Abrir aula-11](./sst/aula-11/index.html)
- Aula 12 (index): [Abrir aula-12](./sst/aula-12/index.html)
- Demo publica (aula 11): [raphaelbarretopro.github.io/quiz/sst/aula-11](https://raphaelbarretopro.github.io/quiz/sst/aula-11/)

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

- Projeto com duas versoes completas da aplicacao: `sst/aula-11` e `sst/aula-12`
- Cada aula possui seu proprio `index.html`, `data.json`, assets, CSS e JavaScript modular
- Ambas as aulas seguem arquitetura MVC com modulos ES

### Arquitetura

- `js/model.js`: estado do jogo, carregamento de questoes, regras de pontuacao e Sokoban
- `js/view.js`: renderizacao da interface, audio, mini-games e modais
- `js/controller.js`: orquestracao do fluxo, timers, progresso, bonus e encerramento
- `js/ranking-manager.js`: persistencia e leitura de ranking no Firebase Realtime

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

### Diferencas Entre Aula-11 e Aula-12

- IDs de aula distintas no `data.json`: `Aula-11` e `Aula-12`
- Base de codigo praticamente igual entre as duas pastas
- Diferenca identificada no `index.html`:
  - Aula 11 deixa botoes de teste dos bonus comentados
  - Aula 12 deixa esses botoes visiveis

## Como Executar Localmente

Como o app usa `fetch` para carregar `data.json`, abra com servidor local HTTP.

### Opcao 1: Live Server (VS Code)

1. Abra o projeto no VS Code.
2. Abra um dos arquivos:
   - `sst/aula-11/index.html`
   - `sst/aula-12/index.html`
3. Execute com Live Server.

### Opcao 2: Python

```bash
cd sst/aula-11
python -m http.server 5500
```

ou

```bash
cd sst/aula-12
python -m http.server 5500
```

## Ranking e Firebase

- O ranking e opcional para funcionamento do quiz
- Sem Firebase, o jogo continua operando localmente
- Com Firebase, o Top 15 e atualizado em tempo real
- Filtro por aula baseado em `lesson_info.id`

Guias de configuracao:

- Aula 11: [FIREBASE-SETUP](./sst/aula-11/FIREBASE-SETUP.md)
- Aula 12: [FIREBASE-SETUP](./sst/aula-12/FIREBASE-SETUP.md)
- Filtro por aula: [LESSON_FILTER_SETUP aula-11](./sst/aula-11/LESSON_FILTER_SETUP.md)

## Estrutura de Pastas

```text
quiz/
  LICENSE
  QUICK-START.md
  README.md
  sst/
    aula-11/
      index.html
      data.json
      FIREBASE-SETUP.md
      LESSON_FILTER_SETUP.md
      audio/
      css/
        style.css
      img/
      js/
        controller.js
        model.js
        view.js
        ranking-manager.js
        firebase-config.js
    aula-12/
      index.html
      data.json
      FIREBASE-SETUP.md
      LESSON_FILTER_SETUP.md
      audio/
      css/
        style.css
      img/
      js/
        controller.js
        model.js
        view.js
        ranking-manager.js
        firebase-config.js
```

## Creditos

Conteudo didatico e conducao pedagogica: Professor Raphael Barreto - Firjan SENAI.

## Licenca

Consulte [LICENSE](./LICENSE).