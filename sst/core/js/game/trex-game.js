const tRexGame = {
    id: 'trex',
    label: 'T-REX',
    async run(ctx) {
        const result = await ctx.view.runTRexBonusLevel();

        if (ctx.hasTimedOut()) {
            return;
        }

        if (result.won) {
            await ctx.view.showTRexVictoryPopup(ctx.model.playerName);
            const finalScore = await ctx.view.showTRexFinalSummary(
                ctx.model.playerScore,
                ctx.reward,
                result.distance
            );
            ctx.model.playerScore = finalScore;
            ctx.view.updateScoreDisplay(finalScore);
            return;
        }

        ctx.view.showAlert(
            '🦖 Jogo Interrompido',
            'Você foi colidido e o desafio T-REX foi interrompido. Continue acertando as perguntas para liberar uma nova tentativa!',
            () => ctx.view.resumeGameMusic()
        );
    }
};

export default tRexGame;
