function waitForSokobanResult(view, title, message) {
    return new Promise((resolve) => {
        view.showAlert(title, message, () => {
            view.resumeGameMusic();
            resolve();
        });
    });
}

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

            await waitForSokobanResult(
                ctx.view,
                '📦 SOKOBAN CONCLUÍDO!',
                `Excelente! Você completou o desafio e ganhou +${ctx.reward} pontos. Pontuação atual: ${finalScore}.`
            );
            return;
        }

        // Se o jogo foi interrompido por timeout, não mostra alert adicional
        // O fluxo retorna automaticamente para a contabilização de pontos
        if (result?.reason === 'timeout') {
            await waitForSokobanResult(
                ctx.view,
                '⏱️ Tempo Esgotado no Sokoban',
                `O tempo do desafio acabou antes da conclusão. Nenhum ponto foi adicionado. Pontuação atual: ${ctx.model.playerScore}.`
            );
            return;
        }

        await waitForSokobanResult(
            ctx.view,
            '📦 Desafio Interrompido',
            `O desafio Sokoban foi interrompido antes da conclusão. Nenhum ponto foi adicionado. Pontuação atual: ${ctx.model.playerScore}.`
        );
    }
};

export default sokobanGame;
