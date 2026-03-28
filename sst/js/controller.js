import Model from './model.js';
import View from './view.js';
import RankingManager from './ranking-manager.js';

// Controller: coordena o fluxo entre dados (Model) e interface (View).
class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.ranking = new RankingManager();
        this.isReady = false;
        this.currentTargetTopic = null;
        this.startTime = null;
        this.gameDurationMs = 60000;
        this.gameTimeoutId = null;
        this.gameTickId = null;
        this.totalTimeTickId = null;
        this.hasTimedOut = false;
        this.timerStarted = false;
        this.lastTimeoutSnapshot = null;

        // Registra os handlers da interface com o contexto da instância.
        this.view.bindStart(this.handleStart.bind(this));
        this.view.bindWheelStart(this.handleWheelStart.bind(this));
        this.view.bindWheelStop(this.handleWheelStop.bind(this));
        this.view.bindModalClose(this.handleModalClose.bind(this));
        this.view.bindSokobanMove(this.handleSokobanMove.bind(this));
        this.view.bindSokobanReset(this.handleSokobanReset.bind(this));
        this.view.bindNext(this.handleNext.bind(this));
        this.view.bindRankingModalClose(this.handleRankingModalClose.bind(this));
    }

    getSokobanDurationMsByTopic(topicId) {
        const byTopic = {
            ACID: 60000,
            AGEN: 50000,
            PROT: 40000,
            NORM: 30000
        };
        return byTopic[topicId] || 60000;
    }

    async init() {
        // Carrega dados iniciais e libera a UI apenas se a carga for bem-sucedida.
        const success = await this.model.loadData();
        if(success) {
            this.view.initUI(this.model.lessonInfo);

            // Mantém painel Top 15 da tela principal atualizado em tempo real.
            this.ranking.subscribeToTopScores(15, (scores) => {
                this.view.renderTop15Panel(scores);
            });
        }
    }

    handleStart(name) {
        // Inicia a sessão do jogador e passa para o primeiro passo da jornada.
        this.model.playerName = name;
        this.view.setScorePlayerName(name);
        // Tempo total da sessão (independente do timer do Sokoban).
        this.startTime = Date.now();
        this.hasTimedOut = false;
        this.timerStarted = false;
        this.clearGameTimeout();
        this.stopTotalTimer();
        this.view.updateTimerDisplay(this.gameDurationMs / 1000);
        this.view.updateTotalTimeDisplay(0);
        this.view.setTotalTimeVisibility(true);
        this.startTotalTimer();
        this.view.setTimerVisibility(false);
        this.view.els.startScreen.classList.add('hidden');
        this.renderStep();
    }

    getElapsedGameSeconds() {
        const startedAt = this.startTime || Date.now();
        return Math.floor((Date.now() - startedAt) / 1000);
    }

    startTotalTimer() {
        this.stopTotalTimer();
        this.view.updateTotalTimeDisplay(this.getElapsedGameSeconds());
        this.totalTimeTickId = setInterval(() => {
            this.view.updateTotalTimeDisplay(this.getElapsedGameSeconds());
        }, 250);
    }

    stopTotalTimer() {
        if (!this.totalTimeTickId) return;
        clearInterval(this.totalTimeTickId);
        this.totalTimeTickId = null;
    }

    startGameTimeout() {
        this.clearGameTimeout();
        this.hasTimedOut = false;
        const endsAt = Date.now() + this.gameDurationMs;
        const tick = () => {
            const remaining = Math.ceil((endsAt - Date.now()) / 1000);
            this.view.updateTimerDisplay(remaining);
        };
        tick();
        this.gameTickId = setInterval(tick, 250);

        this.gameTimeoutId = setTimeout(() => {
            if (this.hasTimedOut) return;
            this.hasTimedOut = true;
            this.clearGameTimeout();
            this.view.updateTimerDisplay(0);

            // Mantém um registro da tentativa interrompida por tempo.
            this.lastTimeoutSnapshot = {
                playerName: this.model.playerName,
                score: this.model.playerScore,
                correct: this.model.stats.correct,
                mistakes: this.model.stats.mistakes.length,
                step: this.model.curStep,
                timeoutAt: Date.now()
            };

            this.view.showAlert(
                '⏱️ Tempo Esgotado!',
                `Você atingiu o limite de ${Math.floor(this.gameDurationMs / 1000)} segundos nesta era. Clique em OK para reiniciar este desafio mantendo sua pontuação e progresso.`,
                this.restartAfterTimeout.bind(this)
            );
        }, this.gameDurationMs);
    }

    clearGameTimeout() {
        if (this.gameTimeoutId) {
            clearTimeout(this.gameTimeoutId);
            this.gameTimeoutId = null;
        }
        if (this.gameTickId) {
            clearInterval(this.gameTickId);
            this.gameTickId = null;
        }
    }

    restartAfterTimeout() {
        // Reinicia apenas o desafio atual, preservando score e estatísticas da sessão.
        this.clearGameTimeout();
        this.hasTimedOut = false;
        this.timerStarted = false;
        this.view.updateTimerDisplay(this.gameDurationMs / 1000);
        this.view.setTimerVisibility(false);

        // Fecha modais e mantém o fluxo na etapa atual.
        this.view.els.feedbackModal.classList.add('hidden');
        this.view.els.introModal.classList.add('hidden');
        this.view.els.rankingModal.classList.add('hidden');
        this.view.els.startScreen.classList.add('hidden');
        this.view.els.portalScreen.classList.add('hidden');
        this.view.els.quizScreen.classList.add('hidden');

        // Se o timeout ocorreu no Sokoban, reinicia somente o mini-jogo com novo timer.
        if (this.currentTargetTopic) {
            this.model.sokobanActive = true;
            this.view.showSokoban();
            this.handleSokobanReset();
            return;
        }

        // Fallback seguro: retorna para o fluxo normal sem perder progresso.
        this.renderStep();
    }

    renderStep() {
        const q = this.model.getCurrentQuestion();
        
        // Em transições de tema, força a etapa da roleta + Sokoban antes da pergunta.
        if (q.trans && !this.isReady) {
            this.currentTargetTopic = q.trans;
            this.gameDurationMs = this.getSokobanDurationMsByTopic(this.currentTargetTopic);
            this.view.setTimerVisibility(false);
            this.view.showPortal();
            return;
        }
        
        // Renderiza a pergunta da etapa atual com o tema correspondente.
        const topicData = this.model.getTopicData(q.topics);
        this.view.renderQuestion(
            q,
            topicData,
            this.model.playerName,
            this.handleAnswer.bind(this),
            this.model.curStep,
            this.model.questions.length
        );
        this.isReady = false;
    }

    handleWheelStart() {
        if (this.hasTimedOut) return;
        this.view.startSpin();
    }

    handleWheelStop() {
        if (this.hasTimedOut) return;
        // Converte o tópico-alvo para índice e anima a roleta até o setor correto.
        const topicIndex = this.model.lessonInfo.topics.findIndex(t => t.id === this.currentTargetTopic);
        const topicData = this.model.getTopicData(this.currentTargetTopic);
        
        this.view.stopSpin(topicIndex, this.model.lessonInfo.topics.length, topicData);
    }

    handleModalClose() {
        if (this.hasTimedOut) return;
        // Ao fechar o modal da era, inicia o mini-jogo de transição.
        this.view.showSokoban();
        this.model.sokobanActive = true;
        this.handleSokobanReset();
    }

    handleSokobanReset() {
        if (this.hasTimedOut) return;
        // Reiniciar o mini-jogo também reinicia o cronômetro da etapa Sokoban.
        if (this.model.sokobanActive) {
            this.view.setTimerVisibility(true);
            this.startGameTimeout();
            this.timerStarted = true;
        }
        // Reinicia estado e redesenha o tabuleiro Sokoban.
        this.model.resetSokoban(this.currentTargetTopic);
        this.view.drawSokoban(this.model.sLevel, this.model.sP, this.model.sB);
    }

    handleSokobanMove(dx, dy) {
        if (this.hasTimedOut) return;
        // Aplica movimento, atualiza o grid e verifica vitória da etapa.
        const hasWon = this.model.movePlayer(dx, dy);
        this.view.drawSokoban(this.model.sLevel, this.model.sP, this.model.sB);
        
        if (hasWon && this.model.sokobanActive) {
            this.model.sokobanActive = false;
            // Ao concluir o Sokoban, o timer desta tarefa é encerrado.
            this.clearGameTimeout();
            this.timerStarted = false;
            this.view.setTimerVisibility(false);
            this.view.sokobanComplete(() => {
                this.isReady = true;
                this.renderStep();
            });
        }
    }

    handleAnswer(selectedValue, btnElement) {
        if (this.hasTimedOut) return;
        const q = this.model.getCurrentQuestion();
        // Compara resposta escolhida com a correta (inclui casos de array e valor simples).
        const isCorrect = JSON.stringify(selectedValue) === JSON.stringify(q.correct) || selectedValue === q.correct;

        if (isCorrect) {
            this.model.stats.correct++;
            const oldScore = this.model.playerScore;
            const newScore = this.model.addScore(this.model.pointsPerCorrect);
            this.view.animateScoreIncrease(oldScore, newScore);
            this.view.showFeedback(true, q.tip, this.model.playerName, btnElement, q);
        } else {
            this.model.registerMistake(q);
            // Erro não pontua e também não desconta: mantém o score atual.
            this.view.updateScoreDisplay(this.model.playerScore);
            this.view.showFeedback(false, q.tip, this.model.playerName, btnElement, q);
        }
    }

    async handleNext() {
        // Avança no fluxo; ao final, exibe tela de encerramento.
        if (this.hasTimedOut) return;
        this.model.curStep++;
        if (this.model.curStep < this.model.questions.length) {
            this.renderStep();
        } else {
            this.clearGameTimeout();
            this.stopTotalTimer();
            this.timerStarted = false;
            // Calcula tempo total
            const gameTime = this.getElapsedGameSeconds();
            this.view.updateTotalTimeDisplay(gameTime);
            
            // Salva no Firebase
            await this.ranking.saveScore(
                this.model.playerName,
                this.model.playerScore,
                this.model.stats.correct,
                this.model.questions.length,
                gameTime
            );

            // Exibe tela final com botão de ranking
            this.view.showEndScreen(
                this.model.stats,
                this.model.playerName,
                this.model.playerScore,
                this.handleShowRanking.bind(this),
                gameTime
            );
            this.view.setTimerVisibility(false);
        }
    }

    async handleShowRanking() {
        // Busca e exibe ranking global
        const scores = await this.ranking.getTopScores(15);
        this.view.showRankingModal(scores);
    }

    handleRankingModalClose() {
        // Fecha modal de ranking
        this.view.hideRankingModal();
    }
}

// Boot da aplicação.
const app = new Controller(new Model(), new View());
app.init();