const snakeGame = {
    id: 'snake',
    label: 'SNAKE',
    async run(ctx) {
        const result = await ctx.view.runSnakeBonusLevel();

        if (ctx.hasTimedOut()) {
            return;
        }

        if (result.won) {
            await ctx.view.showSnakeVictoryPopup(ctx.model.playerName);
            const finalScore = await ctx.view.showSnakeFinalSummary(
                ctx.model.playerScore,
                ctx.reward,
                result.applesEaten
            );
            ctx.model.playerScore = finalScore;
            ctx.view.updateScoreDisplay(finalScore);
            return;
        }

        if (result.reason === 'no_lives') {
            ctx.view.showAlert(
                '💀 Vidas Esgotadas',
                'Você usou todas as 3 vidas no desafio SNAKE. Continue acertando as perguntas para liberar uma nova tentativa!',
                () => ctx.view.resumeGameMusic()
            );
            return;
        }

        if (result.reason === 'giveup') {
            ctx.view.showAlert(
                '⏸️ Desafio Interrompido',
                'O desafio SNAKE foi interrompido. Continue acertando as perguntas para liberar uma nova tentativa.',
                () => ctx.view.resumeGameMusic()
            );
            return;
        }

        ctx.view.showAlert(
            '🐍 Jogo Encerrado',
            'O desafio SNAKE foi encerrado. Continue acertando as perguntas para liberar uma nova tentativa!',
            () => ctx.view.resumeGameMusic()
        );
    }
};

export default snakeGame;
