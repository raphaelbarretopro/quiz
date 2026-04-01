const enduroGame = {
    id: 'enduro',
    label: 'ENDURO',
    async run(ctx) {
        const result = await ctx.view.runEnduroBonusLevel();

        if (ctx.hasTimedOut()) {
            return;
        }

        if (result.won) {
            await ctx.view.showEnduroVictoryPopup(ctx.model.playerName);
            const finalScore = await ctx.view.showEnduroFinalSummary(
                ctx.model.playerScore,
                ctx.reward,
                result.stagesCompleted,
                result.carsPassed
            );
            ctx.model.playerScore = finalScore;
            ctx.view.updateScoreDisplay(finalScore);
            return;
        }

        ctx.view.showAlert(
            '🏎️ Corrida Interrompida',
            'Você esgotou os 3 carros nesta corrida do ENDURO. Continue acertando para liberar uma nova tentativa!',
            () => ctx.view.resumeGameMusic()
        );
    }
};

export default enduroGame;
