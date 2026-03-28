// ===================================================================
// RANKING MANAGER - Gerencia dados no Firebase
// ===================================================================

import {
    get,
    limitToLast,
    off,
    onValue,
    orderByChild,
    query,
    ref,
    set
} from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js';
import { database } from './firebase-config.js';

export default class RankingManager {
    constructor() {
        this.isFirebaseReady = Boolean(database);
        this.rankingQuery = null;
    }

    async saveScore(playerName, score, correctAnswers, totalQuestions, gameTime = 0) {
        if (!this.isFirebaseReady) {
            console.warn('Firebase não está configurado. Ranking desabilitado.');
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
                date: new Date().toLocaleDateString('pt-BR')
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
        if (!this.isFirebaseReady) {
            console.warn('Firebase não está configurado.');
            return [];
        }

        try {
            const rankingQuery = query(
                ref(database, 'scores'),
                orderByChild('score'),
                limitToLast(limit)
            );
            const snapshot = await get(rankingQuery);
            const scores = [];

            if (snapshot.exists()) {
                snapshot.forEach(childSnapshot => {
                    scores.push(childSnapshot.val());
                });
            }

            // Em alguns cenarios de regra/indice, a query pode retornar vazia.
            // Faz fallback para leitura direta e ordenacao local.
            if (scores.length === 0) {
                const fallbackSnapshot = await get(ref(database, 'scores'));
                if (!fallbackSnapshot.exists()) {
                    return [];
                }

                const allScores = [];
                fallbackSnapshot.forEach(childSnapshot => {
                    allScores.push(childSnapshot.val());
                });

                return allScores
                    .sort((a, b) => Number(b.score || 0) - Number(a.score || 0))
                    .slice(0, limit);
            }

            // Inverte para mostrar em ordem decrescente (maior primeiro)
            return scores.reverse();
        } catch (error) {
            console.error('Erro ao buscar ranking:', error);
            return [];
        }
    }

    subscribeToTopScores(limit = 10, callback) {
        if (!this.isFirebaseReady) {
            console.warn('Firebase não está configurado.');
            return null;
        }

        // Listener em tempo real para atualizações do ranking
        const rankingQuery = query(
            ref(database, 'scores'),
            orderByChild('score'),
            limitToLast(limit)
        );

        this.rankingQuery = rankingQuery;
        onValue(rankingQuery, (snapshot) => {
            const scores = [];
            if (snapshot.exists()) {
                snapshot.forEach(childSnapshot => {
                    scores.push(childSnapshot.val());
                });
            }
            callback(scores.reverse());
        });

        return rankingQuery;
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
