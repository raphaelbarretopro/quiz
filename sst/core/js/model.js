export default class Model {
    constructor() {
        // Estado geral da sessão.
        this.playerName = "";
        this.curStep = 0;
        this.playerScore = 0;
        this.pointsPerCorrect = 100;
        this.pointsPerMistake = 0;
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

    getRequestedLessonSlug() {
        const params = new URLSearchParams(window.location.search);
        const byParam = String(params.get('aula') || params.get('lesson') || '').trim().toLowerCase();
        if (byParam) return byParam;

        const pathMatch = window.location.pathname.match(/\/(aula-[a-z0-9-]+)(?:\/|$)/i);
        if (pathMatch && pathMatch[1]) {
            return pathMatch[1].toLowerCase();
        }

        return '';
    }

    getDataCandidates() {
        const slug = this.getRequestedLessonSlug();
        const candidates = [];

        // Novo formato escalavel: um unico JSON para todo o curso.
        candidates.push({ type: 'course', url: '../lessons/course-data.json', slug });

        if (slug) {
            // Compatibilidade com formato legado por pasta.
            candidates.push({ type: 'legacy', url: `../lessons/${slug}/data.json` });
            candidates.push({ type: 'legacy', url: `../${slug}/data.json` });
        }

        candidates.push({ type: 'legacy', url: 'data.json' });
        return candidates;
    }

    extractLessonFromCourseData(courseData, requestedSlug = '') {
        const lessons = Array.isArray(courseData?.lessons) ? courseData.lessons : [];
        if (!lessons.length) return null;

        const normalizedSlug = String(requestedSlug || '').trim().toLowerCase();
        const fallbackSlug = String(courseData?.defaultLesson || '').trim().toLowerCase();

        let selected = null;
        if (normalizedSlug) {
            selected = lessons.find((lesson) => String(lesson?.slug || '').trim().toLowerCase() === normalizedSlug) || null;
        }

        if (!selected && fallbackSlug) {
            selected = lessons.find((lesson) => String(lesson?.slug || '').trim().toLowerCase() === fallbackSlug) || null;
        }

        if (!selected) {
            selected = lessons[0];
        }

        if (!selected?.lesson_info || !Array.isArray(selected?.questions)) {
            return null;
        }

        return selected;
    }

    async loadData() {
        // Carrega configurações da aula e banco de questões.
        const candidates = this.getDataCandidates();

        for (const candidate of candidates) {
            try {
                const response = await fetch(candidate.url, { cache: 'no-store' });
                if (!response.ok) continue;

                const data = await response.json();

                if (candidate.type === 'course') {
                    const selectedLesson = this.extractLessonFromCourseData(data, candidate.slug);
                    if (!selectedLesson) continue;
                    this.lessonInfo = selectedLesson.lesson_info;
                    this.questions = selectedLesson.questions;
                } else {
                    this.lessonInfo = data.lesson_info;
                    this.questions = data.questions;
                }

                return true;
            } catch (_) {
                // Tenta próximo candidato em silêncio para manter fallback resiliente.
            }
        }

        console.error('Erro ao carregar conteúdo da aula. URLs tentadas:', candidates.map(c => c.url));
        return false;
    }

    getCurrentQuestion() {
        // Retorna a pergunta da etapa corrente.
        return this.questions[this.curStep];
    }

    getLessonId() {
        // Retorna a ID da aula do arquivo data.json
        if(!this.lessonInfo) return '';
        return this.lessonInfo.id || '';
    }

    getTopicData(topicId) {
        if(!this.lessonInfo) return null;
        const topics = Array.isArray(this.lessonInfo.topics) ? this.lessonInfo.topics : [];

        let normalizedTopicId = topicId;
        if (Array.isArray(normalizedTopicId)) {
            normalizedTopicId = normalizedTopicId[0];
        }

        normalizedTopicId = String(normalizedTopicId || '').trim();
        // Busca metadados do tema/era pelo id.
        const found = topics.find(t => String(t.id || '').trim() === normalizedTopicId);
        return found || topics[0] || null;
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

    addScore(points) {
        // Adiciona pontos e retorna a nova pontuação.
        this.playerScore += points;
        return this.playerScore;
    }
}