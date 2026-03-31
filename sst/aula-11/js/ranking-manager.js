// ===================================================================
// RANKING MANAGER - Gerencia dados no Firebase
// ===================================================================

import {
    get,
    off,
    onValue,
    ref,
    set
} from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js';
import { database, ensureFirebaseAuth } from './firebase-config.js';

export default class RankingManager {
    constructor(lessonId = '') {
        this.isFirebaseReady = Boolean(database);
        this.rankingQuery = null;
        this.lessonId = lessonId; // ID da aula (ex: "Aula-11")
    }
    
    setLessonId(lessonId) {
        this.lessonId = lessonId;
    }

    async ensureAccess() {
        if (!this.isFirebaseReady) {
            console.warn('Firebase não está configurado. Ranking desabilitado.');
            return false;
        }

        const user = await ensureFirebaseAuth();
        if (!user) {
            console.warn('Falha ao autenticar no Firebase. Ranking indisponível.');
            return false;
        }

        return true;
    }

    sortScores(scores = []) {
        // Ordena por pontuação (desc) e usa menor tempo como desempate.
        return [...scores].sort((a, b) => {
            const scoreA = Number(a?.score || 0);
            const scoreB = Number(b?.score || 0);
            if (scoreA !== scoreB) return scoreB - scoreA;

            const timeA = Number.isFinite(Number(a?.gameTime)) ? Number(a.gameTime) : Number.POSITIVE_INFINITY;
            const timeB = Number.isFinite(Number(b?.gameTime)) ? Number(b.gameTime) : Number.POSITIVE_INFINITY;
            if (timeA !== timeB) return timeA - timeB;

            // Critério estável final: registro mais antigo primeiro.
            return Number(a?.timestamp || 0) - Number(b?.timestamp || 0);
        });
    }

    async saveScore(playerName, score, correctAnswers, totalQuestions, gameTime = 0) {
        if (!(await this.ensureAccess())) {
            return false;
        }

        try {
            const timestamp = new Date().getTime();
            const scoreData = {
                name: playerName.trim().toUpperCase(),
                score: score,
                correct: correctAnswers,
                total: totalQuestions,
                accuracy: Math.round((correctAnswers / totalQuestions) * 100),
                gameTime: gameTime,
                timestamp: timestamp,
                date: new Date().toLocaleDateString('pt-BR'),
                lesson: this.lessonId // Adiciona identificador da aula
            };

            // Salva com ID único baseado em timestamp + nome
            const scoreId = `${timestamp}_${playerName.replace(/\s+/g, '_')}`;
            await set(ref(database, `scores/${scoreId}`), scoreData);

            console.log('Score salvo com sucesso!', scoreData);
            return true;
        } catch (error) {
            console.error('Erro ao salvar score:', error);
            return false;
        }
    }

    async getTopScores(limit = 10) {
        if (!(await this.ensureAccess())) {
            return [];
        }

        try {
            const snapshot = await get(ref(database, 'scores'));
            const scores = [];

            if (snapshot.exists()) {
                snapshot.forEach(childSnapshot => {
                    const scoreData = childSnapshot.val();
                    // Filtra APENAS scores da aula atual (se lessonId estiver definido)
                    if (this.lessonId && scoreData.lesson === this.lessonId) {
                        scores.push(scoreData);
                    }
                });
            }

            return this.sortScores(scores).slice(0, limit);
        } catch (error) {
            console.error('Erro ao buscar ranking:', error);
            return [];
        }
    }

    subscribeToTopScores(limit = 10, callback) {
        this.ensureAccess().then((isAllowed) => {
            if (!isAllowed) {
                callback([]);
                return;
            }

            // Listener em tempo real para atualizações do ranking (ordenação local com desempate por tempo).
            const rankingQuery = ref(database, 'scores');
            this.rankingQuery = rankingQuery;

            onValue(rankingQuery, (snapshot) => {
                const scores = [];

                if (snapshot.exists()) {
                    snapshot.forEach(childSnapshot => {
                        const scoreData = childSnapshot.val();
                        // Filtra APENAS scores da aula atual (se lessonId estiver definido)
                        if (this.lessonId && scoreData.lesson === this.lessonId) {
                            scores.push(scoreData);
                        }
                    });
                }

                callback(this.sortScores(scores).slice(0, limit));
            });
        });

        return null;
    }

    unsubscribe() {
        if (this.rankingQuery) {
            off(this.rankingQuery);
            this.rankingQuery = null;
        }
    }

    formatTime(seconds) {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        if (hrs > 0) {
            return `${hrs}h ${mins}m ${secs}s`;
        } else if (mins > 0) {
            return `${mins}m ${secs}s`;
        } else {
            return `${secs}s`;
        }
    }
}
