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
import { database, databaseURL, ensureFirebaseAuth } from './firebase-config.js';

export default class RankingManager {
    constructor(lessonId = '') {
        this.isFirebaseReady = Boolean(database);
        this.rankingQuery = null;
        this.rankingFallbackTimer = null;
        this.lessonId = lessonId; // ID da aula (ex: "Aula-11")
    }
    
    setLessonId(lessonId) {
        this.lessonId = lessonId;
    }

    normalizeLessonId(value) {
        return String(value ?? '')
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9]/g, '');
    }

    extractPlayerName(scoreData = {}, fallbackKey = '') {
        const preferredName = scoreData?.name ?? scoreData?.playerName ?? scoreData?.nome ?? scoreData?.player;
        const safeName = String(preferredName ?? '').trim();
        if (safeName) return safeName;

        const keyNamePart = String(fallbackKey || '').split('_').slice(1).join('_').replace(/_/g, ' ').trim();
        return keyNamePart;
    }

    normalizeScoreData(scoreData = {}, fallbackKey = '') {
        return {
            ...scoreData,
            name: this.extractPlayerName(scoreData, fallbackKey),
            playerUid: String(scoreData?.playerUid || scoreData?.uid || '').trim(),
            playerEmail: String(scoreData?.playerEmail || scoreData?.email || '').trim(),
            playerAlias: String(scoreData?.playerAlias || scoreData?.alias || '').trim()
        };
    }

    getScoresFromSnapshot(snapshot) {
        const scores = [];
        if (!snapshot?.exists()) return scores;

        snapshot.forEach((childSnapshot) => {
            const scoreData = this.normalizeScoreData(childSnapshot.val(), childSnapshot.key);
            if (this.matchesCurrentLesson(scoreData)) {
                scores.push(scoreData);
            }
        });

        return scores;
    }

    async getScoresViaRest() {
        if (!databaseURL) return [];

        try {
            const response = await fetch(`${databaseURL.replace(/\/$/, '')}/scores.json`, { cache: 'no-store' });
            if (!response.ok) return [];

            const data = await response.json();
            if (!data || typeof data !== 'object') return [];

            const scores = [];
            Object.entries(data).forEach(([key, value]) => {
                const scoreData = this.normalizeScoreData(value || {}, key);
                if (this.matchesCurrentLesson(scoreData)) {
                    scores.push(scoreData);
                }
            });

            return scores;
        } catch (error) {
            console.error('Erro ao buscar ranking via REST:', error);
            return [];
        }
    }

    matchesCurrentLesson(scoreData = {}) {
        if (!this.lessonId) return true;

        const currentLesson = this.normalizeLessonId(this.lessonId);
        const scoreLesson = this.normalizeLessonId(scoreData?.lesson ?? scoreData?.lessonId ?? scoreData?.aula);
        return currentLesson === scoreLesson;
    }

    async ensureAccess() {
        if (!this.isFirebaseReady) {
            console.warn('Firebase não está configurado. Ranking desabilitado.');
            return false;
        }

        try {
            const user = await ensureFirebaseAuth();
            return Boolean(user);
        } catch (error) {
            console.warn('Erro ao validar autenticação Google para ranking.', error);
            return false;
        }
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

    async saveScore(playerName, score, correctAnswers, totalQuestions, gameTime = 0, identity = {}) {
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
                lesson: this.lessonId, // Adiciona identificador da aula
                playerUid: String(identity?.uid || '').trim(),
                playerEmail: String(identity?.email || '').trim().toLowerCase(),
                playerAlias: String(identity?.alias || '').trim()
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
        const hasAccess = await this.ensureAccess();
        if (!hasAccess) return [];

        let scores = [];
        try {
            if (this.isFirebaseReady) {
                const snapshot = await get(ref(database, 'scores'));
                scores = this.getScoresFromSnapshot(snapshot);
            }
        } catch (error) {
            console.error('Erro ao buscar ranking:', error);
        }

        if (scores.length === 0) {
            const restScores = await this.getScoresViaRest();
            if (restScores.length > 0) {
                scores = restScores;
            }
        }

        return this.sortScores(scores).slice(0, limit);
    }

    subscribeToTopScores(limit = 10, callback) {
        this.ensureAccess().then(async (hasAccess) => {
            if (!hasAccess) {
                callback([]);
                return;
            }

            const emitFallback = async () => {
                const scores = this.sortScores(await this.getScoresViaRest()).slice(0, limit);
                callback(scores);
            };

            if (!this.isFirebaseReady) {
                await emitFallback();
                if (!this.rankingFallbackTimer) {
                    this.rankingFallbackTimer = setInterval(emitFallback, 12000);
                }
                return;
            }

            // Listener em tempo real para atualizações do ranking (ordenação local com desempate por tempo).
            const rankingQuery = ref(database, 'scores');
            this.rankingQuery = rankingQuery;

            onValue(rankingQuery, (snapshot) => {
                const scores = this.getScoresFromSnapshot(snapshot);
                callback(this.sortScores(scores).slice(0, limit));
            }, async (error) => {
                console.error('Erro no listener em tempo real do ranking:', error);
                await emitFallback();
                if (!this.rankingFallbackTimer) {
                    this.rankingFallbackTimer = setInterval(emitFallback, 12000);
                }
            });
        });

        return null;
    }

    unsubscribe() {
        if (this.rankingQuery) {
            off(this.rankingQuery);
            this.rankingQuery = null;
        }
        if (this.rankingFallbackTimer) {
            clearInterval(this.rankingFallbackTimer);
            this.rankingFallbackTimer = null;
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
