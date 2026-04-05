const flappyBirdGame = {
    id: 'flappybird',
    label: 'FLAPPY BIRD',
    async run(ctx) {
        const result = await ctx.view.runFlappyBirdBonusLevel();

        if (ctx.hasTimedOut()) {
            return;
        }

        if (result.won) {
            await ctx.view.showFlappyBirdVictoryPopup(ctx.model.playerName);
            const finalScore = await ctx.view.showFlappyBirdFinalSummary(
                ctx.model.playerScore,
                ctx.reward,
                result.pipesCleared,
                result.bestStreak
            );
            ctx.model.playerScore = finalScore;
            ctx.view.updateScoreDisplay(finalScore);
            return;
        }

        if (result.reason === 'no_lives') {
            ctx.view.showAlert(
                '🐦 Sem Vidas no Flappy Bird',
                'Você perdeu as 3 vidas no desafio FLAPPY BIRD. Continue acertando as perguntas para liberar uma nova tentativa!',
                () => ctx.view.resumeGameMusic()
            );
            return;
        }

        if (result.reason === 'timeout') {
            ctx.view.showAlert(
                '⏱️ Tempo Esgotado',
                'O tempo acabou antes de passar pelos 10 canos. Continue acertando as perguntas para liberar uma nova tentativa!',
                () => ctx.view.resumeGameMusic()
            );
            return;
        }

        if (result.reason === 'giveup') {
            ctx.view.showAlert(
                '⏸️ Desafio Interrompido',
                'O desafio FLAPPY BIRD foi interrompido. Continue acertando as perguntas para liberar uma nova tentativa.',
                () => ctx.view.resumeGameMusic()
            );
            return;
        }

        ctx.view.showAlert(
            '🐦 Desafio Encerrado',
            'O desafio FLAPPY BIRD foi encerrado. Continue acertando as perguntas para liberar uma nova tentativa!',
            () => ctx.view.resumeGameMusic()
        );
    }
};

export default flappyBirdGame;