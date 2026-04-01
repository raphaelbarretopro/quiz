import Model from './model.js';
import View from './view.js';
import RankingManager from './ranking-manager.js';
import { getAllGameIds, getGameById } from './game/game-registry.js';
import { buildRandomGameSchedule } from './game/game-scheduler.js';
import { getLessonGameScheduleConfig } from './game/lesson-game-config.js';

// Controller: coordena o fluxo entre dados (Model) e interface (View).
class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.ranking = new RankingManager(); // Será inicializado após carregar dados
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
        this.pacmanBonusReward = 100;
        this.pacmanBonusActive = false;
        this.enduroBonusReward = 100;
        this.enduroBonusActive = false;
        this.trexBonusReward = 100;
        this.sokobanBonusReward = 100;
        this.marioBonusReward = 100;
        this.trexBonusActive = false;
        this.marioBonusActive = false;
        this.spaceBonusReward = 100;
        this.spaceBonusActive = false;
        this.activeBonusGameId = null;
        this.sokobanResolve = null;
        this.sokobanMaxLives = 3;
        this.sokobanLives = this.sokobanMaxLives;
        this.availableGameIds = getAllGameIds();
        this.gameSchedule = [];
        this.slotMaxSpins = 3;
        this.slotSpinsUsed = 0;
        this.slotIsActive = false;
        this.slotSpinInProgress = false;
        this.slotRoundId = 0;
        this.slotRoundSpins = [];
        this.slotRoundBaseScore = 0;

        // Registra os handlers da interface com o contexto da instância.
        this.view.bindStart(this.handleStart.bind(this));
        this.view.bindRankingPreview(this.handleShowRanking.bind(this));
        this.view.bindWheelStart(this.handleWheelStart.bind(this));
        this.view.bindWheelStop(this.handleWheelStop.bind(this));
        this.view.bindModalClose(this.handleModalClose.bind(this));
        this.view.bindSokobanMove(this.handleSokobanMove.bind(this));
        this.view.bindSokobanGiveUp(this.handleSokobanGiveUp.bind(this));
        this.view.bindNext(this.handleNext.bind(this));
        this.view.bindPacmanTest(this.handlePacmanTest.bind(this));
        this.view.bindEnduroTest(this.handleEnduroTest.bind(this));
        this.view.bindTRexTest(this.handleTRexTest.bind(this));
        this.view.bindSokobanTest(this.handleSokobanTest.bind(this));
        this.view.bindMarioTest(this.handleMarioTest.bind(this));
        this.view.bindSpaceTest(this.handleSpaceTest.bind(this));
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
            // Inicializa o RankingManager com a ID da aula carregada do data.json
            const lessonId = this.model.getLessonId();
            this.ranking.setLessonId(lessonId);
            
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
        this.enduroBonusActive = false;
        this.trexBonusActive = false;
        this.activeBonusGameId = null;
        const lessonSlug = this.model.getLessonSlug();
        const scheduleConfig = getLessonGameScheduleConfig(lessonSlug);
        this.gameSchedule = buildRandomGameSchedule(
            this.model.questions.length,
            this.availableGameIds,
            scheduleConfig
        );
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

        // Se o timeout ocorreu no Sokoban bônus em andamento, reinicia apenas o mini-jogo.
        if (this.model.sokobanActive) {
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
        
        // Em transições de tema, exibe roleta + popup e segue para o quiz.
        if (q.trans && !this.isReady) {
            this.currentTargetTopic = q.trans;
            this.view.setTimerVisibility(false);
            this.view.showPortal();
            return;
        }
        
        // Renderiza a pergunta da etapa atual com o tema correspondente.
        const topicData = this.model.getTopicData(q.topics);
        this.view.els.portalScreen.classList.add('hidden');
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
        // Ao fechar o modal da era, volta direto para a sequência de questões.
        this.isReady = true;
        this.view.els.introModal.classList.add('hidden');
        this.view.els.portalScreen.classList.add('hidden');
        this.renderStep();
    }

    handleSokobanReset() {
        if (this.hasTimedOut) return;
        // Inicia a rodada Sokoban com o cronômetro da etapa.
        if (this.model.sokobanActive) {
            this.view.setTimerVisibility(true);
            this.startGameTimeout();
            this.timerStarted = true;
        }

        this.sokobanLives = this.sokobanMaxLives;
        this.view.updateSokobanLives(this.sokobanLives);

        // Reinicia estado e redesenha o tabuleiro Sokoban.
        this.model.resetSokoban(this.currentTargetTopic);
        this.view.drawSokoban(this.model.sLevel, this.model.sP, this.model.sB);
    }

    handleSokobanMove(dx, dy) {
        if (this.hasTimedOut) return;
        // Aplica movimento, atualiza o grid e verifica vitória da etapa.
        const moveResult = this.model.movePlayer(dx, dy);

        if (moveResult.lifeLost) {
            this.sokobanLives -= 1;
            this.view.updateSokobanLives(this.sokobanLives);

            // Ao colidir empurrando caixa contra bloco, volta o tabuleiro ao estado inicial da rodada.
            this.model.resetSokoban(this.currentTargetTopic);
            this.view.drawSokoban(this.model.sLevel, this.model.sP, this.model.sB);

            if (this.sokobanLives > 0) {
                this.view.showAlert(
                    '💥 Vida perdida',
                    `Você empurrou a caixa contra o bloco. Vidas restantes: ${this.sokobanLives}. O estágio foi reiniciado.`
                );
                return;
            }
        }

        if (this.sokobanLives <= 0 && this.model.sokobanActive) {
            this.finishSokobanRound(false, 'no-lives');
            return;
        }

        this.view.drawSokoban(this.model.sLevel, this.model.sP, this.model.sB);
        
        if (moveResult.won && this.model.sokobanActive) {
            this.view.sokobanComplete(() => {
                this.finishSokobanRound(true, 'completed');
            });
        }
    }

    handleSokobanGiveUp() {
        if (this.hasTimedOut || !this.model.sokobanActive) return;
        this.finishSokobanRound(false, 'giveup');
    }

    finishSokobanRound(won, reason = 'interrupted') {
        this.model.sokobanActive = false;
        this.clearGameTimeout();
        this.timerStarted = false;
        this.view.setTimerVisibility(false);
        this.view.hideSokoban();

        if (this.activeBonusGameId === 'sokoban' && this.sokobanResolve) {
            const resolve = this.sokobanResolve;
            this.sokobanResolve = null;
            resolve({ won, reason });
            return;
        }

        this.isReady = true;
        this.renderStep();
    }

    handleAnswer(selectedValue, btnElement) {
        if (this.hasTimedOut) return;
        const q = this.model.getCurrentQuestion();
        if (q?.type === 'combo' && this.normalizeAnswerValue(selectedValue) === '') {
            return;
        }
        const result = this.evaluateAnswer(q, selectedValue);
        this.lastAnswerWasCorrect = result.isCorrect;

        if (result.isCorrect) {
            this.model.stats.correct++;
            this.correctStreak++;
            this.slotStreak++;
        } else {
            this.correctStreak = 0;
            this.slotStreak = 0;
            this.model.registerMistake(q);
        }

        if (result.pointsAwarded > 0) {
            const oldScore = this.model.playerScore;
            const newScore = this.model.addScore(result.pointsAwarded);
            const isPartialMultiOrDrag =
                !result.isCorrect &&
                (q?.type === 'multi' || q?.type === 'drag') &&
                Number(result.totalItems || 0) > 1;
            this.view.animateScoreIncrease(oldScore, newScore, {
                coinMultiplier: isPartialMultiOrDrag ? 0.5 : 1
            });
        } else {
            // Sem acertos válidos: mantém o score atual.
            this.view.updateScoreDisplay(this.model.playerScore);
        }

        this.view.showFeedback(result.isCorrect, q.tip, this.model.playerName, btnElement, q, result);
    }

    normalizeAnswerValue(value) {
        return String(value ?? '')
            .normalize('NFKC')
            .trim()
            .replace(/\s+/g, ' ')
            .toLowerCase();
    }

    normalizeAnswerList(value) {
        const list = Array.isArray(value) ? value : [value];
        return [...new Set(list.map((item) => this.normalizeAnswerValue(item)).filter(Boolean))].sort();
    }

    evaluateAnswer(q, selectedValue) {
        const pointsPerItem = this.model.pointsPerCorrect;

        if (q.type === 'multi') {
            const correctAnswers = this.normalizeAnswerList(q.correct);
            const selectedAnswers = this.normalizeAnswerList(selectedValue);
            const correctSet = new Set(correctAnswers);
            const selectedSet = new Set(selectedAnswers);
            const correctCount = [...selectedSet].filter((answer) => correctSet.has(answer)).length;
            const totalItems = correctAnswers.length;

            return {
                isCorrect: totalItems > 0 && correctCount === totalItems && selectedSet.size === correctSet.size,
                pointsAwarded: correctCount * pointsPerItem,
                correctCount,
                totalItems
            };
        }

        if (q.type === 'drag') {
            const assignments = selectedValue && typeof selectedValue === 'object' && !Array.isArray(selectedValue)
                ? selectedValue
                : {};
            const items = Array.isArray(q.items) ? q.items : [];
            const correctCount = items.filter((item) => {
                const assignedZone = assignments[item.id];
                return this.normalizeAnswerValue(assignedZone) === this.normalizeAnswerValue(item.match);
            }).length;
            const totalItems = items.length;

            return {
                isCorrect: totalItems > 0 && correctCount === totalItems,
                pointsAwarded: correctCount * pointsPerItem,
                correctCount,
                totalItems
            };
        }

        const isCorrect = Array.isArray(q.correct) || Array.isArray(selectedValue)
            ? JSON.stringify(this.normalizeAnswerList(q.correct)) === JSON.stringify(this.normalizeAnswerList(selectedValue))
            : this.normalizeAnswerValue(q.correct) === this.normalizeAnswerValue(selectedValue);

        return {
            isCorrect,
            pointsAwarded: isCorrect ? pointsPerItem : 0,
            correctCount: isCorrect ? 1 : 0,
            totalItems: 1
        };
    }

    async handleNext() {
        // Avança no fluxo; ao final, exibe tela de encerramento.
        if (this.hasTimedOut) return;
        this.model.curStep++;

        const ranScheduledGame = await this.tryRunScheduledGame();
        if (ranScheduledGame) {
            return;
        }
        
        if (this.model.curStep < this.model.questions.length) {
            // Regra: abre caça-níquel ao atingir 3 acertos consecutivos (contador dedicado).
            if (this.slotStreak >= 3) {
                this.slotStreak = 0;
                this.openSlotRound();
            } else {
                this.renderStep();
            }
        } else {
            await this.finalizeQuiz();
        }
    }

    async tryRunScheduledGame() {
        if (!Array.isArray(this.gameSchedule) || !this.gameSchedule.length) {
            return false;
        }

        const entry = this.gameSchedule.find(
            (item) => !item.used && Number(item.position) === Number(this.model.curStep)
        );

        if (!entry) return false;

        entry.used = true;
        await this.runScheduledGameById(entry.gameId);

        if (this.hasTimedOut) return true;

        if (this.model.curStep >= this.model.questions.length) {
            await this.finalizeQuiz();
        } else {
            this.renderStep();
        }

        return true;
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
        this.view.showRankingModal(scores, this.model.lessonInfo || {});
    }

    handleRankingModalClose() {
        // Fecha modal de ranking
        this.view.hideRankingModal();
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

    isAnyBonusGameActive() {
        return this.pacmanBonusActive || this.enduroBonusActive || this.trexBonusActive || Boolean(this.activeBonusGameId);
    }

    getBonusRewardByGameId(gameId) {
        if (gameId === 'pacman') return this.pacmanBonusReward;
        if (gameId === 'enduro') return this.enduroBonusReward;
        if (gameId === 'trex') return this.trexBonusReward;
        if (gameId === 'sokoban') return this.sokobanBonusReward;
        if (gameId === 'mario') return this.marioBonusReward;
        if (gameId === 'space') return this.spaceBonusReward;
        return 0;
    }

    getSokobanTopicForBonus() {
        const currentQuestion = this.model.getCurrentQuestion();
        const topicId = Array.isArray(currentQuestion?.topics)
            ? currentQuestion.topics[0]
            : currentQuestion?.topics;

        const resolved = this.model.getTopicData(topicId);
        if (resolved?.id) return resolved.id;

        const fallback = this.model.lessonInfo?.topics?.[0]?.id;
        return fallback || 'ACID';
    }

    runSokobanBonusRound() {
        return new Promise((resolve) => {
            if (this.hasTimedOut) {
                resolve({ won: false, reason: 'interrupted' });
                return;
            }

            this.currentTargetTopic = this.getSokobanTopicForBonus();
            this.gameDurationMs = this.getSokobanDurationMsByTopic(this.currentTargetTopic);
            this.model.sokobanActive = true;
            this.view.showSokoban();

            this.sokobanResolve = resolve;
            this.handleSokobanReset();
        });
    }

    async runScheduledGameById(gameId) {
        const selectedGame = getGameById(gameId);
        if (!selectedGame || this.hasTimedOut) return;

        this.activeBonusGameId = gameId;
        this.pacmanBonusActive = gameId === 'pacman';
        this.enduroBonusActive = gameId === 'enduro';
        this.trexBonusActive = gameId === 'trex';
        this.marioBonusActive = gameId === 'mario';
        this.spaceBonusActive = gameId === 'space';

        try {
            await selectedGame.run({
                model: this.model,
                view: this.view,
                reward: this.getBonusRewardByGameId(gameId),
                hasTimedOut: () => this.hasTimedOut,
                runSokobanBonusRound: this.runSokobanBonusRound.bind(this)
            });
        } finally {
            this.activeBonusGameId = null;
            this.pacmanBonusActive = false;
            this.enduroBonusActive = false;
            this.trexBonusActive = false;
            this.marioBonusActive = false;
            this.spaceBonusActive = false;
        }
    }

    async handlePacmanTest() {
        if (this.hasTimedOut) return;
        if (this.slotIsActive || this.slotSpinInProgress || this.isAnyBonusGameActive()) return;
        await this.runScheduledGameById('pacman');
        if (!this.hasTimedOut) this.renderStep();
    }

    async handleEnduroTest() {
        if (this.hasTimedOut) return;
        if (this.slotIsActive || this.slotSpinInProgress || this.isAnyBonusGameActive()) return;
        await this.runScheduledGameById('enduro');
        if (!this.hasTimedOut) this.renderStep();
    }

    async handleTRexTest() {
        if (this.hasTimedOut) return;
        if (this.slotIsActive || this.slotSpinInProgress || this.isAnyBonusGameActive()) return;
        await this.runScheduledGameById('trex');
        if (!this.hasTimedOut) this.renderStep();
    }

    async handleSokobanTest() {
        if (this.hasTimedOut) return;
        if (this.slotIsActive || this.slotSpinInProgress || this.isAnyBonusGameActive()) return;
        await this.runScheduledGameById('sokoban');
        if (!this.hasTimedOut) this.renderStep();
    }

    async handleMarioTest() {
        if (this.hasTimedOut) return;
        if (this.slotIsActive || this.slotSpinInProgress || this.isAnyBonusGameActive()) return;
        await this.runScheduledGameById('mario');
        if (!this.hasTimedOut) this.renderStep();
    }

    async handleSpaceTest() {
        if (this.hasTimedOut) return;
        if (this.slotIsActive || this.slotSpinInProgress || this.isAnyBonusGameActive()) return;
        await this.runScheduledGameById('space');
        if (!this.hasTimedOut) this.renderStep();
    }
}

// Boot da aplicação.
const app = new Controller(new Model(), new View());
app.init();