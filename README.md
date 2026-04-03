# Quiz SST

Plataforma de quiz gamificado para treinamento em Seguranca no Trabalho em TI, com autenticacao Google, ranking em tempo real, trilha sonora dinamica e mini-games de bonus integrados ao fluxo pedagogico.

![Status](https://img.shields.io/badge/status-em%20producao-2e7d32)
![Arquitetura](https://img.shields.io/badge/arquitetura-MVC-1565c0)
![Aulas](https://img.shields.io/badge/aulas-11%20a%2015-6a1b9a)
![Rota](https://img.shields.io/badge/url-cod%3Daula--xx-00897b)

## Acesso Rapido

- Launcher local: [sst/index.html](./sst/index.html)
- App principal local: [sst/core/index.html](./sst/core/index.html)
- Importador de aulas: [sst/tools/lesson-importer.html](./sst/tools/lesson-importer.html)
- Producao (GitHub Pages): https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-13

## Links por Aula

- Aula 11: [sst/core/index.html?cod=aula-11](./sst/core/index.html?cod=aula-11)
- Aula 12: [sst/core/index.html?cod=aula-12](./sst/core/index.html?cod=aula-12)
- Aula 13: [sst/core/index.html?cod=aula-13](./sst/core/index.html?cod=aula-13)
- Aula 14: [sst/core/index.html?cod=aula-14](./sst/core/index.html?cod=aula-14)
- Aula 15: [sst/core/index.html?cod=aula-15](./sst/core/index.html?cod=aula-15)
- Aula 15: [sst/core/index.html?cod=aula-16](./sst/core/index.html?cod=aula-16)

## Novas Funcionalidades e Melhorias

- Autenticacao Google obrigatoria para iniciar a jornada.
- Ranking Top 15 com sincronizacao em tempo real por aula.
- Correcao do fluxo da roleta para manter o tema sorteado ao retornar ao quiz.
- Gestao de audio padronizada para mini-games: pausa da trilha base e retomada segura.
- Botao GIRAR ROLETA e PARAR AGORA com estilo visual modernizado e responsivo.
- Certificado de conclusao com impressao direta.
- Painel retratil lateral com moedas, tempo total, ranking e controle de trilha.
- Modo bonus com caca-niquel para acelerar ganho de moedas.

## Tecnologias (Logos + Cores)

### Front-end

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES%20Modules-F7DF1E?logo=javascript&logoColor=111)

### Arquitetura e Dados

![MVC](https://img.shields.io/badge/Arquitetura-MVC-1e88e5)
![JSON](https://img.shields.io/badge/Conteudo-course--data.json-43a047)
![URL%20Params](https://img.shields.io/badge/URL-cod%20%7C%20aula%20%7C%20lesson-00897b)

### Firebase e Servicos

![Firebase](https://img.shields.io/badge/Firebase-FFCA28?logo=firebase&logoColor=222)
![Realtime%20Database](https://img.shields.io/badge/Realtime-Database-f4511e)
![Google%20Auth](https://img.shields.io/badge/Auth-Google%20Sign--In-1a73e8?logo=google&logoColor=white)

### APIs Web e Ferramentas

![Fetch](https://img.shields.io/badge/API-Fetch-1976d2)
![Drag%20Drop](https://img.shields.io/badge/API-Drag%20and%20Drop-00acc1)
![Web%20Audio](https://img.shields.io/badge/API-Web%20Audio-8e24aa)
![PDF.js](https://img.shields.io/badge/PDF.js-ff0000?logo=mozilla&logoColor=white)
![GitHub%20Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-222?logo=githubpages&logoColor=white)

## Paleta Visual Base

![Neon Border](https://img.shields.io/badge/Neon%20Border-00E5FF-00E5FF)
![Primary](https://img.shields.io/badge/Primary-00D4FF-00D4FF)
![Gold](https://img.shields.io/badge/Gold-FFD700-FFD700)
![Background](https://img.shields.io/badge/Background-050A10-050A10)
![Panel](https://img.shields.io/badge/Panel-0A141E-0A141E)

## Principais Recursos

- Fluxo guiado por roleta com temas por topico.
- Tipos de questao: multiple, boolean, drag, combo e multi.
- HUD em tempo real com moedas, cronometro e tempo total.
- Feedback visual e sonoro por acerto/erro.
- Ranking por aula com desempate por menor tempo.
- Certificado com dados da aula e desempenho do aluno.
- Compatibilidade com estrutura unica de conteudo no course-data.json.

## Mini-games Integrados

| Mini-game | ID | Objetivo |
|---|---|---|
| Pac-Man | pacman | Coletar itens no tempo para bonus |
| Enduro | enduro | Sobreviver a estagios da corrida |
| T-Rex | trex | Desviar de obstaculos em corrida infinita |
| Sokoban | sokoban | Empurrar caixas para compor palavra-chave |
| Mario | mario | Runner/plataforma para bonus |
| Space | space | Shooter espacial com iframe dedicado |
| Snake | snake | Crescer sem colidir |
| Memory | memory | Encontrar pares com limite de vidas |
| Lorde Hero | lordehero | Bonus especial com integracao dedicada |

## Parametros de URL

Parametro recomendado:

- `?cod=aula-13`

Compatibilidade mantida:

- `?aula=aula-13`
- `?lesson=aula-13`

Exemplo em producao:

- https://raphaelbarretopro.github.io/quiz/sst/core/index.html?cod=aula-14

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
        style.css
      js/
        controller.js
        model.js
        view.js
        ranking-manager.js
        firebase-config.js
        game/
          game-registry.js
          game-scheduler.js
          lesson-game-config.js
          pacman-game.js
          enduro-game.js
          trex-game.js
          sokoban-game.js
          mario-game.js
          space-game.js
          snake-game.js
          memory-game.js
          lordehero-game.js
    lessons/
      course-data.json
    tools/
      lesson-importer.html
    FIREBASE-SETUP.md
    LESSON_FILTER_SETUP.md
```

## Como Executar Localmente

Como o projeto usa fetch para carregar dados e ranking, execute com servidor HTTP.

### Opcao 1 - Live Server (VS Code)

1. Abra a pasta do projeto no VS Code.
2. Execute [sst/index.html](./sst/index.html) com Live Server.

### Opcao 2 - Python

```bash
python -m http.server 5500
```

Depois abra:

- http://localhost:5500/sst/
- http://localhost:5500/sst/core/index.html?cod=aula-11
- http://localhost:5500/sst/core/index.html?cod=aula-12
- http://localhost:5500/sst/core/index.html?cod=aula-13
- http://localhost:5500/sst/core/index.html?cod=aula-14
- http://localhost:5500/sst/core/index.html?cod=aula-15

## Conteudo e Expansao de Aulas

Arquivo central de conteudo:

- [sst/lessons/course-data.json](./sst/lessons/course-data.json)

Fluxo recomendado para novas aulas:

1. Abrir [sst/tools/lesson-importer.html](./sst/tools/lesson-importer.html).
2. Extrair texto (opcional) via PDF.js.
3. Gerar/ajustar JSON da aula.
4. Validar estrutura e consistencia.
5. Inserir a nova lesson no course-data.json.

## Firebase, Login e Ranking

- Login Google e sessao restaurada automaticamente.
- Ranking salvo no Realtime Database com filtro por `lesson`.
- Fallback de leitura por REST quando necessario.

Guias:

- [sst/FIREBASE-SETUP.md](./sst/FIREBASE-SETUP.md)
- [sst/LESSON_FILTER_SETUP.md](./sst/LESSON_FILTER_SETUP.md)

## Creditos

Conteudo didatico e conducao pedagogica: Professor Raphael Barreto - Firjan SENAI.

## Licenca

Consulte [LICENSE](./LICENSE).