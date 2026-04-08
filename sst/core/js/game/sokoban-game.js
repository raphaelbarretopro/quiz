const sokobanGame = {
    id: 'sokoban',
    label: 'SOKOBAN',
    async run(ctx) {
        if (typeof ctx.runSokobanBonusRound !== 'function') {
            return;
        }

        const result = await ctx.runSokobanBonusRound();

        if (ctx.hasTimedOut()) {
            return;
        }

        if (result?.won) {
            const oldScore = ctx.model.playerScore;
            const finalScore = oldScore + Number(ctx.reward || 0);
            ctx.model.playerScore = finalScore;
            ctx.view.animateScoreIncrease(oldScore, finalScore);

            ctx.view.showAlert(
                '📦 SOKOBAN CONCLUÍDO!',
                `Excelente! Você completou o desafio e ganhou +${ctx.reward} pontos.`,
                () => ctx.view.resumeGameMusic()
            );
            return;
        }

        // Se o jogo foi interrompido por timeout, não mostra alert adicional
        // O fluxo retorna automaticamente para a contabilização de pontos
        if (result?.reason === 'timeout') {
            return;
        }

        ctx.view.showAlert(
            '📦 Desafio Interrompido',
            'O desafio Sokoban foi interrompido antes da conclusão. Continue acertando para tentar novamente.',
            () => ctx.view.resumeGameMusic()
        );
    }
};

export default sokobanGame;
