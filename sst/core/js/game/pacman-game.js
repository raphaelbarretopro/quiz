const pacmanGame = {
    id: 'pacman',
    label: 'PAC-MAN',
    async run(ctx) {
        const result = await ctx.view.runPacmanBonusLevel();

        if (ctx.hasTimedOut()) {
            return;
        }

        if (result.won) {
            const finalScore = await ctx.view.showPacmanFinalSummary(
                ctx.model.playerScore,
                ctx.reward,
                result.cherryBonus
            );
            ctx.model.playerScore = finalScore;
            ctx.view.updateScoreDisplay(finalScore);
            return;
        }

        if (result.reason === 'timeout') {
            ctx.view.showAlert(
                '⏱️ Tempo Esgotado no PAC-MAN',
                'O cronômetro do desafio PAC-MAN chegou a 0s antes de limpar todos os pontos.',
                () => ctx.view.resumeGameMusic()
            );
            return;
        }

        if (result.reason === 'giveup' || result.reason === 'interrupted') {
            ctx.view.showAlert(
                '⏸️ Desafio Interrompido',
                'O desafio PAC-MAN foi interrompido antes da conclusão. Continue acertando para tentar novamente.',
                () => ctx.view.resumeGameMusic()
            );
            return;
        }

        ctx.view.showAlert(
            '👻 Desafio Não Concluído',
            'Você esgotou os 3 créditos do desafio especial desta vez. Continue acertando para tentar novamente!',
            () => ctx.view.resumeGameMusic()
        );
    }
};

export default pacmanGame;
