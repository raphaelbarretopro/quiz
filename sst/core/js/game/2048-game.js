const game2048 = {
    id: 'game2048',
    label: '2048',
    async run(ctx) {
        const result = await ctx.view.runGame2048BonusLevel();

        if (ctx.hasTimedOut()) {
            return;
        }

        if (result.won) {
            await ctx.view.showGame2048VictoryPopup(ctx.model.playerName);
            const finalScore = await ctx.view.showGame2048FinalSummary(
                ctx.model.playerScore,
                ctx.reward,
                result.score,
                result.maxTile
            );
            ctx.model.playerScore = finalScore;
            ctx.view.updateScoreDisplay(finalScore);
            return;
        }

        if (result.reason === 'no_lives') {
            ctx.view.showAlert(
                '🔢 Sem Vidas no 2048',
                'Você perdeu as 3 vidas no desafio 2048. Continue acertando as perguntas para liberar uma nova tentativa!',
                () => ctx.view.resumeGameMusic()
            );
            return;
        }

        if (result.reason === 'timeout') {
            ctx.view.showAlert(
                '⏱️ Tempo Esgotado',
                'O tempo acabou antes de alcançar o bloco 256. Continue acertando as perguntas para liberar uma nova tentativa!',
                () => ctx.view.resumeGameMusic()
            );
            return;
        }

        if (result.reason === 'giveup') {
            ctx.view.showAlert(
                '⏸️ Desafio Interrompido',
                'O desafio 2048 foi interrompido. Continue acertando as perguntas para liberar uma nova tentativa.',
                () => ctx.view.resumeGameMusic()
            );
            return;
        }

        ctx.view.showAlert(
            '🔢 Desafio Encerrado',
            'O desafio 2048 foi encerrado. Continue acertando as perguntas para liberar uma nova tentativa!',
            () => ctx.view.resumeGameMusic()
        );
    }
};

export default game2048;