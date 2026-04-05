const arkanoidGame = {
    id: 'arkanoid',
    label: 'ARKANOID',
    async run(ctx) {
        const result = await ctx.view.runArkanoidBonusLevel();

        if (ctx.hasTimedOut()) {
            return;
        }

        if (result.won) {
            await ctx.view.showArkanoidVictoryPopup(ctx.model.playerName);
            const finalScore = await ctx.view.showArkanoidFinalSummary(
                ctx.model.playerScore,
                ctx.reward,
                result.bricksDestroyed,
                result.bestCombo
            );
            ctx.model.playerScore = finalScore;
            ctx.view.updateScoreDisplay(finalScore);
            return;
        }

        if (result.reason === 'no_lives') {
            ctx.view.showAlert(
                '🧱 Sem Vidas no Arkanoid',
                'Você perdeu as 3 vidas no desafio ARKANOID. Continue acertando as perguntas para liberar uma nova tentativa!',
                () => ctx.view.resumeGameMusic()
            );
            return;
        }

        if (result.reason === 'timeout') {
            ctx.view.showAlert(
                '⏱️ Tempo Esgotado',
                'O tempo acabou antes de destruir 24 blocos. Continue acertando as perguntas para liberar uma nova tentativa!',
                () => ctx.view.resumeGameMusic()
            );
            return;
        }

        if (result.reason === 'giveup') {
            ctx.view.showAlert(
                '⏸️ Desafio Interrompido',
                'O desafio ARKANOID foi interrompido. Continue acertando as perguntas para liberar uma nova tentativa.',
                () => ctx.view.resumeGameMusic()
            );
            return;
        }

        ctx.view.showAlert(
            '🧱 Desafio Encerrado',
            'O desafio ARKANOID foi encerrado. Continue acertando as perguntas para liberar uma nova tentativa!',
            () => ctx.view.resumeGameMusic()
        );
    }
};

export default arkanoidGame;