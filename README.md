<table>
	<tr>
		<td width="110" valign="middle">
			<img src="sst/aula-11/img/FirjanSENAI-01.png" alt="Logo Firjan SENAI" width="96" />
		</td>
		<td valign="middle">
			<h1>Saga do Futuro</h1>
			<p>Quiz educativo gamificado para Seguranca no Trabalho em TI, com narrativa por eras, desafios interativos e ranking em tempo real.</p>
		</td>
	</tr>
</table>

[![Status](https://img.shields.io/badge/Status-Em%20producao-1f883d?style=for-the-badge)](https://raphaelbarretopro.github.io/quiz/sst/aula-11/)
[![Frontend](https://img.shields.io/badge/Frontend-HTML5%20%7C%20CSS3%20%7C%20JavaScript-e34f26?style=for-the-badge&logo=html5&logoColor=white)](https://raphaelbarretopro.github.io/quiz/sst/aula-11/)
[![Arquitetura](https://img.shields.io/badge/Arquitetura-MVC-0a66c2?style=for-the-badge)](#)
[![Backend](https://img.shields.io/badge/Backend-Firebase%20Realtime%20Database-ffca28?style=for-the-badge&logo=firebase&logoColor=black)](#)

**Demo publica:** https://raphaelbarretopro.github.io/quiz/sst/aula-11/

---

## ![Bloco](https://img.shields.io/badge/Bloco%201-Tecnologias-0052cc?style=for-the-badge)

- HTML5
- CSS3
- JavaScript (ES Modules)
- Firebase Realtime Database
- GitHub Pages (deploy)

---

## ![Bloco](https://img.shields.io/badge/Bloco%202-Visao%20do%20Projeto-0f766e?style=for-the-badge)

O projeto em producao esta em `sst/aula-11` e segue o fluxo:

1. Jogador informa nome e inicia a jornada.
2. Sistema carrega os dados da aula via `data.json`.
3. Em transicoes de tema, abre roleta + modal + Sokoban.
4. Perguntas sao exibidas com feedback imediato.
5. A cada 3 acertos seguidos, e liberada rodada bonus (caca-niquel).
6. No encerramento, o score e salvo no Firebase e o ranking e atualizado.

---

## ![Bloco](https://img.shields.io/badge/Bloco%203-Funcionalidades-7c3aed?style=for-the-badge)

- Arquitetura MVC com modulos ES.
- 50 questoes no banco atual (`sst/aula-11/data.json`).
- 5 tipos de questao: `multiple`, `boolean`, `combo`, `multi`, `drag`.
- 4 eras didaticas com troca dinamica de cor e background.
- Transicoes com roleta e mini-jogo Sokoban.
- Pontuacao em tempo real com animacoes e audio.
- Bonus de caca-niquel por sequencia de acertos.
- Ranking global com Firebase Realtime Database.
- Painel lateral com Top 15 em tempo real.
- Timer total de sessao e timer especifico do Sokoban.
- Layout responsivo para desktop e mobile.

---

## ![Bloco](https://img.shields.io/badge/Bloco%204-Regras%20do%20Jogo-b45309?style=for-the-badge)

- Acerto: +100 pontos.
- Erro: sem penalidade.
- Desempate no ranking: menor tempo total de sessao.
- Bonus: 3 acertos consecutivos liberam 1 rodada de caca-niquel.
- Cada rodada bonus permite ate 3 giros.

Tempo maximo por desafio Sokoban:

- `ACID`: 60s
- `AGEN`: 50s
- `PROT`: 40s
- `NORM`: 30s

---

## ![Bloco](https://img.shields.io/badge/Bloco%205-Estrutura%20de%20Pastas-9333ea?style=for-the-badge)

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
```

---

## ![Bloco](https://img.shields.io/badge/Bloco%206-Arquitetura%20MVC-0891b2?style=for-the-badge)

| Camada | Arquivo | Responsabilidade |
|---|---|---|
| Model | `sst/aula-11/js/model.js` | Estado da sessao, carga de dados, regras de pontuacao e estado do Sokoban |
| View | `sst/aula-11/js/view.js` | Renderizacao da interface, interacoes, efeitos visuais/sonoros e modais |
| Controller | `sst/aula-11/js/controller.js` | Orquestracao do fluxo, timers, progresso, bonus e fim de jogo |
| Servico | `sst/aula-11/js/ranking-manager.js` | Persistencia e leitura do ranking no Firebase |

---

## ![Bloco](https://img.shields.io/badge/Bloco%207-Execucao%20Local-166534?style=for-the-badge)

Como o app usa `fetch` para carregar `data.json`, execute em servidor HTTP local.

### Opcao 1: Live Server (VS Code)

1. Abra o repositorio no VS Code.
2. Abra `sst/aula-11/index.html`.
3. Execute com Live Server.

### Opcao 2: Python

```bash
cd sst/aula-11
python -m http.server 5500
```

URL local:

```text
http://localhost:5500
```

---

## ![Bloco](https://img.shields.io/badge/Bloco%208-Ranking%20Firebase-f59e0b?style=for-the-badge)

Campos persistidos no ranking global:

- `name`
- `score`
- `correct`
- `total`
- `accuracy`
- `gameTime`
- `timestamp`
- `date`

Guia de configuracao:

- `sst/aula-11/FIREBASE-SETUP.md`
- `sst/aula-11/js/firebase-config.js`

---

## ![Bloco](https://img.shields.io/badge/Bloco%209-Banco%20de%20Questoes-334155?style=for-the-badge)

Arquivo principal: `sst/aula-11/data.json`

Estrutura:

- `lesson_info`: metadados da aula e temas (id, nome, descricao, cor, imagem, letras do Sokoban).
- `questions`: lista de perguntas.

Campos por questao:

- `type`
- `topics`
- `questions`
- `answers` ou `options`
- `correct`
- `tip`
- `trans` (opcional para transicoes de era)

Transicoes atuais:

- `ACID -> AGEN`
- `AGEN -> PROT`
- `PROT -> NORM`

---

## ![Bloco](https://img.shields.io/badge/Bloco%2010-Customizacao-9f1239?style=for-the-badge)

1. Alterar tema por era: editar `color` e `img_url` em `lesson_info.topics`.
2. Alterar pontuacao: editar `pointsPerCorrect` em `sst/aula-11/js/model.js`.
3. Adicionar perguntas: inserir novos objetos no array `questions`.
4. Criar nova transicao: adicionar `trans` na questao desejada.

---

## ![Bloco](https://img.shields.io/badge/Bloco%2011-Deploy-1d4ed8?style=for-the-badge)

Hospedagem estatica suportada (ex.: GitHub Pages), com entrada em:

- `sst/aula-11/index.html`

---

## ![Bloco](https://img.shields.io/badge/Bloco%2012-Observacoes%20Tecnicas-4b5563?style=for-the-badge)

- O ranking depende de configuracao valida do Firebase.
- Sem Firebase, o quiz continua funcional, mas sem persistencia global de ranking.
- `QUICK-START.md` pode ser usado como guia rapido.

---

## ![Bloco](https://img.shields.io/badge/Bloco%2013-Roadmap-f43f5e?style=for-the-badge)

- Persistencia local de progresso (checkpoint da jornada).
- Painel administrativo para editar `data.json` sem alterar codigo.
- Relatorios por turma e exportacao estendida.
- Cobertura de testes para regras de pontuacao e fluxo.
- Modo offline com fallback local de ranking.

---

## ![Bloco](https://img.shields.io/badge/Bloco%2014-Licenca-111827?style=for-the-badge)

Consulte o arquivo `LICENSE`.

---

## ![Bloco](https://img.shields.io/badge/Bloco%2015-Creditos-0369a1?style=for-the-badge)

Conteudo didatico e conducao pedagogica:  
Professor Raphael Barreto - Firjan SENAI.

