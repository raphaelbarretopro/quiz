const tetrisGame = {
    id: 'tetris',
    label: 'TETRIS',
    async run(ctx) {
        const result = await ctx.view.runTetrisBonusLevel();

        if (ctx.hasTimedOut()) {
            return;
        }

        if (result.won) {
            await ctx.view.showTetrisVictoryPopup(ctx.model.playerName);
            const finalScore = await ctx.view.showTetrisFinalSummary(
                ctx.model.playerScore,
                ctx.reward,
                result.linesCleared
            );
            ctx.model.playerScore = finalScore;
            ctx.view.updateScoreDisplay(finalScore);
            return;
        }

        if (result.reason === 'no_lives') {
            ctx.view.showAlert(
                '🧱 Sem Vidas no Tetris',
                'Você perdeu as 3 vidas no desafio TETRIS. Continue acertando as perguntas para liberar uma nova tentativa!',
                () => ctx.view.resumeGameMusic()
            );
            return;
        }

        if (result.reason === 'timeout') {
            ctx.view.showAlert(
                '⏱️ Tempo Esgotado',
                'O tempo acabou antes de completar o objetivo de linhas. Continue acertando as perguntas para liberar uma nova tentativa!',
                () => ctx.view.resumeGameMusic()
            );
            return;
        }

        if (result.reason === 'giveup') {
            ctx.view.showAlert(
                '⏸️ Desafio Interrompido',
                'O desafio TETRIS foi interrompido. Continue acertando as perguntas para liberar uma nova tentativa.',
                () => ctx.view.resumeGameMusic()
            );
            return;
        }

        ctx.view.showAlert(
            '🧱 Desafio Encerrado',
            'O desafio TETRIS foi encerrado. Continue acertando as perguntas para liberar uma nova tentativa!',
            () => ctx.view.resumeGameMusic()
        );
    }
};

export default tetrisGame;
