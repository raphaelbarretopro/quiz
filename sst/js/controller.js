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
        this.startTime = Date.now();
        this.view.els.startScreen.classList.add('hidden');
        this.renderStep();
    }

    renderStep() {
        const q = this.model.getCurrentQuestion();
        
        // Em transições de tema, força a etapa da roleta + Sokoban antes da pergunta.
        if (q.trans && !this.isReady) {
            this.currentTargetTopic = q.trans;
            this.view.showPortal();
            return;
        }
        
        // Renderiza a pergunta da etapa atual com o tema correspondente.
        const topicData = this.model.getTopicData(q.topics);
        this.view.renderQuestion(q, topicData, this.model.playerName, this.handleAnswer.bind(this));
        this.isReady = false;
    }

    handleWheelStart() {
        this.view.startSpin();
    }

    handleWheelStop() {
        // Converte o tópico-alvo para índice e anima a roleta até o setor correto.
        const topicIndex = this.model.lessonInfo.topics.findIndex(t => t.id === this.currentTargetTopic);
        const topicData = this.model.getTopicData(this.currentTargetTopic);
        
        this.view.stopSpin(topicIndex, this.model.lessonInfo.topics.length, topicData);
    }

    handleModalClose() {
        // Ao fechar o modal da era, inicia o mini-jogo de transição.
        this.view.showSokoban();
        this.model.sokobanActive = true;
        this.handleSokobanReset();
    }

    handleSokobanReset() {
        // Reinicia estado e redesenha o tabuleiro Sokoban.
        this.model.resetSokoban(this.currentTargetTopic);
        this.view.drawSokoban(this.model.sLevel, this.model.sP, this.model.sB);
    }

    handleSokobanMove(dx, dy) {
        // Aplica movimento, atualiza o grid e verifica vitória da etapa.
        const hasWon = this.model.movePlayer(dx, dy);
        this.view.drawSokoban(this.model.sLevel, this.model.sP, this.model.sB);
        
        if (hasWon && this.model.sokobanActive) {
            this.model.sokobanActive = false;
            this.view.sokobanComplete(() => {
                this.isReady = true;
                this.renderStep();
            });
        }
    }

    handleAnswer(selectedValue, btnElement) {
        const q = this.model.getCurrentQuestion();
        // Compara resposta escolhida com a correta (inclui casos de array e valor simples).
        const isCorrect = JSON.stringify(selectedValue) === JSON.stringify(q.correct) || selectedValue === q.correct;

        if (isCorrect) {
            this.model.stats.correct++;
            const oldScore = this.model.playerScore;
            const newScore = this.model.addScore(this.model.pointsPerCorrect);
            this.view.animateScoreIncrease(oldScore, newScore);
            this.view.showFeedback(true, q.tip, this.model.playerName, btnElement);
        } else {
            this.model.registerMistake(q);
            const oldScore = this.model.playerScore;
            const newScore = this.model.addScore(this.model.pointsPerMistake);
            this.view.animateScorePenalty(oldScore, newScore, this.model.pointsPerMistake);
            this.view.showFeedback(false, q.tip, this.model.playerName, btnElement);
        }
    }

    async handleNext() {
        // Avança no fluxo; ao final, exibe tela de encerramento.
        this.model.curStep++;
        if (this.model.curStep < this.model.questions.length) {
            this.renderStep();
        } else {
            // Calcula tempo total
            const gameTime = Math.floor((Date.now() - this.startTime) / 1000);
            
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
                this.handleShowRanking.bind(this)
            );
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