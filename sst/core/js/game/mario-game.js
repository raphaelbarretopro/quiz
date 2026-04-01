const marioGame = {
    id: 'mario',
    label: 'MARIO',
    async run(ctx) {
        const result = await ctx.view.runMarioBonusLevel();

        if (ctx.hasTimedOut()) {
            return;
        }

        if (result.won) {
            await ctx.view.showMarioVictoryPopup(ctx.model.playerName);
            const finalScore = await ctx.view.showMarioFinalSummary(
                ctx.model.playerScore,
                ctx.reward,
                result.distance
            );
            ctx.model.playerScore = finalScore;
            ctx.view.updateScoreDisplay(finalScore);
            return;
        }

        ctx.view.showAlert(
            '🍄 Jogo Interrompido',
            'Você colidiu com um cano e o desafio MARIO foi interrompido. Continue acertando as perguntas para liberar uma nova tentativa!',
            () => ctx.view.resumeGameMusic()
        );
    }
};

export default marioGame;
