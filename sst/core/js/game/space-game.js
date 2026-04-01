const spaceGame = {
    id: 'space',
    label: 'SPACE',
    async run(ctx) {
        const result = await ctx.view.runSpaceBonusLevel();

        if (ctx.hasTimedOut()) {
            return;
        }

        if (result.won) {
            await ctx.view.showSpaceVictoryPopup(ctx.model.playerName);
            const finalScore = await ctx.view.showSpaceFinalSummary(
                ctx.model.playerScore,
                ctx.reward,
                result.score
            );
            ctx.model.playerScore = finalScore;
            ctx.view.updateScoreDisplay(finalScore);
            return;
        }

        ctx.view.showAlert(
            '🚀 Jogo Interrompido',
            'Você foi destruído e o desafio SPACE foi interrompido. Continue acertando as perguntas para liberar uma nova tentativa!',
            () => ctx.view.resumeGameMusic()
        );
    }
};

export default spaceGame;
