const lordeHeroGame = {
    id: 'lordehero',
    label: 'LORDE HERO',
    async run(ctx) {
        const result = await ctx.view.runLordeHeroBonusLevel();

        if (ctx.hasTimedOut()) {
            return;
        }

        if (result.won) {
            await ctx.view.showLordeHeroVictoryPopup(ctx.model.playerName);
            const finalScore = await ctx.view.showLordeHeroFinalSummary(
                ctx.model.playerScore,
                ctx.reward,
                result.score,
                result.maxCombo
            );
            ctx.model.playerScore = finalScore;
            ctx.view.updateScoreDisplay(finalScore);
            return;
        }

        if (result.reason === 'giveup') {
            ctx.view.showAlert(
                '⏸️ Desafio Interrompido',
                'O desafio LORDE HERO foi interrompido. Continue acertando as perguntas para liberar uma nova tentativa.',
                () => ctx.view.resumeGameMusic()
            );
            return;
        }

        if (result.reason === 'timeout') {
            ctx.view.showAlert(
                '⏰ Tempo Esgotado',
                'O tempo acabou no desafio LORDE HERO. Continue acertando para liberar uma nova tentativa!',
                () => ctx.view.resumeGameMusic()
            );
            return;
        }

        if (result.reason === 'low_score') {
            ctx.view.showAlert(
                '🎸 Pontuação Insuficiente',
                'Você precisa alcançar pelo menos 120 pontos no LORDE HERO para vencer. Continue acertando e tente novamente!',
                () => ctx.view.resumeGameMusic()
            );
            return;
        }

        ctx.view.showAlert(
            '🎸 Jogo Encerrado',
            'O desafio LORDE HERO foi encerrado. Continue acertando as perguntas para liberar uma nova tentativa!',
            () => ctx.view.resumeGameMusic()
        );
    }
};

export default lordeHeroGame;
