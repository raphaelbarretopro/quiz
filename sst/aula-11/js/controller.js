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
        this.correctStreak = 0;
        this.slotStreak = 0;
        this.lastAnswerWasCorrect = false;
        this.pacmanBonusReward = 1000;
        this.pacmanBonusActive = false;
        this.pacmanTriggeredByQuestionCount = false;
        this.enduroBonusReward = 1500;
        this.enduroBonusActive = false;
        this.enduroTriggeredByQuestionCount = false;
        this.trexBonusReward = 2000;
        this.trexBonusActive = false;
        this.trexFinalTriggered = false;
        this.slotMaxSpins = 3;
        this.slotSpinsUsed = 0;
        this.slotIsActive = false;
        this.slotSpinInProgress = false;
        this.slotRoundId = 0;
        this.slotRoundSpins = [];
        this.slotRoundBaseScore = 0;

        // Registra os handlers da interface com o contexto da instância.
        this.view.bindStart(this.handleStart.bind(this));
        this.view.bindWheelStart(this.handleWheelStart.bind(this));
        this.view.bindWheelStop(this.handleWheelStop.bind(this));
        this.view.bindModalClose(this.handleModalClose.bind(this));
        this.view.bindSokobanMove(this.handleSokobanMove.bind(this));
        this.view.bindSokobanReset(this.handleSokobanReset.bind(this));
        this.view.bindNext(this.handleNext.bind(this));
        this.view.bindPacmanTest(this.handlePacmanTest.bind(this));
        this.view.bindEnduroTest(this.handleEnduroTest.bind(this));
        this.view.bindTRexTest(this.handleTRexTest.bind(this));
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
        this.correctStreak = 0;
        this.slotStreak = 0;
        this.lastAnswerWasCorrect = false;
        this.pacmanBonusActive = false;
        this.pacmanTriggeredByQuestionCount = false;
        this.enduroBonusActive = false;
        this.enduroTriggeredByQuestionCount = false;
        this.trexBonusActive = false;
        this.trexFinalTriggered = false;
        this.slotSpinsUsed = 0;
        this.slotIsActive = false;
        this.slotSpinInProgress = false;
        this.slotRoundId = 0;
        this.slotRoundSpins = [];
        this.slotRoundBaseScore = 0;
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
        // Normaliza respostas corretas para comparação robusta
        const normalizedCorrect = Array.isArray(q.correct)
            ? q.correct.map(v => String(v).trim())
            : String(q.correct).trim();
        const normalizedSelected = Array.isArray(selectedValue)
            ? selectedValue.map(v => String(v).trim())
            : String(selectedValue).trim();
        // Compara resposta escolhida com a correta (inclui casos de array e valor simples, com normalização de espaços).
        const isCorrect = Array.isArray(normalizedCorrect) && Array.isArray(normalizedSelected)
            ? normalizedCorrect.length === normalizedSelected.length && normalizedCorrect.every(v => normalizedSelected.includes(v))
            : JSON.stringify(normalizedSelected) === JSON.stringify(normalizedCorrect) || normalizedSelected === normalizedCorrect;
        this.lastAnswerWasCorrect = isCorrect;

        if (isCorrect) {
            this.model.stats.correct++;
            this.correctStreak++;
            this.slotStreak++;
            const oldScore = this.model.playerScore;
            const newScore = this.model.addScore(this.model.pointsPerCorrect);
            this.view.animateScoreIncrease(oldScore, newScore);
            this.view.showFeedback(true, q.tip, this.model.playerName, btnElement, q);
        } else {
            this.correctStreak = 0;
            this.slotStreak = 0;
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
            // Regra especial: ENDURO aparece ao responder 30 perguntas, independente de acerto.
            if (!this.enduroTriggeredByQuestionCount && this.model.curStep >= 30) {
                this.enduroTriggeredByQuestionCount = true;
                await this.openEnduroBonusRound();
                return;
            }

            // Regra especial: PAC-MAN aparece ao responder 15 perguntas, independente de acerto.
            if (!this.pacmanTriggeredByQuestionCount && this.model.curStep >= 15) {
                this.pacmanTriggeredByQuestionCount = true;
                await this.openPacmanBonusRound();
                return;
            }

            // Regra: abre caça-níquel ao atingir 3 acertos consecutivos (contador dedicado).
            if (this.slotStreak >= 3) {
                this.slotStreak = 0;
                this.openSlotRound();
            } else {
                this.renderStep();
            }
        } else {
            // Bônus especial: T-REX Game roda uma única vez após a última pergunta (índice 49).
            if (!this.trexFinalTriggered) {
                this.trexFinalTriggered = true;
                await this.openTRexBonusRound();
                return;
            }

            await this.finalizeQuiz();
        }
    }

    async finalizeQuiz() {
        this.clearGameTimeout();
        this.stopTotalTimer();
        this.timerStarted = false;

        const gameTime = this.getElapsedGameSeconds();
        this.view.updateTotalTimeDisplay(gameTime);

        await this.ranking.saveScore(
            this.model.playerName,
            this.model.playerScore,
            this.model.stats.correct,
            this.model.questions.length,
            gameTime
        );

        this.view.showEndScreen(
            this.model.stats,
            this.model.playerName,
            this.model.playerScore,
            this.handleShowRanking.bind(this),
            gameTime
        );
        this.view.setTimerVisibility(false);
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

    bindSlotMachineResult() {
        // Mantido por compatibilidade: fluxo migrou para openSlotRound().
    }

    openSlotRound() {
        this.slotRoundId++;
        const activeRoundId = this.slotRoundId;
        this.slotIsActive = true;
        this.slotSpinsUsed = 0;
        this.slotSpinInProgress = false;
        this.slotRoundSpins = [];
        this.slotRoundBaseScore = this.model.playerScore;
        this.view.showSlotMachine();
        this.view.els.slotSpinBtn.disabled = false;
        this.updateSlotSpinButtonLabel();
        this.view.els.slotResult.classList.remove('hidden', 'jackpot');
        this.view.els.slotResult.innerHTML = `🎰 BÔNUS LIBERADO!<br>${this.slotMaxSpins} GIROS DISPONÍVEIS`;

        this.view.els.slotSpinBtn.onclick = async () => {
            if (!this.slotIsActive) return;
            if (this.slotSpinsUsed >= this.slotMaxSpins) return;
            if (this.slotSpinInProgress) return;

            // Conta o giro no clique para não ultrapassar o limite.
            this.slotSpinInProgress = true;
            this.slotSpinsUsed++;
            this.view.els.slotSpinBtn.disabled = true;
            this.updateSlotSpinButtonLabel();

            try {
                const finalPositions = await this.view.spinSlotMachine();

                // Se a rodada já mudou/encerrou, encerra sem mexer no fluxo.
                if (!this.slotIsActive || this.slotRoundId !== activeRoundId) {
                    return;
                }

                const symbols = this.view.getSlotSymbolsFromPositions(finalPositions);
                const prize = this.view.getPrizeFromPositions(finalPositions);
                this.slotRoundSpins.push({ symbols, prize });

                const remaining = this.slotMaxSpins - this.slotSpinsUsed;
                if (remaining <= 0) {
                    this.view.els.slotSpinBtn.disabled = true;
                    this.view.els.slotResult.classList.remove('hidden');
                    this.view.els.slotResult.innerHTML += '<br><small>Processando bônus final...</small>';

                    this.slotIsActive = false;
                    const finalScore = await this.view.showSlotFinalSummary(
                        this.slotRoundSpins,
                        this.slotRoundBaseScore
                    );
                    this.model.playerScore = finalScore;
                    this.view.updateScoreDisplay(finalScore);
                    this.slotSpinInProgress = false;
                    this.view.hideSlotMachine();
                    this.renderStep();
                    return;
                }

                this.view.els.slotSpinBtn.disabled = false;
                this.updateSlotSpinButtonLabel();
            } finally {
                // Garante destrava mesmo em qualquer erro de runtime.
                if (this.slotRoundId === activeRoundId) {
                    this.slotSpinInProgress = false;
                }
            }
        };

        this.view.els.slotCloseBtn.onclick = () => {
            if (!this.slotIsActive) return;
            this.slotIsActive = false;
            this.slotSpinInProgress = false;
            this.view.els.slotSpinBtn.disabled = false;
            this.view.hideSlotMachine();
            this.renderStep();
        };
    }

    updateSlotSpinButtonLabel() {
        const remaining = Math.max(0, this.slotMaxSpins - this.slotSpinsUsed);
        this.view.els.slotSpinBtn.textContent = `GIRAR (${remaining}) 🎰`;
    }

    async handlePacmanTest() {
        if (this.hasTimedOut) return;
        if (this.slotIsActive || this.slotSpinInProgress || this.pacmanBonusActive || this.enduroBonusActive) return;
        await this.openPacmanBonusRound();
    }

    async handleEnduroTest() {
        if (this.hasTimedOut) return;
        if (this.slotIsActive || this.slotSpinInProgress || this.pacmanBonusActive || this.enduroBonusActive) return;
        await this.openEnduroBonusRound();
    }

    async openPacmanBonusRound() {
        if (this.pacmanBonusActive || this.hasTimedOut) return;

        this.pacmanBonusActive = true;
        const result = await this.view.runPacmanBonusLevel();

        if (this.hasTimedOut) {
            this.pacmanBonusActive = false;
            return;
        }

        if (result.won) {
            const finalScore = await this.view.showPacmanFinalSummary(
                this.model.playerScore,
                this.pacmanBonusReward,
                result.cherryBonus
            );
            this.model.playerScore = finalScore;
            this.view.updateScoreDisplay(finalScore);
        } else if (result.reason === 'timeout') {
            this.view.showAlert(
                '⏱️ Tempo Esgotado no PAC-MAN',
                'O cronômetro do desafio PAC-MAN chegou a 0s antes de limpar todos os pontos.',
                () => this.view.resumeGameMusic()
            );
        } else if (result.reason === 'giveup' || result.reason === 'interrupted') {
            this.view.showAlert(
                '⏸️ Desafio Interrompido',
                'O desafio PAC-MAN foi interrompido antes da conclusão. Continue acertando para tentar novamente.',
                () => this.view.resumeGameMusic()
            );
        } else {
            this.view.showAlert(
                '👻 Desafio Não Concluído',
                'Você esgotou os 3 créditos do desafio especial desta vez. Continue acertando para tentar novamente!',
                () => this.view.resumeGameMusic()
            );
        }

        this.pacmanBonusActive = false;
        this.renderStep();
    }

    async openEnduroBonusRound() {
        if (this.enduroBonusActive || this.hasTimedOut) return;

        this.enduroBonusActive = true;
        const result = await this.view.runEnduroBonusLevel();

        if (this.hasTimedOut) {
            this.enduroBonusActive = false;
            return;
        }

        if (result.won) {
            await this.view.showEnduroVictoryPopup(this.model.playerName);
            const finalScore = await this.view.showEnduroFinalSummary(
                this.model.playerScore,
                this.enduroBonusReward,
                result.stagesCompleted,
                result.carsPassed
            );
            this.model.playerScore = finalScore;
            this.view.updateScoreDisplay(finalScore);
        } else {
            this.view.showAlert(
                '🏎️ Corrida Interrompida',
                'Você esgotou os 3 carros nesta corrida do ENDURO. Continue acertando para liberar uma nova tentativa!',
                () => this.view.resumeGameMusic()
            );
        }

        this.enduroBonusActive = false;
        this.renderStep();
    }

    async handleTRexTest() {
        if (this.hasTimedOut) return;
        if (this.slotIsActive || this.slotSpinInProgress || this.pacmanBonusActive || this.enduroBonusActive || this.trexBonusActive) return;
        await this.openTRexBonusRound();
    }

    async openTRexBonusRound() {
        if (this.trexBonusActive || this.hasTimedOut) return;

        this.trexBonusActive = true;
        const result = await this.view.runTRexBonusLevel();

        if (this.hasTimedOut) {
            this.trexBonusActive = false;
            return;
        }

        if (result.won) {
            await this.view.showTRexVictoryPopup(this.model.playerName);
            const finalScore = await this.view.showTRexFinalSummary(
                this.model.playerScore,
                this.trexBonusReward,
                result.distance
            );
            this.model.playerScore = finalScore;
            this.view.updateScoreDisplay(finalScore);
        } else {
            this.view.showAlert(
                '🦖 Jogo Interrompido',
                'Você foi colidido e o desafio T-REX foi interrompido. Continue acertando as perguntas para liberar uma nova tentativa!',
                () => this.view.resumeGameMusic()
            );
        }

        this.trexBonusActive = false;

        if (this.model.curStep >= this.model.questions.length) {
            await this.finalizeQuiz();
            return;
        }

        this.renderStep();
    }
}

// Boot da aplicação.
const app = new Controller(new Model(), new View());
app.init();