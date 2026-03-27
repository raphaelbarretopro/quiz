<h1 align="center">Saga do Futuro</h1>

<p align="center">
	<strong>Quiz interativo e gamificado para apoio didático em Segurança no Trabalho em TI</strong>
</p>

<p align="center">
	<img src="https://img.shields.io/badge/Status-Ativo-2ea44f?style=for-the-badge" alt="status" />
	<img src="https://img.shields.io/badge/Arquitetura-MVC-0a66c2?style=for-the-badge" alt="mvc" />
	<img src="https://img.shields.io/badge/JavaScript-ES%20Modules-f7df1e?style=for-the-badge&logo=javascript&logoColor=111" alt="js" />
	<img src="https://img.shields.io/badge/Frontend-HTML%20%2B%20CSS-e34f26?style=for-the-badge&logo=html5&logoColor=fff" alt="frontend" />
</p>

<marquee behavior="alternate" scrollamount="8">
	Jornada ativa: Roleta de eras + Sokoban + Quiz multimodal + Feedback inteligente
</marquee>

---

## Sumário

- [Visão Geral](#visão-geral)
- [Destaques do Projeto](#destaques-do-projeto)
- [Fluxo da Experiência](#fluxo-da-experiência)
- [Arquitetura](#arquitetura)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Como Executar](#como-executar)
- [Configuração de Conteúdo](#configuração-de-conteúdo)
- [Tipos de Questão Suportados](#tipos-de-questão-suportados)
- [Customização Rápida](#customização-rápida)
- [Roadmap](#roadmap)
- [Licença](#licença)
- [Créditos](#créditos)

---

## Visão Geral

O Saga do Futuro é uma aplicação web educacional com narrativa gamificada. O jogador informa o nome, passa por transições temáticas com roleta e mini-jogo Sokoban, responde perguntas com diferentes formatos e recebe feedback imediato com relatório final de pontos de melhoria.

Projeto ideal para uso em sala de aula, oficinas, trilhas técnicas e treinamentos internos.

---

## Destaques do Projeto

- Troca dinâmica de tema (cores e imagem de fundo) por etapa.
- Roleta construída em tempo de execução com base nos tópicos do JSON.
- Mini-jogo Sokoban como gate de progressão entre eras.
- Motor de perguntas multimodal.
- Embaralhamento de alternativas para reduzir padrão de memorização.
- Registro de erros sem duplicidade com resumo final de revisão.

---

## Fluxo da Experiência

1. Jogador inicia a jornada.
2. Sistema carrega dados didáticos.
3. Em transições de tema: roleta -> modal -> Sokoban.
4. Perguntas são renderizadas conforme o tipo.
5. Feedback imediato e avanço.
6. Encerramento com relatório de erros e dicas.

---

## Arquitetura

Padrão MVC com separação clara de responsabilidades:

| Camada | Arquivo | Responsabilidade |
|---|---|---|
| Model | sst/js/model.js | Estado, regras do jogo, carregamento de dados, lógica Sokoban |
| View | sst/js/view.js | Renderização, eventos UI, efeitos visuais, feedback |
| Controller | sst/js/controller.js | Orquestração do fluxo entre Model e View |

---

## Estrutura de Pastas

```text
quiz/
	LICENSE
	README.md
	sst/
		data.json
		index.html
		css/
			style.css
		js/
			controller.js
			model.js
			view.js
```

---

## Como Executar

Como há leitura de arquivo JSON via fetch, rode com servidor HTTP local.

### Opção 1: Live Server (VS Code)

1. Abra a pasta do projeto.
2. Abra sst/index.html.
3. Execute com Live Server.

### Opção 2: Python

```bash
cd sst
python -m http.server 5500
```

Abra no navegador:

```text
http://localhost:5500
```

---

## Configuração de Conteúdo

Todo o conteúdo está centralizado em sst/data.json.

### lesson_info

- title: título da aula.
- topics: lista de eras com:
	- id
	- name
	- desc
	- color
	- img_url
	- sokoban (letras exibidas nas caixas)

### questions

Cada item define uma pergunta com:

- type
- topics
- questions
- answers ou options
- correct
- tip
- trans (opcional, para ativar transição de era)

---

## Tipos de Questão Suportados

- multiple: alternativa única por botão.
- boolean: verdadeiro/falso (usa fluxo de alternativa única).
- combo: seleção em caixa de combinação.
- multi: múltiplas respostas com checkbox.
- drag: arrastar e soltar com validação por zona.

---

## Customização Rápida

<details>
	<summary><strong>Alterar tema visual por era</strong></summary>

Edite color e img_url em sst/data.json dentro de lesson_info.topics.
</details>

<details>
	<summary><strong>Adicionar novas perguntas</strong></summary>

Inclua novos objetos no array questions em sst/data.json seguindo os formatos já existentes.
</details>

<details>
	<summary><strong>Criar nova transição entre módulos</strong></summary>

Adicione o campo trans em uma pergunta para disparar roleta + modal + Sokoban antes da próxima era.
</details>

---

## Roadmap

- Persistência de progresso em armazenamento local.
- Dashboard para autoria de questões sem edição manual de JSON.
- Relatórios de desempenho por turma.
- Internacionalização de conteúdo.
- Cobertura de testes para regras de pontuação e progressão.

---

## Licença

Este projeto está licenciado conforme o arquivo LICENSE.

---

## Créditos

- Conteúdo didático e condução pedagógica: Professor Raphael Barreto - Firjan SENAI.

