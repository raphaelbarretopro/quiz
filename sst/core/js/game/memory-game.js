const memoryGame = {
    id: 'memory',
    label: 'MEMÓRIA',
    async run(ctx) {
        const result = await ctx.view.runMemoryBonusLevel();

        if (ctx.hasTimedOut()) {
            return;
        }

        if (result.won) {
            await ctx.view.showMemoryVictoryPopup(ctx.model.playerName);
            const finalScore = await ctx.view.showMemoryFinalSummary(
                ctx.model.playerScore,
                ctx.reward,
                result.pairsMatched
            );
            ctx.model.playerScore = finalScore;
            ctx.view.updateScoreDisplay(finalScore);
            return;
        }

        if (result.reason === 'no_lives') {
            ctx.view.showAlert(
                '💀 Vidas Esgotadas',
                'Você cometeu erros demais no desafio MEMÓRIA. Continue acertando as perguntas para liberar uma nova tentativa!',
                () => ctx.view.resumeGameMusic()
            );
            return;
        }

        if (result.reason === 'timeout') {
            ctx.view.showAlert(
                '⏰ Tempo Esgotado',
                'O tempo acabou antes de você encontrar todos os pares. Continue acertando para liberar uma nova tentativa!',
                () => ctx.view.resumeGameMusic()
            );
            return;
        }

        if (result.reason === 'giveup') {
            ctx.view.showAlert(
                '⏸️ Desafio Interrompido',
                'O desafio MEMÓRIA foi interrompido. Continue acertando as perguntas para liberar uma nova tentativa.',
                () => ctx.view.resumeGameMusic()
            );
            return;
        }

        ctx.view.showAlert(
            '🧠 Jogo Encerrado',
            'O desafio MEMÓRIA foi encerrado. Continue acertando as perguntas para liberar uma nova tentativa!',
            () => ctx.view.resumeGameMusic()
        );
    }
};

export default memoryGame;
