const asteroidsGame = {
    id: 'asteroids',
    label: 'ASTEROIDS',
    async run(ctx) {
        const result = await ctx.view.runAsteroidsBonusLevel();

        if (ctx.hasTimedOut()) {
            return;
        }

        if (result.won) {
            await ctx.view.showAsteroidsVictoryPopup(ctx.model.playerName);
            const finalScore = await ctx.view.showAsteroidsFinalSummary(
                ctx.model.playerScore,
                ctx.reward,
                result.asteroidsDestroyed,
                result.bestCombo
            );
            ctx.model.playerScore = finalScore;
            ctx.view.updateScoreDisplay(finalScore);
            return;
        }

        if (result.reason === 'no_lives') {
            ctx.view.showAlert(
                '☄️ Sem Vidas no Asteroids',
                'Você perdeu as 3 vidas no desafio ASTEROIDS. Continue acertando as perguntas para liberar uma nova tentativa!',
                () => ctx.view.resumeGameMusic()
            );
            return;
        }

        if (result.reason === 'timeout') {
            ctx.view.showAlert(
                '⏱️ Tempo Esgotado',
                'O tempo acabou antes de destruir 18 asteroides. Continue acertando as perguntas para liberar uma nova tentativa!',
                () => ctx.view.resumeGameMusic()
            );
            return;
        }

        if (result.reason === 'giveup') {
            ctx.view.showAlert(
                '⏸️ Desafio Interrompido',
                'O desafio ASTEROIDS foi interrompido. Continue acertando as perguntas para liberar uma nova tentativa.',
                () => ctx.view.resumeGameMusic()
            );
            return;
        }

        ctx.view.showAlert(
            '☄️ Desafio Encerrado',
            'O desafio ASTEROIDS foi encerrado. Continue acertando as perguntas para liberar uma nova tentativa!',
            () => ctx.view.resumeGameMusic()
        );
    }
};

export default asteroidsGame;