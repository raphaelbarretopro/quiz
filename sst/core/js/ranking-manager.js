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

    parseScoreValue(value) {
        const direct = Number(value);
        if (Number.isFinite(direct)) return direct;

        const raw = String(value ?? '').trim();
        if (!raw) return 0;

        // Compatibilidade com dados legados: remove separadores e mantém apenas sinal/dígitos.
        const normalized = raw.replace(/[^\d-]/g, '');
        const parsed = Number(normalized);
        return Number.isFinite(parsed) ? parsed : 0;
    }

    parseGameTimeSeconds(value) {
        const direct = Number(value);
        if (Number.isFinite(direct) && direct >= 0) {
            return Math.floor(direct);
        }

        const raw = String(value ?? '').trim();
        if (!raw) return Number.POSITIVE_INFINITY;

        // Suporta formatos legados como mm:ss e hh:mm:ss.
        if (raw.includes(':')) {
            const parts = raw.split(':').map((part) => Number(String(part).trim()));
            if (parts.every((part) => Number.isFinite(part) && part >= 0)) {
                if (parts.length === 2) {
                    return Math.floor(parts[0] * 60 + parts[1]);
                }
                if (parts.length === 3) {
                    return Math.floor(parts[0] * 3600 + parts[1] * 60 + parts[2]);
                }
            }
        }

        // Fallback para strings com números soltos (ex.: "1064s", "17m 44s").
        const digitsOnly = raw.replace(/[^\d]/g, '');
        const parsed = Number(digitsOnly);
        return Number.isFinite(parsed) ? parsed : Number.POSITIVE_INFINITY;
    }

    parseIntegerValue(value, fallback = 0) {
        const parsed = Number(value);
        if (!Number.isFinite(parsed)) return fallback;
        return Math.floor(parsed);
    }

    normalizeIdentityToken(value) {
        return String(value ?? '')
            .trim()
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]/g, '');
    }

    getPlayerIdentityKey(scoreData = {}) {
        const uidKey = this.normalizeIdentityToken(scoreData?.playerUid);
        if (uidKey) return `uid:${uidKey}`;

        const emailKey = this.normalizeIdentityToken(scoreData?.playerEmail);
        if (emailKey) return `email:${emailKey}`;

        const aliasKey = this.normalizeIdentityToken(scoreData?.playerAlias);
        if (aliasKey) return `alias:${aliasKey}`;

        const nameKey = this.normalizeIdentityToken(scoreData?.name);
        if (nameKey) return `name:${nameKey}`;

        // Sem identidade confiável: não deduplica com outros jogadores.
        const ts = this.parseIntegerValue(scoreData?.timestamp, Date.now());
        const score = this.parseScoreValue(scoreData?.score);
        return `entry:${ts}:${score}`;
    }

    normalizeScoreData(scoreData = {}, fallbackKey = '') {
        const total = this.parseIntegerValue(scoreData?.total, 0);
        const correct = this.parseIntegerValue(scoreData?.correct, 0);
        const safeTotal = Math.max(0, total);
        const safeCorrect = Math.max(0, Math.min(correct, safeTotal || correct));
        const accuracy = safeTotal > 0
            ? Math.round((safeCorrect / safeTotal) * 100)
            : this.parseIntegerValue(scoreData?.accuracy, 0);

        return {
            ...scoreData,
            name: this.extractPlayerName(scoreData, fallbackKey),
            score: this.parseScoreValue(scoreData?.score),
            gameTime: this.parseGameTimeSeconds(scoreData?.gameTime),
            correct: safeCorrect,
            total: safeTotal,
            accuracy,
            timestamp: this.parseIntegerValue(scoreData?.timestamp, 0),
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
            const scoreA = this.parseScoreValue(a?.score);
            const scoreB = this.parseScoreValue(b?.score);
            if (scoreA !== scoreB) return scoreB - scoreA;

            const timeA = this.parseGameTimeSeconds(a?.gameTime);
            const timeB = this.parseGameTimeSeconds(b?.gameTime);
            if (timeA !== timeB) return timeA - timeB;

            // Critério estável final: registro mais antigo primeiro.
            return this.parseIntegerValue(a?.timestamp, 0) - this.parseIntegerValue(b?.timestamp, 0);
        });
    }

    consolidateBestScorePerPlayer(scores = []) {
        const byPlayer = new Map();

        scores.forEach((rawScore) => {
            const scoreData = this.normalizeScoreData(rawScore);
            if (!Number.isFinite(scoreData.score) || scoreData.score < 0) return;

            const key = this.getPlayerIdentityKey(scoreData);
            const previous = byPlayer.get(key);
            if (!previous) {
                byPlayer.set(key, scoreData);
                return;
            }

            const [best] = this.sortScores([previous, scoreData]);
            byPlayer.set(key, best);
        });

        return Array.from(byPlayer.values());
    }

    buildLeaderboard(scores = [], limit = 10) {
        const consolidated = this.consolidateBestScorePerPlayer(scores);
        return this.sortScores(consolidated).slice(0, limit);
    }

    buildSafeScoreId(playerName = '', timestamp = Date.now()) {
        // Chaves do Realtime Database não aceitam . # $ [ ] /.
        const normalizedName = String(playerName || '')
            .trim()
            .toLowerCase()
            .replace(/[.#$\[\]/]/g, '_')
            .replace(/\s+/g, '_')
            .replace(/_+/g, '_')
            .replace(/^_+|_+$/g, '');

        const safeName = normalizedName || 'jogador';
        return `${timestamp}_${safeName}`;
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
            const scoreId = this.buildSafeScoreId(playerName, timestamp);
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

        return this.buildLeaderboard(scores, limit);
    }

    subscribeToTopScores(limit = 10, callback) {
        this.ensureAccess().then(async (hasAccess) => {
            if (!hasAccess) {
                callback([]);
                return;
            }

            const emitFallback = async () => {
                const scores = this.buildLeaderboard(await this.getScoresViaRest(), limit);
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
                callback(this.buildLeaderboard(scores, limit));
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
