# Quiz Gamificado: aprendizagem ativa nas aulas de TI

<p align="center">
  Plataforma web de aprendizagem ativa para aulas de TI, com quizzes gamificados, autenticação Google, ranking em tempo real por aula, perguntas em múltiplos formatos e mini-games bônus integrados ao fluxo de aprendizagem.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/status-em%20producao-1f8b4c?style=for-the-badge" alt="Status">
  <img src="https://img.shields.io/badge/arquitetura-MVC-1565c0?style=for-the-badge" alt="Arquitetura MVC">
  <img src="https://img.shields.io/badge/curso-json%20unificado-00897b?style=for-the-badge" alt="Curso em JSON unificado">
  <img src="https://img.shields.io/badge/ranking-Firebase%20Realtime-ff8f00?style=for-the-badge" alt="Ranking Firebase">
</p>

## Visão Geral

O **Quiz Gamificado: aprendizagem ativa nas aulas de TI** é um aplicativo front-end em HTML, CSS e JavaScript que transforma conteúdos de aula em uma experiência interativa. O projeto reúne aulas de segurança do trabalho, matemática, ferramentas digitais, programação, infraestrutura, dados, inteligência artificial e outros temas de tecnologia. Cada aula é carregada dinamicamente de um único arquivo JSON e pode ser aberta por um link próprio; o login com Google libera a jornada e o desempenho é publicado em um ranking filtrado pela aula atual.

Além do fluxo tradicional de perguntas e respostas, o projeto combina roleta de tópicos, feedback visual e sonoro, cronômetros, pontuação por moedas, certificado final e uma camada de mini-games bônus sorteados ao longo da sessão.

## Acesso Rápido

| Recurso | Link local | Link sugerido de produção |
|---|---|---|
| Launcher de aulas | [sst/index.html](./sst/index.html) | - |
| Aplicação principal | [sst/core/index.html](./sst/core/index.html) | [Abrir app](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-13) |
| Importador de aulas | [sst/tools/lesson-importer.html](./sst/tools/lesson-importer.html) | - |
| Guia Firebase | [sst/FIREBASE-SETUP.md](./sst/FIREBASE-SETUP.md) | - |
| Guia de filtro por aula | [sst/LESSON_FILTER_SETUP.md](./sst/LESSON_FILTER_SETUP.md) | - |
| Prompt base para geração manual | [sst/PROMPT_PARA_GERAR_QUIZ_POR_AULA.txt](./sst/PROMPT_PARA_GERAR_QUIZ_POR_AULA.txt) | - |

## Tecnologias

### Front-end

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES%20Modules-F7DF1E?style=for-the-badge&logo=javascript&logoColor=111111)

### Serviços e integrações

![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=222222)
![Google Auth](https://img.shields.io/badge/Google%20Auth-4285F4?style=for-the-badge&logo=google&logoColor=white)
![Realtime Database](https://img.shields.io/badge/Realtime%20Database-F4511E?style=for-the-badge&logo=firebase&logoColor=white)
![PDF.js](https://img.shields.io/badge/PDF.js-D32F2F?style=for-the-badge&logo=mozilla&logoColor=white)

### Padrões e APIs

![MVC](https://img.shields.io/badge/MVC-1E88E5?style=for-the-badge)
![JSON](https://img.shields.io/badge/JSON-43A047?style=for-the-badge&logo=json&logoColor=white)
![Fetch API](https://img.shields.io/badge/Fetch%20API-0069C0?style=for-the-badge)
![Drag and Drop](https://img.shields.io/badge/Drag%20and%20Drop-00ACC1?style=for-the-badge)
![Web Audio](https://img.shields.io/badge/Web%20Audio-8E24AA?style=for-the-badge)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?style=for-the-badge&logo=githubpages&logoColor=white)

## Arquitetura do Projeto

O projeto utiliza uma separação simples e eficiente em MVC no front-end:

- `model.js`: carrega a aula a partir do `course-data.json`, resolve o slug via URL e mantém o estado do quiz.
- `view.js`: renderiza telas, modais, HUD, áudio, certificado, ranking e interfaces dos mini-games.
- `controller.js`: coordena autenticação, progressão das perguntas, roleta, bônus, timers, pontuação e finalização.
- `ranking-manager.js`: integra com o Firebase Realtime Database, filtra scores por aula e consolida o melhor resultado por jogador.
- `lesson-importer.html`: ferramenta visual para validar, gerar, importar e mesclar novas aulas ao JSON central do curso.

## Estrutura do Repositório

```text
quiz/
├─ LICENSE
├─ QUICK-START.md
├─ README.md
└─ sst/
   ├─ index.html
   ├─ FIREBASE-SETUP.md
   ├─ LESSON_FILTER_SETUP.md
   ├─ PROMPT_PARA_GERAR_QUIZ_POR_AULA.txt
   ├─ core/
   │  ├─ index.html
   │  ├─ assets/
   │  ├─ css/
   │  └─ js/
   │     ├─ controller.js
   │     ├─ firebase-config.js
   │     ├─ model.js
   │     ├─ ranking-manager.js
   │     ├─ view.js
   │     └─ game/
   ├─ lessons/
   │  └─ course-data.json
   └─ tools/
      └─ lesson-importer.html
```

## Funcionalidades do Quiz

### Fluxo principal de uso

1. O usuário abre a aula pelo launcher ou por URL direta com `?cod=aula-xx`.
2. O aplicativo carrega a aula correta dentro de `sst/lessons/course-data.json`.
3. O acesso ao quiz é liberado apenas após autenticação com Google.
4. A sessão inicia com roleta temática, introdução do tópico e sequência de perguntas.
5. Ao longo da jornada, o jogador acumula moedas, tempo total, streak de acertos e bônus especiais.
6. No encerramento, o resultado pode entrar no ranking da aula e o jogador recebe certificado.

### Recursos pedagógicos e de gameplay

- Seleção dinâmica da aula por parâmetro de URL: `cod`, `aula` ou `lesson`.
- Carregamento centralizado de todas as aulas em um único arquivo JSON.
- Tópicos visuais por aula, cada um com nome, descrição, cor e imagem.
- Roleta para transição de tema entre blocos de conteúdo.
- Feedback imediato para acerto e erro com dica pedagógica (`tip`).
- Personalização dos enunciados com a tag `[NAME]`.
- Painel lateral com moedas, tempo total, ranking Top 15 e controle de trilha sonora.
- Modal de ranking global da aula atual.
- Certificado de conclusão com impressão.
- Timer geral de sessão e timer específico para desafios bônus.
- Filtro automático do ranking por `lesson_info.id`.
- Consolidação do melhor score por jogador para evitar duplicidades indevidas no leaderboard.

### Tipos de questão suportados

| Tipo | Descrição | Campos principais |
|---|---|---|
| `multiple` | Escolha única | `answers`, `correct`, `tip` |
| `boolean` | Verdadeiro ou falso | `answers`, `correct`, `tip` |
| `combo` | Frase com lacuna `[COMBO]` | `options`, `correct`, `tip` |
| `multi` | Múltipla seleção | `answers`, `correct` como array, `tip` |
| `drag` | Relacionar itens e zonas | `items`, `zones`, `correct: "drag"`, `tip` |

### Regras de conteúdo suportadas pelo motor

- A aula contém `slug`, `lesson_info` e `questions`.
- O campo `lesson_info.sokoban` define 4 letras da palavra-chave do desafio Sokoban.
- A última questão de um tópico pode usar `trans` para apontar o próximo tópico.
- O loader mantém compatibilidade com formato legado por pasta, mas o padrão oficial é o JSON único do curso.

## Mini-games Integrados

Os mini-games são sorteados ao longo da sessão para adicionar variação ao ritmo da aula e recompensar o jogador com bônus de pontuação.

| Mini-game | ID técnico | Papel no fluxo |
|---|---|---|
| Pac-Man | `pacman` | Desafio de coleta com bônus de moedas |
| Enduro | `enduro` | Corrida por estágios com tempo limitado |
| T-Rex | `trex` | Runner de obstáculos |
| Sokoban | `sokoban` | Quebra-cabeça com palavra-chave da aula |
| Mario | `mario` | Runner lateral com vidas |
| Space Invaders | `space` | Shooter espacial |
| Snake | `snake` | Crescimento e sobrevivência |
| Memory | `memory` | Jogo de memória com pares |
| Lorde Hero | `lordehero` | Bônus especial dedicado |
| Frogger | `frogger` | Travessia e precisão |
| Tetris | `tetris` | Linhas e sobrevivência |
| 2048 | `game2048` | Combinação numérica |
| Flappy Bird | `flappybird` | Navegação por obstáculos |
| Arkanoid | `arkanoid` | Reflexo e destruição de blocos |
| Asteroids | `asteroids` | Shooter arcade |
| Minesweeper | `minesweeper` | Raciocínio lógico por grade |

## Aulas Disponíveis

As **75 aulas** cadastradas atualmente estão centralizadas em [sst/lessons/course-data.json](./sst/lessons/course-data.json). Cada link local usa o slug da aula e pode ser aberto quando o projeto estiver sendo servido por HTTP; os links de produção apontam para o GitHub Pages.

| Aula | Tema (catálogo oficial) | Link local | Produção |
|---|---|---|---|
| Aula-11 | AULA 11 - GUARDIÕES DA PREVENÇÃO: SEGURANÇA NO TRABALHO EM TI | [Abrir Aula-11](./sst/core/index.html?cod=aula-11) | [Abrir Aula-11](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-11) |
| Aula-12 | AULA 12 - GUARDIÕES DA PREVENÇÃO: SAÚDE, SEGURANÇA E MEIO AMBIENTE | [Abrir Aula-12](./sst/core/index.html?cod=aula-12) | [Abrir Aula-12](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-12) |
| Aula-13 | AULA 13 - GUARDIÕES DO FUTURO: SUSTENTABILIDADE E QUALIDADE AMBIENTAL | [Abrir Aula-13](./sst/core/index.html?cod=aula-13) | [Abrir Aula-13](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-13) |
| Aula-14 | AULA 14 - GUARDIÕES DA SAÚDE: IMPACTOS DE SUBSTÂNCIAS NO TRABALHO | [Abrir Aula-14](./sst/core/index.html?cod=aula-14) | [Abrir Aula-14](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-14) |
| Aula-15 | AULA 15 - GUARDIÕES DO RESPEITO: DIREITOS, SAÚDE E AUTOCONHECIMENTO | [Abrir Aula-15](./sst/core/index.html?cod=aula-15) | [Abrir Aula-15](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-15) |
| Aula-16 | AULA 16 - RACIOCÍNIO LÓGICO: FUNDAMENTOS, PRINCÍPIOS E SEQUÊNCIAS | [Abrir Aula-16](./sst/core/index.html?cod=aula-16) | [Abrir Aula-16](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-16) |
| Aula-17 | AULA 17 - CONJUNTOS E FRAÇÕES APLICADAS À COMPUTAÇÃO | [Abrir Aula-17](./sst/core/index.html?cod=aula-17) | [Abrir Aula-17](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-17) |
| Aula-18 | AULA 18 - RAZÕES, PROPORÇÕES, PORCENTAGENS E CORRELAÇÃO | [Abrir Aula-18](./sst/core/index.html?cod=aula-18) | [Abrir Aula-18](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-18) |
| Aula-17-1 | AULA 17 - LÓGICA MATEMÁTICA: CONJUNTOS E FRAÇÕES APLICADAS | [Abrir Aula-17-1](./sst/core/index.html?cod=aula-17-1) | [Abrir Aula-17-1](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-17-1) |
| Aula-19 | AULA 19 - TÉCNICAS DE RESOLUÇÃO DE PROBLEMAS | [Abrir Aula-19](./sst/core/index.html?cod=aula-19) | [Abrir Aula-19](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-19) |
| Aula-21 | AULA 21 - INDÚSTRIA 4.0: DAS REVOLUÇÕES AO FUTURO DO EMPREGO | [Abrir Aula-21](./sst/core/index.html?cod=aula-21) | [Abrir Aula-21](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-21) |
| Aula-20 | AULA 20 - PLANILHAS ELETRÔNICAS, GRÁFICOS, QUADROS E TABELAS | [Abrir Aula-20](./sst/core/index.html?cod=aula-20) | [Abrir Aula-20](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-20) |
| Aula-22 | AULA 22 - TECNOLOGIAS HABILITADORAS DA INDÚSTRIA 4.0 | [Abrir Aula-22](./sst/core/index.html?cod=aula-22) | [Abrir Aula-22](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-22) |
| Aula-23 | AULA 23 - ROBÓTICA, MANUFATURA ADITIVA E SIMULAÇÃO | [Abrir Aula-23](./sst/core/index.html?cod=aula-23) | [Abrir Aula-23](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-23) |
| Aula-24 | AULA 24 - INTEGRAÇÃO DE SISTEMAS, SEGURANÇA DIGITAL E REALIDADE AUMENTADA | [Abrir Aula-24](./sst/core/index.html?cod=aula-24) | [Abrir Aula-24](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-24) |
| Aula-25 | AULA 25 - AUTOCONHECIMENTO E METAS PROFISSIONAIS NA ERA DIGITAL | [Abrir Aula-25](./sst/core/index.html?cod=aula-25) | [Abrir Aula-25](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-25) |
| Aula-23-bonus | AULA 23 BÔNUS - APRENDENDO ARDUINO DO ZERO | [Abrir Aula-23-bonus](./sst/core/index.html?cod=aula-23-bonus) | [Abrir Aula-23-bonus](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-23-bonus) |
| Aula-26 | AULA 26 - ORGANIZAÇÃO E PLANEJAMENTO EM AMBIENTES PROFISSIONAIS | [Abrir Aula-26](./sst/core/index.html?cod=aula-26) | [Abrir Aula-26](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-26) |
| Aula-27 | AULA 27 - TRABALHO EM EQUIPE E LIDERANÇA NA INDÚSTRIA | [Abrir Aula-27](./sst/core/index.html?cod=aula-27) | [Abrir Aula-27](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-27) |
| Aula-28 | AULA 28 - FERRAMENTAS DA QUALIDADE: ESTRATÉGIAS PARA A MELHORIA CONTÍNUA | [Abrir Aula-28](./sst/core/index.html?cod=aula-28) | [Abrir Aula-28](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-28) |
| Aula-29 | AULA 29 - PESQUISA, INOVAÇÃO E EMPREENDEDORISMO NA TI | [Abrir Aula-29](./sst/core/index.html?cod=aula-29) | [Abrir Aula-29](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-29) |
| Aula-30 | AULA 30 - FINANÇAS, APRESENTAÇÕES E PLANEJAMENTO DE CARREIRA | [Abrir Aula-30](./sst/core/index.html?cod=aula-30) | [Abrir Aula-30](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-30) |
| Aula-31 | AULA 31 - CONCEITOS BÁSICOS DA COMPUTAÇÃO E PAPEL DA TI | [Abrir Aula-31](./sst/core/index.html?cod=aula-31) | [Abrir Aula-31](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-31) |
| Aula-32 | AULA 32 - UNIDADES DE MEDIDA DE DADOS E SISTEMAS DE NUMERAÇÃO | [Abrir Aula-32](./sst/core/index.html?cod=aula-32) | [Abrir Aula-32](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-32) |
| Aula-33 | AULA 33 - INFRAESTRUTURA DE TI: COMPONENTES E ARQUITETURAS | [Abrir Aula-33](./sst/core/index.html?cod=aula-33) | [Abrir Aula-33](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-33) |
| Aula-34 | AULA 34 - VIRTUALIZAÇÃO E AMBIENTES DE DESENVOLVIMENTO | [Abrir Aula-34](./sst/core/index.html?cod=aula-34) | [Abrir Aula-34](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-34) |
| Aula-35 | AULA 35 - GERENCIAMENTO DE ARQUIVOS, PERMISSÕES E SISTEMAS DE ARQUIVOS | [Abrir Aula-35](./sst/core/index.html?cod=aula-35) | [Abrir Aula-35](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-35) |
| Aula-36 | AULA 36 - INSTALAÇÃO DE SISTEMAS OPERACIONAIS | [Abrir Aula-36](./sst/core/index.html?cod=aula-36) | [Abrir Aula-36](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-36) |
| Aula-37 | AULA 37 - INSTALAÇÃO E CONFIGURAÇÃO DO SERVIDOR DHCP | [Abrir Aula-37](./sst/core/index.html?cod=aula-37) | [Abrir Aula-37](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-37) |
| Aula-38 | AULA 38 - SCRIPT PARA NOVA MÁQUINA DO GRUPO DE TRABALHO | [Abrir Aula-38](./sst/core/index.html?cod=aula-38) | [Abrir Aula-38](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-38) |
| Aula-39 | AULA 39 - DOMÍNIOS E ACTIVE DIRECTORY | [Abrir Aula-39](./sst/core/index.html?cod=aula-39) | [Abrir Aula-39](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-39) |
| Aula-40 | AULA 40 - INFRAESTRUTURA WINDOWS SERVER: DOMÍNIO, DHCP E ACESSO REMOTO | [Abrir Aula-40](./sst/core/index.html?cod=aula-40) | [Abrir Aula-40](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-40) |
| Aula-42 | AULA 42 - RESTRIÇÕES DE LOGON, COMPARTILHAMENTOS E POLÍTICAS DE GRUPO | [Abrir Aula-42](./sst/core/index.html?cod=aula-42) | [Abrir Aula-42](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-42) |
| Aula-43 | AULA 43 - HABILITANDO, DESABILITANDO E EXCLUINDO GPOs | [Abrir Aula-43](./sst/core/index.html?cod=aula-43) | [Abrir Aula-43](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-43) |
| Aula-41 | AULA 41 - ADMINISTRAÇÃO DE DOMÍNIO E USUÁRIOS NO ACTIVE DIRECTORY | [Abrir Aula-41](./sst/core/index.html?cod=aula-41) | [Abrir Aula-41](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-41) |
| Aula-44 | AULA 44 - CMD MASTERY: DOMINANDO A LINHA DE COMANDO DO WINDOWS | [Abrir Aula-44](./sst/core/index.html?cod=aula-44) | [Abrir Aula-44](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-44) |
| Aula-45 | AULA 45 - UBUNTU NA PRÁTICA: DO GNOME AOS CONTAINERS | [Abrir Aula-45](./sst/core/index.html?cod=aula-45) | [Abrir Aula-45](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-45) |
| Aula-46 | AULA 46 - FERRAMENTAS DE ESCRITÓRIO: WORD BÁSICO | [Abrir Aula-46](./sst/core/index.html?cod=aula-46) | [Abrir Aula-46](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-46) |
| Aula-47 | AULA 47 - WORD INTERMEDIÁRIO E ACADÊMICO | [Abrir Aula-47](./sst/core/index.html?cod=aula-47) | [Abrir Aula-47](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-47) |
| Aula-48 | AULA 48 - CONCLUSÃO DO WORD | [Abrir Aula-48](./sst/core/index.html?cod=aula-48) | [Abrir Aula-48](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-48) |
| Aula-49 | AULA 49 - EXCEL BÁSICO E FINANCEIRO | [Abrir Aula-49](./sst/core/index.html?cod=aula-49) | [Abrir Aula-49](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-49) |
| Aula-50 | AULA 50 - EXCEL: ESTATÍSTICAS E LÓGICA | [Abrir Aula-50](./sst/core/index.html?cod=aula-50) | [Abrir Aula-50](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-50) |
| Aula-53 | AULA 53 - EXCEL: FIXAÇÃO E ANÁLISE DE DADOS | [Abrir Aula-53](./sst/core/index.html?cod=aula-53) | [Abrir Aula-53](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-53) |
| Aula-52 | AULA 52 - EXCEL INTERMEDIÁRIO: FUNÇÕES DE BUSCA E LÓGICA | [Abrir Aula-52](./sst/core/index.html?cod=aula-52) | [Abrir Aula-52](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-52) |
| Aula-54 | AULA 54 - DOMÍNIO DA FUNÇÃO SE E FERRAMENTAS DE ANÁLISE | [Abrir Aula-54](./sst/core/index.html?cod=aula-54) | [Abrir Aula-54](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-54) |
| Aula-56 | AULA 56 - EXCEL AVANÇADO: DATA, HORA, FORMULÁRIOS E PROTEÇÃO | [Abrir Aula-56](./sst/core/index.html?cod=aula-56) | [Abrir Aula-56](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-56) |
| Aula-02-git | AULA 02 - GESTÃO DE ALTERAÇÕES E HISTÓRICO DE VERSÕES COM GIT | [Abrir Aula-02-git](./sst/core/index.html?cod=aula-02-git) | [Abrir Aula-02-git](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-02-git) |
| Aula-Excel | MASTERCLASS EXCEL: DO BÁSICO AO AVANÇADO E FINANCEIRO | [Abrir Aula-Excel](./sst/core/index.html?cod=aula-excel-masterclass) | [Abrir Aula-Excel](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-excel-masterclass) |
| Aula-58 | AULA 58 - DO PAPEL E CANETA AO POWERPOINT | [Abrir Aula-58](./sst/core/index.html?cod=aula-58) | [Abrir Aula-58](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-58) |
| Aula-60 | AULA 60 - TÉCNICAS DE APRESENTAÇÃO: COMO CONQUISTAR SEU PÚBLICO | [Abrir Aula-60](./sst/core/index.html?cod=aula-60) | [Abrir Aula-60](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-60) |
| Aula-59 | AULA 59 - ENGENHARIA DE PROMPTS PARA APRESENTAÇÕES | [Abrir Aula-59](./sst/core/index.html?cod=aula-59) | [Abrir Aula-59](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-59) |
| Aula-61 | AULA 61 - POR QUE APRENDER LÓGICA DE PROGRAMAÇÃO COM PYTHON EM 2026? | [Abrir Aula-61](./sst/core/index.html?cod=aula-61) | [Abrir Aula-61](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-61) |
| Aula-62 | AULA 62 - PYTHON: TIPOS PRIMITIVOS, VARIÁVEIS E LEITURA DE ERROS | [Abrir Aula-62](./sst/core/index.html?cod=aula-62) | [Abrir Aula-62](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-62) |
| Aula-64 | AULA 64 - OPERADORES ARITMÉTICOS EM PYTHON | [Abrir Aula-64](./sst/core/index.html?cod=aula-64) | [Abrir Aula-64](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-64) |
| Aula-65 | AULA 65 - MÓDULOS EXTERNOS E MANIPULAÇÃO DE TEXTO | [Abrir Aula-65](./sst/core/index.html?cod=aula-65) | [Abrir Aula-65](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-65) |
| Aula-66 | AULA 66 - ESTRUTURAS CONDICIONAIS EM PYTHON | [Abrir Aula-66](./sst/core/index.html?cod=aula-66) | [Abrir Aula-66](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-66) |
| Aula-67 | AULA 67 - CONDIÇÕES ANINHADAS | [Abrir Aula-67](./sst/core/index.html?cod=aula-67) | [Abrir Aula-67](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-67) |
| Aula-76 | AULA 76 - O UNIVERSO DO POWER BI | [Abrir Aula-76](./sst/core/index.html?cod=aula-76) | [Abrir Aula-76](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-76) |
| Aula-78 | AULA 78 - POWER BI: COLUNAS AVANÇADAS E FECHAMENTO DE FORMATAÇÃO | [Abrir Aula-78](./sst/core/index.html?cod=aula-78) | [Abrir Aula-78](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-78) |
| Aula-79 | AULA 79 - COMBINAÇÃO DE DADOS E MÚLTIPLAS FONTES | [Abrir Aula-79](./sst/core/index.html?cod=aula-79) | [Abrir Aula-79](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-79) |
| Aula-80 | AULA 80 - FUNDAMENTOS DE POWER BI E ETL | [Abrir Aula-80](./sst/core/index.html?cod=aula-80) | [Abrir Aula-80](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-80) |
| Aula-81 | AULA 81 - MODELAGEM DE DADOS E TABELA CALENDÁRIO NO POWER BI | [Abrir Aula-81](./sst/core/index.html?cod=aula-81) | [Abrir Aula-81](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-81) |
| Aula-93 | AULA 93 - FUNDAMENTOS DA INTELIGÊNCIA ARTIFICIAL | [Abrir Aula-93](./sst/core/index.html?cod=aula-93) | [Abrir Aula-93](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-93) |
| Aula-94 | AULA 94 - RACIOCÍNIO LÓGICO E REPRESENTAÇÃO DO CONHECIMENTO | [Abrir Aula-94](./sst/core/index.html?cod=aula-94) | [Abrir Aula-94](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-94) |
| Aula-95 | AULA 95 - FUNDAMENTOS DE MACHINE LEARNING | [Abrir Aula-95](./sst/core/index.html?cod=aula-95) | [Abrir Aula-95](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-95) |
| Aula-96 | AULA 96 - REDES NEURAIS E DEEP LEARNING | [Abrir Aula-96](./sst/core/index.html?cod=aula-96) | [Abrir Aula-96](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-96) |
| Aula-99 | AULA 99 - FUNDAMENTOS DE TRANSFORMAÇÃO DIGITAL | [Abrir Aula-99](./sst/core/index.html?cod=aula-99) | [Abrir Aula-99](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-99) |
| Aula-101 | AULA 101 - IDENTIFICANDO GARGALOS E OTIMIZANDO FLUXOS DE PROCESSO | [Abrir Aula-101](./sst/core/index.html?cod=aula-101) | [Abrir Aula-101](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-101) |
| Aula-102 | AULA 102 - SELEÇÃO DE FERRAMENTAS DE AUTOMAÇÃO: RPA E BPM NA PRÁTICA | [Abrir Aula-102](./sst/core/index.html?cod=aula-102) | [Abrir Aula-102](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-102) |
| Aula-104 | AULA 104 - PLANEJAR E COORDENAR EQUIPES MULTIDISCIPLINARES | [Abrir Aula-104](./sst/core/index.html?cod=aula-104) | [Abrir Aula-104](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-104) |
| Aula-105 | AULA 105 - GOVERNANÇA, COMPLIANCE E LGPD NA DIGITALIZAÇÃO DE PROCESSOS | [Abrir Aula-105](./sst/core/index.html?cod=aula-105) | [Abrir Aula-105](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-105) |
| Aula-106 | AULA 106 - DIGITALIZAÇÃO DE PROCESSOS: GESTÃO DE PESSOAS E MUDANÇA CULTURAL | [Abrir Aula-106](./sst/core/index.html?cod=aula-106) | [Abrir Aula-106](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-106) |
| Aula-107 | AULA 107 - MONITORAMENTO, INDICADORES (KPIS) E MELHORIA CONTÍNUA EM PROCESSOS DIGITAIS | [Abrir Aula-107](./sst/core/index.html?cod=aula-107) | [Abrir Aula-107](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-107) |
| Aula-108 | AULA 108 - MELHORIA CONTÍNUA E RELATÓRIO TÉCNICO FINAL | [Abrir Aula-108](./sst/core/index.html?cod=aula-108) | [Abrir Aula-108](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-108) |
| Aula-Mundo-SENAI-2026 | MUNDO SENAI 2026 - CAMINHOS PARA A CARREIRA NA INDÚSTRIA | [Abrir Aula-Mundo-SENAI-2026](./sst/core/index.html?cod=aula-mundo-senai-2026) | [Abrir Aula-Mundo-SENAI-2026](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-mundo-senai-2026) |

## Como Executar Localmente

O projeto usa `fetch` para carregar conteúdo e integração com serviços web, então ele deve rodar em um servidor HTTP local. Não use `file://`.

### Opção 1: Live Server no VS Code

1. Abra a pasta do projeto no VS Code.
2. Execute [sst/index.html](./sst/index.html) com Live Server.
3. Escolha a aula desejada pelo launcher.

### Opção 2: Python

```bash
python -m http.server 5500
```

Depois acesse:

- `http://localhost:5500/sst/`
- `http://localhost:5500/sst/core/index.html?cod=aula-11`
- `http://localhost:5500/sst/core/index.html?cod=aula-14`

## Autenticação, Firebase e Ranking

O login com Google é obrigatório para iniciar a jornada. O app restaura a sessão do usuário, identifica o jogador a partir da conta autenticada e usa o Firebase Realtime Database para salvar e ler o ranking.

### O que o ranking faz

- Salva `name`, `score`, `correct`, `total`, `accuracy`, `gameTime`, `timestamp`, `date` e `lesson`.
- Filtra automaticamente o leaderboard pela aula atual.
- Deduplica tentativas do mesmo jogador e mantém o melhor resultado.
- Ordena por quantidade de acertos, pontuação e menor tempo.

### Documentação complementar

- [sst/FIREBASE-SETUP.md](./sst/FIREBASE-SETUP.md)
- [sst/LESSON_FILTER_SETUP.md](./sst/LESSON_FILTER_SETUP.md)

## Modelo de Dados das Aulas

O padrão atual do projeto é manter todas as aulas em um único arquivo: [sst/lessons/course-data.json](./sst/lessons/course-data.json).

### Estrutura resumida

```json
{
  "version": 1,
  "defaultLesson": "aula-11",
  "lessons": [
    {
      "slug": "aula-14",
      "lesson_info": {
        "id": "Aula-14",
        "title": "AULA 14 - ...",
        "topics": [],
        "sokoban": ["D", "O", "S", "E"]
      },
      "questions": []
    }
  ]
}
```

### Campos principais

- `slug`: identificador usado na URL.
- `lesson_info.id`: identificador usado também no filtro do ranking.
- `lesson_info.title`: título exibido na experiência.
- `lesson_info.topics`: até 4 tópicos com identidade visual própria.
- `lesson_info.sokoban`: 4 letras da palavra-chave da aula.
- `questions`: conjunto de questões do quiz.

## Como Gerar um Novo Quiz por Aula

O projeto oferece dois caminhos complementares: geração manual com prompt e geração assistida pelo importador.

### Opção 1: usar o prompt base manualmente

Arquivo de referência: [sst/PROMPT_PARA_GERAR_QUIZ_POR_AULA.txt](./sst/PROMPT_PARA_GERAR_QUIZ_POR_AULA.txt)

Esse arquivo contém a instrução-base para pedir a uma IA que transforme o conteúdo de uma aula em um novo objeto JSON compatível com o motor do quiz.

#### O que o prompt exige

- Criação de até 4 tópicos com `id`, `name`, `desc`, `color` e `img_url`.
- Definição de `lesson_info.sokoban` com 4 letras.
- Geração de 50 perguntas.
- Suporte obrigatório aos tipos `multiple`, `boolean`, `combo`, `multi` e `drag`.
- Uso de `[NAME]` nos enunciados quando aplicável.
- Uso de `tip` pedagógico em cada pergunta.
- Uso de `trans` na última questão de cada tópico para indicar a transição.

#### Fluxo manual recomendado

1. Abra o arquivo [sst/PROMPT_PARA_GERAR_QUIZ_POR_AULA.txt](./sst/PROMPT_PARA_GERAR_QUIZ_POR_AULA.txt).
2. Cole o prompt em sua IA de preferência.
3. Anexe ou forneça o conteúdo da aula em PDF ou texto.
4. Solicite que a IA responda apenas com JSON.
5. Revise a saída e valide no importador antes de inserir no curso.

### Opção 2: usar o importador com PDF + IA

Ferramenta: [sst/tools/lesson-importer.html](./sst/tools/lesson-importer.html)

O importador implementa um fluxo mais seguro para gerar e inserir novas aulas no curso.

#### O que o importador faz

- Carrega o `course-data.json` atual do projeto.
- Permite colar manualmente o JSON de uma nova aula.
- Valida a estrutura da aula e do curso.
- Detecta e tenta corrigir problemas simples de encoding e estrutura.
- Extrai texto de PDF com PDF.js.
- Monta automaticamente um prompt de geração para IA.
- Suporta provedores `gemini` e `openai-compatible`.
- Mescla a nova aula ao JSON central.
- Permite baixar o JSON atualizado ou salvar diretamente no arquivo local quando o navegador suportar File System Access API.

#### Configuração da geração com IA

Na seção `Gerar Aula Por PDF + IA`, informe:

1. `Arquivo PDF da aula`: material base sem perguntas.
2. `Número da aula`: usado para preencher `lesson_info.id` e o prefixo do título.
3. `Limite de caracteres do PDF no prompt`: controla custo e volume enviado ao modelo.
4. `Provedor`: `gemini` ou `openai-compatible`.
5. `Endpoint da API`: URL do serviço escolhido.
6. `Modelo`: ex.: `gemini-2.0-flash` ou `gpt-4o-mini`.
7. `Chave da API`: informada apenas em tempo de uso.

#### Presets disponíveis no importador

- `Preset Gemini`: prepara endpoint e modelo da API do Gemini.
- `Preset GitHub Models`: configura endpoint OpenAI compatível em `https://models.inference.ai.azure.com/chat/completions`.

#### Fluxo recomendado no importador

1. Abra [sst/tools/lesson-importer.html](./sst/tools/lesson-importer.html).
2. Clique em `Carregar course-data do projeto`.
3. Envie o PDF da aula.
4. Clique em `Extrair texto do PDF`.
5. Configure provedor, endpoint, modelo e chave.
6. Clique em `Gerar JSON da aula com IA`.
7. Revise o JSON gerado.
8. Valide a nova aula.
9. Clique em `Inserir no course-data`.
10. Baixe o arquivo atualizado ou salve diretamente no JSON local.

## Regras de Validação Importantes

O importador já incorpora regras práticas do projeto. As principais são:

- `lesson_info.id`, `lesson_info.title` e `topics` são obrigatórios.
- Cada tópico deve ter `id`, `name`, `desc`, `color` e `img_url`.
- `lesson_info.sokoban` deve conter exatamente 4 letras.
- Os tipos suportados são apenas `multiple`, `boolean`, `combo`, `multi` e `drag`.
- No modo estrito, a aula precisa ter exatamente 50 perguntas.
- No modo estrito, os tipos devem seguir a sequência fixa: `multiple`, `boolean`, `drag`, `combo`, `multi`.
- Em `drag`, o padrão estrito exige 4 `items` e 4 `zones`.
- Slugs e `lesson_info.id` duplicados são bloqueados na mesclagem.

## Parâmetros de URL

Parâmetro recomendado:

- `?cod=aula-14`

Compatibilidades mantidas:

- `?aula=aula-14`
- `?lesson=aula-14`

Exemplo:

- `sst/core/index.html?cod=aula-17`

## Documentação Complementar

- [QUICK-START.md](./QUICK-START.md)
- [sst/FIREBASE-SETUP.md](./sst/FIREBASE-SETUP.md)
- [sst/LESSON_FILTER_SETUP.md](./sst/LESSON_FILTER_SETUP.md)
- [sst/lessons/course-data.json](./sst/lessons/course-data.json)
- [sst/tools/lesson-importer.html](./sst/tools/lesson-importer.html)
- [sst/PROMPT_PARA_GERAR_QUIZ_POR_AULA.txt](./sst/PROMPT_PARA_GERAR_QUIZ_POR_AULA.txt)

## Créditos

Conteúdo didático e condução pedagógica: Professor Raphael Barreto, Firjan SENAI.

## Licença

Consulte [LICENSE](./LICENSE).