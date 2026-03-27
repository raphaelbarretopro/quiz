export default class Model {
    constructor() {
        // Estado geral da sessão.
        this.playerName = "";
        this.curStep = 0;
        this.stats = { correct: 0, mistakes: [] };
        
        // Dados carregados do arquivo JSON.
        this.lessonInfo = null;
        this.questions = [];
        this.sokobanActive = false;
        
        // Estado base do tabuleiro Sokoban (1 = parede, 2 = alvo, 0 = vazio).
        this.sLevel = [
            [1,1,1,1,1,1,1,1,1,1,1],
            [1,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,1], 
            [1,0,1,0,0,0,0,0,1,0,1],
            [1,0,1,0,2,0,2,0,1,0,1],
            [1,0,0,0,0,0,0,0,0,0,1], 
            [1,0,1,0,2,0,2,0,1,0,1],
            [1,0,1,0,0,0,0,0,1,0,1],
            [1,0,0,0,0,0,0,0,0,0,1], 
            [1,0,0,0,0,0,0,0,0,0,1],
            [1,1,1,1,1,1,1,1,1,1,1]
        ];
        this.sP = { x: 5, y: 1 };
        this.sB = [];
    }

    async loadData() {
        try {
            // Carrega configurações da aula e banco de questões.
            const response = await fetch('data.json');
            const data = await response.json();
            this.lessonInfo = data.lesson_info;
            this.questions = data.questions;
            return true;
        } catch (error) {
            console.error("Erro ao carregar o arquivo data.json", error);
            return false;
        }
    }

    getCurrentQuestion() {
        // Retorna a pergunta da etapa corrente.
        return this.questions[this.curStep];
    }

    getTopicData(topicId) {
        if(!this.lessonInfo) return null;
        // Busca metadados do tema/era pelo id.
        return this.lessonInfo.topics.find(t => t.id === topicId);
    }

    resetSokoban(topicId) {
        // Define letras das caixas conforme tema atual; usa fallback padrão.
        const topic = this.getTopicData(topicId);
        const letters = topic && topic.sokoban ? topic.sokoban : ["P", "L", "A", "Y"];
        
        // Reposiciona jogador e caixas para o estado inicial.
        this.sP = { x: 1, y: 9 };
        this.sB = [
            { x: 3, y: 3, val: letters[0] }, { x: 7, y: 3, val: letters[1] },
            { x: 3, y: 7, val: letters[2] }, { x: 7, y: 7, val: letters[3] }
        ];
    }

    movePlayer(dx, dy) {
        if (!this.sokobanActive) return false;
        let nx = this.sP.x + dx, ny = this.sP.y + dy;
        
        // Bloqueia movimento para fora do grid ou contra paredes.
        if (ny < 0 || ny > 10 || nx < 0 || nx > 10 || this.sLevel[ny][nx] === 1) return false;
        
        let bIdx = this.sB.findIndex(b => b.x === nx && b.y === ny);
        if (bIdx !== -1) {
            let bnx = nx + dx, bny = ny + dy;
            // Só permite empurrar caixa para célula livre e válida.
            if (bny < 0 || bny > 10 || bnx < 0 || bnx > 10 || this.sLevel[bny][bnx] === 1 || this.sB.some(b => b.x === bnx && b.y === bny)) return false;
            this.sB[bIdx].x = bnx; 
            this.sB[bIdx].y = bny;
        }
        this.sP.x = nx; 
        this.sP.y = ny;
        
        return this.checkSokobanWin();
    }

    checkSokobanWin() {
        // Vitória quando todas as 4 caixas estão posicionadas sobre alvos.
        let completed = 0;
        this.sB.forEach(b => {
            if (this.sLevel[b.y][b.x] === 2) completed++;
        });
        return completed === 4;
    }

    registerMistake(q) {
        // Evita duplicar erro da mesma etapa no relatório final.
        if (!this.stats.mistakes.find(m => m.id === this.curStep)) {
            this.stats.mistakes.push({ 
                id: this.curStep, 
                q: q.questions.replace("[NAME]", this.playerName), 
                h: q.tip 
            });
        }
    }
}