const minesweeperGame = {
    id: 'minesweeper',
    label: 'MINESWEEPER',
    async run(ctx) {
        const result = await ctx.view.runMinesweeperBonusLevel();

        if (ctx.hasTimedOut()) {
            return;
        }

        if (result.won) {
            await ctx.view.showMinesweeperVictoryPopup(ctx.model.playerName);
            const finalScore = await ctx.view.showMinesweeperFinalSummary(
                ctx.model.playerScore,
                ctx.reward,
                result.safeRevealed,
                result.flagsUsed
            );
            ctx.model.playerScore = finalScore;
            ctx.view.updateScoreDisplay(finalScore);
            return;
        }

        if (result.reason === 'no_lives') {
            ctx.view.showAlert(
                '💣 Sem Vidas no Minesweeper',
                'Você perdeu as 3 vidas no desafio MINESWEEPER. Continue acertando as perguntas para liberar uma nova tentativa!',
                () => ctx.view.resumeGameMusic()
            );
            return;
        }

        if (result.reason === 'timeout') {
            ctx.view.showAlert(
                '⏱️ Tempo Esgotado',
                'O tempo acabou antes de limpar o campo minado. Continue acertando as perguntas para liberar uma nova tentativa!',
                () => ctx.view.resumeGameMusic()
            );
            return;
        }

        if (result.reason === 'giveup') {
            ctx.view.showAlert(
                '⏸️ Desafio Interrompido',
                'O desafio MINESWEEPER foi interrompido. Continue acertando as perguntas para liberar uma nova tentativa.',
                () => ctx.view.resumeGameMusic()
            );
            return;
        }

        ctx.view.showAlert(
            '💣 Desafio Encerrado',
            'O desafio MINESWEEPER foi encerrado. Continue acertando as perguntas para liberar uma nova tentativa!',
            () => ctx.view.resumeGameMusic()
        );
    }
};

export default minesweeperGame;