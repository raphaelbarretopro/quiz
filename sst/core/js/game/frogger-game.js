const froggerGame = {
    id: 'frogger',
    label: 'FROGGER',
    async run(ctx) {
        const result = await ctx.view.runFroggerBonusLevel();

        if (ctx.hasTimedOut()) {
            return;
        }

        if (result.won) {
            await ctx.view.showFroggerVictoryPopup(ctx.model.playerName);
            const finalScore = await ctx.view.showFroggerFinalSummary(
                ctx.model.playerScore,
                ctx.reward,
                result.crossings
            );
            ctx.model.playerScore = finalScore;
            ctx.view.updateScoreDisplay(finalScore);
            return;
        }

        if (result.reason === 'no_lives') {
            ctx.view.showAlert(
                '🚗 Atropelado!',
                'Você usou todas as 3 vidas no desafio FROGGER. Continue acertando as perguntas para liberar uma nova tentativa!',
                () => ctx.view.resumeGameMusic()
            );
            return;
        }

        if (result.reason === 'timeout') {
            ctx.view.showAlert(
                '⏱️ Tempo Esgotado',
                'O tempo acabou antes de completar as 3 travessias. Continue acertando as perguntas para liberar uma nova tentativa!',
                () => ctx.view.resumeGameMusic()
            );
            return;
        }

        if (result.reason === 'giveup') {
            ctx.view.showAlert(
                '⏸️ Desafio Interrompido',
                'O desafio FROGGER foi interrompido. Continue acertando as perguntas para liberar uma nova tentativa.',
                () => ctx.view.resumeGameMusic()
            );
            return;
        }

        ctx.view.showAlert(
            '🐸 Desafio Encerrado',
            'O desafio FROGGER foi encerrado. Continue acertando as perguntas para liberar uma nova tentativa!',
            () => ctx.view.resumeGameMusic()
        );
    }
};

export default froggerGame;
