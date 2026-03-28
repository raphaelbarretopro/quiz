# Saga do Futuro

Quiz educativo gamificado para Seguranca no Trabalho em TI, com narrativa por eras, mini-jogo de transicao e ranking global em tempo real.

Demo publica:
https://raphaelbarretopro.github.io/quiz/sst/aula-11/

## Visao geral

O projeto atual em producao esta em `sst/aula-11`. O fluxo principal e:

1. Jogador informa nome e inicia jornada.
2. Sistema carrega dados da aula via `data.json`.
3. Em mudancas de tema, abre roleta + modal + Sokoban.
4. Perguntas sao exibidas com feedback imediato.
5. A cada 3 acertos seguidos, abre rodada de bonus (caca-niquel).
6. Ao final, salva score no Firebase e mostra ranking.

## Funcionalidades implementadas

- Arquitetura MVC com modulos ES.
- 50 questoes no banco atual (`sst/aula-11/data.json`).
- 5 tipos de questao: `multiple`, `boolean`, `combo`, `multi`, `drag`.
- 4 eras/temas didaticos com troca dinamica de cor e background.
- Transicoes de era com roleta e Sokoban.
- Pontuacao em tempo real com animacoes e audio.
- Bonus de caca-niquel por sequencia de acertos.
- Ranking global com Firebase Realtime Database.
- Painel lateral com Top 15 em tempo real.
- Timer total de sessao e timer especifico para desafio Sokoban.
- Layout responsivo para desktop e mobile.

## Regras de jogo

- Acerto: +100 pontos.
- Erro: sem penalidade de pontos.
- Desempate no ranking: menor tempo total da sessao.
- Bonus: 3 acertos consecutivos liberam uma rodada de caca-niquel.
- Cada rodada de bonus permite ate 3 giros.

Tempo maximo por desafio Sokoban (por era):

- `ACID`: 60s
- `AGEN`: 50s
- `PROT`: 40s
- `NORM`: 30s

## Estrutura do projeto

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
			audio/
				Sonic.mp3
				show.mp3
				valendo.mp3
			css/
				style.css
			img/
				FirjanSENAI-01.png
			js/
				controller.js
				model.js
				view.js
				ranking-manager.js
				firebase-config.js
		aula-12/
			(vazio no momento)
```

## Arquitetura

| Camada | Arquivo | Responsabilidade |
|---|---|---|
| Model | `sst/aula-11/js/model.js` | Estado da sessao, carga de dados, regras de pontuacao, estado do Sokoban |
| View | `sst/aula-11/js/view.js` | Renderizacao de UI, interacoes, efeitos visuais/sonoros, modais |
| Controller | `sst/aula-11/js/controller.js` | Orquestracao do fluxo, timers, progresso, bonus e fim de jogo |
| Servico | `sst/aula-11/js/ranking-manager.js` | Persistencia e leitura de ranking no Firebase |

## Como executar localmente

Como o app usa `fetch` para carregar `data.json`, execute via servidor HTTP local.

### Opcao 1: Live Server (VS Code)

1. Abra a pasta do repositorio no VS Code.
2. Abra `sst/aula-11/index.html`.
3. Execute com Live Server.

### Opcao 2: Python

```bash
cd sst/aula-11
python -m http.server 5500
```

Abra no navegador:

```text
http://localhost:5500
```

## Ranking Firebase

O ranking global usa Firebase Realtime Database e salva:

- `name`
- `score`
- `correct`
- `total`
- `accuracy`
- `gameTime`
- `timestamp`
- `date`

Passo a passo completo:
`sst/aula-11/FIREBASE-SETUP.md`

Arquivo de configuracao:
`sst/aula-11/js/firebase-config.js`

## Banco de questoes (`data.json`)

O arquivo `sst/aula-11/data.json` contem:

- `lesson_info` com titulo e topicos (id, nome, descricao, cor, imagem, letras do Sokoban).
- `questions` com os objetos de cada questao.

Campos usados por questao:

- `type`
- `topics`
- `questions`
- `answers` ou `options`
- `correct`
- `tip`
- `trans` (opcional; dispara roleta + Sokoban para o proximo tema)

Transicoes configuradas atualmente:

- `ACID -> AGEN`
- `AGEN -> PROT`
- `PROT -> NORM`

## Tipos de questao suportados

- `multiple`: escolha unica por botoes.
- `boolean`: verdadeiro/falso (renderizado como escolha unica).
- `combo`: select (`<select>`) com validacao por botao.
- `multi`: multiplas respostas com checkbox.
- `drag`: arrastar e soltar com zonas de destino.

## Customizacoes comuns

1. Alterar tema por era: editar `color` e `img_url` em `lesson_info.topics`.
2. Alterar pontuacao por acerto: editar `pointsPerCorrect` em `sst/aula-11/js/model.js`.
3. Adicionar perguntas: incluir novos objetos no array `questions`.
4. Criar nova transicao entre eras: adicionar `trans` na questao desejada.

## Deploy

O projeto funciona em hospedagem estatica (exemplo: GitHub Pages), desde que a pagina inicial publicada seja:

- `sst/aula-11/index.html`

## Observacoes tecnicas

- O ranking depende do Firebase configurado corretamente.
- Sem Firebase, o quiz continua funcional, mas sem persistencia global de ranking.
- O arquivo `QUICK-START.md` existe como guia rapido, mas este README e a referencia completa.

## Roadmap sugerido

- Persistencia local de progresso (checkpoint da jornada).
- Painel administrativo para editar `data.json` sem editar codigo.
- Relatorios por turma e exportacao estendida.
- Cobertura de testes para regras de pontuacao e fluxo.
- Modo offline com fallback local de ranking.

## Licenca

Consulte o arquivo `LICENSE`.

## Creditos

Conteudo didatico e conducao pedagogica:
Professor Raphael Barreto - Firjan SENAI.

