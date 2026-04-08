# Quiz SST

<p align="center">
  Plataforma web de quiz gamificado para trilhas educacionais, com autenticação Google, ranking em tempo real por aula, motor de perguntas em múltiplos formatos e mini-games bônus integrados ao fluxo de aprendizagem.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/status-em%20producao-1f8b4c?style=for-the-badge" alt="Status">
  <img src="https://img.shields.io/badge/arquitetura-MVC-1565c0?style=for-the-badge" alt="Arquitetura MVC">
  <img src="https://img.shields.io/badge/curso-json%20unificado-00897b?style=for-the-badge" alt="Curso em JSON unificado">
  <img src="https://img.shields.io/badge/ranking-Firebase%20Realtime-ff8f00?style=for-the-badge" alt="Ranking Firebase">
</p>

## Visão Geral

O Quiz SST é um aplicativo front-end em HTML, CSS e JavaScript criado para transformar conteúdos de aula em uma experiência interativa. Cada aula é carregada dinamicamente a partir de um único arquivo JSON, pode ser acessada por URL, exige login com Google para iniciar a jornada e publica o desempenho do jogador em um ranking filtrado automaticamente pela aula atual.

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

As aulas atuais estão centralizadas em [sst/lessons/course-data.json](./sst/lessons/course-data.json) e podem ser abertas tanto localmente quanto em produção.

| Aula | Tema | Link local |
|---|---|---|
| Aula 11 | Guardiões da Prevenção: Segurança no Trabalho em TI | [Abrir Aula 11](./sst/core/index.html?cod=aula-11) |
| Aula 12 | Guardiões da Prevenção: Saúde, Segurança e Meio Ambiente | [Abrir Aula 12](./sst/core/index.html?cod=aula-12) |
| Aula 13 | Guardiões do Futuro: Sustentabilidade e Qualidade Ambiental | [Abrir Aula 13](./sst/core/index.html?cod=aula-13) |
| Aula 14 | Guardiões da Saúde: Impactos de Substâncias no Trabalho | [Abrir Aula 14](./sst/core/index.html?cod=aula-14) |
| Aula 15 | Guardiões do Respeito: Direitos, Saúde e Autoconhecimento | [Abrir Aula 15](./sst/core/index.html?cod=aula-15) |
| Aula 16 | Raciocínio Lógico: Fundamentos, Princípios e Sequências | [Abrir Aula 16](./sst/core/index.html?cod=aula-16) |
| Aula 17 | Conjuntos e Frações Aplicadas à Computação | [Abrir Aula 17](./sst/core/index.html?cod=aula-17) |
| Aula 18 | Razões, Proporções, Porcentagens e Correlação | [Abrir Aula 18](./sst/core/index.html?cod=aula-18) |
| Aula 19 | Técnicas de Resolução de Problemas | [Abrir Aula 19](./sst/core/index.html?cod=aula-19) |
| Aula 17-1 | Lógica Matemática: Conjuntos e Frações Aplicadas | [Abrir Aula 17-1](./sst/core/index.html?cod=aula-17-1) |

### Exemplo de acesso em produção

- [Aula 13 em produção](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-13)
- [Aula 14 em produção](https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-14)

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