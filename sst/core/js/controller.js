import Model from './model.js';
import View from './view.js';
import RankingManager from './ranking-manager.js';
import { restoreGoogleAuthSession, signInWithGoogle, subscribeToGoogleAuthState } from './firebase-config.js';
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
        this.snakeBonusReward = 100;
        this.snakeBonusActive = false;
        this.memoryBonusReward = 100;
        this.memoryBonusActive = false;
        this.lordeHeroBonusReward = 100;
        this.lordeHeroBonusActive = false;
        this.froggerBonusReward = 100;
        this.froggerBonusActive = false;
        this.tetrisBonusReward = 100;
        this.tetrisBonusActive = false;
        this.game2048BonusReward = 100;
        this.game2048BonusActive = false;
        this.flappyBirdBonusReward = 100;
        this.flappyBirdBonusActive = false;
        this.arkanoidBonusReward = 100;
        this.arkanoidBonusActive = false;
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
        this.isFinalizingQuiz = false;
        this.hasFinalizedQuiz = false;
        this.authUser = null;
        this.authUnsubscribe = null;
        this.rankingRealtimeSubscribed = false;

        // Registra os handlers da interface com o contexto da instância.
        this.view.bindStart(this.handleStart.bind(this));
        this.view.bindGoogleLogin(this.handleGoogleLogin.bind(this));
        this.view.bindLoginModal(this.handleGoogleLogin.bind(this));
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
        this.view.bindSnakeTest(this.handleSnakeTest.bind(this));
        this.view.bindMemoryTest(this.handleMemoryTest.bind(this));
        this.view.bindLordeHeroTest(this.handleLordeHeroTest.bind(this));
        this.view.bindFroggerTest(this.handleFroggerTest.bind(this));
        this.view.bindTetrisTest(this.handleTetrisTest.bind(this));
        this.view.bindGame2048Test(this.handleGame2048Test.bind(this));
        this.view.bindFlappyBirdTest(this.handleFlappyBirdTest.bind(this));
        this.view.bindArkanoidTest(this.handleArkanoidTest.bind(this));
        this.view.bindRankingModalClose(this.handleRankingModalClose.bind(this));
    }

    getSokobanDurationMsByTopic(topicId) {
        return 30000;
    }

    getGoogleIdentity(user = null) {
        const safeUser = user || {};
        const displayName = String(safeUser.displayName || safeUser.email || 'ALUNO').trim();
        const nameParts = displayName.split(/\s+/).filter(Boolean);
        const firstName = nameParts[0] || 'ALUNO';
        const lastInitial = nameParts.length > 1 ? `${nameParts[nameParts.length - 1][0].toUpperCase()}.` : '';
        const scoreLabel = lastInitial ? `${firstName} ${lastInitial}` : firstName;

        return {
            displayName,
            firstName,
            scoreLabel,
            email: String(safeUser.email || '').trim(),
            uid: String(safeUser.uid || '').trim()
        };
    }

    async init() {
        // Carrega dados iniciais e libera a UI apenas se a carga for bem-sucedida.
        const success = await this.model.loadData();
        if(success) {
            // Inicializa o RankingManager com a ID da aula carregada do data.json
            const lessonId = this.model.getLessonId();
            this.ranking.setLessonId(lessonId);
            
            this.view.initUI(this.model.lessonInfo);
            this.view.setGoogleAuthRequiredState();

            const restoredUser = await restoreGoogleAuthSession();
            if (restoredUser) {
                this.applyAuthenticatedUser(restoredUser);
            }

            if (this.authUnsubscribe) {
                this.authUnsubscribe();
                this.authUnsubscribe = null;
            }

            this.authUnsubscribe = subscribeToGoogleAuthState((user) => {
                if (user) {
                    this.applyAuthenticatedUser(user);
                } else {
                    this.handleSignedOutUser();
                }
            });
        }
    }

    subscribeTop15Realtime() {
        if (this.rankingRealtimeSubscribed) return;
        this.rankingRealtimeSubscribed = true;
        this.ranking.subscribeToTopScores(15, (scores) => {
            this.view.renderTop15Panel(scores);
        });
    }

    applyAuthenticatedUser(user) {
        this.authUser = user || null;
        if (!this.authUser) return;

        const identity = this.getGoogleIdentity(this.authUser);
        this.view.setGoogleAuthSuccessState(identity.displayName, identity.email);

        this.model.playerName = identity.displayName;
        this.view.setScorePlayerName(identity.firstName);
        this.subscribeTop15Realtime();
    }

    handleSignedOutUser() {
        this.authUser = null;
        this.ranking.unsubscribe();
        this.rankingRealtimeSubscribed = false;
        this.view.renderTop15Panel([]);
        this.view.setGoogleAuthRequiredState();
    }

    getGoogleAuthFriendlyError(error) {
        const code = String(error?.code || '').toLowerCase();
        const message = String(error?.message || '');

        if (code === 'auth/api-key-not-valid.-please-pass-a-valid-api-key.' || code === 'auth/api-key-not-valid' || message.includes('api key not valid')) {
            return 'Falha de configuração do Firebase: API key inválida. Verifique o firebaseConfig no projeto e as restrições da chave no Google Cloud.';
        }

        if (code === 'auth/unauthorized-domain') {
            return 'Domínio não autorizado no Firebase Authentication. Adicione este domínio em Authentication > Settings > Authorized domains.';
        }

        if (code === 'auth/operation-not-allowed') {
            return 'Login Google não habilitado no Firebase. Ative o provedor Google em Authentication > Sign-in method.';
        }

        if (code === 'auth/popup-closed-by-user') {
            return 'Login cancelado. Feche esta mensagem e tente novamente.';
        }

        if (code === 'auth/network-request-failed') {
            return 'Falha de rede ao autenticar. Verifique a conexão e tente novamente.';
        }

        return 'Não foi possível autenticar com Google. Verifique Firebase Authentication, domínios autorizados e API key.';
    }

    async handleGoogleLogin() {
        this.view.setGoogleAuthLoadingState();

        try {
            const user = await signInWithGoogle();
            if (user) {
                this.applyAuthenticatedUser(user);
                return;
            }

            // Fluxo redirect: aguardará recarga da página.
            this.view.setGoogleAuthLoadingState('Redirecionando para login do Google...');
        } catch (error) {
            console.error('Falha no login com Google:', error);
            this.view.setGoogleAuthRequiredState(this.getGoogleAuthFriendlyError(error));
        }
    }

    handleStart(name) {
        if (!this.authUser) {
            this.view.showAlert('Login obrigatório', 'Faça login com Google para acessar o quiz.');
            return;
        }

        // Inicia a sessão do jogador e passa para o primeiro passo da jornada.
        const identity = this.getGoogleIdentity(this.authUser);
        this.model.playerName = identity.displayName;
        this.view.setScorePlayerName(identity.firstName);
        // Tempo total da sessão (independente do timer do Sokoban).
        this.startTime = Date.now();
        this.hasTimedOut = false;
        this.timerStarted = false;
        this.correctStreak = 0;
        this.slotStreak = 0;
        this.lastAnswerWasCorrect = false;
        this.isFinalizingQuiz = false;
        this.hasFinalizedQuiz = false;
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
        this.view.updateStreakHud(0, 1, true);
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

        // Se a questão é de transição, prioriza o tema sorteado pela roleta ao voltar para o quiz.
        const effectiveTopicId = q.trans
            ? (this.currentTargetTopic || q.trans || q.topics)
            : q.topics;

        // Renderiza a pergunta da etapa atual com o tema correspondente.
        const topicData = this.model.getTopicData(effectiveTopicId);
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
        const rawIndex = this.model.lessonInfo.topics.findIndex(t => t.id === this.currentTargetTopic);
        const topicIndex = rawIndex >= 0 ? rawIndex : 0;
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

        // Multiplicador de sequência: a cada 5 acertos consecutivos +0.1×, máx 2.0×
        const streakMultiplier = result.isCorrect
            ? Math.min(2.0, 1.0 + Math.floor(this.correctStreak / 5) * 0.1)
            : 1.0;
        const adjustedPoints = result.isCorrect
            ? Math.round(result.pointsAwarded * streakMultiplier)
            : result.pointsAwarded;

        this.view.updateStreakHud(this.correctStreak, streakMultiplier, result.isCorrect);

        if (adjustedPoints > 0) {
            const oldScore = this.model.playerScore;
            const newScore = this.model.addScore(adjustedPoints);
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

        this.view.showFeedback(result.isCorrect, q.tip, this.model.playerName, btnElement, q, result, streakMultiplier, this.correctStreak);
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
        if (this.hasTimedOut || this.isFinalizingQuiz || this.hasFinalizedQuiz) return;
        this.model.curStep++;

        const ranScheduledGame = await this.tryRunScheduledGame();
        if (ranScheduledGame) {
            return;
        }
        
        if (this.model.curStep < this.model.questions.length) {
            // Regra: abre caça-níquel ao atingir 5 acertos consecutivos (contador dedicado).
            if (this.slotStreak >= 5) {
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
        if (this.isFinalizingQuiz || this.hasFinalizedQuiz) {
            return;
        }

        this.isFinalizingQuiz = true;
        this.clearGameTimeout();
        this.stopTotalTimer();
        this.timerStarted = false;

        const gameTime = this.getElapsedGameSeconds();
        this.view.updateTotalTimeDisplay(gameTime);

        // Bônus de taxa de acerto (quadrático, máx 3000 pts a 100%)
        const correct = this.model.stats.correct;
        const total = this.model.questions.length;
        const accuracy = total > 0 ? correct / total : 0;
        const accuracyBonus = Math.round(Math.pow(accuracy, 2) * 3000);

        if (accuracyBonus > 0) {
            const baseScore = this.model.playerScore;
            this.model.playerScore = baseScore + accuracyBonus;
            await this.view.showAccuracyBonusSummary(baseScore, accuracyBonus, correct, total);
        }

        try {
            const identity = this.getGoogleIdentity(this.authUser);
            await this.ranking.saveScore(
                this.model.playerName,
                this.model.playerScore,
                this.model.stats.correct,
                this.model.questions.length,
                gameTime,
                {
                    uid: identity.uid,
                    email: identity.email,
                    alias: identity.scoreLabel
                }
            );

            this.view.showEndScreen(
                this.model.stats,
                this.model.playerName,
                this.model.playerScore,
                this.handleShowRanking.bind(this),
                gameTime
            );
            this.view.setTimerVisibility(false);
            this.hasFinalizedQuiz = true;
        } finally {
            this.isFinalizingQuiz = false;
        }
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

        // Planeja os resultados da rodada: sempre 1 par (2 iguais) e, nas rodadas pares,
        // também garante um jackpot (3 iguais) em um giro diferente.
        const pairSlot = Math.floor(Math.random() * this.slotMaxSpins);
        const spinPlan = Array.from({ length: this.slotMaxSpins }, () => 'random');
        spinPlan[pairSlot] = 'pair';
        if (this.slotRoundId % 2 === 0) {
            const others = spinPlan.map((_, i) => i).filter(i => i !== pairSlot);
            spinPlan[others[Math.floor(Math.random() * others.length)]] = 'jackpot';
        }
        this.slotRoundPlan = spinPlan;

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
            const spinIndex = this.slotSpinsUsed;
            this.slotSpinsUsed++;
            this.view.els.slotSpinBtn.disabled = true;
            this.updateSlotSpinButtonLabel();

            try {
                const outcome = (this.slotRoundPlan || [])[spinIndex] || 'random';
                const finalPositions = await this.view.spinSlotMachine(outcome);

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
        return this.pacmanBonusActive
            || this.enduroBonusActive
            || this.trexBonusActive
            || this.marioBonusActive
            || this.spaceBonusActive
            || this.snakeBonusActive
            || this.memoryBonusActive
            || this.lordeHeroBonusActive
            || this.froggerBonusActive
            || this.tetrisBonusActive
            || this.game2048BonusActive
            || this.flappyBirdBonusActive
            || this.arkanoidBonusActive
            || Boolean(this.activeBonusGameId);
    }

    getBonusRewardByGameId(gameId) {
        if (gameId === 'pacman') return this.pacmanBonusReward;
        if (gameId === 'enduro') return this.enduroBonusReward;
        if (gameId === 'trex') return this.trexBonusReward;
        if (gameId === 'sokoban') return this.sokobanBonusReward;
        if (gameId === 'mario') return this.marioBonusReward;
        if (gameId === 'space') return this.spaceBonusReward;
        if (gameId === 'snake') return this.snakeBonusReward;
        if (gameId === 'memory') return this.memoryBonusReward;
        if (gameId === 'lordehero') return this.lordeHeroBonusReward;
        if (gameId === 'frogger') return this.froggerBonusReward;
        if (gameId === 'tetris') return this.tetrisBonusReward;
        if (gameId === 'game2048') return this.game2048BonusReward;
        if (gameId === 'flappybird') return this.flappyBirdBonusReward;
        if (gameId === 'arkanoid') return this.arkanoidBonusReward;
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
        this.snakeBonusActive = gameId === 'snake';
        this.memoryBonusActive = gameId === 'memory';
        this.lordeHeroBonusActive = gameId === 'lordehero';
        this.froggerBonusActive = gameId === 'frogger';
        this.tetrisBonusActive = gameId === 'tetris';
        this.game2048BonusActive = gameId === 'game2048';
        this.flappyBirdBonusActive = gameId === 'flappybird';
        this.arkanoidBonusActive = gameId === 'arkanoid';

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
            this.snakeBonusActive = false;
            this.memoryBonusActive = false;
            this.lordeHeroBonusActive = false;
            this.froggerBonusActive = false;
            this.tetrisBonusActive = false;
            this.game2048BonusActive = false;
            this.flappyBirdBonusActive = false;
            this.arkanoidBonusActive = false;
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

    async handleSnakeTest() {
        if (this.hasTimedOut) return;
        if (this.slotIsActive || this.slotSpinInProgress || this.isAnyBonusGameActive()) return;
        await this.runScheduledGameById('snake');
        if (!this.hasTimedOut) this.renderStep();
    }

    async handleMemoryTest() {
        if (this.hasTimedOut) return;
        if (this.slotIsActive || this.slotSpinInProgress || this.isAnyBonusGameActive()) return;
        await this.runScheduledGameById('memory');
        if (!this.hasTimedOut) this.renderStep();
    }

    async handleLordeHeroTest() {
        if (this.hasTimedOut) return;
        if (this.slotIsActive || this.slotSpinInProgress || this.isAnyBonusGameActive()) return;
        await this.runScheduledGameById('lordehero');
        if (!this.hasTimedOut) this.renderStep();
    }

    async handleFroggerTest() {
        if (this.hasTimedOut) return;
        if (this.slotIsActive || this.slotSpinInProgress || this.isAnyBonusGameActive()) return;
        await this.runScheduledGameById('frogger');
        if (!this.hasTimedOut) this.renderStep();
    }

    async handleTetrisTest() {
        if (this.hasTimedOut) return;
        if (this.slotIsActive || this.slotSpinInProgress || this.isAnyBonusGameActive()) return;
        await this.runScheduledGameById('tetris');
        if (!this.hasTimedOut) this.renderStep();
    }

    async handleGame2048Test() {
        if (this.hasTimedOut) return;
        if (this.slotIsActive || this.slotSpinInProgress || this.isAnyBonusGameActive()) return;
        await this.runScheduledGameById('game2048');
        if (!this.hasTimedOut) this.renderStep();
    }

    async handleFlappyBirdTest() {
        if (this.hasTimedOut) return;
        if (this.slotIsActive || this.slotSpinInProgress || this.isAnyBonusGameActive()) return;
        await this.runScheduledGameById('flappybird');
        if (!this.hasTimedOut) this.renderStep();
    }

    async handleArkanoidTest() {
        if (this.hasTimedOut) return;
        if (this.slotIsActive || this.slotSpinInProgress || this.isAnyBonusGameActive()) return;
        await this.runScheduledGameById('arkanoid');
        if (!this.hasTimedOut) this.renderStep();
    }
}

// Boot da aplicação.
const app = new Controller(new Model(), new View());
app.init();