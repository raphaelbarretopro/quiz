export default class View {
    constructor() {
        // Cache centralizado dos elementos da interface para evitar buscas repetidas no DOM.
        this.els = {
            // Modal de login
            loginModalBackdrop: document.getElementById('login-modal-backdrop'),
            btnLoginGoogle: document.getElementById('btn-login-google'),
            
            mainTitle: document.getElementById('main-title'),
            startMotivationText: document.getElementById('start-motivation-text'),
            startKnowledge: document.getElementById('start-knowledge'),
            startKnowledgeList: document.getElementById('start-knowledge-list'),
            btnGoogleLogin: document.getElementById('btn-google-login'),
            authStatus: document.getElementById('auth-status'),
            startScreen: document.getElementById('start-screen'),
            portalScreen: document.getElementById('portal-screen'),
            sokobanScreen: document.getElementById('sokoban-screen'),
            quizScreen: document.getElementById('quiz-screen'),
            introModal: document.getElementById('intro-modal'),
            
            pNameInput: document.getElementById('p-name-input'),
            btnStart: document.getElementById('btn-start'),
            btnPreviewRanking: document.getElementById('btn-preview-ranking'),
            
            spinBtn: document.getElementById('spin-btn'),
            stopBtn: document.getElementById('stop-btn'),
            wheel: document.getElementById('wheel'),

            btnGiveUpSokoban: document.getElementById('btn-giveup-sokoban'),
            sokobanLives: document.getElementById('sokoban-lives'),
            sokobanGrid: document.getElementById('sokoban-grid'),
            
            modalTitle: document.getElementById('modal-title'),
            modalText: document.getElementById('modal-text'),
            btnModalClose: document.getElementById('btn-modal-close'),
            
            eraTag: document.getElementById('era-tag'),
            qTxt: document.getElementById('q-txt'),
            questionCounter: document.getElementById('question-counter'),
            opts: document.getElementById('opts'),
            dragDrop: document.getElementById('drag-drop-container'),
            fbArea: document.getElementById('fb-area'),
            valBtn: document.getElementById('val-btn'),
            nextBtn: document.getElementById('next-btn'),

            // Modal customizado de feedback (substitui alert nativo).
            feedbackModal: document.getElementById('feedback-modal'),
            fbModalTitle: document.getElementById('fb-modal-title'),
            fbModalText: document.getElementById('fb-modal-text'),
            fbModalBtn: document.getElementById('fb-modal-btn'),

            // Painel HUD da direita
            hudRightPanel: document.getElementById('hud-right-panel'),
            columnHintOverlay: document.getElementById('column-hint-overlay'),

            // Painel de pontos
            scorePanel: document.getElementById('score-panel'),
            scoreValue: document.getElementById('score-value'),
            timerDisplay: document.getElementById('timer-display'),
            totalTimeDisplay: document.getElementById('total-time-display'),
            scorePlayer: document.getElementById('score-player'),
            coinsContainer: document.getElementById('coins-container'),
            top15Panel: document.getElementById('top15-panel'),
            top15Body: document.getElementById('top15-body'),
            musicToggle: document.getElementById('music-toggle'),
            musicVolume: document.getElementById('music-volume'),
            streakHud: document.getElementById('streak-popup'),
            streakHudLabel: document.getElementById('streak-popup-value'),
            streakHudMultiplier: document.getElementById('streak-popup-multiplier'),
            streakOverlay: document.getElementById('streak-overlay'),

            // Modal de Ranking
            rankingModal: document.getElementById('ranking-modal'),
            rankingList: document.getElementById('ranking-list'),
            rankingModalClose: document.getElementById('ranking-modal-close'),
            certificateModal: document.getElementById('certificate-modal'),
            certificateContent: document.getElementById('certificate-content'),
            certificateModalClose: document.getElementById('certificate-modal-close'),
            certificatePrintBtn: document.getElementById('certificate-print-btn'),

            // Elementos do Caça Níquel
            slotMachineModal: document.getElementById('slot-machine-modal'),
            slotSpinBtn: document.getElementById('slot-spin-btn'),
            slotCloseBtn: document.getElementById('slot-close-btn'),
            slotResult: document.getElementById('slot-result'),
            slotReel1: document.getElementById('reel-1'),
            slotReel2: document.getElementById('reel-2'),
            slotReel3: document.getElementById('reel-3'),

            // Bonus especial estilo PAC-MAN
            pacmanBonusModal: document.getElementById('pacman-bonus-modal'),
            pacmanCanvas: document.getElementById('pacman-canvas'),
            pacmanPellets: document.getElementById('pacman-pellets'),
            pacmanTimer: document.getElementById('pacman-timer'),
            pacmanUp: document.getElementById('pacman-up'),
            pacmanDown: document.getElementById('pacman-down'),
            pacmanLeft: document.getElementById('pacman-left'),
            pacmanRight: document.getElementById('pacman-right'),
            pacmanGiveUpBtn: document.getElementById('pacman-giveup-btn'),
            pacmanTestBtn: document.getElementById('pacman-test-btn'),
            enduroTestBtn: document.getElementById('enduro-test-btn'),
            trexTestBtn: document.getElementById('trex-test-btn'),
            sokobanTestBtn: document.getElementById('sokoban-test-btn'),

            // Bonus especial estilo ENDURO
            enduroBonusModal: document.getElementById('enduro-bonus-modal'),
            enduroCanvas: document.getElementById('enduro-canvas'),
            enduroStatus: document.getElementById('enduro-status'),
            enduroTimer: document.getElementById('enduro-timer'),
            enduroGiveUpBtn: document.getElementById('enduro-giveup-btn'),

            // Bonus especial estilo T-REX
            trexBonusModal: document.getElementById('trex-bonus-modal'),
            trexCanvas: document.getElementById('trex-canvas'),
            trexDistance: document.getElementById('trex-distance'),
            trexTimer: document.getElementById('trex-timer'),
            trexLives: document.getElementById('trex-lives'),
            trexGiveUpBtn: document.getElementById('trex-giveup-btn'),

            // Bonus especial estilo MARIO
            marioBonusModal: document.getElementById('mario-bonus-modal'),
            marioCanvas: document.getElementById('mario-canvas'),
            marioDistance: document.getElementById('mario-distance'),
            marioTimer: document.getElementById('mario-timer'),
            marioLives: document.getElementById('mario-lives'),
            marioGiveUpBtn: document.getElementById('mario-giveup-btn'),
            marioTestBtn: document.getElementById('mario-test-btn'),

            // Bonus especial estilo SPACE INVADERS
            spaceBonusModal: document.getElementById('space-bonus-modal'),
            spaceCanvas: document.getElementById('space-canvas'),
            spaceScore: document.getElementById('space-score'),
            spaceTimer: document.getElementById('space-timer'),
            spaceLives: document.getElementById('space-lives'),
            spaceGiveUpBtn: document.getElementById('space-giveup-btn'),
            spaceTestBtn: document.getElementById('space-test-btn'),

            // Bonus especial estilo SNAKE
            snakeBonusModal: document.getElementById('snake-bonus-modal'),
            snakeCanvas: document.getElementById('snake-canvas'),
            snakeScore: document.getElementById('snake-score'),
            snakeTimer: document.getElementById('snake-timer'),
            snakeLives: document.getElementById('snake-lives'),
            snakeGiveUpBtn: document.getElementById('snake-giveup-btn'),
            snakeTestBtn: document.getElementById('snake-test-btn'),

            // Bonus especial estilo MEMÓRIA
            memoryBonusModal: document.getElementById('memory-bonus-modal'),
            memoryGrid: document.getElementById('memory-grid'),
            memoryPairs: document.getElementById('memory-pairs'),
            memoryTimer: document.getElementById('memory-timer'),
            memoryLives: document.getElementById('memory-lives'),
            memoryGiveUpBtn: document.getElementById('memory-giveup-btn'),
            memoryTestBtn: document.getElementById('memory-test-btn'),

            // Bonus especial estilo LORDE HERO
            lordeHeroBonusModal: document.getElementById('lordehero-bonus-modal'),
            lordeHeroIframe: document.getElementById('lordehero-iframe'),
            lordeHeroTimer: document.getElementById('lordehero-timer'),
            lordeHeroScore: document.getElementById('lordehero-score'),
            lordeHeroGiveUpBtn: document.getElementById('lordehero-giveup-btn'),
            lordeHeroTestBtn: document.getElementById('lordehero-test-btn')
        };

        this.rot = 0;
        this.spinTimer = null;
        this.dragsFixed = 0;
        this.audioContext = null;
        this.lastSlotPositions = [0, 0, 0];
        this.slotSpinSoundTimer = null;
        this.reelFxRaf = new Map();
        this.slotStopAudioCursor = 0;
        this.assetsBaseUrl = new URL('../assets/', import.meta.url);
        this.pacmanSession = null;
        this.enduroSession = null;
        this.trexSession = null;
        this.marioSession = null;
        this.spaceSession = null;
        this.snakeSession = null;
        this.memorySession = null;
        this.lordeHeroSession = null;
        this.streakPopupHideTimer = null;

        this.correctAnswerAudio = new Audio(this.resolveAssetPath('audio/Sonic.mp3'));
        this.correctAnswerAudio.preload = 'auto';
        this.correctAnswerAudio.volume = 0.9;

        this.slotStopAudioPool = [0, 1, 2].map(() => {
            const s = new Audio(this.resolveAssetPath('audio/Sonic.mp3'));
            s.preload = 'auto';
            s.volume = 0.9;
            return s;
        });

        this.cashRegisterAudio = new Audio(this.resolveAssetPath('audio/caixa_registradora.mp3'));
        this.cashRegisterAudio.preload = 'auto';
        this.cashRegisterAudio.volume = 0.72;

        this.pacmanStartAudio = new Audio(this.resolveAssetPath('audio/pacman-start.mp3'));
        this.pacmanStartAudio.preload = 'auto';
        this.pacmanStartAudio.volume = 0.9;

        this.pacmanEatAudio = new Audio(this.resolveAssetPath('audio/pacman-comendo.mp3'));
        this.pacmanEatAudio.preload = 'auto';
        this.pacmanEatAudio.loop = true;
        this.pacmanEatAudio.volume = 0.65;

        this.pacmanDieAudio = new Audio(this.resolveAssetPath('audio/pacman-morreu.mp3'));
        this.pacmanDieAudio.preload = 'auto';
        this.pacmanDieAudio.volume = 0.82;

        this.pacmanVitaminAudio = new Audio(this.resolveAssetPath('audio/pacman-vitamina.mp3'));
        this.pacmanVitaminAudio.preload = 'auto';
        this.pacmanVitaminAudio.volume = 0.8;

        this.pacmanEndingPowerAudio = new Audio(this.resolveAssetPath('audio/pacman-acabando-tempo-vitamina.mp3'));
        this.pacmanEndingPowerAudio.preload = 'auto';
        this.pacmanEndingPowerAudio.volume = 0.8;

        this.enduroStartAudio = new Audio(this.resolveAssetPath('audio/largada.mp3'));
        this.enduroStartAudio.preload = 'auto';
        this.enduroStartAudio.volume = 0.9;

        this.enduroRaceAudio = new Audio(this.resolveAssetPath('audio/musica-enduro.mp3'));
        this.enduroRaceAudio.preload = 'auto';
        this.enduroRaceAudio.loop = true;
        this.enduroRaceAudio.volume = 0.55;

        this.enduroVictoryAudio = new Audio(this.resolveAssetPath('audio/vitoria.mp3'));
        this.enduroVictoryAudio.preload = 'auto';
        this.enduroVictoryAudio.volume = 0.9;

        this.trexStartAudio = new Audio(this.resolveAssetPath('audio/largada.mp3'));
        this.trexStartAudio.preload = 'auto';
        this.trexStartAudio.volume = 0.9;

        this.trexRaceAudio = new Audio(this.resolveAssetPath('audio/gabriela.mp3'));
        this.trexRaceAudio.preload = 'auto';
        this.trexRaceAudio.loop = true;
        this.trexRaceAudio.volume = 0.55;

        this.trexVictoryAudio = new Audio(this.resolveAssetPath('audio/voz-t-rex.mp3'));
        this.trexVictoryAudio.preload = 'auto';
        this.trexVictoryAudio.volume = 0.9;

        this.marioStartAudio = new Audio(this.resolveAssetPath('audio/largada.mp3'));
        this.marioStartAudio.preload = 'auto';
        this.marioStartAudio.volume = 0.9;

        this.marioRaceAudio = new Audio(this.resolveAssetPath('audio/mario_musica.mp3'));
        this.marioRaceAudio.preload = 'auto';
        this.marioRaceAudio.loop = true;
        this.marioRaceAudio.volume = 0.55;

        this.marioFallAudio = new Audio(this.resolveAssetPath('audio/Mario_Fall.mp3'));
        this.marioFallAudio.preload = 'auto';
        this.marioFallAudio.volume = 0.9;

        this.marioWinsAudio = new Audio(this.resolveAssetPath('audio/Mario_Wins.mp3'));
        this.marioWinsAudio.preload = 'auto';
        this.marioWinsAudio.volume = 0.9;

        this.countingCue = new Audio(this.resolveAssetPath('audio/valendo.mp3'));
        this.countingCue.preload = 'auto';
        this.countingCue.volume = 0.9;

        this.bgMusic = new Audio(this.resolveAssetPath('audio/show.mp3'));
        this.bgMusic.loop = true;
        this.bgMusic.preload = 'auto';
        this.defaultMusicVolume = 0.35;
        this.bgMusic.volume = this.defaultMusicVolume;

        this.sokobanMusic = new Audio(this.resolveAssetPath('audio/apt.mp3'));
        this.sokobanMusic.loop = true;
        this.sokobanMusic.preload = 'auto';
        this.sokobanMusic.volume = this.defaultMusicVolume;

        this.musicEnabled = true;

        if (this.els.certificateModalClose) {
            this.els.certificateModalClose.addEventListener('click', () => this.hideCertificateModal());
        }

        if (this.els.certificatePrintBtn) {
            this.els.certificatePrintBtn.addEventListener('click', () => this.printCertificate());
        }

        if (this.els.certificateModal) {
            this.els.certificateModal.addEventListener('click', (event) => {
                if (event.target === this.els.certificateModal) {
                    this.hideCertificateModal();
                }
            });
        }
    }

    getSharedAudioContext() {
        // Reusa um único contexto de áudio para evitar bloqueios por excesso de instâncias.
        if (!this.audioContext) {
            const Ctx = window.AudioContext || window.webkitAudioContext;
            if (!Ctx) return null;
            this.audioContext = new Ctx();
        }

        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume().catch(() => {});
        }

        return this.audioContext;
    }

    resolveAssetPath(path) {
        return new URL(path, this.assetsBaseUrl).toString();
    }

    resolveTopicImageUrl(imgUrl) {
        const raw = String(imgUrl || '').trim();
        if (!raw) return 'none';
        if (/^(https?:|data:|blob:|file:)/i.test(raw)) return raw;

        const normalized = raw.replace(/^\.\//, '').replace(/^\//, '');
        return this.resolveAssetPath(normalized);
    }

    pauseGameMusic() {
        // Pausa a música de fundo durante mini-games
        if (this.bgMusic) {
            this.bgMusic.pause();
        }
        if (this.sokobanMusic) {
            this.sokobanMusic.pause();
        }
    }

    resumeGameMusic() {
        // Retoma a música de fundo após mini-games terminarem
        if (this.bgMusic && this.musicEnabled) {
            if (this.els.sokobanScreen && !this.els.sokobanScreen.classList.contains('hidden')) return;
            this.bgMusic.play().catch(() => {});
        }
    }

    startSokobanMusic() {
        if (!this.musicEnabled || !this.sokobanMusic) return;
        if (this.bgMusic) this.bgMusic.pause();
        try {
            this.sokobanMusic.currentTime = 0;
        } catch (_) {}
        this.sokobanMusic.play().catch(() => {});
    }

    stopSokobanMusic(resetTime = true) {
        if (!this.sokobanMusic) return;
        this.sokobanMusic.pause();
        if (resetTime) {
            try {
                this.sokobanMusic.currentTime = 0;
            } catch (_) {}
        }
    }

    startBackgroundMusic(shouldPlay = true) {
        // Inicia a música de fundo e configura o botão de toggle
        if (!this.bgMusic) return;
        
        if (shouldPlay) {
            this.musicEnabled = true;
            this.bgMusic.currentTime = 0;
            this.bgMusic.play().catch(() => {});
            if (this.els.musicToggle) {
                this.els.musicToggle.textContent = 'DESLIGAR';
                this.els.musicToggle.classList.remove('music-off');
            }
        }

        // Configura o event listener do botão de toggle
        if (this.els.musicToggle) {
            this.els.musicToggle.onclick = () => {
                if (this.musicEnabled) {
                    // Desliga a música
                    this.musicEnabled = false;
                    this.bgMusic.pause();
                    this.stopSokobanMusic(false);
                    this.els.musicToggle.textContent = 'LIGAR';
                    this.els.musicToggle.classList.add('music-off');
                } else {
                    // Liga a música
                    this.musicEnabled = true;
                    if (this.els.sokobanScreen && !this.els.sokobanScreen.classList.contains('hidden')) {
                        this.startSokobanMusic();
                    } else if (this.els.trexBonusModal && !this.els.trexBonusModal.classList.contains('hidden')) {
                        // Durante o T-REX, mantém apenas os áudios do mini-game.
                    } else {
                        this.bgMusic.play().catch(() => {});
                    }
                    this.els.musicToggle.textContent = 'DESLIGAR';
                    this.els.musicToggle.classList.remove('music-off');
                }
            };
        }

        // Configura o controle de volume
        if (this.els.musicVolume) {
            this.els.musicVolume.addEventListener('input', (e) => {
                const volume = parseFloat(e.target.value);
                if (this.bgMusic) {
                    this.bgMusic.volume = volume;
                }
                if (this.sokobanMusic) {
                    this.sokobanMusic.volume = volume;
                }
            });
        }
    }

    initUI(lessonInfo) {
        // Atualiza Título
        this.els.mainTitle.innerText = lessonInfo.title;
        if (this.els.startKnowledgeList) {
            this.els.startKnowledgeList.innerHTML = '';
            const topics = Array.isArray(lessonInfo.topics) ? lessonInfo.topics : [];

            if (!topics.length) {
                const li = document.createElement('li');
                li.textContent = 'Areas de conhecimento em atualizacao.';
                this.els.startKnowledgeList.appendChild(li);
            } else {
                topics.forEach((topic) => {
                    const li = document.createElement('li');
                    const strong = document.createElement('strong');
                    const name = String(topic?.name || '').trim().toUpperCase();
                    const desc = String(topic?.desc || '').trim();

                    strong.textContent = name ? `${name}: ` : 'TOPICO: ';
                    li.appendChild(strong);
                    li.appendChild(document.createTextNode(desc || 'Conteudo da area em atualizacao.'));
                    this.els.startKnowledgeList.appendChild(li);
                });
            }
        }
        this.els.btnStart.innerText = 'AGUARDE...';
        this.els.btnStart.disabled = true;

        // Constrói a Roleta Dinamicamente
        this.els.wheel.innerHTML = '';
        const angle = 360 / lessonInfo.topics.length;
        
        lessonInfo.topics.forEach((t, i) => {
            const seg = document.createElement('div');
            seg.className = 'wheel-seg';
            // Cada segmento ocupa uma fatia fixa da roleta.
            seg.style.transform = `rotate(${i * angle}deg)`;
            seg.style.background = t.color;
            seg.innerHTML = `<span class="stext">${t.name}</span>`;
            this.els.wheel.appendChild(seg);
        });
        
        // Define o primeiro tema como inicial (Cores e Imagens)
        if(lessonInfo.topics.length > 0) {
            this.applyTheme(lessonInfo.topics[0]);
        }

        this.updateStreakHud(0, 1, false);
    }

    updateStreakHud(streak = 0, multiplier = 1, visible = true) {
        if (!this.els.streakHud || !this.els.streakHudLabel || !this.els.streakHudMultiplier) return;

        const normalizedStreak = Math.max(0, Number(streak) || 0);

        if (this.streakPopupHideTimer) {
            clearTimeout(this.streakPopupHideTimer);
            this.streakPopupHideTimer = null;
        }

        if (!visible || normalizedStreak < 1) {
            this.els.streakHud.classList.remove('show', 'hide');
            this.els.streakHud.classList.add('hidden');
            if (this.els.streakOverlay) {
                this.els.streakOverlay.classList.remove('show', 'hide');
                this.els.streakOverlay.classList.add('hidden');
            }
            return;
        }

        this.els.streakHudLabel.textContent = `${normalizedStreak}`;
        this.els.streakHudMultiplier.textContent = `${(Number(multiplier) || 1).toFixed(1)}x`;

        this.els.streakHud.classList.remove('hidden', 'hide', 'show');
        if (this.els.streakOverlay) {
            this.els.streakOverlay.classList.remove('hidden', 'hide', 'show');
            void this.els.streakOverlay.offsetWidth;
            this.els.streakOverlay.classList.add('show');
        }
        // Força reinício das animações para cada acerto.
        void this.els.streakHud.offsetWidth;
        this.els.streakHud.classList.add('show');

        this.streakPopupHideTimer = setTimeout(() => {
            this.els.streakHud.classList.remove('show');
            this.els.streakHud.classList.add('hide');
            if (this.els.streakOverlay) {
                this.els.streakOverlay.classList.remove('show');
                this.els.streakOverlay.classList.add('hide');
            }

            setTimeout(() => {
                this.els.streakHud.classList.add('hidden');
                this.els.streakHud.classList.remove('hide');
                if (this.els.streakOverlay) {
                    this.els.streakOverlay.classList.add('hidden');
                    this.els.streakOverlay.classList.remove('hide');
                }
            }, 260);
        }, 2600);
    }

    applyTheme(topicData) {
        if(!topicData) return;
        // Tema aplicado via CSS variables para refletir o tópico atual em toda a tela.
        document.documentElement.style.setProperty('--primary', topicData.color);
        const bgImageUrl = this.resolveTopicImageUrl(topicData.img_url);
        document.documentElement.style.setProperty('--bg-img', bgImageUrl === 'none' ? 'none' : `url('${bgImageUrl}')`);
    }

    bindStart(handler) {
        this.els.btnStart.addEventListener('click', () => {
            handler('');
            this.startBackgroundMusic(true);
        });
    }

    bindGoogleLogin(handler) {
        if (!this.els.btnGoogleLogin) return;
        this.els.btnGoogleLogin.addEventListener('click', handler);
    }

    bindLoginModal(handler) {
        if (!this.els.btnLoginGoogle) return;
        this.els.btnLoginGoogle.addEventListener('click', handler);
    }

    showLoginModal() {
        if (this.els.loginModalBackdrop) {
            this.els.loginModalBackdrop.classList.remove('hidden');
        }
    }

    hideLoginModal() {
        if (this.els.loginModalBackdrop) {
            this.els.loginModalBackdrop.classList.add('hidden');
        }
    }

    setGoogleAuthRequiredState(message = 'Faça login com sua conta Google para iniciar o quiz.') {
        // Mostrar modal de login
        this.showLoginModal();

        // Esconder coluna direita e balões informativos
        if (this.els.hudRightPanel) this.els.hudRightPanel?.classList.add('auth-required-hidden');
        if (this.els.columnHintOverlay) this.els.columnHintOverlay?.classList.add('auth-required-hidden');

        if (this.els.authStatus) this.els.authStatus.textContent = message;

        if (this.els.btnGoogleLogin) {
            this.els.btnGoogleLogin.disabled = false;
            this.els.btnGoogleLogin.classList.remove('hidden');
            this.els.btnGoogleLogin.textContent = 'ENTRAR COM GOOGLE';
        }

        if (this.els.btnStart) {
            this.els.btnStart.disabled = true;
            this.els.btnStart.textContent = 'AGUARDE...';
        }
    }

    setGoogleAuthLoadingState(message = 'Abrindo login do Google...') {
        if (this.els.authStatus) this.els.authStatus.textContent = message;
        if (this.els.btnGoogleLogin) {
            this.els.btnGoogleLogin.disabled = true;
            this.els.btnGoogleLogin.textContent = 'CONECTANDO...';
        }
    }

    setGoogleAuthSuccessState(displayName = 'ALUNO', email = '') {
        // Esconder modal de login
        this.hideLoginModal();

        // Mostrar coluna direita e balões informativos
        if (this.els.hudRightPanel) this.els.hudRightPanel?.classList.remove('auth-required-hidden');
        if (this.els.columnHintOverlay) this.els.columnHintOverlay?.classList.remove('auth-required-hidden');

        // Abrir balões apenas após login concluído e popup fechado
        if (typeof window.__openColumnHints === 'function') {
            window.__openColumnHints();
        }

        // Atualizar texto motivacional com o primeiro nome do aluno
        if (this.els.startMotivationText) {
            const firstName = String(displayName || 'aluno').split(' ')[0];
            this.els.startMotivationText.innerText = `Olá ${firstName}, hoje iremos estudar as seguintes áreas de conhecimentos:`;
        }

        if (this.els.authStatus) {
            this.els.authStatus.textContent = email ? `Logado com Google: ${email}` : `Logado com Google: ${displayName}`;
        }

        if (this.els.btnGoogleLogin) this.els.btnGoogleLogin.classList.add('hidden');

        if (this.els.btnStart) {
            this.els.btnStart.disabled = false;
            this.els.btnStart.textContent = 'INICIAR JORNADA';
        }
    }

    bindWheelStart(handler) { this.els.spinBtn.addEventListener('click', handler); }
    bindRankingPreview(handler) {
        if (!this.els.btnPreviewRanking) return;
        this.els.btnPreviewRanking.addEventListener('click', handler);
    }
    bindWheelStop(handler) { this.els.stopBtn.addEventListener('click', handler); }
    bindModalClose(handler) { this.els.btnModalClose.addEventListener('click', handler); }
    bindSokobanMove(handler) {
        window.addEventListener("keydown", (e) => {
            if (this.els.sokobanScreen.classList.contains('hidden')) return;
            if (e.key === "ArrowUp") { e.preventDefault(); handler(0, -1); }
            if (e.key === "ArrowDown") { e.preventDefault(); handler(0, 1); }
            if (e.key === "ArrowLeft") { e.preventDefault(); handler(-1, 0); }
            if (e.key === "ArrowRight") { e.preventDefault(); handler(1, 0); }
        });
    }
    bindSokobanGiveUp(handler) {
        if (!this.els.btnGiveUpSokoban) return;
        this.els.btnGiveUpSokoban.addEventListener('click', handler);
    }
    bindNext(handler) { this.els.nextBtn.addEventListener('click', handler); }
    bindPacmanTest(handler) {
        // Mantém compatibilidade quando não houver botão de teste do PACMAN no HTML.
        if (!this.els.pacmanTestBtn) return;
        this.els.pacmanTestBtn.addEventListener('click', handler);
    }

    bindEnduroTest(handler) {
        // Mantém compatibilidade quando não houver botão de teste do ENDURO no HTML.
        if (!this.els.enduroTestBtn) return;
        this.els.enduroTestBtn.addEventListener('click', handler);
    }

    bindTRexTest(handler) {
        // Mantém compatibilidade quando não houver botão de teste do T-REX no HTML.
        if (!this.els.trexTestBtn) return;
        this.els.trexTestBtn.addEventListener('click', handler);
    }

    bindSokobanTest(handler) {
        // Mantém compatibilidade quando não houver botão de teste do SOKOBAN no HTML.
        if (!this.els.sokobanTestBtn) return;
        this.els.sokobanTestBtn.addEventListener('click', handler);
    }

    bindMarioTest(handler) {
        // Mantém compatibilidade quando não houver botão de teste do MARIO no HTML.
        if (!this.els.marioTestBtn) return;
        this.els.marioTestBtn.addEventListener('click', handler);
    }

    bindSpaceTest(handler) {
        if (!this.els.spaceTestBtn) return;
        this.els.spaceTestBtn.addEventListener('click', handler);
    }

    bindSnakeTest(handler) {
        if (!this.els.snakeTestBtn) return;
        this.els.snakeTestBtn.addEventListener('click', handler);
    }

    bindMemoryTest(handler) {
        if (!this.els.memoryTestBtn) return;
        this.els.memoryTestBtn.addEventListener('click', handler);
    }

    bindLordeHeroTest(handler) {
        if (!this.els.lordeHeroTestBtn) return;
        this.els.lordeHeroTestBtn.addEventListener('click', handler);
    }

    showPortal() {
        this.els.quizScreen.classList.add('hidden');
        this.els.portalScreen.classList.remove('hidden');
        this.els.spinBtn.classList.remove('hidden');
        this.els.stopBtn.classList.add('hidden');
        this.els.stopBtn.innerText = "PARAR AGORA!";
    }

    _ratchetTick() {
        if (!this._ratchetCtx) return;
        const ctx = this._ratchetCtx;
        const now = ctx.currentTime;
        // Ruído curto filtrado — simula o estalo metálico da catraca.
        const bufSize = Math.floor(ctx.sampleRate * 0.035);
        const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
        const data = buf.getChannelData(0);
        for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
        const src = ctx.createBufferSource();
        src.buffer = buf;
        const filt = ctx.createBiquadFilter();
        filt.type = 'bandpass';
        filt.frequency.value = 1100;
        filt.Q.value = 5;
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        src.connect(filt);
        filt.connect(gain);
        gain.connect(ctx.destination);
        src.start(now);
    }

    startSpin() {
        this.els.spinBtn.classList.add('hidden');
        this.els.stopBtn.classList.remove('hidden');
        // Rotação contínua para simular o giro da roleta.
        this.spinTimer = setInterval(() => { 
            this.rot += 45; 
            this.els.wheel.style.transform = `rotate(${this.rot}deg)`; 
        }, 40);
        // Som de catraca rápida durante o giro.
        this._ratchetCtx = new (window.AudioContext || window.webkitAudioContext)();
        this.rattleTimer = setInterval(() => this._ratchetTick(), 100);
    }

    stopSpin(topicIndex, totalTopics, topicData) {
        clearInterval(this.spinTimer);
        clearInterval(this.rattleTimer);
        // Desaceleração sonora: cliques com intervalos crescentes (catraca freando).
        [0, 140, 310, 520, 780, 1090, 1460].forEach(d => setTimeout(() => this._ratchetTick(), d));
        setTimeout(() => { if (this._ratchetCtx) { this._ratchetCtx.close(); this._ratchetCtx = null; } }, 2000);

        // Calcula a angulação exata para parar a roleta no tópico correto
        const segmentAngle = 360 / totalTopics;
        const targetAngle = (360 - (topicIndex * segmentAngle)) % 360;
        
        // Adiciona voltas extras (1800deg = 5 voltas) para efeito visual
        this.els.wheel.style.transform = `rotate(${targetAngle + 1800}deg)`;
        this.playCountingSound();
        
        setTimeout(() => {
            this.els.modalTitle.innerText = "NOVO TEMA: " + topicData.name;
            this.els.modalText.innerText = topicData.desc;
            this.els.introModal.classList.remove('hidden');
            this.applyTheme(topicData);
        }, 1000);
    }

    showSokoban() {
        this.els.introModal.classList.add('hidden');
        this.els.portalScreen.classList.add('hidden');
        this.els.sokobanScreen.classList.remove('hidden');
        this.startSokobanMusic();
    }

    hideSokoban() {
        this.els.sokobanScreen.classList.add('hidden');
        this.stopSokobanMusic();
        this.resumeGameMusic();
    }

    updateSokobanLives(lives) {
        if (!this.els.sokobanLives) return;
        this.els.sokobanLives.textContent = `Vidas: ${Math.max(0, Number(lives) || 0)}`;
    }

    drawSokoban(level, player, boxes) {
        this.els.sokobanGrid.innerHTML = "";
        for (let y = 0; y < 11; y++) {
            for (let x = 0; x < 11; x++) {
                const t = document.createElement('div'); 
                t.className = "tile";
                if (level[y][x] === 1) t.classList.add('t-wall');
                if (level[y][x] === 2) t.classList.add('t-target');
                if (x === player.x && y === player.y) t.innerHTML = "👷";
                
                boxes.forEach(b => {
                    if (b.x === x && b.y === y) {
                        t.classList.add('t-box'); 
                        t.innerText = b.val;
                        if (level[y][x] === 2) t.classList.add('t-box-ok');
                    }
                });
                this.els.sokobanGrid.appendChild(t);
            }
        }
    }

    sokobanComplete(callback) {
        // Ao concluir o Sokoban, celebra com o mesmo combo visual/sonoro de recompensa.
        this.playCountingSound();
        this.createCoinAnimation();
        setTimeout(() => {
            this.els.sokobanScreen.classList.add('hidden');
            this.stopSokobanMusic();
            this.resumeGameMusic();
            callback();
        }, 1500);
    }

    renderQuestion(q, topicData, playerName, answerHandler, currentStep = 0, totalQuestions = 0) {
        // Limpa estado visual da pergunta anterior antes de renderizar a próxima.
        this.els.opts.innerHTML = ""; 
        this.els.dragDrop.innerHTML = ""; 
        this.els.fbArea.innerText = "";
        this.els.fbArea.classList.remove('has-feedback');
        this.els.quizScreen.classList.remove('is-drag-question');
        this.els.quizScreen.classList.remove('drag-feedback-visible');
        
        this.els.dragDrop.classList.add('hidden'); 
        this.els.opts.classList.remove('hidden');
        this.els.nextBtn.classList.add('hidden'); 
        this.els.valBtn.classList.add('hidden');
        this.els.quizScreen.classList.remove('hidden');
        
        const safeTopicData = topicData || {
            id: 'UNKNOWN',
            name: 'TEMA',
            color: '#3498db'
        };

        if (!topicData) {
            console.warn('Pergunta renderizada sem topicData válido. Aplicando fallback visual.');
        }

        this.applyTheme(safeTopicData);
        this.els.eraTag.innerText = `MODALIDADE: ${safeTopicData.name}`;
        const questionNumber = `QUESTÃO ${currentStep + 1}/${totalQuestions}`;
        if (this.els.questionCounter) {
            this.els.questionCounter.textContent = questionNumber;
        }

        let newValBtn = this.els.valBtn.cloneNode(true);
        this.els.valBtn.parentNode.replaceChild(newValBtn, this.els.valBtn);
        this.els.valBtn = newValBtn;
        this.els.valBtn.disabled = false;

        // Mantém o botão Avançar após a área de feedback para aparecer abaixo da resposta correta.
        if (this.els.nextBtn && this.els.fbArea && this.els.fbArea.parentNode === this.els.nextBtn.parentNode) {
            this.els.fbArea.insertAdjacentElement('afterend', this.els.nextBtn);
        }

        // Fluxo de renderização muda conforme o tipo da questão.
        if (q.type === "combo") {
            const parts = q.questions.split("[COMBO]");
            this.els.qTxt.innerHTML = parts[0].replace("[NAME]", playerName);
            const sel = document.createElement('select');
            sel.className = "combo-box";
            let comboAnswered = false;
            
            const shuffledOptions = this.shuffle([...q.options]);
            
            sel.innerHTML = `<option value="">-- selecione --</option>` + shuffledOptions.map(o => `<option value="${o}">${o}</option>`).join("");
            this.els.qTxt.appendChild(sel);
            this.els.qTxt.append(parts[1] || "");
            
            this.els.valBtn.classList.add('hidden');
            this.els.valBtn.disabled = true;
            sel.addEventListener('change', () => {
                if (comboAnswered || sel.disabled) return;
                const hasSelection = String(sel.value || '').trim() !== '';
                this.els.valBtn.disabled = !hasSelection;
                this.els.valBtn.classList.toggle('hidden', !hasSelection);
            });
            this.els.valBtn.onclick = () => {
                if (comboAnswered) return;
                comboAnswered = true;
                sel.disabled = true;
                this.els.valBtn.disabled = true;
                this.els.valBtn.classList.add('hidden');
                answerHandler(sel.value, null);
            };
        } 
        else if (q.type === "multi") {
            this.els.qTxt.innerHTML = q.questions.replace("[NAME]", playerName);
            const shuffledAnswers = this.shuffle([...q.answers]);
            const maxSelectable = Array.isArray(q.correct)
                ? Math.max(1, new Set(q.correct.map((value) => String(value).trim())).size)
                : 1;
            
            shuffledAnswers.forEach(a => {
                const l = document.createElement('label');
                l.className = "multi-opt";
                // Usa setAttribute para escapar HTML corretamente e armazena também em data-value
                const normalizedValue = String(a).trim();
                const input = document.createElement('input');
                input.type = 'checkbox';
                input.value = normalizedValue;
                input.setAttribute('data-value', normalizedValue);
                const span = document.createElement('span');
                span.textContent = a; // textContent é seguro e não interpreta HTML
                l.appendChild(input);
                l.appendChild(span);
                this.els.opts.appendChild(l);
            });
            this.els.valBtn.classList.add('hidden');
            this.els.valBtn.disabled = true;

            const updateMultiValidateState = () => {
                const checkedCount = this.els.opts.querySelectorAll('input:checked').length;
                const canValidate = checkedCount === maxSelectable;
                this.els.valBtn.disabled = !canValidate;
                this.els.valBtn.classList.toggle('hidden', !canValidate);
            };

            this.els.opts.querySelectorAll('input[type="checkbox"]').forEach((input) => {
                input.addEventListener('change', () => {
                    const checkedCount = this.els.opts.querySelectorAll('input:checked').length;
                    if (input.checked && checkedCount > maxSelectable) {
                        input.checked = false;
                        this.showAlert(
                            '⚠️ Limite de seleção',
                            `Esta questão permite selecionar apenas ${maxSelectable} alternativa(s).`
                        );
                    }
                    updateMultiValidateState();
                });
            });

            this.els.valBtn.onclick = () => {
                const sel = Array.from(this.els.opts.querySelectorAll('input:checked')).map(i => String(i.value).trim());
                answerHandler(sel, null);
            };
        }
        else if (q.type === "drag") {
            this.els.qTxt.innerHTML = q.questions.replace("[NAME]", playerName);
            this.els.opts.classList.add('hidden'); 
            this.els.dragDrop.classList.remove('hidden');
            this.els.quizScreen.classList.add('is-drag-question');
            this.renderDrag(q, answerHandler);
        }
        else {
            this.els.qTxt.innerHTML = q.questions.replace("[NAME]", playerName);
            const shuffledAnswers = this.shuffle([...q.answers]);
            
            shuffledAnswers.forEach(a => {
                const b = document.createElement('button'); 
                b.className = "opt-btn"; 
                b.innerText = a;
                b.onclick = () => answerHandler(a, b);
                this.els.opts.appendChild(b);
            });
        }
    }

    renderDrag(q, answerHandler) {
        this.els.dragDrop.innerHTML = `<div class="drag-pool" id="drag-pool"></div><div class="drop-zones" id="drop-zones"></div>`;
        this.dragsFixed = 0;
        const shuffledItems = this.shuffle([...q.items]);
        const dragPoolEl = document.getElementById('drag-pool');

        const updateZoneState = () => {
            document.querySelectorAll('.target-zone').forEach((zone) => {
                const hasCard = Boolean(zone.querySelector('.drag-card'));
                zone.style.background = hasCard ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.1)';
            });
        };

        const updateDragPoolVisibility = () => {
            if (!dragPoolEl) return;
            const hasCardsInPool = Boolean(dragPoolEl.querySelector('.drag-card'));
            dragPoolEl.classList.toggle('hidden', !hasCardsInPool);
        };

        const getAssignments = () => {
            const assignments = {};
            document.querySelectorAll('.target-zone').forEach((zone) => {
                const card = zone.querySelector('.drag-card');
                if (card) {
                    assignments[card.id] = zone.dataset.match;
                }
            });
            return assignments;
        };

        const updateDragValidateState = () => {
            const placedCards = Object.keys(getAssignments()).length;
            const canValidate = placedCards === q.items.length;
            this.els.valBtn.disabled = !canValidate;
            this.els.valBtn.classList.toggle('hidden', !canValidate);
        };
        
        shuffledItems.forEach(item => {
            const div = document.createElement('div'); 
            div.className = "drag-card"; 
            div.innerText = item.txt; 
            div.draggable = true; 
            div.id = item.id;
            div.ondragstart = (e) => e.dataTransfer.setData("text", e.target.id);
            dragPoolEl.appendChild(div);
        });
        
        q.zones.forEach(z => {
            const box = document.createElement('div'); box.className = "drop-box";
            box.innerHTML = `<span>${z.label}</span><div class="target-zone" data-match="${z.id}"></div>`;
            document.getElementById('drop-zones').appendChild(box);
        });
        
        document.querySelectorAll('.target-zone').forEach(zone => {
            zone.ondragover = (e) => { e.preventDefault(); zone.style.background = "rgba(0,212,255,0.2)"; };
            zone.ondragleave = () => updateZoneState();
            zone.ondrop = (e) => {
                e.preventDefault();
                const id = e.dataTransfer.getData("text");
                const card = document.getElementById(id);
                if (!card) return;

                const currentCard = zone.querySelector('.drag-card');
                if (currentCard && currentCard.id !== id) {
                    updateZoneState();
                    return;
                }

                zone.appendChild(card);
                updateZoneState();
                updateDragPoolVisibility();
                updateDragValidateState();
            };
        });

        this.els.valBtn.classList.add('hidden');
        this.els.valBtn.disabled = true;
        this.els.valBtn.onclick = () => {
            const assignments = getAssignments();
            if (Object.keys(assignments).length !== q.items.length) return;
            answerHandler(assignments, null);
        };

        updateZoneState();
        updateDragPoolVisibility();
        updateDragValidateState();
    }

    showFeedback(isCorrect, tip, playerName, btnElement, questionData = null, answerResult = null, streakMultiplier = 1, correctStreak = 0) {
        const isPartial = !isCorrect && Number(answerResult?.pointsAwarded || 0) > 0 && Number(answerResult?.totalItems || 0) > 1;
        const buildTipFrame = (content) => `
            <div class="feedback-tip-frame">
                <span class="feedback-tip-label">Dica de feedback</span>
                <div class="feedback-tip-text">${content}</div>
            </div>
        `;
        const tipFrame = buildTipFrame(tip);

        if (isCorrect) {
            this.els.fbArea.innerHTML = `
                ${buildTipFrame(`
                    <span class="feedback-inline-status feedback-inline-status-success">✓ Excelente análise, ${playerName}!</span>
                    <span>${tip}</span>
                `)}
            `;
            this.els.fbArea.classList.add('has-feedback');
            if (questionData?.type === 'drag') this.els.quizScreen.classList.add('drag-feedback-visible');
            if (btnElement) btnElement.style.background = "#2ecc71";
            this.els.nextBtn.classList.remove('hidden');
            this.els.valBtn.classList.add('hidden');
        } else if (isPartial) {
            const correctCount = Number(answerResult?.correctCount || 0);
            const totalItems = Number(answerResult?.totalItems || 0);
            const pointsAwarded = Number(answerResult?.pointsAwarded || 0);
            const correctAnswer = this.formatCorrectAnswer(questionData);

            this.els.fbArea.innerHTML = `
                ${buildTipFrame(`
                    <span class="feedback-inline-status feedback-inline-status-partial">△ Acerto parcial, ${playerName}.</span>
                    <span>${tip}</span>
                    <div class="correct-answer-box feedback-answer-inside"><b>Pontuação:</b> ${correctCount}/${totalItems} itens corretos, +${pointsAwarded} pontos</div>
                    <div class="correct-answer-box feedback-answer-inside"><b>Resposta correta:</b> ${correctAnswer}</div>
                `)}
            `;
            this.els.fbArea.classList.add('has-feedback');
            if (questionData?.type === 'drag') this.els.quizScreen.classList.add('drag-feedback-visible');
            this.lockQuestionAfterError(questionData, btnElement);
            this.els.nextBtn.classList.remove('hidden');
            this.els.valBtn.classList.add('hidden');
        } else {
            if (btnElement) btnElement.style.background = "#ff4b4b";
            const correctAnswer = this.formatCorrectAnswer(questionData);
            if (questionData?.type === 'drag') {
                this.els.fbArea.innerHTML = `
                    ${buildTipFrame(`
                        <span class="feedback-inline-status">✗ Resposta incorreta, ${playerName}.</span>
                        <span>${tip}</span>
                        <div class="correct-answer-box feedback-answer-inside"><b>Resposta correta:</b> ${correctAnswer}</div>
                    `)}
                `;
            } else {
                this.els.fbArea.innerHTML = `
                    ${buildTipFrame(`
                        <span class="feedback-inline-status">✗ Resposta incorreta, ${playerName}.</span>
                        <span>${tip}</span>
                        <div class="correct-answer-box feedback-answer-inside"><b>Resposta correta:</b> ${correctAnswer}</div>
                    `)}
                `;
            }
            this.els.fbArea.classList.add('has-feedback');
            if (questionData?.type === 'drag') this.els.quizScreen.classList.add('drag-feedback-visible');
            this.playErrorSound();
            this.lockQuestionAfterError(questionData, btnElement);
            this.els.nextBtn.classList.remove('hidden');
            this.els.valBtn.classList.add('hidden');
        }

        if (this.els.nextBtn && this.els.fbArea && this.els.fbArea.parentNode === this.els.nextBtn.parentNode) {
            this.els.fbArea.insertAdjacentElement('afterend', this.els.nextBtn);
        }
    }

    lockQuestionAfterError(q, btnElement) {
        if (!q) return;

        const correctValues = Array.isArray(q.correct)
            ? q.correct.map(v => String(v))
            : [String(q.correct ?? '')];

        if (q.type === 'combo') {
            const combo = this.els.qTxt.querySelector('.combo-box');
            if (combo) {
                combo.disabled = true;
                combo.classList.add('locked-field', 'is-correct');
                if (q.correct !== undefined && q.correct !== null) {
                    combo.value = String(q.correct);
                }
            }
            this.els.valBtn.disabled = true;
            return;
        }

        if (q.type === 'multi') {
            const checks = this.els.opts.querySelectorAll('input[type="checkbox"]');
            checks.forEach((check) => {
                const value = String(check.value);
                check.checked = correctValues.includes(value);
                check.disabled = true;

                const wrapper = check.closest('.multi-opt');
                if (!wrapper) return;
                wrapper.classList.add('locked-option');
                if (correctValues.includes(value)) {
                    wrapper.classList.add('is-correct');
                }
            });
            this.els.valBtn.disabled = true;
            return;
        }

        if (q.type === 'drag') {
            const zones = Array.from(this.els.dragDrop.querySelectorAll('.target-zone'));
            const cards = Array.from(this.els.dragDrop.querySelectorAll('.drag-card'));
            zones.forEach((zone) => {
                zone.classList.remove('is-correct');
                zone.classList.add('locked-option');
                zone.style.pointerEvents = 'none';
            });

            cards.forEach((card) => {
                card.draggable = false;
                card.classList.remove('is-correct');
                card.classList.add('locked-option');
                card.style.pointerEvents = 'none';
            });

            q.items.forEach((item) => {
                const card = document.getElementById(item.id) || cards.find((c) => c.id === item.id);
                if (!card) return;

                const parentZone = card.parentElement;
                if (!parentZone || !parentZone.classList.contains('target-zone')) return;

                if (parentZone.dataset.match === item.match) {
                    card.classList.add('is-correct');
                    parentZone.classList.add('is-correct');
                }
            });

            return;
        }

        const options = this.els.opts.querySelectorAll('.opt-btn');
        options.forEach((opt) => {
            const value = String(opt.innerText || '').trim();
            opt.disabled = true;
            opt.classList.add('locked-option');
            if (correctValues.includes(value)) {
                opt.classList.add('is-correct');
            }
        });

        if (btnElement) {
            btnElement.classList.add('locked-option');
        }
    }

    formatCorrectAnswer(q) {
        if (!q) return '-';

        if (q.type === 'drag' && Array.isArray(q.items) && Array.isArray(q.zones)) {
            const zoneById = new Map(q.zones.map((zone) => [zone.id, zone.label]));
            const pairs = q.items.map((item) => {
                const zoneLabel = zoneById.get(item.match) || item.match;
                return `<div class="drag-correct-item"><span>${item.txt}</span><span>→</span><span>${zoneLabel}</span></div>`;
            });
            return `<div class="drag-correct-grid">${pairs.join('')}</div>`;
        }

        if (Array.isArray(q.correct)) {
            return q.correct.join(', ');
        }

        return String(q.correct ?? '-');
    }

    showAccuracyBonusSummary(baseScore, accuracyBonus, correct, total) {
        const safeBase   = Number(baseScore) || 0;
        const safeBonus  = Math.max(0, Number(accuracyBonus) || 0);
        const pct        = total > 0 ? Math.round((correct / total) * 100) : 0;

        const overlay = document.createElement('div');
        overlay.className = 'slot-summary-overlay';

        const card = document.createElement('div');
        card.className = 'slot-summary-card';
        card.innerHTML = `
            <h3 class="slot-summary-title">BÔNUS DE PRECISÃO 🎯</h3>
            <div class="enduro-trophy-hero" aria-hidden="true">🎯🏆</div>
            <div class="slot-summary-list"></div>
            <div class="slot-summary-total">PONTUAÇÃO: ${safeBase}</div>
        `;

        overlay.appendChild(card);
        document.body.appendChild(overlay);

        const listEl  = card.querySelector('.slot-summary-list');
        const totalEl = card.querySelector('.slot-summary-total');

        return new Promise((resolve) => {
            let runningScore = safeBase;

            setTimeout(() => {
                const row = document.createElement('div');
                row.className = 'slot-summary-row';
                row.innerHTML = `<span>Taxa de acerto: ${correct}/${total} (${pct}%)</span><strong>+${safeBonus}</strong>`;
                listEl.appendChild(row);

                const oldScore = runningScore;
                runningScore += safeBonus;
                totalEl.textContent = `PONTUAÇÃO: ${runningScore}`;
                this.animateScoreIncrease(oldScore, runningScore);
            }, 700);

            setTimeout(() => {
                if (this.cashRegisterAudio) {
                    this.cashRegisterAudio.pause();
                    try { this.cashRegisterAudio.currentTime = 0; } catch (_) {}
                    this.cashRegisterAudio.play().catch(() => {});
                }
            }, 2000);

            setTimeout(() => {
                overlay.remove();
                resolve();
            }, 4500);
        });
    }

    showEndScreen(stats, playerName, totalScore = 0, onShowRanking, totalGameTime = 0) {
        this.updateStreakHud(0, 1, false);
        this.els.quizScreen.innerHTML = `
            <h2 style="font-family:'Audiowide'; color:gold;">🏆 JORNADA CONCLUÍDA: ${playerName}</h2>
            <div style="background:rgba(255,215,0,0.1); border:2px solid gold; padding:20px; border-radius:15px; margin-bottom:20px;">
                <p style="font-size:1.8rem; font-weight:bold; color:gold; margin:0;">💰 ${totalScore} PONTOS</p>
                <p style="font-size:0.95rem; color:#ccc; margin:5px 0 0 0;">Acertos: ${stats.correct}</p>
                <p style="font-size:0.95rem; color:#ffef9f; margin:4px 0 0 0;">Tempo total: ${this.formatGameTime(totalGameTime)}</p>
            </div>
            <p style="font-size:1.1rem;">Veja os pontos que merecem sua atenção para o futuro:</p>
            <div style="background:#000; padding:20px; border-radius:15px; text-align:left; border:1px solid var(--primary); max-height:300px; overflow-y:auto; margin-bottom:20px;">
                ${stats.mistakes.map(m => `<p style='font-size:0.95rem; border-bottom:1px solid #333; padding-bottom:10px;'><b>QUESTÃO:</b> ${m.q}<br><b style="color:var(--primary)">DICA DE MESTRE:</b> ${m.h}</p>`).join("") || "<p style='text-align:center; color:#2ecc71;'><b>VOCÊ FOI IMPECÁVEL! DOMÍNIO TOTAL DAS ERAS!</b></p>"}
            </div>
            <div style="display: flex; gap: 15px; justify-content: center; margin-bottom: 20px;">
                <button id="btn-show-ranking" class="opt-btn" style="width:280px; background:#00d4ff; color:#000; font-weight:bold; font-size:1.1rem;">🏅 VER RANKING GLOBAL</button>
                <button class="opt-btn" style="width:280px; background:gold; color:#000; font-weight:bold; font-size:1.1rem;" onclick="location.reload()">🔄 REINICIAR JORNADA</button>
            </div>
            <p style="margin-top:20px; font-size:0.8rem; opacity:0.7;">Professor Raphael Barreto | Firjan SENAI</p>
        `;
        
        // Liga evento do botão de ranking
        if (onShowRanking) {
            document.getElementById('btn-show-ranking').addEventListener('click', onShowRanking);
        }
    }

    showAlert(title, message, callback = null) {
        // Exibe modal customizado com as cores do tópico atual no lugar do alert nativo.
        this.els.fbModalTitle.innerText = title;
        this.els.fbModalText.innerText = message;
        this.els.feedbackModal.classList.remove('hidden');
        this.els.fbModalBtn.onclick = () => {
            this.els.feedbackModal.classList.add('hidden');
            if (callback) callback();
        };
    }

    shuffle(array) {
        // Fisher-Yates para embaralhamento uniforme das opções.
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    triggerExplosion() {
        // Lê a cor primária do tópico atual via CSS variable.
        const primary = getComputedStyle(document.documentElement)
            .getPropertyValue('--primary').trim() || '#00d4ff';

        const shapes = ['firework', 'firework fw-star', 'firework fw-bar'];
        const count = 70;

        for (let i = 0; i < count; i++) {
            const f = document.createElement('div');
            // Alterna formas para efeito mais rico.
            f.className = shapes[i % shapes.length];

            // Origem espalhada levemente ao redor do centro.
            const ox = 45 + Math.random() * 10;
            const oy = 45 + Math.random() * 10;
            f.style.left = ox + 'vw';
            f.style.top  = oy + 'vh';

            // Distância e ângulo aleatórios para cada partícula.
            const angle = Math.random() * 2 * Math.PI;
            const dist  = 120 + Math.random() * (window.innerWidth * 0.45);
            f.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
            f.style.setProperty('--ty', Math.sin(angle) * dist + 'px');

            // Duração ligeiramente variada para não ficarem sincronizadas.
            const duration = 0.7 + Math.random() * 0.7;
            f.style.animationDuration = duration + 's';

            // Variações de brilho da cor do tópico: claro, puro e quase branco.
            const lightness = [55, 70, 88][i % 3];
            // Converte hex para hsl aproximado reutilizando a cor via filter.
            f.style.backgroundColor = primary;
            f.style.filter = `brightness(${lightness}%) saturate(120%)`;

            document.body.appendChild(f);
            setTimeout(() => f.remove(), duration * 1000 + 100);
        }
    }

    triggerLightning(count = 1) {
        // Efeito rápido de raio para momentos de destaque.
        const flashes = Math.max(1, Number(count) || 1);

        for (let i = 0; i < flashes; i++) {
            const delay = i * 160 + Math.random() * 90;
            setTimeout(() => {
                const flash = document.createElement('div');
                flash.className = 'lightning-flash';
                document.body.appendChild(flash);
                setTimeout(() => flash.remove(), 420);
            }, delay);
        }
    }

    playCountingSound() {
        // Toca o efeito Sonic do arquivo local; se falhar, usa um beep curto como fallback.
        if (this.correctAnswerAudio) {
            const sound = this.correctAnswerAudio;

            // Comportamento estilo Sonic: novo acerto interrompe o som atual e reinicia.
            sound.pause();
            try {
                sound.currentTime = 0;
            } catch (_) {
                // Alguns navegadores podem bloquear currentTime temporariamente.
            }

            sound.play().catch(() => {
                const audioContext = this.getSharedAudioContext();
                if (!audioContext) return;
                const now = audioContext.currentTime;
                const osc = audioContext.createOscillator();
                const gain = audioContext.createGain();

                osc.type = 'triangle';
                osc.frequency.setValueAtTime(880, now);
                osc.frequency.exponentialRampToValueAtTime(1320, now + 0.09);

                gain.gain.setValueAtTime(0.001, now);
                gain.gain.exponentialRampToValueAtTime(0.16, now + 0.01);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.11);

                osc.connect(gain);
                gain.connect(audioContext.destination);
                osc.start(now);
                osc.stop(now + 0.12);
            });
            return;
        }

        const audioContext = this.getSharedAudioContext();
        if (!audioContext) return;
        const now = audioContext.currentTime;
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(1320, now + 0.09);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.16, now + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.11);

        osc.connect(gain);
        gain.connect(audioContext.destination);
        osc.start(now);
        osc.stop(now + 0.12);
    }

    playErrorSound() {
        // Som arcade de erro: dois beeps curtos descendentes.
        const audioContext = this.getSharedAudioContext();
        if (!audioContext) return;
        const now = audioContext.currentTime;

        const beep = (start, fromFreq, toFreq, duration = 0.09) => {
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();

            osc.type = 'square';
            osc.frequency.setValueAtTime(fromFreq, start);
            osc.frequency.exponentialRampToValueAtTime(toFreq, start + duration);

            gain.gain.setValueAtTime(0.001, start);
            gain.gain.exponentialRampToValueAtTime(0.18, start + 0.008);
            gain.gain.exponentialRampToValueAtTime(0.001, start + duration);

            osc.connect(gain);
            gain.connect(audioContext.destination);
            osc.start(start);
            osc.stop(start + duration + 0.01);
        };

        beep(now, 520, 330, 0.08);
        beep(now + 0.11, 420, 220, 0.1);
    }

    playSokobanWinSound() {
        // Tríade curta de vitória ao concluir o Sokoban.
        const audioContext = this.getSharedAudioContext();
        if (!audioContext) return;
        const now = audioContext.currentTime;
        const notes = [659.25, 783.99, 987.77];

        notes.forEach((freq, i) => {
            const start = now + i * 0.09;
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, start);

            gain.gain.setValueAtTime(0.001, start);
            gain.gain.exponentialRampToValueAtTime(0.22, start + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, start + 0.13);

            osc.connect(gain);
            gain.connect(audioContext.destination);
            osc.start(start);
            osc.stop(start + 0.14);
        });
    }

    _slotSpinTick() {
        const audioContext = this.getSharedAudioContext();
        if (!audioContext) return;

        const now = audioContext.currentTime;

        // Clique de catraca com ruído curto filtrado.
        const noiseLength = Math.max(1, Math.floor(audioContext.sampleRate * 0.02));
        const noiseBuffer = audioContext.createBuffer(1, noiseLength, audioContext.sampleRate);
        const noiseData = noiseBuffer.getChannelData(0);
        for (let i = 0; i < noiseLength; i++) {
            noiseData[i] = (Math.random() * 2 - 1) * (1 - i / noiseLength);
        }

        const noiseSource = audioContext.createBufferSource();
        noiseSource.buffer = noiseBuffer;

        const clickFilter = audioContext.createBiquadFilter();
        clickFilter.type = 'bandpass';
        clickFilter.frequency.setValueAtTime(1450 + Math.random() * 350, now);
        clickFilter.Q.value = 7;

        const clickGain = audioContext.createGain();
        clickGain.gain.setValueAtTime(0.001, now);
        clickGain.gain.exponentialRampToValueAtTime(0.22, now + 0.004);
        clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

        noiseSource.connect(clickFilter);
        clickFilter.connect(clickGain);
        clickGain.connect(audioContext.destination);
        noiseSource.start(now);
        noiseSource.stop(now + 0.035);

        // Subgrave curto para dar sensação de motor girando.
        const motorOsc = audioContext.createOscillator();
        const motorGain = audioContext.createGain();
        motorOsc.type = 'triangle';
        motorOsc.frequency.setValueAtTime(88 + Math.random() * 10, now);
        motorOsc.frequency.exponentialRampToValueAtTime(72, now + 0.04);

        motorGain.gain.setValueAtTime(0.001, now);
        motorGain.gain.exponentialRampToValueAtTime(0.06, now + 0.006);
        motorGain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

        motorOsc.connect(motorGain);
        motorGain.connect(audioContext.destination);
        motorOsc.start(now);
        motorOsc.stop(now + 0.05);
    }

    startSlotSpinSound() {
        if (this.slotSpinSoundTimer) {
            clearInterval(this.slotSpinSoundTimer);
            this.slotSpinSoundTimer = null;
        }

        // Toca som de catraca contínuo durante o giro
        this._slotSpinTick();
        this.slotSpinSoundTimer = setInterval(() => {
            this._slotSpinTick();
        }, 45);
    }

    stopSlotSpinSound() {
        if (this.slotSpinSoundTimer) {
            clearInterval(this.slotSpinSoundTimer);
            this.slotSpinSoundTimer = null;
        }
    }

    playSlotReelStopSound() {
        // Toca o Sonic em pool para não cortar o som entre reels.
        if (this.slotStopAudioPool && this.slotStopAudioPool.length > 0) {
            const sound = this.slotStopAudioPool[this.slotStopAudioCursor];
            this.slotStopAudioCursor = (this.slotStopAudioCursor + 1) % this.slotStopAudioPool.length;

            sound.pause();
            try {
                sound.currentTime = 0;
            } catch (_) {}

            sound.play().catch(() => {
                this.playCountingSound();
            });
            return;
        }

        this.playCountingSound();
    }

    animateScoreIncrease(oldScore, newScore, options = {}) {
        // Anima o aumento de pontos com som e moedas caindo.
        const coinMultiplier = Number(options?.coinMultiplier ?? 1);
        this.playCountingSound();
        this.createCoinAnimation(coinMultiplier);
        
        // Anima o número crescendo
        const scoreValue = this.els.scoreValue;
        const duration = 500; // ms
        const steps = 30;
        const increment = (newScore - oldScore) / steps;
        let currentValue = oldScore;
        let stepCount = 0;
        
        const interval = setInterval(() => {
            stepCount++;
            currentValue += increment;
            scoreValue.textContent = Math.floor(currentValue);
            
            if (stepCount >= steps) {
                clearInterval(interval);
                scoreValue.textContent = newScore;
                scoreValue.style.animation = 'none';
                setTimeout(() => {
                    scoreValue.style.animation = '';
                }, 10);
            }
        }, duration / steps);
        
        // Efeito visual de pulsação
        scoreValue.classList.add('score-pulse');
        setTimeout(() => {
            scoreValue.classList.remove('score-pulse');
        }, 600);
    }

    createCoinAnimation(multiplier = 1) {
        // Cria animação de moedas caindo estilo caça-níqueis alinhadas à janela de perguntas.
        const safeMultiplier = Number.isFinite(multiplier) ? Math.max(0, multiplier) : 1;
        const count = Math.max(1, Math.round(30 * safeMultiplier)); // Número de moedas
        const coinGold = '#ffd700';
        
        // Obtém posição do container de perguntas
        const gameContainer = document.getElementById('game-container');
        const rect = gameContainer.getBoundingClientRect();
        
        for (let i = 0; i < count; i++) {
            const coin = document.createElement('div');
            coin.className = 'coin';
            
            // Posição dentro do container de perguntas (em pixels do viewport)
            const startX = rect.left + Math.random() * rect.width;
            const startY = rect.top + Math.random() * (rect.height * 0.3); // topo 30% do container
            
            coin.style.left = startX + 'px';
            coin.style.top = startY + 'px';
            coin.style.backgroundColor = coinGold;
            coin.style.position = 'fixed';
            
            // Delay para cascata de moedas
            const delay = i * 0.05;
            coin.style.animation = `coinFall ${0.8 + Math.random() * 0.4}s ease-in ${delay}s forwards`;
            
            this.els.coinsContainer.appendChild(coin);
            
            // Remove após animação completar
            setTimeout(() => coin.remove(), (0.8 + Math.random() * 0.4 + delay) * 1000 + 100);
        }
    }

    updateScoreDisplay(newScore) {
        // Atualiza o painel sem animação (para casos que não são acertos).
        this.els.scoreValue.textContent = newScore;
    }

    setScorePlayerName(playerName) {
        // Exibe o nome do jogador ativo no painel de pontuação.
        if (!this.els.scorePlayer) return;
        this.els.scorePlayer.textContent = playerName.toUpperCase();
    }

    updateTimerDisplay(totalSeconds) {
        // Mostra o tempo restante no formato MM:SS.
        if (!this.els.timerDisplay) return;
        const safeSeconds = Math.max(0, Math.floor(totalSeconds));
        const min = Math.floor(safeSeconds / 60).toString().padStart(2, '0');
        const sec = (safeSeconds % 60).toString().padStart(2, '0');
        this.els.timerDisplay.textContent = `⏱ ${min}:${sec}`;
    }

    updateTotalTimeDisplay(totalSeconds) {
        // Mostra o tempo total acumulado de sessão para critério de desempate.
        if (!this.els.totalTimeDisplay) return;
        this.els.totalTimeDisplay.textContent = `🕒 TOTAL ${this.formatGameTime(totalSeconds)}`;
    }

    setTimerVisibility(isVisible) {
        if (!this.els.timerDisplay) return;
        this.els.timerDisplay.classList.toggle('hidden', !isVisible);
    }

    setTotalTimeVisibility(isVisible) {
        if (!this.els.totalTimeDisplay) return;
        this.els.totalTimeDisplay.classList.toggle('hidden', !isVisible);
    }

    animateScorePenalty(oldScore, newScore, penaltyValue = -50) {
        // Exibe penalidade com contador decrescente e badge flutuante.
        const scoreValue = this.els.scoreValue;
        const duration = 350;
        const steps = 18;
        const decrement = (oldScore - newScore) / steps;
        let currentValue = oldScore;
        let stepCount = 0;

        const interval = setInterval(() => {
            stepCount++;
            currentValue -= decrement;
            scoreValue.textContent = Math.round(currentValue);

            if (stepCount >= steps) {
                clearInterval(interval);
                scoreValue.textContent = newScore;
            }
        }, duration / steps);

        scoreValue.classList.add('score-penalty-pulse');
        setTimeout(() => {
            scoreValue.classList.remove('score-penalty-pulse');
        }, 500);

        const badge = document.createElement('div');
        badge.className = 'score-delta-badge negative';
        badge.textContent = penaltyValue > 0 ? `+${penaltyValue}` : `${penaltyValue}`;
        this.els.scorePanel.appendChild(badge);

        setTimeout(() => {
            badge.remove();
        }, 900);
    }

    renderTop15Panel(scores) {
        // Atualiza o ranking fixo da lateral com os 15 melhores.
        if (!this.els.top15Body) return;

        this.els.top15Body.innerHTML = '';

        if (!scores || scores.length === 0) {
            this.els.top15Body.innerHTML = '<p class="top15-empty">Nenhum ranking ainda...</p>';
            return;
        }

        scores.slice(0, 15).forEach((score, index) => {
            const row = document.createElement('div');
            row.className = 'top15-row';
            const medal = ['🥇', '🥈', '🥉'][index] || '';
            const displayName = this.getRankingDisplayName(score);

            if (index < 3) {
                row.classList.add('is-podium');
            }

            row.innerHTML = `
                <span class="top15-pos">${index + 1}</span>
                <span class="top15-name">${medal ? `<span class="top15-medal">${medal}</span>` : ''}${this.escapeHtml(displayName)}</span>
                <span class="top15-score">${score.score || 0}</span>
                <span class="top15-time">${this.formatGameTime(score.gameTime)}</span>
            `;
            this.els.top15Body.appendChild(row);
        });
    }

    bindRankingModalClose(handler) {
        // Liga evento de fechar ranking modal.
        this.els.rankingModalClose.addEventListener('click', handler);
    }

    showRankingModal(scores, lessonInfo = {}) {
        // Abre o modal com o ranking global.
        this.els.rankingList.innerHTML = '';

        const tieBreakHint = document.createElement('p');
        tieBreakHint.style.cssText = 'color:#ffef9f; font-size:0.78rem; margin:0 0 10px 0; text-align:center;';
        tieBreakHint.textContent = 'Critério de desempate: menor tempo total.';
        this.els.rankingList.appendChild(tieBreakHint);

        if (scores.length === 0) {
            const empty = document.createElement('p');
            empty.style.cssText = 'color:#ccc; text-align:center; padding:20px;';
            empty.textContent = 'Nenhum ranking disponível ainda...';
            this.els.rankingList.appendChild(empty);
            this.els.rankingModal.classList.remove('hidden');
            return;
        }

        // Cria tabela de ranking
        const table = document.createElement('table');
        table.style.cssText = 'width:100%; border-collapse:collapse;';

        // Header
        const headerRow = document.createElement('tr');
        headerRow.style.cssText = 'background: rgba(255,215,0,0.1); border-bottom: 2px solid gold;';
        headerRow.innerHTML = `
            <th style="padding:10px; text-align:left; color:gold;">🏅 POS.</th>
            <th style="padding:10px; text-align:left; color:gold;">JOGADOR</th>
            <th style="padding:10px; text-align:center; color:gold;">💰</th>
            <th style="padding:10px; text-align:center; color:gold;">⏱</th>
            <th style="padding:10px; text-align:center; color:gold;">📜</th>
            <th style="padding:10px; text-align:center; color:gold;">✓</th>
            <th style="padding:10px; text-align:center; color:gold;">%</th>
        `;
        table.appendChild(headerRow);

        // Linhas de dados
        scores.forEach((score, index) => {
            const row = document.createElement('tr');
            const isTop3 = index < 3;
            const bgColor = isTop3 ? `rgba(255,215,0,${0.1 - index * 0.02})` : 'rgba(255,255,255,0.02)';
            const medal = ['🥇', '🥈', '🥉'][index] || '▫️';
            const displayName = this.getRankingDisplayName(score);

            row.style.cssText = `background: ${bgColor}; border-bottom: 1px solid rgba(255,255,255,0.1);`;
            row.innerHTML = `
                <td style="padding:10px; color:gold; font-weight:bold;">${medal} ${index + 1}</td>
                <td style="padding:10px; color:#f0f0f0;">${this.escapeHtml(displayName)}</td>
                <td style="padding:10px; text-align:center; color:#ffd700; font-weight:bold;">${score.score}</td>
                <td style="padding:10px; text-align:center; color:#ffef9f;">${this.formatGameTime(score.gameTime)}</td>
                <td style="padding:10px; text-align:center;"><button type="button" class="ranking-cert-link" data-rank-index="${index}">CERTIFICADO</button></td>
                <td style="padding:10px; text-align:center; color:#2ecc71;">${score.correct}/${score.total}</td>
                <td style="padding:10px; text-align:center; color:#00d4ff;">${score.accuracy}%</td>
            `;
            table.appendChild(row);
        });

        this.els.rankingList.appendChild(table);
        const safeLesson = {
            title: lessonInfo?.title || '',
            topics: Array.isArray(lessonInfo?.topics) ? lessonInfo.topics : []
        };
        this.els.rankingList.querySelectorAll('.ranking-cert-link').forEach((btn) => {
            btn.addEventListener('click', () => {
                const rankIndex = Number(btn.getAttribute('data-rank-index'));
                const score = scores[rankIndex];
                if (!score) return;
                this.showCertificateModal(score, rankIndex, safeLesson);
            });
        });
        this.els.rankingModal.classList.remove('hidden');
    }

    hideRankingModal() {
        // Fecha o modal de ranking.
        this.els.rankingModal.classList.add('hidden');
        this.hideCertificateModal();
    }

    getRankingDisplayName(score = {}) {
        const alias = String(score?.playerAlias || '').trim();
        if (alias) return alias;

        const fullName = String(score?.name || '').trim();
        if (!fullName) return '---';

        const parts = fullName.split(/\s+/).filter(Boolean);
        const firstName = parts[0] || '---';
        const lastInitial = parts.length > 1 ? `${parts[parts.length - 1][0].toUpperCase()}.` : '';
        return lastInitial ? `${firstName} ${lastInitial}` : firstName;
    }

    showCertificateModal(score, rankIndex, lessonInfo) {
        if (!this.els.certificateModal || !this.els.certificateContent) return;

        const medal = this.getPodiumMedal(rankIndex);
        const lessonTitle = this.escapeHtml(lessonInfo?.title || 'AULA NÃO INFORMADA');
        const playerName = this.escapeHtml(score?.name || 'JOGADOR');
        const scoreValue = Number(score?.score || 0);
        const gameTime = this.formatGameTime(score?.gameTime);
        const areas = this.renderKnowledgeAreas(lessonInfo?.topics);

        this.els.certificateContent.innerHTML = `
            <div class="certificate-title">CERTIFICADO DE DESEMPENHO</div>

            <p class="certificate-text">Certificamos que</p>
            <p class="certificate-player">${playerName}</p>
            <p class="certificate-text">concluiu esta jornada com os seguintes resultados:</p>

            <div class="certificate-metrics">
                <div><span>Moedas:</span> <strong>${scoreValue}</strong></div>
                <div><span>Tempo:</span> <strong>${gameTime}</strong></div>
                <div><span>Aula:</span> <strong>${lessonTitle}</strong></div>
            </div>

            ${medal ? `<div class="certificate-medal-wrap"><div class="certificate-medal-icon">${medal.icon}</div><div class="certificate-medal-label">${medal.label}</div></div>` : ''}

            <div class="certificate-areas-box">
                <div class="certificate-areas-title">Areas de conhecimentos desenvolvidas</div>
                <ul class="certificate-areas-list">${areas}</ul>
            </div>

            <div class="certificate-signature-block">
                <p class="certificate-signature-name">Raphael Barreto de Oliveira</p>
                <div class="certificate-signature-line"></div>
                <p class="certificate-signature-role">Instrutor de Cursos Especiais A</p>
                <div class="certificate-signature-line"></div>
                <p class="certificate-signature-org">SENAI - SAPUCAI</p>
            </div>
        `;

        this.els.certificateModal.classList.remove('hidden');
    }

    hideCertificateModal() {
        if (!this.els.certificateModal) return;
        this.els.certificateModal.classList.add('hidden');
    }

    printCertificate() {
        if (!this.els.certificateModal || this.els.certificateModal.classList.contains('hidden')) return;
        window.print();
    }

    getPodiumMedal(rankIndex) {
        const podium = [
            { icon: '🥇', label: 'MEDALHA DE OURO' },
            { icon: '🥈', label: 'MEDALHA DE PRATA' },
            { icon: '🥉', label: 'MEDALHA DE BRONZE' }
        ];
        return podium[rankIndex] || null;
    }

    renderKnowledgeAreas(topics = []) {
        if (!Array.isArray(topics) || topics.length === 0) {
            return '<li>Areas de conhecimento nao informadas.</li>';
        }

        return topics.map((topic) => {
            const name = this.escapeHtml(topic?.name || 'Area');
            const desc = this.escapeHtml(topic?.desc || 'Descricao nao informada.');
            return `<li><strong>${name}</strong>: ${desc}</li>`;
        }).join('');
    }

    escapeHtml(value) {
        return String(value ?? '')
            .replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')
            .replaceAll('"', '&quot;')
            .replaceAll("'", '&#39;');
    }

    formatGameTime(totalSeconds) {
        const safe = Math.max(0, Math.floor(Number(totalSeconds) || 0));
        const min = Math.floor(safe / 60).toString().padStart(2, '0');
        const sec = (safe % 60).toString().padStart(2, '0');
        return `${min}:${sec}`;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // MARIO BONUS GAME
    // ─────────────────────────────────────────────────────────────────────────

    runSpaceBonusLevel() {
        const modal = this.els.spaceBonusModal;
        const canvas = this.els.spaceCanvas;
        if (!modal || !canvas) return Promise.resolve({ won: false, score: 0 });

        const ctx = canvas.getContext('2d');
        if (!ctx) return Promise.resolve({ won: false, score: 0 });

        this.pauseGameMusic();
        modal.classList.remove('hidden');

        if (this.spaceSession && this.spaceSession.cleanup) {
            this.spaceSession.cleanup(false);
        }

        let resolvePromise = null;
        const promise = new Promise((resolve) => { resolvePromise = resolve; });

        // ── ASSET PATHS ──────────────────────────────────────────────────────
        const spaceBase = new URL('./space/src/assets/', import.meta.url).href;
        const IMG_SPACESHIP     = spaceBase + 'images/spaceship.png';
        const IMG_ENGINE        = spaceBase + 'images/engine.png';
        const IMG_ENGINE_SPRITES = spaceBase + 'images/engine_sprites.png';
        const IMG_INVADER       = spaceBase + 'images/invader.png';

        // ── CANVAS CONSTANTS ─────────────────────────────────────────────────
        const W = canvas.width;   // 800
        const H = canvas.height;  // 500
        const INITIAL_FRAMES = 8;
        const GAME_DURATION = 60;

        // ── STATE ────────────────────────────────────────────────────────────
        let timeLeft = GAME_DURATION;
        let lives = 3;
        let score = 0;
        let level = 1;
        let finished = false;
        let invulUntil = 0;
        let lastTs = 0;
        let rafId = null;
        let timerTick = null;
        let invaderShootInterval = null;
        let shootCooldown = 0;

        // ── AUDIO ────────────────────────────────────────────────────────────
        const audioBase = spaceBase + 'audios/';
        const makeAudio = (file, vol = 0.5) => {
            const a = new Audio(audioBase + file);
            a.preload = 'auto';
            a.volume = vol;
            return a;
        };
        const shootSounds = Array.from({ length: 5 }, () => makeAudio('shoot.mp3', 0.5));
        const hitSounds   = Array.from({ length: 5 }, () => makeAudio('hit.mp3', 0.2));
        const explosionSnd = makeAudio('explosion.mp3', 0.2);
        const nextLevelSnd = makeAudio('next_level.mp3', 0.4);
        let shootIdx = 0, hitIdx = 0;

        const playShoot    = () => { const s = shootSounds[shootIdx]; s.currentTime = 0; s.play().catch(() => {}); shootIdx = (shootIdx + 1) % 5; };
        const playHit      = () => { const s = hitSounds[hitIdx]; s.currentTime = 0; s.play().catch(() => {}); hitIdx = (hitIdx + 1) % 5; };
        const playExplosion = () => { explosionSnd.currentTime = 0; explosionSnd.play().catch(() => {}); };
        const playNextLevel = () => { nextLevelSnd.currentTime = 0; nextLevelSnd.play().catch(() => {}); };

        // ── IMAGES ───────────────────────────────────────────────────────────
        const loadImg = (src) => { const img = new Image(); img.src = src; return img; };
        const spaceshipImg     = loadImg(IMG_SPACESHIP);
        const engineImg        = loadImg(IMG_ENGINE);
        const engineSpritesImg = loadImg(IMG_ENGINE_SPRITES);
        const invaderImg       = loadImg(IMG_INVADER);

        // ── STARS ────────────────────────────────────────────────────────────
        const stars = Array.from({ length: 100 }, () => ({
            x: Math.random() * W,
            y: Math.random() * H,
            r: Math.random() * 2 + 0.5,
            vy: Math.random() * 2 + 0.5
        }));

        // ── PLAYER ───────────────────────────────────────────────────────────
        const PLAYER_W = 96, PLAYER_H = 96;
        const player = {
            x: W / 2 - PLAYER_W / 2,
            y: H - PLAYER_H - 30,
            w: PLAYER_W,
            h: PLAYER_H,
            vel: 6,
            sx: 0,
            framesCounter: INITIAL_FRAMES,
            alive: true
        };

        // ── PROJECTILES ───────────────────────────────────────────────────────
        const playerProjectiles = [];
        const invaderProjectiles = [];

        // ── PARTICLES ────────────────────────────────────────────────────────
        let particles = [];

        const spawnParticles = (x, y, color, n = 12) => {
            for (let i = 0; i < n; i++) {
                particles.push({
                    x, y,
                    vx: (Math.random() - 0.5) * 4,
                    vy: (Math.random() - 0.5) * 4,
                    r: Math.random() * 3 + 1,
                    color,
                    opacity: 1
                });
            }
        };

        // ── OBSTACLES ────────────────────────────────────────────────────────
        const makeObstacles = () => [
            { x: W / 4 - 50,     y: H - 150, w: 100, h: 20, color: 'crimson' },
            { x: 3 * W / 4 - 50, y: H - 150, w: 100, h: 20, color: 'crimson' }
        ];
        let obstacles = makeObstacles();

        // ── GRID ─────────────────────────────────────────────────────────────
        const makeGrid = (rows, cols, velBoost = 0) => {
            const invaders = [];
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    invaders.push({
                        x: c * 55 + 30,
                        y: r * 38 + 60,
                        w: 40,
                        h: 29.6,
                        vel: 1 + velBoost
                    });
                }
            }
            return { invaders, direction: 'right', moveDown: false, boost: 0.1 };
        };

        let grid = makeGrid(
            Math.floor(Math.random() * 4) + 2,   // 2–5 rows
            Math.floor(Math.random() * 4) + 5    // 5–8 cols
        );

        // ── HUD ───────────────────────────────────────────────────────────────
        const updateHud = () => {
            if (this.els.spaceScore) this.els.spaceScore.textContent = `Pontos: ${score}`;
            if (this.els.spaceTimer) this.els.spaceTimer.textContent = `Tempo: ${timeLeft}s`;
            if (this.els.spaceLives) this.els.spaceLives.textContent = `Vidas: ${'❤️'.repeat(Math.max(0, lives))}`;
        };

        // ── KEYS ─────────────────────────────────────────────────────────────
        const keys = { left: false, right: false, shoot: false };
        let keyDownHandler = null, keyUpHandler = null;

        // ── CLEANUP / FINISH ─────────────────────────────────────────────────
        const stopSounds = () => {
            [...shootSounds, ...hitSounds, explosionSnd, nextLevelSnd].forEach((s) => {
                s.pause();
                try { s.currentTime = 0; } catch (_) {}
            });
        };

        const finish = (won = false) => {
            if (finished) return;
            finished = true;
            if (timerTick)           { clearInterval(timerTick); timerTick = null; }
            if (invaderShootInterval){ clearInterval(invaderShootInterval); invaderShootInterval = null; }
            if (rafId)               { cancelAnimationFrame(rafId); rafId = null; }
            if (keyDownHandler)      { document.removeEventListener('keydown', keyDownHandler); keyDownHandler = null; }
            if (keyUpHandler)        { document.removeEventListener('keyup', keyUpHandler); keyUpHandler = null; }
            stopSounds();
            modal.classList.add('hidden');
            resolvePromise({ won, score });
        };

        if (this.els.spaceGiveUpBtn) {
            this.els.spaceGiveUpBtn.onclick = () => finish(false);
        }

        // ── KEYBOARD ─────────────────────────────────────────────────────────
        keyDownHandler = (e) => {
            if (e.key === 'ArrowLeft'  || e.key === 'a' || e.key === 'A') { keys.left  = true; e.preventDefault(); }
            if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') { keys.right = true; e.preventDefault(); }
            if (e.key === 'ArrowUp'    || e.key === ' ' || e.key === 'Enter') { keys.shoot = true; e.preventDefault(); }
        };
        keyUpHandler = (e) => {
            if (e.key === 'ArrowLeft'  || e.key === 'a' || e.key === 'A') keys.left  = false;
            if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keys.right = false;
            if (e.key === 'ArrowUp'    || e.key === ' ' || e.key === 'Enter') keys.shoot = false;
        };
        document.addEventListener('keydown', keyDownHandler);
        document.addEventListener('keyup', keyUpHandler);

        // ── INVADER SHOOT INTERVAL ────────────────────────────────────────────
        const invaderShoot = () => {
            if (!grid.invaders.length || finished) return;
            const inv = grid.invaders[Math.floor(Math.random() * grid.invaders.length)];
            invaderProjectiles.push({ x: inv.x + inv.w / 2 - 1, y: inv.y + inv.h, w: 2, h: 20, vy: 8 });
        };
        invaderShootInterval = setInterval(() => { if (!finished) invaderShoot(); }, 1000);

        // ── TIMER ─────────────────────────────────────────────────────────────
        timerTick = setInterval(() => {
            if (finished) return;
            timeLeft--;
            updateHud();
            if (timeLeft <= 0) finish(true);
        }, 1000);

        // ── UPDATE ────────────────────────────────────────────────────────────
        const updateGrid = () => {
            const reachedRight = grid.invaders.some((inv) => inv.x + inv.w >= W - 10);
            const reachedLeft  = grid.invaders.some((inv) => inv.x <= 10);

            if (reachedRight)      { grid.direction = 'left';  grid.moveDown = true; }
            else if (reachedLeft)  { grid.direction = 'right'; grid.moveDown = true; }

            if (!player.alive) grid.moveDown = false;

            grid.invaders.forEach((inv) => {
                if (grid.moveDown) { inv.y += inv.h; inv.vel += grid.boost; }
                if (grid.direction === 'right') inv.x += inv.vel;
                else inv.x -= inv.vel;
            });
            grid.moveDown = false;
        };

        const update = () => {
            // Stars
            stars.forEach((s) => {
                s.y += s.vy;
                if (s.y > H) { s.y = 0; s.x = Math.random() * W; }
            });

            // Player
            if (player.alive) {
                if (keys.left  && player.x > 0)            player.x -= player.vel;
                if (keys.right && player.x + player.w < W) player.x += player.vel;

                // Engine sprite animation
                if (player.framesCounter === 0) {
                    player.sx = player.sx >= 96 ? 0 : player.sx + 48;
                    player.framesCounter = INITIAL_FRAMES;
                }
                player.framesCounter--;

                // Shoot
                if (keys.shoot && shootCooldown <= 0) {
                    playerProjectiles.push({ x: player.x + player.w / 2 - 1, y: player.y + 2, w: 2, h: 20, vy: -10 });
                    playShoot();
                    shootCooldown = 18;
                }
            }
            if (shootCooldown > 0) shootCooldown--;

            // Move projectiles
            for (let i = playerProjectiles.length - 1; i >= 0; i--) {
                playerProjectiles[i].y += playerProjectiles[i].vy;
                if (playerProjectiles[i].y < -25) playerProjectiles.splice(i, 1);
            }
            for (let i = invaderProjectiles.length - 1; i >= 0; i--) {
                invaderProjectiles[i].y += invaderProjectiles[i].vy;
                if (invaderProjectiles[i].y > H + 25) invaderProjectiles.splice(i, 1);
            }

            // Grid movement
            updateGrid();

            // Player projectile vs invaders
            outer: for (let pi = playerProjectiles.length - 1; pi >= 0; pi--) {
                const p = playerProjectiles[pi];
                for (let ii = grid.invaders.length - 1; ii >= 0; ii--) {
                    const inv = grid.invaders[ii];
                    if (p.x >= inv.x && p.x <= inv.x + inv.w &&
                        p.y >= inv.y && p.y <= inv.y + inv.h) {
                        spawnParticles(inv.x + inv.w / 2, inv.y + inv.h / 2, '#ff8800');
                        playHit();
                        grid.invaders.splice(ii, 1);
                        playerProjectiles.splice(pi, 1);
                        score += 10;
                        updateHud();
                        continue outer;
                    }
                }
            }

            // Player projectile vs obstacles
            for (let pi = playerProjectiles.length - 1; pi >= 0; pi--) {
                const p = playerProjectiles[pi];
                for (const ob of obstacles) {
                    if (p.x >= ob.x && p.x <= ob.x + ob.w &&
                        p.y + p.h >= ob.y && p.y <= ob.y + ob.h) {
                        playerProjectiles.splice(pi, 1);
                        break;
                    }
                }
            }

            // Invader projectile vs player
            if (player.alive && performance.now() >= invulUntil) {
                for (let pi = invaderProjectiles.length - 1; pi >= 0; pi--) {
                    const p = invaderProjectiles[pi];
                    if (p.x >= player.x + 20 && p.x <= player.x + player.w - 20 &&
                        p.y + p.h >= player.y + 22 && p.y + p.h <= player.y + player.h - 8) {
                        invaderProjectiles.splice(pi, 1);
                        playExplosion();
                        spawnParticles(player.x + player.w / 2, player.y + player.h / 2, '#00d4ff', 20);
                        lives--;
                        updateHud();
                        if (lives <= 0) {
                            player.alive = false;
                            finish(false);
                            return;
                        }
                        invulUntil = performance.now() + 2500;
                        break;
                    }
                }
            }

            // Invader projectile vs obstacles
            for (let pi = invaderProjectiles.length - 1; pi >= 0; pi--) {
                const p = invaderProjectiles[pi];
                for (const ob of obstacles) {
                    if (p.x >= ob.x && p.x <= ob.x + ob.w &&
                        p.y >= ob.y && p.y <= ob.y + ob.h) {
                        invaderProjectiles.splice(pi, 1);
                        break;
                    }
                }
            }

            // Invaders reached player zone => game over
            if (grid.invaders.some((inv) => inv.y + inv.h >= player.y)) {
                finish(false);
                return;
            }

            // All invaders destroyed => next level
            if (grid.invaders.length === 0 && !finished) {
                level++;
                playNextLevel();
                const velBoost = (level - 1) * 0.25;
                grid = makeGrid(
                    Math.floor(Math.random() * 4) + 2,
                    Math.floor(Math.random() * 4) + 5,
                    velBoost
                );
                obstacles = makeObstacles();
                playerProjectiles.length = 0;
                invaderProjectiles.length = 0;
            }

            // Particles
            particles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;
                p.opacity = Math.max(0, p.opacity - 0.009);
            });
            particles = particles.filter((p) => p.opacity > 0);
        };

        // ── DRAW ──────────────────────────────────────────────────────────────
        const draw = () => {
            // Background
            ctx.fillStyle = '#000011';
            ctx.fillRect(0, 0, W, H);

            // Stars
            ctx.fillStyle = '#ffffff';
            stars.forEach((s) => {
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fill();
            });

            // Invaders
            grid.invaders.forEach((inv) => {
                ctx.drawImage(invaderImg, inv.x, inv.y, inv.w, inv.h);
            });

            // Obstacles
            obstacles.forEach((ob) => {
                ctx.fillStyle = ob.color;
                ctx.fillRect(ob.x, ob.y, ob.w, ob.h);
            });

            // Projectiles
            ctx.fillStyle = '#00d4ff';
            playerProjectiles.forEach((p) => ctx.fillRect(p.x, p.y, p.w, p.h));
            ctx.fillStyle = '#ff4444';
            invaderProjectiles.forEach((p) => ctx.fillRect(p.x, p.y, p.w, p.h));

            // Player (with invulnerability flicker)
            if (player.alive) {
                const isInvul = performance.now() < invulUntil;
                if (!isInvul || Math.floor(performance.now() / 100) % 2 === 0) {
                    ctx.drawImage(engineSpritesImg, player.sx, 0, 48, 48,
                        player.x, player.y + player.h - 10, player.w, player.h);
                    ctx.drawImage(engineImg, player.x, player.y + player.h - 10, player.w, 32);
                    ctx.drawImage(spaceshipImg, player.x, player.y, player.w, player.h);
                }
            }

            // Particles
            particles.forEach((p) => {
                ctx.save();
                ctx.globalAlpha = p.opacity;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();
                ctx.restore();
            });

            // On-canvas HUD
            ctx.font = 'bold 14px Orbitron, monospace';
            ctx.fillStyle = '#00d4ff';
            ctx.textAlign = 'left';
            ctx.fillText(`SCORE: ${score}`, 10, 22);
            ctx.textAlign = 'center';
            ctx.fillText(`LV ${level}`, W / 2, 22);
            ctx.textAlign = 'right';
            ctx.fillStyle = '#ff4444';
            ctx.fillText('♥'.repeat(Math.max(0, lives)), W - 10, 22);
            ctx.textAlign = 'left';
        };

        // ── GAME LOOP ─────────────────────────────────────────────────────────
        const gameLoop = (ts) => {
            if (finished) return;
            lastTs = ts;
            update();
            draw();
            rafId = requestAnimationFrame(gameLoop);
        };

        updateHud();
        rafId = requestAnimationFrame(gameLoop);

        this.spaceSession = { cleanup: (won = false) => finish(won) };

        return promise;
    }

    runMarioBonusLevel() {
        const modal = this.els.marioBonusModal;
        const canvas = this.els.marioCanvas;
        if (!modal || !canvas) return Promise.resolve({ won: false, distance: 0 });

        const ctx = canvas.getContext('2d');
        if (!ctx) return Promise.resolve({ won: false, distance: 0 });

        this.pauseGameMusic();
        modal.classList.remove('hidden');
        ctx.imageSmoothingEnabled = false;

        if (this.marioSession && this.marioSession.cleanup) {
            this.marioSession.cleanup(false);
        }

        let resolvePromise = null;
        const promise = new Promise((resolve) => { resolvePromise = resolve; });

        // ── CONSTANTS ────────────────────────────────────────────────────────
        const W = canvas.width;   // 800
        const H = canvas.height;  // 300
        const GROUND_TOP = H - 48; // top of green ground strip

        // ── STATE ────────────────────────────────────────────────────────────
        const durationSec = 60;
        let timeLeft = durationSec;
        let lives = 3;
        let invulUntil = 0;
        let finished = false;
        let raceStarted = false;
        let distanceMeter = 0;
        let gameSpeed = 260;
        const maxGameSpeed = 560;
        const speedGainPerSec = (maxGameSpeed - gameSpeed) / durationSec;

        let rafId = null;
        let timerTick = null;
        let startRaceTimer = null;
        let deathTimer = null;
        let keyDownHandler = null;
        let keyUpHandler = null;
        let lastTs = 0;

        // ── MARIO ────────────────────────────────────────────────────────────
        const MARIO_W = 38;
        const MARIO_H = 50;

        const player = {
            x: 110,
            y: GROUND_TOP,           // bottom edge sits on ground
            vy: 0,
            isJumping: false,
            isDead: false,
            runFrame: 0,
            runFrameAcc: 0,
            jumpForce: -820,
            gravity: 2100
        };

        const keys = { left: false, right: false };
        const moveSpeedX = 340;

        // ── PIPES ────────────────────────────────────────────────────────────
        const pipes = [];
        let spawnElapsed = 1.1; // first pipe arrives quickly

        // ── CLOUDS ───────────────────────────────────────────────────────────
        const clouds = [
            { x: 140, y: 50, w: 90, speed: 22 },
            { x: 380, y: 34, w: 115, speed: 15 },
            { x: 640, y: 62, w: 72, speed: 28 },
        ];

        // ── GROUND TILE OFFSET ───────────────────────────────────────────────
        let groundOffset = 0;

        const makeImage = (src) => {
            const img = new Image();
            img.src = src;
            return img;
        };

        const boardWrap = canvas.parentElement;
        if (boardWrap) {
            boardWrap.style.position = 'relative';
        }

        const marioRunSprite = document.createElement('img');
        marioRunSprite.src = this.resolveAssetPath('img/mario.gif');
        marioRunSprite.alt = 'Mario running';
        marioRunSprite.setAttribute('aria-hidden', 'true');
        marioRunSprite.style.position = 'absolute';
        marioRunSprite.style.left = '0px';
        marioRunSprite.style.top = '0px';
        marioRunSprite.style.width = '58px';
        marioRunSprite.style.height = '64px';
        marioRunSprite.style.pointerEvents = 'none';
        marioRunSprite.style.zIndex = '6';
        marioRunSprite.style.imageRendering = 'pixelated';
        marioRunSprite.style.display = 'none';
        if (boardWrap) boardWrap.appendChild(marioRunSprite);
        const marioGameOverSprite = makeImage(this.resolveAssetPath('img/Assets/Other/GameOver.png'));
        const isSpriteLoaded = (img) => img && img.complete && img.naturalWidth > 0 && img.naturalHeight > 0;

        // ── DRAWING HELPERS ──────────────────────────────────────────────────

        // Pixel-art Mario using a colour-indexed grid
        // Each cell = SCALE canvas pixels; '.' = transparent
        const SCALE = 2.6;
        const MARIO_PALETTE = {
            r: '#cc1100', // red  (hat, shirt)
            h: '#3b2000', // dark brown (hair, shoes)
            f: '#ffb880', // face/skin
            o: '#2244cc', // blue overalls
            m: '#1a0800', // dark mustache
            y: '#ffee44', // yellow buckle
            w: '#ffffff', // white eyes
        };

        // Running frame 1 (left leg forward)
        const MARIO_RUN1 = [
            '....rrrrrr......',
            '...rrrrrrrrrr...',
            '...rrhhhrrrrr...',
            '...rrhhhhhrrr...',
            '....ffffffff....',
            '...hfffffffr....',
            '..fffffffffff...',
            '..fmmmmfffffhh..',
            '..fffmmmmfffff..',
            '..rrrr.rrrrr....',
            '..roooooo.rrrr..',
            '..rooooooooor...',
            '...ooooooooo....',
            '..royyoooooor...',
            '..rrrroooorrr...',
            '..rroooooorr....',
            '...roo...orrr...',
            '...hhh...hhh....',
            '..hhhh...hhhh...',
        ];

        // Running frame 2 (right leg forward, mirrored slightly)
        const MARIO_RUN2 = [
            '....rrrrrr......',
            '...rrrrrrrrrr...',
            '...rrhhhrrrrr...',
            '...rrhhhhhrrr...',
            '....ffffffff....',
            '...hfffffffr....',
            '..fffffffffff...',
            '..fmmmmfffffhh..',
            '..fffmmmmfffff..',
            '..rrrr.rrrrr....',
            '..roooooo.rrrr..',
            '..rooooooooor...',
            '...ooooooooo....',
            '..royyoooooor...',
            '..rrrroooorrr...',
            '..rroooooorr....',
            '...orrr..roo....',
            '...hhh...hhh....',
            '..hhhh...hhhh...',
        ];

        // Jump frame
        const MARIO_JUMP = [
            '....rrrrrr......',
            '...rrrrrrrrrr...',
            '...rrhhhrrrrr...',
            '...rrhhhhhrrr...',
            '....ffffffff....',
            '...hfffffffr....',
            '..fffffffffff...',
            '..fmmmmfffffhh..',
            '..fffmmmmfffff..',
            '..rrrr.rrrrr....',
            '..roooooorrrrr..',
            '..rooooooooor...',
            '...ooooooooo....',
            '..royyoooooor...',
            '...rhh..hhrr....',
            '..rhhh..hhhr....',
            '..hhhh..hhhh....',
        ];

        const drawMarioSprite = (pixels, drawX, drawY) => {
            const cols = pixels[0].length;
            pixels.forEach((row, ri) => {
                for (let ci = 0; ci < row.length; ci++) {
                    const key = row[ci];
                    if (key === '.' || !MARIO_PALETTE[key]) continue;
                    ctx.fillStyle = MARIO_PALETTE[key];
                    ctx.fillRect(
                        Math.floor(drawX + ci * SCALE),
                        Math.floor(drawY + ri * SCALE),
                        Math.ceil(SCALE),
                        Math.ceil(SCALE)
                    );
                }
            });
        };

        const drawMario = () => {
            const isInvul = Date.now() < invulUntil;
            if (isInvul && Math.floor(Date.now() / 120) % 2 === 0) return;

            if (!player.isDead && isSpriteLoaded(marioRunSprite)) {
                // GIF is rendered as DOM element to keep animation frames alive.
                return;
            }

            if (player.isDead) {
                if (marioGameOverSprite && marioGameOverSprite.complete && marioGameOverSprite.naturalWidth > 0) {
                    const deadH = 62;
                    const deadW = (marioGameOverSprite.naturalWidth / marioGameOverSprite.naturalHeight) * deadH;
                    ctx.drawImage(
                        marioGameOverSprite,
                        Math.floor(player.x - deadW / 2),
                        Math.floor(player.y - deadH),
                        Math.ceil(deadW),
                        Math.ceil(deadH)
                    );
                    return;
                }
            }

            if (isSpriteLoaded(marioRunSprite)) {
                const drawH = 64;
                const drawW = (marioRunSprite.naturalWidth / marioRunSprite.naturalHeight) * drawH;
                ctx.drawImage(
                    marioRunSprite,
                    Math.floor(player.x - drawW / 2),
                    Math.floor(player.y - drawH),
                    Math.ceil(drawW),
                    Math.ceil(drawH)
                );
                return;
            }

            const pixelW = 16 * SCALE;
            const pixelH = 19 * SCALE;
            const drawX = player.x - pixelW / 2;
            const drawY = player.y - pixelH;

            const sprite = player.isJumping ? MARIO_JUMP
                : (player.runFrame === 0 ? MARIO_RUN1 : MARIO_RUN2);

            drawMarioSprite(sprite, drawX, drawY);
        };

        const updateMarioActor = () => {
            if (!marioRunSprite) return;
            const loaded = isSpriteLoaded(marioRunSprite);
            const shouldShow = loaded && !player.isDead;
            if (!shouldShow) {
                marioRunSprite.style.display = 'none';
                return;
            }

            const canvasRect = canvas.getBoundingClientRect();
            const scaleX = canvasRect.width / W;
            const scaleY = canvasRect.height / H;
            const drawH = 64;
            const drawW = (marioRunSprite.naturalWidth / marioRunSprite.naturalHeight) * drawH;
            const drawX = player.x - drawW / 2;
            const drawY = player.y - drawH;

            marioRunSprite.style.display = 'block';
            marioRunSprite.style.width = `${Math.max(1, drawW * scaleX)}px`;
            marioRunSprite.style.height = `${Math.max(1, drawH * scaleY)}px`;
            marioRunSprite.style.left = `${drawX * scaleX}px`;
            marioRunSprite.style.top = `${drawY * scaleY}px`;
            marioRunSprite.style.opacity = (Date.now() < invulUntil && Math.floor(Date.now() / 120) % 2 === 0) ? '0' : '1';
            marioRunSprite.style.transform = keys.left && !keys.right ? 'scaleX(-1)' : 'scaleX(1)';
            marioRunSprite.style.transformOrigin = 'center';
        };

        // Pixel-art cloud
        const drawCloud = (cx, cy, cw) => {
            const ch = cw * 0.45;
            ctx.fillStyle = '#ffffff';
            // Top bumps
            ctx.beginPath();
            ctx.arc(cx + cw * 0.28, cy + ch * 0.30, ch * 0.44, 0, Math.PI * 2);
            ctx.arc(cx + cw * 0.55, cy + ch * 0.20, ch * 0.52, 0, Math.PI * 2);
            ctx.arc(cx + cw * 0.78, cy + ch * 0.30, ch * 0.38, 0, Math.PI * 2);
            ctx.fill();
            // Base rect
            ctx.fillRect(cx + cw * 0.10, cy + ch * 0.40, cw * 0.80, ch * 0.60);
        };

        // Green pipe (classic Mario style)
        const drawPipe = (pipe) => {
            const capH = 18;
            const bodyW = pipe.w - 10;
            const capX = pipe.x - pipe.w / 2;
            const bodyX = pipe.x - bodyW / 2;
            const pipeTop = pipe.y - pipe.h;

            // Body (dark green)
            ctx.fillStyle = '#2e8b1a';
            ctx.fillRect(bodyX, pipeTop, bodyW, pipe.h);

            // Body highlight
            ctx.fillStyle = '#3caa22';
            ctx.fillRect(bodyX + 4, pipeTop, bodyW * 0.28, pipe.h);

            // Body shade line
            ctx.fillStyle = '#1a6010';
            ctx.fillRect(bodyX + bodyW - 5, pipeTop, 5, pipe.h);

            // Cap (darker green, wider)
            ctx.fillStyle = '#236814';
            ctx.fillRect(capX, pipeTop, pipe.w, capH);

            // Cap highlight
            ctx.fillStyle = '#30991c';
            ctx.fillRect(capX + 3, pipeTop + 2, pipe.w * 0.30, capH - 4);

            // Cap bottom shade
            ctx.fillStyle = '#1a5010';
            ctx.fillRect(capX, pipeTop + capH - 4, pipe.w, 4);

            // Cap top shine
            ctx.fillStyle = '#4edd26';
            ctx.fillRect(capX + 5, pipeTop + 3, 8, 4);
        };

        // Pixel-art ground
        const drawGround = () => {
            // Green top
            ctx.fillStyle = '#3ea520';
            ctx.fillRect(0, GROUND_TOP, W, 16);

            // Green tile stripe detail
            ctx.fillStyle = '#50c828';
            const tileW = 48;
            const offset = (groundOffset % tileW);
            for (let tx = -tileW + offset; tx < W + tileW; tx += tileW) {
                ctx.fillRect(tx, GROUND_TOP, tileW - 2, 6);
            }

            // Brown soil
            ctx.fillStyle = '#8b5e2a';
            ctx.fillRect(0, GROUND_TOP + 16, W, H - GROUND_TOP - 16);

            // Brown darker stripe
            ctx.fillStyle = '#6b4218';
            ctx.fillRect(0, GROUND_TOP + 20, W, 4);
        };

        // ── HUD UPDATE ───────────────────────────────────────────────────────
        const updateHud = () => {
            if (this.els.marioDistance) {
                this.els.marioDistance.textContent = `Distância: ${Math.floor(distanceMeter)}m`;
            }
            if (this.els.marioTimer) {
                this.els.marioTimer.textContent = `Tempo: ${timeLeft}s`;
            }
            if (this.els.marioLives) {
                this.els.marioLives.textContent = `Vidas: ${Math.max(0, lives)}`;
            }
        };

        // ── JUMP SOUND (synthesised boing) ──────────────────────────────────
        const playJumpSound = () => {
            const ac = this.getSharedAudioContext();
            if (!ac) return;
            const now = ac.currentTime;
            const osc = ac.createOscillator();
            const gain = ac.createGain();
            osc.type = 'square';
            osc.frequency.setValueAtTime(340, now);
            osc.frequency.exponentialRampToValueAtTime(680, now + 0.06);
            osc.frequency.exponentialRampToValueAtTime(520, now + 0.12);
            gain.gain.setValueAtTime(0.001, now);
            gain.gain.exponentialRampToValueAtTime(0.28, now + 0.01);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
            osc.connect(gain);
            gain.connect(ac.destination);
            osc.start(now);
            osc.stop(now + 0.2);
        };

        // ── COLLISION HIT SOUND ──────────────────────────────────────────────
        const playHitSound = () => {
            const ac = this.getSharedAudioContext();
            if (!ac) return;
            const now = ac.currentTime;
            const osc = ac.createOscillator();
            const gain = ac.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(260, now);
            osc.frequency.exponentialRampToValueAtTime(80, now + 0.22);
            gain.gain.setValueAtTime(0.001, now);
            gain.gain.exponentialRampToValueAtTime(0.32, now + 0.01);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
            osc.connect(gain);
            gain.connect(ac.destination);
            osc.start(now);
            osc.stop(now + 0.30);
        };

        // ── FINISH ────────────────────────────────────────────────────────────
        const stopMarioSounds = () => {
            [this.marioStartAudio, this.marioRaceAudio, this.marioFallAudio, this.marioWinsAudio].forEach((s) => {
                if (!s) return;
                s.pause();
                try { s.currentTime = 0; } catch (_) {}
            });
        };

        const finish = (won) => {
            if (finished) return;
            finished = true;

            if (timerTick) clearInterval(timerTick);
            if (rafId) cancelAnimationFrame(rafId);
            if (startRaceTimer) clearTimeout(startRaceTimer);
            if (deathTimer) clearTimeout(deathTimer);
            if (keyDownHandler) window.removeEventListener('keydown', keyDownHandler, true);
            if (keyUpHandler) window.removeEventListener('keyup', keyUpHandler, true);

            stopMarioSounds();

            if (this.els.marioGiveUpBtn) {
                this.els.marioGiveUpBtn.onclick = null;
            }

            if (marioRunSprite && marioRunSprite.parentNode) {
                marioRunSprite.parentNode.removeChild(marioRunSprite);
            }

            modal.classList.add('hidden');
            this.marioSession = null;
            resolvePromise({ won, distance: Math.floor(distanceMeter) });
        };

        // ── GAME LOOP ────────────────────────────────────────────────────────
        const loop = (ts) => {
            if (finished) return;
            if (!lastTs) lastTs = ts;
            const dt = Math.min(0.05, (ts - lastTs) / 1000);
            lastTs = ts;

            if (!raceStarted) {
                rafId = requestAnimationFrame(loop);
                return;
            }

            // Speed ramp
            gameSpeed = Math.min(maxGameSpeed, gameSpeed + speedGainPerSec * dt);

            // Distance
            distanceMeter += gameSpeed * dt / 10;

            // Ground scroll offset
            groundOffset += gameSpeed * dt;

            // Clouds scroll
            clouds.forEach((c) => {
                c.x -= c.speed * dt;
                if (c.x + c.w < 0) c.x = W + c.w * 0.5;
            });

            // Player physics
            const moveX = (keys.right ? 1 : 0) - (keys.left ? 1 : 0);
            player.x += moveX * moveSpeedX * dt;

            player.x = Math.max(MARIO_W / 2, Math.min(W - MARIO_W / 2, player.x));
            player.y = Math.min(GROUND_TOP, player.y);

            if (player.isJumping && !player.isDead) {
                player.vy += player.gravity * dt;
                player.y += player.vy * dt;
                if (player.y >= GROUND_TOP) {
                    player.y = GROUND_TOP;
                    player.vy = 0;
                    player.isJumping = false;
                }
            }

            // Run animation
            if (!player.isJumping && !player.isDead) {
                player.runFrameAcc += dt * (gameSpeed / 200);
                if (player.runFrameAcc >= 1) {
                    player.runFrameAcc = 0;
                    player.runFrame = 1 - player.runFrame;
                }
            }

            // Pipe spawn
            spawnElapsed += dt;
            const spawnInterval = Math.max(0.7, 2.2 - gameSpeed / 500);
            if (spawnElapsed >= spawnInterval) {
                spawnElapsed = 0;
                const h = 55 + Math.floor(Math.random() * 60); // 55–115px
                const w = 48;
                pipes.push({ x: W + w, y: GROUND_TOP, w, h });
            }

            // Move pipes
            for (let i = pipes.length - 1; i >= 0; i--) {
                pipes[i].x -= gameSpeed * dt;
                if (pipes[i].x < -pipes[i].w) {
                    pipes.splice(i, 1);
                }
            }

            // Collision (AABB with inset to feel fair)
            const inset = 6;
            const pLeft  = player.x - MARIO_W / 2 + inset;
            const pRight = player.x + MARIO_W / 2 - inset;
            const pTop   = player.y - MARIO_H + inset;
            const pBot   = player.y;

            for (let i = 0; i < pipes.length; i++) {
                const pipe = pipes[i];
                const pipeLeft   = pipe.x - pipe.w / 2;
                const pipeRight  = pipe.x + pipe.w / 2;
                const pipeTop    = pipe.y - pipe.h;

                const hit = pRight > pipeLeft && pLeft < pipeRight &&
                            pBot > pipeTop && pTop < pipe.y;

                if (hit && Date.now() >= invulUntil && !player.isDead) {
                    lives -= 1;
                    invulUntil = Date.now() + 1600;
                    playHitSound();
                    pipes.splice(i, 1);

                    // Bounce player back slightly
                    player.x = Math.max(80, player.x - 30);

                    if (lives <= 0) {
                        player.isDead = true;
                        if (this.marioFallAudio) {
                            this.marioFallAudio.pause();
                            try { this.marioFallAudio.currentTime = 0; } catch (_) {}
                            this.marioFallAudio.play().catch(() => {});
                        }
                        if (deathTimer) clearTimeout(deathTimer);
                        deathTimer = setTimeout(() => finish(false), 850);
                        return;
                    }
                    break;
                }
            }

            updateHud();

            // ── RENDER ──────────────────────────────────────────────────────

            // Sky gradient
            const skyGrad = ctx.createLinearGradient(0, 0, 0, GROUND_TOP);
            skyGrad.addColorStop(0, '#5c94fc');
            skyGrad.addColorStop(1, '#8ab4ff');
            ctx.fillStyle = skyGrad;
            ctx.fillRect(0, 0, W, GROUND_TOP);

            // Clouds
            clouds.forEach((c) => drawCloud(c.x, c.y, c.w));

            // Ground
            drawGround();

            // Pipes
            pipes.forEach(drawPipe);

            // Mario GIF overlay
            updateMarioActor();

            // Mario
            drawMario();

            // Invulnerability shield ring
            if (Date.now() < invulUntil && Math.floor(Date.now() / 120) % 2 === 0) {
                ctx.strokeStyle = 'rgba(255,255,180,0.85)';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.ellipse(player.x, player.y - MARIO_H / 2, MARIO_W * 0.65, MARIO_H * 0.6, 0, 0, Math.PI * 2);
                ctx.stroke();
            }

            // Life icons (mushrooms) bottom left
            for (let i = 0; i < Math.max(0, lives); i++) {
                const mx = 18 + i * 24;
                const my = H - 14;
                // Mushroom cap
                ctx.fillStyle = '#cc1100';
                ctx.beginPath();
                ctx.arc(mx, my - 7, 8, Math.PI, 0);
                ctx.fill();
                // White dots
                ctx.fillStyle = '#ffffff';
                ctx.beginPath();
                ctx.arc(mx - 4, my - 9, 2, 0, Math.PI * 2);
                ctx.arc(mx + 4, my - 9, 2, 0, Math.PI * 2);
                ctx.fill();
                // Stalk
                ctx.fillStyle = '#ffddaa';
                ctx.fillRect(mx - 5, my - 2, 10, 8);
            }

            rafId = requestAnimationFrame(loop);
        };

        // ── INPUT ─────────────────────────────────────────────────────────────
        const tryJump = () => {
            if (!player.isJumping && raceStarted && !finished && !player.isDead) {
                player.isJumping = true;
                player.vy = player.jumpForce;
                playJumpSound();
            }
        };

        const isArrowLeft = (e) => e.code === 'ArrowLeft' || e.key === 'ArrowLeft';
        const isArrowRight = (e) => e.code === 'ArrowRight' || e.key === 'ArrowRight';
        const isJumpKey = (e) => e.code === 'ArrowUp' || e.key === 'ArrowUp' || e.code === 'Tab' || e.key === 'Tab';

        keyDownHandler = (e) => {
            if (modal.classList.contains('hidden')) return;
            if (isArrowLeft(e)) {
                e.preventDefault();
                keys.left = true;
            }
            if (isArrowRight(e)) {
                e.preventDefault();
                keys.right = true;
            }
            if (isJumpKey(e)) {
                e.preventDefault();
                tryJump();
            }
        };

        keyUpHandler = (e) => {
            if (isArrowLeft(e)) keys.left = false;
            if (isArrowRight(e)) keys.right = false;
        };

        window.addEventListener('keydown', keyDownHandler, true);
        window.addEventListener('keyup', keyUpHandler, true);

        if (this.els.marioGiveUpBtn) {
            this.els.marioGiveUpBtn.onclick = () => finish(false);
        }

        updateHud();
        rafId = requestAnimationFrame(loop);

        // ── START SEQUENCE ───────────────────────────────────────────────────
        const startRace = () => {
            if (raceStarted || finished) return;
            raceStarted = true;

            if (this.marioRaceAudio) {
                this.marioRaceAudio.currentTime = 0;
                this.marioRaceAudio.play().catch(() => {});
            }

            timerTick = setInterval(() => {
                if (finished) return;
                timeLeft -= 1;
                updateHud();
                if (timeLeft <= 0) finish(true);
            }, 1000);
        };

        stopMarioSounds();

        if (this.marioStartAudio) {
            this.marioStartAudio.currentTime = 0;
            this.marioStartAudio.play().catch(() => {});
            this.marioStartAudio.onended = () => startRace();
        }

        startRaceTimer = setTimeout(() => startRace(), 4500);

        this.marioSession = {
            cleanup: (won = false) => finish(won)
        };

        return promise;
    }

    showSpaceVictoryPopup(playerName = 'Jogador') {
        const safeName = String(playerName || 'Jogador').trim() || 'Jogador';

        const overlay = document.createElement('div');
        overlay.className = 'slot-summary-overlay enduro-victory-overlay';

        const card = document.createElement('div');
        card.className = 'slot-summary-card enduro-victory-card';
        card.innerHTML = `
            <h3 class="slot-summary-title">VOCÊ VENCEU! 🚀🏆</h3>
            <div style="font-size:5rem; margin: 16px 0;">🎉🚀🎉</div>
            <p class="enduro-victory-text"><strong>${safeName}</strong>, sobreviveu 1 minuto no SPACE INVADERS!</p>
        `;

        overlay.appendChild(card);
        document.body.appendChild(overlay);

        return new Promise((resolve) => {
            let done = false;
            const cleanup = () => {
                if (done) return;
                done = true;
                overlay.remove();
                resolve();
            };
            setTimeout(cleanup, 5000);
        });
    }

    showSpaceFinalSummary(baseScore, reward, invaderScore = 0) {
        const safeBase    = Number(baseScore) || 0;
        const safeReward  = Math.max(0, Number(reward) || 0);
        const safeInvScore = Math.max(0, Number(invaderScore) || 0);

        const overlay = document.createElement('div');
        overlay.className = 'slot-summary-overlay';

        const card = document.createElement('div');
        card.className = 'slot-summary-card';
        card.innerHTML = `
            <h3 class="slot-summary-title">TOTAL DO DESAFIO SPACE 🚀</h3>
            <div class="enduro-trophy-hero" aria-hidden="true">🚀🏆</div>
            <div class="slot-summary-list"></div>
            <div class="slot-summary-total">PONTUAÇÃO: ${safeBase}</div>
        `;

        overlay.appendChild(card);
        document.body.appendChild(overlay);

        const listEl  = card.querySelector('.slot-summary-list');
        const totalEl = card.querySelector('.slot-summary-total');

        return new Promise((resolve) => {
            let runningScore = safeBase;

            setTimeout(() => {
                const row = document.createElement('div');
                row.className = 'slot-summary-row';
                row.innerHTML = `<span>Invasores destruídos</span><strong>${safeInvScore} pts</strong>`;
                listEl.appendChild(row);
            }, 600);

            setTimeout(() => {
                const row = document.createElement('div');
                row.className = 'slot-summary-row';
                row.innerHTML = `<span>Completou 1 minuto inteiro</span><strong>+${safeReward}</strong>`;
                listEl.appendChild(row);

                const oldScore = runningScore;
                runningScore += safeReward;
                totalEl.textContent = `PONTUAÇÃO: ${runningScore}`;
                this.animateScoreIncrease(oldScore, runningScore);
            }, 1250);

            setTimeout(() => {
                overlay.remove();
                this.resumeGameMusic();
                resolve(runningScore);
            }, 5000);
        });
    }

    showMarioVictoryPopup(playerName = 'Jogador') {
        const safeName = String(playerName || 'Jogador').trim() || 'Jogador';

        const overlay = document.createElement('div');
        overlay.className = 'slot-summary-overlay enduro-victory-overlay';

        const card = document.createElement('div');
        card.className = 'slot-summary-card enduro-victory-card';
        card.innerHTML = `
            <h3 class="slot-summary-title">VOCÊ VENCEU! 🍄🏁</h3>
            <div style="font-size:5rem; margin: 16px 0;">🎉🍄🎉</div>
            <p class="enduro-victory-text"><strong>${safeName}</strong>, completou um minuto inteiro no MARIO!</p>
        `;

        overlay.appendChild(card);
        document.body.appendChild(overlay);

        // Toca o som de vitória imediatamente quando o popup aparece
        if (this.marioWinsAudio) {
            this.marioWinsAudio.pause();
            try { this.marioWinsAudio.currentTime = 0; } catch (_) {}
            this.marioWinsAudio.play().catch(() => {});
        }

        return new Promise((resolve) => {
            let done = false;

            const cleanup = () => {
                if (done) return;
                done = true;
                if (this.marioWinsAudio) {
                    this.marioWinsAudio.pause();
                    try { this.marioWinsAudio.currentTime = 0; } catch (_) {}
                }
                overlay.remove();
                resolve();
            };

            setTimeout(cleanup, 8000);
        });
    }

    showMarioFinalSummary(baseScore, reward, distance = 0) {
        const safeBase = Number(baseScore) || 0;
        const safeReward = Math.max(0, Number(reward) || 0);
        const safeDistance = Math.max(0, Number(distance) || 0);

        const overlay = document.createElement('div');
        overlay.className = 'slot-summary-overlay';

        const card = document.createElement('div');
        card.className = 'slot-summary-card';
        card.innerHTML = `
            <h3 class="slot-summary-title">TOTAL DO DESAFIO MARIO 🍄</h3>
            <div class="enduro-trophy-hero" aria-hidden="true">🏃🏆</div>
            <div class="slot-summary-list"></div>
            <div class="slot-summary-total">PONTUAÇÃO: ${safeBase}</div>
        `;

        overlay.appendChild(card);
        document.body.appendChild(overlay);

        const listEl  = card.querySelector('.slot-summary-list');
        const totalEl = card.querySelector('.slot-summary-total');

        return new Promise((resolve) => {
            let runningScore = safeBase;

            setTimeout(() => {
                const row = document.createElement('div');
                row.className = 'slot-summary-row';
                row.innerHTML = `<span>Distância percorrida</span><strong>${safeDistance}m</strong>`;
                listEl.appendChild(row);
            }, 600);

            setTimeout(() => {
                const row = document.createElement('div');
                row.className = 'slot-summary-row';
                row.innerHTML = `<span>Completou 1 minuto inteiro</span><strong>+${safeReward}</strong>`;
                listEl.appendChild(row);

                const oldScore = runningScore;
                runningScore += safeReward;
                totalEl.textContent = `PONTUAÇÃO: ${runningScore}`;
                this.animateScoreIncrease(oldScore, runningScore);
            }, 1250);

            setTimeout(() => {
                overlay.remove();
                this.resumeGameMusic();
                resolve(runningScore);
            }, 5400);
        });
    }

    runPacmanBonusLevel() {
        const modal = this.els.pacmanBonusModal;
        const canvas = this.els.pacmanCanvas;
        if (!modal || !canvas) {
            return Promise.resolve(false);
        }

        this.pauseGameMusic();
        modal.classList.remove('hidden');

        // Se já existir sessão ativa (proteção), encerra antes de criar outra.
        if (this.pacmanSession && this.pacmanSession.cleanup) {
            this.pacmanSession.cleanup(false);
        }

        const ctx = canvas.getContext('2d');
        const size = 15;
        const cell = Math.floor(canvas.width / size);
        const layout = [
            '###############',   // 0
            '#.............#',   // 1
            '#.##.#####.##.#',   // 2
            '#.............#',   // 3
            '##.##.#.#.##.##',   // 4
            '#.....###.....#',   // 5  (topo da ghost house, cols 6-8 = paredes)
            '##.##.#G#.##.##',   // 6  (porta ghost house col 7 = G)
            '....#.GGG.#....',   // 7  (TUNEL sem bordas + ghost house cols 6-8 = G)
            '##.##.###.##.##',   // 8  (fundo ghost house fechado)
            '#.....#.#.....#',   // 9
            '##.##.#.#.##.##',   // 10 (col 7 aberto para conectar row 9 e row 11)
            '#.............#',   // 11
            '#.##.#####.##.#',   // 12
            '#.............#',   // 13
            '###############'    // 14
        ];

        const walls = new Set();
        const pellets = new Set();
        const powerPellets = new Set();
        const ghostHouseCells = new Set();
        const powerPelletKeys = ['1,1', '13,1', '1,13', '13,13'];
        const cherryPositions = new Set(['3,3', '11,3', '3,11', '11,11']);
        const cherries = new Set();
        // Corredor interno da ghost house liberado para atalho do Pacman.
        const ghostHouseSideGates = new Set(['6,7', '7,7', '8,7']);
        const tunnelRow = 7;
        let cherryBonus = 0;

        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                const key = `${x},${y}`;
                if (layout[y][x] === '#') {
                    walls.add(key);
                } else if (layout[y][x] === 'G') {
                    ghostHouseCells.add(key);
                } else {
                    pellets.add(key);
                }
            }
        }

        powerPelletKeys.forEach((key) => {
            if (!pellets.has(key)) return;
            powerPellets.add(key);
            pellets.delete(key);
        });

        cherryPositions.forEach((key) => {
            if (!pellets.has(key)) return;
            pellets.delete(key);
            cherries.add(key);
        });

        const playerStart = { x: 7, y: 1 };
        const ghostSpawns = [
            { x: 6, y: 7, dir: { x: -1, y: 0 }, color: '#ff0000' },   // Blinky (vermelho)
            { x: 7, y: 7, dir: { x: 0,  y: 1  }, color: '#ffb8ff' },   // Pinky (rosa)
            { x: 8, y: 7, dir: { x: 1,  y: 0  }, color: '#00ffff' },   // Inky (ciano)
            { x: 7, y: 6, dir: { x: 0,  y: -1 }, color: '#ffb851' },   // Clyde (laranja)
        ];

        const player = {
            x: playerStart.x,
            y: playerStart.y,
            dir: { x: 1, y: 0 },
            nextDir: { x: 1, y: 0 }
        };

        const ghosts = ghostSpawns.map((g) => ({
            x: g.x,
            y: g.y,
            dir: { ...g.dir },
            color: g.color
        }));

        let mouthFrame = 0;
        let pelletTotal = pellets.size + powerPellets.size;
        let finished = false;
        let timeLeft = 120;
        let lives = 3;
        let powerUntil = 0;
        let respawnShieldUntil = 0;
        let ghostStepCounter = 0;
        let moveTick = null;
        let timerTick = null;
        let renderRaf = null;
        let keyHandler = null;
        let resolvePromise = () => {};
        let powerWarnPlayed = false;

        const stopPacmanSounds = () => {
            [this.pacmanEatAudio, this.pacmanDieAudio, this.pacmanVitaminAudio, this.pacmanEndingPowerAudio].forEach((s) => {
                s.pause();
                try { s.currentTime = 0; } catch (_) {}
            });
        };

        const dirs = {
            ArrowUp: { x: 0, y: -1 },
            ArrowDown: { x: 0, y: 1 },
            ArrowLeft: { x: -1, y: 0 },
            ArrowRight: { x: 1, y: 0 }
        };

        const asKey = (x, y) => `${x},${y}`;
        const isWall = (x, y) => walls.has(asKey(x, y));
        const isPowerActive = () => Date.now() < powerUntil;
        const isShielded = () => Date.now() < respawnShieldUntil;

        // Aplica wrap-around horizontal na linha do túnal.
        const applyWrap = (x, y, dx) => {
            const nx = x + dx;
            if (y === tunnelRow) {
                if (nx < 0) return size - 1;
                if (nx >= size) return 0;
            }
            return nx;
        };

        const canMovePlayer = (ent, dir) => {
            const nx = applyWrap(ent.x, ent.y, dir.x);
            const ny = ent.y + dir.y;
            if (nx < 0 || ny < 0 || nx >= size || ny >= size) return false;
            const key = asKey(nx, ny);
            if (walls.has(key)) return false;
            if (ghostHouseCells.has(key) && !ghostHouseSideGates.has(key)) return false;
            return true;
        };

        const canMoveGhost = (ent, dir) => {
            const nx = applyWrap(ent.x, ent.y, dir.x);
            const ny = ent.y + dir.y;
            if (nx < 0 || ny < 0 || nx >= size || ny >= size) return false;
            return !walls.has(asKey(nx, ny));
        };

        // Alias para o código de onStep que usa canMove para o jogador.
        const canMove = canMovePlayer;

        const moveEntity = (ent, dir) => {
            ent.x = applyWrap(ent.x, ent.y, dir.x);
            ent.y += dir.y;
        };

        const resetPositions = () => {
            player.x = playerStart.x;
            player.y = playerStart.y;
            player.dir = { x: 1, y: 0 };
            player.nextDir = { x: 1, y: 0 };

            ghosts.forEach((ghost, idx) => {
                const spawn = ghostSpawns[idx];
                ghost.x = spawn.x;
                ghost.y = spawn.y;
                ghost.dir = { ...spawn.dir };
            });

            // Curto escudo ao renascer para evitar morte em cadeia instantânea.
            respawnShieldUntil = Date.now() + 1300;
        };

        const consumeCell = (x, y) => {
            const key = asKey(x, y);
            if (pellets.delete(key)) return;

            if (powerPellets.delete(key)) {
                powerUntil = Date.now() + 10000;
                powerWarnPlayed = false;
                this.pacmanEndingPowerAudio.pause();
                try { this.pacmanEndingPowerAudio.currentTime = 0; } catch (_) {}
                this.pacmanVitaminAudio.currentTime = 0;
                this.pacmanVitaminAudio.play().catch(() => {});
                return;
            }

            if (cherries.delete(key)) {
                cherryBonus += 50;
                this.playCountingSound();
            }
        };

        const updateHud = () => {
            const remaining = pellets.size + powerPellets.size;
            const collected = pelletTotal - remaining;
            const powerSeconds = Math.max(0, Math.ceil((powerUntil - Date.now()) / 1000));
            const cherryCollected = cherryPositions.size - cherries.size;
            if (this.els.pacmanPellets) {
                const cherryTxt = cherryCollected > 0 ? ` | 🍒 ${cherryCollected}` : '';
                this.els.pacmanPellets.textContent = `Pontos: ${collected}/${pelletTotal}${cherryTxt}`;
            }
            if (this.els.pacmanTimer) {
                const powerTxt = powerSeconds > 0 ? `${powerSeconds}s` : 'OFF';
                this.els.pacmanTimer.textContent = `Tempo: ${timeLeft}s | Créditos: ${lives} | Poder: ${powerTxt}`;
            }
        };

        const draw = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Paleta visual simplificada: uma única linha azul sólida.
            const clrBg = '#020205';
            const clrWall = '#2f5dff';
            const wallStrokeW = Math.max(4, Math.round(cell * 0.22));

            // Helper: célula (cx,cy) é corredor transitável (não é parede nem casa dos fantasmas)?
            const isCorridor = (cx, cy) => {
                if (cx < 0 || cy < 0 || cx >= size || cy >= size) {
                    return cy === tunnelRow; // bordas do túnel são abertas
                }
                const k = asKey(cx, cy);
                return !walls.has(k) && !ghostHouseCells.has(k);
            };

            // Fundo preto sólido, sem preenchimento azul por célula.
            ctx.fillStyle = clrBg;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Desenha contornos das paredes (estilo linha azul arcade).
            for (let y = 0; y < size; y++) {
                for (let x = 0; x < size; x++) {
                    if (!walls.has(asKey(x, y))) continue;
                    const px = x * cell, py = y * cell;
                    const fN = isCorridor(x, y - 1), fS = isCorridor(x, y + 1);
                    const fW = isCorridor(x - 1, y), fE = isCorridor(x + 1, y);
                    const t = wallStrokeW;

                    ctx.fillStyle = clrWall;

                    if (fN) {
                        ctx.fillRect(px, py, cell, t);
                    }
                    if (fS) {
                        ctx.fillRect(px, py + cell - t, cell, t);
                    }
                    if (fW) {
                        ctx.fillRect(px, py, t, cell);
                    }
                    if (fE) {
                        ctx.fillRect(px + cell - t, py, t, cell);
                    }

                }
            }

            // Contorno da casa dos fantasmas com porta amarela.
            if (ghostHouseCells.size > 0) {
                const cells = Array.from(ghostHouseCells).map((k) => {
                    const [gx, gy] = k.split(',').map(Number);
                    return { gx, gy };
                });
                const minGX = Math.min(...cells.map((c) => c.gx));
                const maxGX = Math.max(...cells.map((c) => c.gx));
                const minGY = Math.min(...cells.map((c) => c.gy));
                const maxGY = Math.max(...cells.map((c) => c.gy));

                const inset = Math.round(cell * 0.12);
                const hx = minGX * cell + inset;
                const hy = minGY * cell + inset;
                const hw = ((maxGX - minGX + 1) * cell) - (inset * 2);
                const hh = ((maxGY - minGY + 1) * cell) - (inset * 2);

                // Borda da ghost house no mesmo estilo de linha sólida.
                ctx.fillStyle = clrWall;
                ctx.fillRect(hx, hy, hw, wallStrokeW);
                ctx.fillRect(hx, hy + hh - wallStrokeW, hw, wallStrokeW);
                ctx.fillRect(hx, hy, wallStrokeW, hh);
                ctx.fillRect(hx + hw - wallStrokeW, hy, wallStrokeW, hh);

                // Portas laterais amarelas (saída dos fantasmas).
                const gateY1 = hy + (hh * 0.38);
                const gateY2 = hy + (hh * 0.72);
                const gateLeftX = hx;
                const gateRightX = hx + hw;
                ctx.strokeStyle = '#ffd84a';
                ctx.lineWidth = Math.max(2, cell * 0.10);
                ctx.beginPath();
                ctx.moveTo(gateLeftX, gateY1);
                ctx.lineTo(gateLeftX, gateY2);
                ctx.moveTo(gateRightX, gateY1);
                ctx.lineTo(gateRightX, gateY2);
                ctx.stroke();
            }

            // ── PELLETS / SUPERVITAMINAS / CEREJAS ────────────────────────
            for (let y = 0; y < size; y++) {
                for (let x = 0; x < size; x++) {
                    const px  = x * cell;
                    const py  = y * cell;
                    const key = asKey(x, y);

                    if (pellets.has(key)) {
                        ctx.beginPath();
                        ctx.fillStyle = '#ffe27a';
                        ctx.arc(px + (cell / 2), py + (cell / 2), Math.max(2, cell * 0.10), 0, Math.PI * 2);
                        ctx.fill();
                    }

                    if (powerPellets.has(key)) {
                        const pulse = 0.68 + (Math.sin((Date.now() / 180) + x + y) * 0.18);
                        ctx.beginPath();
                        ctx.fillStyle = '#ffef8a';
                        ctx.arc(px + (cell / 2), py + (cell / 2), Math.max(4, cell * pulse * 0.25), 0, Math.PI * 2);
                        ctx.fill();
                    }

                    if (cherries.has(key)) {
                        const cx2 = px + cell / 2;
                        const cy2 = py + cell / 2;
                        ctx.fillStyle = '#dd2244';
                        ctx.beginPath();
                        ctx.arc(cx2 - cell * 0.13, cy2 + cell * 0.08, cell * 0.16, 0, Math.PI * 2);
                        ctx.fill();
                        ctx.beginPath();
                        ctx.arc(cx2 + cell * 0.13, cy2 + cell * 0.08, cell * 0.16, 0, Math.PI * 2);
                        ctx.fill();
                        ctx.strokeStyle = '#33aa44';
                        ctx.lineWidth = Math.max(1, cell * 0.07);
                        ctx.beginPath();
                        ctx.moveTo(cx2 - cell * 0.13, cy2 - cell * 0.08);
                        ctx.quadraticCurveTo(cx2, cy2 - cell * 0.35, cx2 + cell * 0.13, cy2 - cell * 0.08);
                        ctx.stroke();
                        ctx.fillStyle = '#33aa44';
                        ctx.beginPath();
                        ctx.ellipse(cx2, cy2 - cell * 0.28, cell * 0.12, cell * 0.07, -0.5, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }
            }

            // ── PACMAN ─────────────────────────────────────────────────────
            const pacX = player.x * cell + (cell / 2);
            const pacY = player.y * cell + (cell / 2);
            const mouth = 0.22 + (Math.abs(Math.sin(mouthFrame)) * 0.24);
            mouthFrame += 0.33;
            let angleBase = 0;
            if (player.dir.x === 1)  angleBase = 0;
            if (player.dir.x === -1) angleBase = Math.PI;
            if (player.dir.y === -1) angleBase = -Math.PI / 2;
            if (player.dir.y === 1)  angleBase = Math.PI / 2;

            ctx.beginPath();
            ctx.moveTo(pacX, pacY);
            ctx.fillStyle = isPowerActive() ? '#fff08a' : '#ffd400';
            ctx.arc(pacX, pacY, cell * 0.42, angleBase + mouth, angleBase + (Math.PI * 2) - mouth);
            ctx.closePath();
            ctx.fill();

            // ── FANTASMAS ──────────────────────────────────────────────────
            ghosts.forEach((g) => {
                const gx = g.x * cell + (cell / 2);
                const gy = g.y * cell + (cell / 2);
                ctx.fillStyle = isPowerActive() ? '#4b8cff' : g.color;
                ctx.beginPath();
                ctx.arc(gx, gy - (cell * 0.06), cell * 0.35, Math.PI, 0);
                ctx.lineTo(gx + (cell * 0.35), gy + (cell * 0.30));
                ctx.lineTo(gx - (cell * 0.35), gy + (cell * 0.30));
                ctx.closePath();
                ctx.fill();

                ctx.fillStyle = '#fff';
                ctx.beginPath();
                ctx.arc(gx - (cell * 0.11), gy - (cell * 0.02), cell * 0.07, 0, Math.PI * 2);
                ctx.arc(gx + (cell * 0.11), gy - (cell * 0.02), cell * 0.07, 0, Math.PI * 2);
                ctx.fill();

                if (isPowerActive()) {
                    ctx.fillStyle = '#d9ecff';
                    ctx.beginPath();
                    ctx.arc(gx - (cell * 0.11), gy - (cell * 0.02), cell * 0.03, 0, Math.PI * 2);
                    ctx.arc(gx + (cell * 0.11), gy - (cell * 0.02), cell * 0.03, 0, Math.PI * 2);
                    ctx.fill();
                }
            });

            if (isShielded()) {
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
                ctx.lineWidth = Math.max(2, cell * 0.08);
                ctx.beginPath();
                ctx.arc(pacX, pacY, cell * 0.50, 0, Math.PI * 2);
                ctx.stroke();
            }

            // ── VIDAS (ícones na linha inferior) ───────────────────────────
            const livesToShow = Math.max(0, lives - 1);
            for (let li = 0; li < livesToShow; li++) {
                const lx = (li + 0.55) * cell * 0.88 + cell * 0.1;
                const ly = canvas.height - cell * 0.42;
                const lr = cell * 0.27;
                ctx.fillStyle = '#ffd400';
                ctx.beginPath();
                ctx.moveTo(lx, ly);
                ctx.arc(lx, ly, lr, 0.35, Math.PI * 2 - 0.35);
                ctx.closePath();
                ctx.fill();
            }
        };

        const setDir = (dir) => {
            if (!dir) return;
            player.nextDir = { ...dir };
        };

        const moveGhost = (ghost) => {
            const candidates = [
                { x: 1, y: 0 },
                { x: -1, y: 0 },
                { x: 0, y: 1 },
                { x: 0, y: -1 }
            ].filter((d) => canMoveGhost(ghost, d));

            if (!candidates.length) return;

            const ranked = candidates.map((d) => {
                const dist = Math.abs((ghost.x + d.x) - player.x) + Math.abs((ghost.y + d.y) - player.y);
                return { d, dist };
            });

            if (isPowerActive()) {
                ranked.sort((a, b) => (b.dist + Math.random()) - (a.dist + Math.random()));
            } else {
                ranked.sort((a, b) => (a.dist + (Math.random() * 2.2)) - (b.dist + (Math.random() * 2.2)));
            }

            ghost.dir = ranked[0].d;
            moveEntity(ghost, ghost.dir);
        };

        const handleCollisions = () => {
            let died = false;

            ghosts.forEach((ghost, idx) => {
                if (ghost.x !== player.x || ghost.y !== player.y) return;

                if (isPowerActive()) {
                    const spawn = ghostSpawns[idx];
                    ghost.x = spawn.x;
                    ghost.y = spawn.y;
                    ghost.dir = { ...spawn.dir };
                    this.playCountingSound();
                    return;
                }

                if (isShielded()) return;
                died = true;
            });

            return died;
        };

        const finish = (won, reason = won ? 'completed' : 'unknown') => {
            if (finished) return;
            finished = true;

            if (moveTick) clearInterval(moveTick);
            if (timerTick) clearInterval(timerTick);
            if (renderRaf) cancelAnimationFrame(renderRaf);
            if (keyHandler) window.removeEventListener('keydown', keyHandler);

            stopPacmanSounds();
            this.pacmanStartAudio.pause();
            try { this.pacmanStartAudio.currentTime = 0; } catch (_) {}

            [this.els.pacmanUp, this.els.pacmanDown, this.els.pacmanLeft, this.els.pacmanRight].forEach((btn) => {
                if (!btn) return;
                btn.onmousedown = null;
                btn.ontouchstart = null;
            });

            if (this.els.pacmanGiveUpBtn) {
                this.els.pacmanGiveUpBtn.onclick = null;
            }

            modal.classList.add('hidden');
            this.pacmanSession = null;
            resolvePromise({ won, cherryBonus, reason });
        };

        const renderLoop = () => {
            draw();
            if (!finished) {
                renderRaf = requestAnimationFrame(renderLoop);
            }
        };

        const onStep = () => {
            if (canMove(player, player.nextDir)) {
                player.dir = { ...player.nextDir };
            }

            const moved = canMove(player, player.dir);
            if (moved) {
                moveEntity(player, player.dir);
            }

            // Som de comer: toca apenas enquanto o PACMAN está em movimento
            if (moved) {
                if (this.pacmanEatAudio.paused) {
                    this.pacmanEatAudio.play().catch(() => {});
                }
            } else {
                if (!this.pacmanEatAudio.paused) {
                    this.pacmanEatAudio.pause();
                }
            }

            consumeCell(player.x, player.y);

            // Prioriza vitória imediata ao comer o último ponto.
            // Evita perder no mesmo frame por colisão simultânea com fantasma.
            if ((pellets.size + powerPellets.size) === 0) {
                this.playSokobanWinSound();
                finish(true);
                return;
            }

            ghostStepCounter += 1;
            if (ghostStepCounter % 3 === 0) {
                ghosts.forEach(moveGhost);
            }

            if (handleCollisions()) {
                lives -= 1;

                // Som de morte
                this.pacmanEatAudio.pause();
                try { this.pacmanEatAudio.currentTime = 0; } catch (_) {}
                this.pacmanDieAudio.currentTime = 0;
                this.pacmanDieAudio.play().catch(() => {});

                if (lives <= 0) {
                    finish(false, 'credits');
                    return;
                }

                resetPositions();
                updateHud();
                return;
            }

            // Aviso sonoro quando o poder da supervitamina está quase acabando (< 3s)
            if (isPowerActive()) {
                if ((powerUntil - Date.now()) < 3000 && !powerWarnPlayed) {
                    powerWarnPlayed = true;
                    this.pacmanEndingPowerAudio.currentTime = 0;
                    this.pacmanEndingPowerAudio.play().catch(() => {});
                }
            } else {
                powerWarnPlayed = false;
            }

            updateHud();
        };

        keyHandler = (e) => {
            if (modal.classList.contains('hidden')) return;
            const dir = dirs[e.key];
            if (!dir) return;
            e.preventDefault();
            setDir(dir);
        };
        window.addEventListener('keydown', keyHandler);

        if (this.els.pacmanGiveUpBtn) {
            this.els.pacmanGiveUpBtn.onclick = () => finish(false, 'giveup');
        }

        consumeCell(player.x, player.y);
        updateHud();
        renderLoop();

        // Toca o jingle de entrada e só libera o game loop após ele terminar
        stopPacmanSounds();
        this.pacmanStartAudio.currentTime = 0;
        this.pacmanStartAudio.play().catch(() => {});

        const startGameLoop = () => {
            if (finished) return;
            moveTick = setInterval(onStep, 220);
            timerTick = setInterval(() => {
                if (finished) return;
                timeLeft -= 1;
                updateHud();
                if (timeLeft <= 0) finish(false, 'timeout');
            }, 1000);
        };

        this.pacmanStartAudio.onended = () => startGameLoop();
        // Fallback: inicia o jogo mesmo se o áudio não disparar onended em 5s
        setTimeout(() => { if (!moveTick) startGameLoop(); }, 5000);

        const promise = new Promise((resolve) => {
            resolvePromise = resolve;
        });

        this.pacmanSession = {
            cleanup: (won = false) => finish(won, won ? 'completed' : 'interrupted')
        };

        return promise;
    }

    runEnduroBonusLevel() {
        const modal = this.els.enduroBonusModal;
        const canvas = this.els.enduroCanvas;
        if (!modal || !canvas) {
            return Promise.resolve({ won: false, stagesCompleted: 0, carsPassed: 0 });
        }

        this.pauseGameMusic();
        modal.classList.remove('hidden');

        if (this.enduroSession && this.enduroSession.cleanup) {
            this.enduroSession.cleanup(false);
        }

        const ctx = canvas.getContext('2d');
        const raceDurationSec = 60;
        const finishAnimationSec = 6;
        const durationSec = raceDurationSec + finishAnimationSec;
        let timeLeft = durationSec;
        let lives = 3;
        let finished = false;
        let invulUntil = 0;
        let timerTick = null;
        let rafId = null;
        let resolvePromise = () => {};
        let keyDownHandler = null;
        let keyUpHandler = null;
        let startRaceTimer = null;
        let lastTs = 0;
        let spawnAcc = 0;
        let roadOffset = 0;
        let carsPassed = 0;
        let raceStarted = false;
        let finishLineActive = false;
        let finishLineY = -90;

        const stages = [
            { name: 'DIA', start: 0, bg: '#4f7fd6', road: '#2a2a2a', fog: 0.00, grip: 0.24, speedMul: 0.90 },
            { name: 'NEBLINA', start: 15, bg: '#5d6f88', road: '#2f2f2f', fog: 0.28, grip: 0.22, speedMul: 0.94 },
            { name: 'GELO', start: 30, bg: '#8baed7', road: '#58697a', fog: 0.08, grip: 0.12, speedMul: 0.98 },
            { name: 'NOITE', start: 45, bg: '#10162f', road: '#1f1f1f', fog: 0.00, grip: 0.24, speedMul: 1.02 }
        ];

        const keys = { left: false, right: false, up: false, down: false };
        const player = {
            x: canvas.width / 2,
            y: canvas.height - 52,
            baseY: canvas.height - 52,
            w: 20,
            h: 34,
            steer: 0,
            targetSteer: 0,
            speed: 150,
            throttleSpeed: 120
        };

        const traffic = [];

        const getStage = () => {
            const elapsed = Math.min(raceDurationSec, durationSec - timeLeft);
            let active = stages[0];
            for (let i = 0; i < stages.length; i++) {
                if (elapsed >= stages[i].start) active = stages[i];
            }
            return active;
        };

        const roadGeom = () => {
            const sway = Math.sin(Date.now() / 1200) * 18;
            const cx = (canvas.width / 2) + sway;
            const roadW = 220;
            const left = cx - (roadW / 2);
            const right = cx + (roadW / 2);
            return { left, right, roadW };
        };

        const clampPlayerX = () => {
            const { left, right } = roadGeom();
            const minX = left + player.w + 8;
            const maxX = right - player.w - 8;
            if (player.x < minX) player.x = minX;
            if (player.x > maxX) player.x = maxX;
        };

        const spawnTrafficCar = () => {
            const stage = getStage();
            const { left, roadW } = roadGeom();
            const lanes = 4;
            const laneW = roadW / lanes;
            const lane = Math.floor(Math.random() * lanes);
            const x = left + (laneW * lane) + (laneW / 2);
            const speed = (62 + Math.random() * 50) * stage.speedMul;
            const colorPool = ['#ff3b30', '#4cc9ff', '#ffd166', '#f79dff', '#83ff89'];
            traffic.push({ x, y: -30, w: 18, h: 30, speed, color: colorPool[Math.floor(Math.random() * colorPool.length)] });
        };

        const hitTest = (a, b) => {
            return (
                Math.abs(a.x - b.x) < ((a.w + b.w) / 2) &&
                Math.abs(a.y - b.y) < ((a.h + b.h) / 2)
            );
        };

        const drawCar = (x, y, w, h, color) => {
            ctx.fillStyle = color;
            ctx.fillRect(x - (w / 2), y - (h / 2), w, h);
            ctx.fillStyle = 'rgba(255,255,255,0.88)';
            ctx.fillRect(x - (w * 0.28), y - (h * 0.18), w * 0.56, h * 0.22);
            ctx.fillStyle = '#111';
            ctx.fillRect(x - (w * 0.36), y + (h * 0.32), w * 0.2, h * 0.12);
            ctx.fillRect(x + (w * 0.16), y + (h * 0.32), w * 0.2, h * 0.12);
        };

        const updateHud = () => {
            const stage = getStage();
            if (this.els.enduroStatus) {
                this.els.enduroStatus.textContent = `Estágio: ${stage.name} | Carros: ${lives} | Ultrapassados: ${carsPassed}`;
            }
            if (this.els.enduroTimer) {
                if (timeLeft > finishAnimationSec) {
                    this.els.enduroTimer.textContent = `Tempo: ${timeLeft - finishAnimationSec}s`;
                } else {
                    this.els.enduroTimer.textContent = `Chegada: ${timeLeft}s`;
                }
            }
        };

        const drawFinishLineAndFlag = (left, right, roadW) => {
            if (!finishLineActive) return;

            const lineH = 14;
            const checkerW = 14;
            const lineY = Math.round(finishLineY);

            ctx.fillStyle = '#f6f6f6';
            ctx.fillRect(left, lineY, roadW, lineH);

            for (let i = 0; i < Math.ceil(roadW / checkerW); i++) {
                ctx.fillStyle = i % 2 === 0 ? '#111' : '#f9f9f9';
                ctx.fillRect(left + (i * checkerW), lineY, checkerW, lineH / 2);
                ctx.fillStyle = i % 2 === 0 ? '#f9f9f9' : '#111';
                ctx.fillRect(left + (i * checkerW), lineY + (lineH / 2), checkerW, lineH / 2);
            }

            const personX = right + 14;
            const personY = lineY + 6;
            const flagWave = Math.sin(Date.now() / 130) * 6;

            ctx.fillStyle = '#ffd9b3';
            ctx.beginPath();
            ctx.arc(personX, personY - 12, 4, 0, Math.PI * 2);
            ctx.fill();

            ctx.strokeStyle = '#f4f4f4';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(personX, personY - 8);
            ctx.lineTo(personX, personY + 8);
            ctx.moveTo(personX, personY);
            ctx.lineTo(personX - 6, personY + 4);
            ctx.moveTo(personX, personY);
            ctx.lineTo(personX + 6, personY + 4);
            ctx.stroke();

            const poleX = personX + 6;
            const poleTopY = personY - 18;
            const poleBotY = personY + 2;
            ctx.strokeStyle = '#e5d7a6';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(poleX, poleTopY);
            ctx.lineTo(poleX, poleBotY);
            ctx.stroke();

            const flagW = 14;
            const flagH = 10;
            const fx = poleX;
            const fy = poleTopY + 1 + flagWave * 0.15;

            ctx.fillStyle = '#fff';
            ctx.fillRect(fx, fy, flagW, flagH);
            ctx.fillStyle = '#111';
            ctx.fillRect(fx, fy, flagW / 2, flagH / 2);
            ctx.fillRect(fx + flagW / 2, fy + flagH / 2, flagW / 2, flagH / 2);
        };

        const stopEnduroSounds = () => {
            [this.enduroStartAudio, this.enduroRaceAudio].forEach((s) => {
                if (!s) return;
                s.pause();
                try { s.currentTime = 0; } catch (_) {}
            });
        };

        const finish = (won) => {
            if (finished) return;
            finished = true;

            if (timerTick) clearInterval(timerTick);
            if (rafId) cancelAnimationFrame(rafId);
            if (startRaceTimer) clearTimeout(startRaceTimer);
            if (keyDownHandler) window.removeEventListener('keydown', keyDownHandler);
            if (keyUpHandler) window.removeEventListener('keyup', keyUpHandler);
            stopEnduroSounds();

            if (this.els.enduroGiveUpBtn) {
                this.els.enduroGiveUpBtn.onclick = null;
            }

            modal.classList.add('hidden');
            this.enduroSession = null;
            resolvePromise({ won, stagesCompleted: won ? stages.length : 0, carsPassed });
        };

        const loop = (ts) => {
            if (finished) return;
            if (!lastTs) lastTs = ts;
            const dt = Math.min(0.05, (ts - lastTs) / 1000);
            lastTs = ts;

            const stage = getStage();
            const { left, right, roadW } = roadGeom();

            // Entrada do jogador
            player.targetSteer = 0;
            if (keys.left) player.targetSteer -= 1;
            if (keys.right) player.targetSteer += 1;
            player.steer += (player.targetSteer - player.steer) * stage.grip;
            player.x += player.steer * player.speed * dt;

            // Controle frente/trás para ajustar a posição na pista.
            const throttle = (keys.up ? -1 : 0) + (keys.down ? 1 : 0);
            player.y += throttle * player.throttleSpeed * dt;
            const minY = 72;
            const maxY = canvas.height - 28;
            if (player.y < minY) player.y = minY;
            if (player.y > maxY) player.y = maxY;

            clampPlayerX();

            // Spawns e trafego
            if (timeLeft > finishAnimationSec) {
                const spawnRate = stage.name === 'NOITE' ? 0.68 : (stage.name === 'GELO' ? 0.76 : 0.84);
                spawnAcc += dt;
                while (spawnAcc >= spawnRate) {
                    spawnTrafficCar();
                    spawnAcc -= spawnRate;
                }
            }

            // Nos segundos finais, dispara a linha de chegada.
            if (timeLeft <= finishAnimationSec && !finishLineActive) {
                finishLineActive = true;
                finishLineY = -70;
            }

            if (finishLineActive) {
                const progress = Math.min(1, (finishAnimationSec - timeLeft) / finishAnimationSec);
                const targetY = player.y - 42;
                finishLineY = -70 + ((targetY + 70) * progress);
            }

            for (let i = traffic.length - 1; i >= 0; i--) {
                const c = traffic[i];
                c.y += c.speed * dt;

                if (timeLeft > finishAnimationSec && Date.now() >= invulUntil && hitTest(player, c)) {
                    lives -= 1;
                    invulUntil = Date.now() + 1400;
                    player.x = canvas.width / 2;
                    player.y = player.baseY;
                    traffic.splice(i, 1);

                    if (lives <= 0) {
                        finish(false);
                        return;
                    }
                    continue;
                }

                if (c.y > canvas.height + 40) {
                    carsPassed += 1;
                    traffic.splice(i, 1);
                }
            }

            // Render
            ctx.fillStyle = stage.bg;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = stage.road;
            ctx.fillRect(left, 0, roadW, canvas.height);

            ctx.fillStyle = '#e7e7e7';
            ctx.fillRect(left, 0, 3, canvas.height);
            ctx.fillRect(right - 3, 0, 3, canvas.height);

            drawFinishLineAndFlag(left, right, roadW);

            roadOffset += (190 * dt);
            const laneCount = 3;
            const laneW = roadW / (laneCount + 1);
            for (let l = 1; l <= laneCount; l++) {
                const lx = left + laneW * l;
                for (let y = -40; y < canvas.height + 40; y += 44) {
                    const yy = (y + roadOffset) % (canvas.height + 44) - 22;
                    ctx.fillStyle = 'rgba(255, 255, 170, 0.75)';
                    ctx.fillRect(lx - 1.5, yy, 3, 18);
                }
            }

            traffic.forEach((c) => drawCar(c.x, c.y, c.w, c.h, c.color));
            drawCar(player.x, player.y, player.w, player.h, '#ffd54a');

            // Indicador de vidas no canto inferior esquerdo
            for (let i = 0; i < lives; i++) {
                const lx = 22 + (i * 18);
                const ly = canvas.height - 18;
                drawCar(lx, ly, 12, 18, '#ffd54a');
            }

            // Neblina
            if (stage.fog > 0) {
                ctx.fillStyle = `rgba(220, 225, 240, ${stage.fog})`;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            // Noite com farol em formato de piramide saindo da frente do carro
            if (stage.name === 'NOITE') {
                // Escurece toda a tela
                ctx.fillStyle = 'rgba(0,0,0,0.75)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                // Cone com película transparente revelando a imagem
                const ox = player.x;
                const oy = player.y - (player.h * 0.58);
                const beamLen = 230;
                const nearHalf = 12;
                const farHalf = 98;
                const topY = Math.max(0, oy - beamLen);

                // Película com opacidade reduzida dentro do cone (deixa imagem mais visível)
                ctx.fillStyle = 'rgba(0,0,0,0.32)';
                ctx.beginPath();
                ctx.moveTo(ox - nearHalf, oy);
                ctx.lineTo(ox + nearHalf, oy);
                ctx.lineTo(ox + farHalf, topY);
                ctx.lineTo(ox - farHalf, topY);
                ctx.closePath();
                ctx.fill();

                // Glow suave do farol dentro do cone
                const glow = ctx.createLinearGradient(ox, oy, ox, topY);
                glow.addColorStop(0, 'rgba(255, 246, 180, 0.12)');
                glow.addColorStop(1, 'rgba(255, 246, 180, 0.00)');
                ctx.fillStyle = glow;
                ctx.beginPath();
                ctx.moveTo(ox - nearHalf, oy);
                ctx.lineTo(ox + nearHalf, oy);
                ctx.lineTo(ox + farHalf, topY);
                ctx.lineTo(ox - farHalf, topY);
                ctx.closePath();
                ctx.fill();
            }

            // Redesenha a chegada por cima dos efeitos de neblina/noite.
            drawFinishLineAndFlag(left, right, roadW);

            // Invulnerabilidade piscando apos colisao
            if (Date.now() < invulUntil && ((Date.now() / 120) % 2) > 1) {
                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 2;
                ctx.strokeRect(player.x - 14, player.y - 20, 28, 40);
            }

            rafId = requestAnimationFrame(loop);
        };

        keyDownHandler = (e) => {
            if (modal.classList.contains('hidden')) return;
            if (e.key === 'ArrowLeft') { e.preventDefault(); keys.left = true; }
            if (e.key === 'ArrowRight') { e.preventDefault(); keys.right = true; }
            if (e.key === 'ArrowUp') { e.preventDefault(); keys.up = true; }
            if (e.key === 'ArrowDown') { e.preventDefault(); keys.down = true; }
        };
        keyUpHandler = (e) => {
            if (e.key === 'ArrowLeft') keys.left = false;
            if (e.key === 'ArrowRight') keys.right = false;
            if (e.key === 'ArrowUp') keys.up = false;
            if (e.key === 'ArrowDown') keys.down = false;
        };
        window.addEventListener('keydown', keyDownHandler);
        window.addEventListener('keyup', keyUpHandler);

        if (this.els.enduroGiveUpBtn) {
            this.els.enduroGiveUpBtn.onclick = () => finish(false);
        }

        updateHud();

        const startRace = () => {
            if (raceStarted || finished) return;
            raceStarted = true;
            this.enduroRaceAudio.currentTime = 0;
            this.enduroRaceAudio.play().catch(() => {});
            rafId = requestAnimationFrame(loop);
            timerTick = setInterval(() => {
                timeLeft -= 1;
                updateHud();
                if (timeLeft <= 0) {
                    finish(true);
                }
            }, 1000);
        };

        stopEnduroSounds();
        this.enduroStartAudio.currentTime = 0;
        this.enduroStartAudio.play().catch(() => {});
        this.enduroStartAudio.onended = () => startRace();
        // Fallback para navegadores que não disparem onended.
        startRaceTimer = setTimeout(() => startRace(), 4500);

        const promise = new Promise((resolve) => {
            resolvePromise = resolve;
        });

        this.enduroSession = {
            cleanup: (won = false) => finish(won)
        };

        return promise;
    }

    runTRexBonusLevel() {
        // T-REX Game: versão com sprites oficiais (estilo Chrome Dino)
        const modal = this.els.trexBonusModal;
        const canvas = this.els.trexCanvas;
        const ctx = canvas.getContext('2d');

        if (!modal || !canvas || !ctx) return Promise.resolve({ won: false, distance: 0 });

        // Garante que a trilha show pare antes do mini-game.
        this.pauseGameMusic();

        const makeImage = (src) => {
            const img = new Image();
            img.src = src;
            return img;
        };

        const sprites = {
            dinoRun1: makeImage(this.resolveAssetPath('img/Assets/Dino/DinoRun1.png')),
            dinoRun2: makeImage(this.resolveAssetPath('img/Assets/Dino/DinoRun2.png')),
            dinoJump: makeImage(this.resolveAssetPath('img/Assets/Dino/DinoJump.png')),
            dinoDuck1: makeImage(this.resolveAssetPath('img/Assets/Dino/DinoDuck1.png')),
            dinoDuck2: makeImage(this.resolveAssetPath('img/Assets/Dino/DinoDuck2.png')),
            dinoDead: makeImage(this.resolveAssetPath('img/Assets/Dino/DinoDead.png')),
            bird1: makeImage(this.resolveAssetPath('img/Assets/Bird/Bird1.png')),
            bird2: makeImage(this.resolveAssetPath('img/Assets/Bird/Bird2.png')),
            smallCactus1: makeImage(this.resolveAssetPath('img/Assets/Cactus/SmallCactus1.png')),
            smallCactus2: makeImage(this.resolveAssetPath('img/Assets/Cactus/SmallCactus2.png')),
            smallCactus3: makeImage(this.resolveAssetPath('img/Assets/Cactus/SmallCactus3.png')),
            largeCactus1: makeImage(this.resolveAssetPath('img/Assets/Cactus/LargeCactus1.png')),
            largeCactus2: makeImage(this.resolveAssetPath('img/Assets/Cactus/LargeCactus2.png')),
            largeCactus3: makeImage(this.resolveAssetPath('img/Assets/Cactus/LargeCactus3.png')),
            cloud: makeImage(this.resolveAssetPath('img/Assets/Other/Cloud.png')),
            track: makeImage(this.resolveAssetPath('img/Assets/Other/Track.png')),
            gameOver: makeImage(this.resolveAssetPath('img/Assets/Other/GameOver.png')),
            reset: makeImage(this.resolveAssetPath('img/Assets/Other/Reset.png'))
        };

        const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
        const fitSprite = (img, fallbackW, fallbackH, scale = 1) => {
            const w = (img && img.naturalWidth ? img.naturalWidth : fallbackW) * scale;
            const h = (img && img.naturalHeight ? img.naturalHeight : fallbackH) * scale;
            return { w, h };
        };

        modal.classList.remove('hidden');
        ctx.imageSmoothingEnabled = false;

        let resolvePromise = null;
        const promise = new Promise((resolve) => {
            resolvePromise = resolve;
        });

        const durationSec = 60;
        let timeLeft = durationSec;
        let raceStarted = false;
        let finished = false;
        let crashed = false;
        let collisionLock = false;
        let lives = 3;
        let invulUntil = 0;
        let distanceMeter = 0;
        let gameOverUntil = 0;

        let rafId = null;
        let timerTick = null;
        let startRaceTimer = null;
        let keyDownHandler = null;
        let keyUpHandler = null;
        let pointerJumpHandler = null;

        const groundY = canvas.height - 46;
        const dinoSize = fitSprite(sprites.dinoRun1, 88, 94, 0.82);

        const player = {
            x: 88,
            y: groundY,
            w: dinoSize.w,
            h: dinoSize.h,
            velocityY: 0,
            jumpPower: 900,
            gravity: 2400,
            isJumping: false,
            isDucking: false,
            runFrame: 0,
            runFrameAcc: 0,
            duckFrame: 0,
            duckFrameAcc: 0,
            hitInsetX: 12,
            hitInsetTop: 8,
            hitInsetBottom: 8
        };

        const controls = {
            left: false,
            right: false,
            down: false
        };

        const obstacles = [];
        const clouds = [
            { x: 200, y: 44, speed: 20 },
            { x: 560, y: 66, speed: 16 }
        ];

        let trackOffset = 0;
        let spawnCooldown = 0.95;
        let spawnElapsed = 0;
        let elapsedTime = 0;
        let lastTs = 0;
        let scoreBlink = false;

        let gameSpeed = 360;
        const maxGameSpeed = 760;
        const speedGainPerSec = (maxGameSpeed - gameSpeed) / durationSec;
        const playerMoveSpeed = 320;

        const updateHud = () => {
            if (this.els.trexDistance) {
                this.els.trexDistance.textContent = `Distância: ${Math.floor(distanceMeter)}m`;
            }
            if (this.els.trexTimer) {
                this.els.trexTimer.textContent = `Tempo: ${timeLeft}s`;
            }
            if (this.els.trexLives) {
                this.els.trexLives.textContent = `Vidas: ${Math.max(0, lives)}`;
            }
        };

        const playerHitbox = () => ({
            left: player.x + player.hitInsetX,
            right: player.x + player.w - player.hitInsetX,
            top: player.y - player.h + player.hitInsetTop,
            bottom: player.y - player.hitInsetBottom
        });

        const obstacleHitbox = (obs) => ({
            left: obs.x + obs.hitInsetX,
            right: obs.x + obs.w - obs.hitInsetX,
            top: obs.y - obs.h + obs.hitInsetTop,
            bottom: obs.y - obs.hitInsetBottom
        });

        const intersects = (a, b) => (
            a.left < b.right &&
            a.right > b.left &&
            a.top < b.bottom &&
            a.bottom > b.top
        );

        const spawnObstacle = () => {
            const progress = Math.min(1, elapsedTime / durationSec);
            const minObstacleGap = 250 + (progress * 140);
            let rightMost = -Infinity;
            obstacles.forEach((obs) => {
                const rightEdge = obs.x + obs.w;
                if (rightEdge > rightMost) {
                    rightMost = rightEdge;
                }
            });

            if (Number.isFinite(rightMost)) {
                const freeDistance = canvas.width - rightMost;
                if (freeDistance < minObstacleGap) {
                    return false;
                }
            }

            const canSpawnBird = elapsedTime > 7;
            const spawnBird = canSpawnBird && Math.random() < 0.24;

            if (spawnBird) {
                const sprite = sprites.bird1;
                const size = fitSprite(sprite, 92, 80, 0.68);
                const lane = Math.random() < 0.5 ? 0 : 1;
                const birdBaseY = lane === 0 ? (groundY - 36) : (groundY - 84);
                obstacles.push({
                    kind: 'bird',
                    x: canvas.width + 12,
                    y: birdBaseY,
                    w: size.w,
                    h: size.h,
                    frame: 0,
                    frameAcc: 0,
                    hitInsetX: 10,
                    hitInsetTop: 10,
                    hitInsetBottom: 8
                });
            } else {
                const isLarge = Math.random() < 0.45;
                const sprite = isLarge
                    ? pick([sprites.largeCactus1, sprites.largeCactus2, sprites.largeCactus3])
                    : pick([sprites.smallCactus1, sprites.smallCactus2, sprites.smallCactus3]);
                const size = fitSprite(sprite, isLarge ? 50 : 34, isLarge ? 100 : 70, isLarge ? 0.86 : 0.9);
                obstacles.push({
                    kind: 'cactus',
                    sprite,
                    x: canvas.width + 12,
                    y: groundY + 1,
                    w: size.w,
                    h: size.h,
                    hitInsetX: isLarge ? 10 : 8,
                    hitInsetTop: 10,
                    hitInsetBottom: 4
                });
            }

            const minDelay = 0.78;
            const maxDelay = 1.55 - (progress * 0.28);
            spawnCooldown = minDelay + Math.random() * Math.max(0.26, maxDelay - minDelay);
            spawnElapsed = 0;
            return true;
        };

        const drawBackground = (dt) => {
            ctx.fillStyle = '#f7f7f7';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            clouds.forEach((cloud) => {
                cloud.x -= cloud.speed * dt;
                if (cloud.x < -80) {
                    cloud.x = canvas.width + Math.random() * 180;
                    cloud.y = 36 + Math.random() * 64;
                }
                if (sprites.cloud.complete) {
                    ctx.drawImage(sprites.cloud, cloud.x, cloud.y, 46, 14);
                }
            });

            trackOffset = (trackOffset + (gameSpeed * dt)) % Math.max(1, sprites.track.naturalWidth || 2404);
            const trackY = groundY + 4;
            const trackW = sprites.track.naturalWidth || 2404;
            const trackH = sprites.track.naturalHeight || 28;

            if (sprites.track.complete) {
                ctx.drawImage(sprites.track, -trackOffset, trackY, trackW, trackH);
                ctx.drawImage(sprites.track, trackW - trackOffset, trackY, trackW, trackH);
            } else {
                ctx.strokeStyle = '#8f8f8f';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(0, groundY + 2);
                ctx.lineTo(canvas.width, groundY + 2);
                ctx.stroke();
            }
        };

        const drawPlayer = () => {
            if (performance.now() < invulUntil && (Math.floor(performance.now() / 90) % 2) === 0) {
                return;
            }

            let sprite = sprites.dinoRun1;
            if (crashed) {
                sprite = sprites.dinoDead;
            } else if (player.isDucking) {
                sprite = player.duckFrame === 0 ? sprites.dinoDuck1 : sprites.dinoDuck2;
            } else if (player.isJumping) {
                sprite = sprites.dinoJump;
            } else if (player.runFrame === 1) {
                sprite = sprites.dinoRun2;
            }

            if (sprite.complete) {
                ctx.drawImage(sprite, player.x, player.y - player.h, player.w, player.h);
            }
        };

        const drawObstacles = () => {
            obstacles.forEach((obs) => {
                if (obs.kind === 'bird') {
                    const birdSprite = obs.frame === 0 ? sprites.bird1 : sprites.bird2;
                    if (birdSprite.complete) {
                        ctx.drawImage(birdSprite, obs.x, obs.y - obs.h, obs.w, obs.h);
                    }
                } else if (obs.sprite && obs.sprite.complete) {
                    ctx.drawImage(obs.sprite, obs.x, obs.y - obs.h, obs.w, obs.h);
                }
            });
        };

        const drawScore = () => {
            ctx.fillStyle = '#5e5e5e';
            ctx.font = 'bold 18px monospace';
            ctx.textAlign = 'right';
            const score = String(Math.floor(distanceMeter)).padStart(5, '0');
            const speedTag = String(Math.floor(gameSpeed / 8)).padStart(3, '0');
            const label = scoreBlink ? `HI 00000  ${score}` : `HI 00000  ${speedTag}`;
            ctx.fillText(label, canvas.width - 22, 28);
        };

        const drawGameOver = () => {
            if (!crashed) return;
            const overW = sprites.gameOver.naturalWidth || 191;
            const overH = sprites.gameOver.naturalHeight || 11;
            const resetW = sprites.reset.naturalWidth || 36;
            const resetH = sprites.reset.naturalHeight || 32;
            const ox = (canvas.width - overW) / 2;
            const oy = groundY - 92;
            const rx = (canvas.width - resetW) / 2;
            const ry = oy + overH + 20;

            if (sprites.gameOver.complete) {
                ctx.drawImage(sprites.gameOver, ox, oy, overW, overH);
            }
            if (sprites.reset.complete) {
                ctx.drawImage(sprites.reset, rx, ry, resetW, resetH);
            }
        };

        const startCollisionSequence = () => {
            if (collisionLock || finished) return;
            collisionLock = true;

            lives -= 1;
            updateHud();

            if (lives <= 0) {
                crashed = true;
                raceStarted = false;
                gameOverUntil = performance.now() + 950;
                if (timerTick) {
                    clearInterval(timerTick);
                    timerTick = null;
                }
                if (this.trexRaceAudio) {
                    this.trexRaceAudio.pause();
                }
                collisionLock = false;
                return;
            }

            player.x = 88;
            player.y = groundY;
            player.velocityY = 0;
            player.isJumping = false;
            player.isDucking = false;
            invulUntil = performance.now() + 1100;

            if (this.trexRaceAudio) {
                this.trexRaceAudio.pause();
                setTimeout(() => {
                    if (!finished && raceStarted && !crashed) {
                        this.trexRaceAudio.play().catch(() => {});
                    }
                }, 180);
            }

            setTimeout(() => {
                collisionLock = false;
            }, 180);
        };

        const finish = (won) => {
            if (finished) return;
            finished = true;

            if (timerTick) clearInterval(timerTick);
            if (rafId) cancelAnimationFrame(rafId);
            if (startRaceTimer) clearTimeout(startRaceTimer);
            if (keyDownHandler) window.removeEventListener('keydown', keyDownHandler);
            if (keyUpHandler) window.removeEventListener('keyup', keyUpHandler);
            if (pointerJumpHandler) {
                canvas.removeEventListener('pointerdown', pointerJumpHandler);
            }

            [this.trexStartAudio, this.trexRaceAudio].forEach((s) => {
                if (!s) return;
                s.pause();
                try { s.currentTime = 0; } catch (_) {}
            });

            if (this.els.trexGiveUpBtn) {
                this.els.trexGiveUpBtn.onclick = null;
            }

            modal.classList.add('hidden');
            this.trexSession = null;
            resolvePromise({ won, distance: Math.floor(distanceMeter) });
        };

        const loop = (ts) => {
            if (finished) return;

            if (!lastTs) lastTs = ts;
            const dt = Math.min(0.05, Math.max(0.001, (ts - lastTs) / 1000));
            lastTs = ts;

            scoreBlink = (Math.floor(ts / 280) % 2) === 0;

            if (raceStarted && !crashed) {
                elapsedTime += dt;
                gameSpeed = Math.min(maxGameSpeed, gameSpeed + (speedGainPerSec * dt));

                if (controls.left && !controls.right) {
                    player.x -= playerMoveSpeed * dt;
                } else if (controls.right && !controls.left) {
                    player.x += playerMoveSpeed * dt;
                }
                const minX = 28;
                const maxX = canvas.width - player.w - 24;
                player.x = Math.max(minX, Math.min(maxX, player.x));

                player.velocityY += player.gravity * dt;
                player.y += player.velocityY * dt;

                if (player.y >= groundY) {
                    player.y = groundY;
                    player.velocityY = 0;
                    player.isJumping = false;
                    if (controls.down) {
                        player.isDucking = true;
                        player.duckFrameAcc += dt;
                        if (player.duckFrameAcc >= 0.12) {
                            player.duckFrame = player.duckFrame === 0 ? 1 : 0;
                            player.duckFrameAcc = 0;
                        }
                    } else {
                        player.isDucking = false;
                        player.runFrameAcc += dt;
                        if (player.runFrameAcc >= 0.115) {
                            player.runFrame = player.runFrame === 0 ? 1 : 0;
                            player.runFrameAcc = 0;
                        }
                    }
                }

                distanceMeter += gameSpeed * dt * 0.075;
                spawnElapsed += dt;
                if (spawnElapsed >= spawnCooldown) {
                    const spawned = spawnObstacle();
                    if (!spawned) {
                        spawnElapsed = Math.max(spawnCooldown * 0.75, spawnElapsed - (dt * 0.3));
                    }
                }

                const playerBox = playerHitbox();
                for (let i = obstacles.length - 1; i >= 0; i--) {
                    const obs = obstacles[i];
                    obs.x -= gameSpeed * dt;

                    if (obs.kind === 'bird') {
                        obs.frameAcc += dt;
                        if (obs.frameAcc >= 0.12) {
                            obs.frame = obs.frame === 0 ? 1 : 0;
                            obs.frameAcc = 0;
                        }
                    }

                    if (obs.x + obs.w < -12) {
                        obstacles.splice(i, 1);
                        continue;
                    }

                    if (performance.now() >= invulUntil && intersects(playerBox, obstacleHitbox(obs))) {
                        obstacles.splice(i, 1);
                        startCollisionSequence();
                        break;
                    }
                }
            }

            drawBackground(dt);
            drawObstacles();
            drawPlayer();
            drawScore();
            drawGameOver();

            if (crashed && gameOverUntil && ts >= gameOverUntil) {
                finish(false);
                return;
            }

            rafId = requestAnimationFrame(loop);
        };

        const tryJump = () => {
            if (modal.classList.contains('hidden') || !raceStarted || crashed) return;
            if (!player.isJumping) {
                player.velocityY = -player.jumpPower;
                player.isJumping = true;
            }
        };

        keyDownHandler = (e) => {
            if (modal.classList.contains('hidden') || !raceStarted || crashed) return;
            const isLeft = e.code === 'ArrowLeft' || e.code === 'KeyA';
            const isRight = e.code === 'ArrowRight' || e.code === 'KeyD';
            const isDown = e.code === 'ArrowDown' || e.code === 'KeyS';
            const isJumpKey = e.code === 'Space'
                || e.code === 'ArrowUp'
                || e.code === 'KeyW'
                || e.key === ' '
                || e.key === 'Spacebar';

            if (isLeft) {
                e.preventDefault();
                controls.left = true;
            }
            if (isRight) {
                e.preventDefault();
                controls.right = true;
            }
            if (isDown) {
                e.preventDefault();
                controls.down = true;
            }
            if (isJumpKey) {
                e.preventDefault();
                tryJump();
            }
        };

        keyUpHandler = (e) => {
            const isLeft = e.code === 'ArrowLeft' || e.code === 'KeyA';
            const isRight = e.code === 'ArrowRight' || e.code === 'KeyD';
            const isDown = e.code === 'ArrowDown' || e.code === 'KeyS';
            if (isLeft) controls.left = false;
            if (isRight) controls.right = false;
            if (isDown) controls.down = false;
        };

        pointerJumpHandler = (e) => {
            e.preventDefault();
            tryJump();
        };

        window.addEventListener('keydown', keyDownHandler);
        window.addEventListener('keyup', keyUpHandler);
        canvas.addEventListener('pointerdown', pointerJumpHandler);
        canvas.setAttribute('tabindex', '0');
        canvas.focus();

        if (this.els.trexGiveUpBtn) {
            this.els.trexGiveUpBtn.onclick = () => finish(false);
        }

        updateHud();

        const startRace = () => {
            if (raceStarted || finished || crashed) return;
            raceStarted = true;
            lastTs = 0;
            if (this.trexRaceAudio) {
                this.trexRaceAudio.currentTime = 0;
                this.trexRaceAudio.play().catch(() => {});
            }

            if (!rafId) {
                rafId = requestAnimationFrame(loop);
            }

            timerTick = setInterval(() => {
                if (!raceStarted || crashed || finished) return;
                timeLeft -= 1;
                updateHud();
                if (timeLeft <= 0) {
                    raceStarted = false;
                    finish(true);
                }
            }, 1000);
        };

        [this.trexStartAudio, this.trexRaceAudio, this.trexVictoryAudio].forEach((s) => {
            if (!s) return;
            s.pause();
            try { s.currentTime = 0; } catch (_) {}
        });

        if (!rafId) {
            rafId = requestAnimationFrame(loop);
        }

        if (this.trexStartAudio) {
            this.trexStartAudio.currentTime = 0;
            this.trexStartAudio.play().catch(() => {});
            this.trexStartAudio.onended = () => startRace();
        }

        startRaceTimer = setTimeout(() => startRace(), 4500);

        this.trexSession = {
            cleanup: (won = false) => finish(won)
        };

        return promise;
    }

    /* ================================
       MÉTODOS PARA CAÇA NÍQUEL (SLOT MACHINE)
       ================================ */

    showSlotMachine() {
        // Abre o modal do caça níquel e pausa a música de fundo
        this.pauseGameMusic();
        this.els.slotMachineModal.classList.remove('hidden');
        this.els.slotSpinBtn.disabled = false;
        this._ensureSlotTracks();
        
        // Reset visual do resultado ao abrir.
        this.els.slotResult.innerHTML = '';
        this.els.slotResult.classList.add('hidden');
        
        this.bindSlotMachineEvents();
    }

    _ensureSlotTracks() {
        // Monta o trilho interno de cada reel uma única vez.
        const reels = [this.els.slotReel1, this.els.slotReel2, this.els.slotReel3];

        reels.forEach((reel) => {
            if (!reel || reel.querySelector('.slot-track')) return;

            const symbolNodes = Array.from(reel.querySelectorAll('.slot-symbol'));
            // Usa data-symbol para símbolos com HTML interno (BAR com spans, etc.)
            const baseSymbols = symbolNodes.map((node) =>
                (node.dataset?.symbol || node.textContent || '').trim()
            ).filter(Boolean);
            const track = document.createElement('div');
            track.className = 'slot-track';

            symbolNodes.forEach((node) => track.appendChild(node));
            symbolNodes.forEach((node) => track.appendChild(node.cloneNode(true)));
            // Cópias extras para garantir janela de 3 símbolos no limite da sequência
            symbolNodes.slice(0, 2).forEach((node) => track.appendChild(node.cloneNode(true)));

            reel.appendChild(track);
            reel.dataset.baseSymbols = JSON.stringify(baseSymbols);
            reel.dataset.baseCount = String(baseSymbols.length || 1);
            reel.dataset.currentIndex = '0';
            this._renderReelCylinder(reel, track, false);
        });
    }

    _readTrackTranslateY(track) {
        const tf = window.getComputedStyle(track).transform;
        if (!tf || tf === 'none') return 0;

        try {
            return new DOMMatrixReadOnly(tf).m42 || 0;
        } catch (_) {
            const match = tf.match(/matrix\(([^)]+)\)/);
            if (!match) return 0;
            const values = match[1].split(',').map((v) => Number(v.trim()));
            return Number.isFinite(values[5]) ? values[5] : 0;
        }
    }

    _renderReelCylinder(reel, track, isSpinning) {
        if (!reel || !track) return;

        const symbols = Array.from(track.querySelectorAll('.slot-symbol'));
        const symbolH = 120;
        const reelH = reel.clientHeight || 360;
        const mid = reelH / 2;
        const trackY = this._readTrackTranslateY(track);

        symbols.forEach((sym, idx) => {
            const centerY = (idx * symbolH) + (symbolH / 2) + trackY;
            const norm = (centerY - mid) / mid;
            const abs = Math.min(1.2, Math.abs(norm));
            const rotateX = norm * 58;
            const scaleX = Math.max(0.72, 1 - (abs * 0.24));
            const scaleY = Math.max(0.82, 1 - (abs * 0.14));
            const depth = Math.max(0, (1 - abs) * 26);
            const opacity = Math.max(0.22, 1 - (abs * 0.62));
            const centerBoost = Math.max(0, 1 - abs);

            const blur = isSpinning ? (abs * 1.35) : (abs * 0.25);
            const brightness = isSpinning
                ? (1.1 - (abs * 0.18))
                : (1.03 - (abs * 0.10));

            const sideShade = (0.08 + (abs * 0.20)).toFixed(3);
            const centerGlow = (0.10 + (centerBoost * 0.22)).toFixed(3);
            const edgeWhite = Math.max(225, Math.min(248, Math.round(236 + (centerBoost * 12))));
            const centerWhite = Math.max(238, Math.min(255, Math.round(246 + (centerBoost * 10))));

            if (sym.classList.contains('bar')) {
                const darkEdge = Math.max(12, Math.round(26 - (centerBoost * 6)));
                const darkCenter = Math.max(18, Math.round(36 + (centerBoost * 10)));
                sym.style.background = `linear-gradient(to right, rgb(${darkEdge}, ${darkEdge}, ${darkEdge}) 0%, rgb(${darkCenter}, ${darkCenter}, ${darkCenter}) 50%, rgb(${darkEdge}, ${darkEdge}, ${darkEdge}) 100%)`;
            } else {
                sym.style.background = `linear-gradient(to bottom, rgb(${edgeWhite}, ${edgeWhite}, ${edgeWhite}) 0%, rgb(${centerWhite}, ${centerWhite}, ${centerWhite}) 48%, rgb(${edgeWhite}, ${edgeWhite}, ${edgeWhite}) 100%)`;
            }

            sym.style.transform = `perspective(540px) rotateX(${rotateX.toFixed(2)}deg) scaleX(${scaleX.toFixed(3)}) scaleY(${scaleY.toFixed(3)}) translateZ(${depth.toFixed(2)}px)`;
            sym.style.opacity = opacity.toFixed(3);
            sym.style.filter = `blur(${blur.toFixed(2)}px) brightness(${brightness.toFixed(3)})`;
            sym.style.boxShadow = `inset 18px 0 22px rgba(0,0,0,${sideShade}), inset -18px 0 22px rgba(0,0,0,${sideShade}), inset 0 0 22px rgba(255,255,255,${centerGlow})`;
        });
    }

    _startReelCylinderFx(reel, track) {
        if (!reel || !track) return;
        this._stopReelCylinderFx(reel, track, false);
        reel.classList.add('fx-active');

        const tick = () => {
            if (!reel.classList.contains('spinning')) {
                this._renderReelCylinder(reel, track, false);
                return;
            }
            this._renderReelCylinder(reel, track, true);
            const rafId = requestAnimationFrame(tick);
            this.reelFxRaf.set(reel, rafId);
        };

        tick();
    }

    _stopReelCylinderFx(reel, track, keepFxClass = false) {
        const rafId = this.reelFxRaf.get(reel);
        if (rafId) {
            cancelAnimationFrame(rafId);
            this.reelFxRaf.delete(reel);
        }
        if (!keepFxClass) {
            reel?.classList.remove('fx-active');
        }
        if (reel && track) {
            this._renderReelCylinder(reel, track, false);
        }
    }

    _getSlotResultsFromPositions(positions) {
        const reels = [this.els.slotReel1, this.els.slotReel2, this.els.slotReel3];
        return positions.map((pos, index) => {
            const reel = reels[index];
            if (!reel) return '';
            const baseSymbols = JSON.parse(reel.dataset.baseSymbols || '[]');
            if (!baseSymbols.length) return '';
            const normalized = ((pos % baseSymbols.length) + baseSymbols.length) % baseSymbols.length;
            return baseSymbols[normalized];
        });
    }

    getSlotSymbolsFromPositions(positions) {
        // Exposto para o controller montar o resumo final da rodada.
        return this._getSlotResultsFromPositions(positions);
    }

    hideSlotMachine() {
        // Fecha o modal do caça níquel, restaura áudio e música de fundo
        this.stopSlotSpinSound();
        [this.els.slotReel1, this.els.slotReel2, this.els.slotReel3].forEach((reel) => {
            const track = reel?.querySelector('.slot-track');
            if (!reel || !track) return;
            this._stopReelCylinderFx(reel, track);
            reel.classList.remove('spinning');
        });
        this.resumeGameMusic();
        this.els.slotMachineModal.classList.add('hidden');
        this.els.slotResult.innerHTML = '';
        this.els.slotResult.classList.add('hidden');
    }

    bindSlotMachineEvents() {
        // Liga os eventos do caça níquel
        if (this.els.slotSpinBtn) {
            this.els.slotSpinBtn.onclick = () => this.spinSlotMachine();
        }
        if (this.els.slotCloseBtn) {
            this.els.slotCloseBtn.onclick = () => this.hideSlotMachine();
        }
    }

    _generateSlotFinalPositions(reels, forcedOutcome = 'random') {
        const counts = reels.map((reel) => Math.max(1, Number(reel?.dataset.baseCount || 5)));
        const baseCount = Math.max(1, Math.min(...counts));

        if (baseCount <= 1) {
            return [0, 0, 0];
        }

        const pick = (max) => Math.floor(Math.random() * Math.max(1, max));

        // Resultado forçado: jackpot (3 iguais)
        if (forcedOutcome === 'jackpot') {
            const idx = pick(baseCount);
            return [idx, idx, idx];
        }

        // Resultado forçado: par (2 iguais, 1 diferente)
        if (forcedOutcome === 'pair') {
            const pair = pick(baseCount);
            let odd = pick(baseCount - 1);
            if (odd >= pair) odd += 1;
            const oddPos = pick(3);
            if (oddPos === 0) return [odd, pair, pair];
            if (oddPos === 1) return [pair, odd, pair];
            return [pair, pair, odd];
        }

        const roll = Math.random();

        // Facilita a rodada: mais chances de 2 e 3 símbolos iguais.
        if (roll < 0.18) {
            const idx = pick(baseCount);
            return [idx, idx, idx];
        }

        if (roll < 0.70) {
            const pair = pick(baseCount);
            let odd = pick(baseCount - 1);
            if (odd >= pair) odd += 1;

            const oddPos = pick(3);
            if (oddPos === 0) return [odd, pair, pair];
            if (oddPos === 1) return [pair, odd, pair];
            return [pair, pair, odd];
        }

        // Restante: tentativa de rodada sem combinação.
        if (baseCount >= 3) {
            const a = pick(baseCount);
            let b = pick(baseCount - 1);
            if (b >= a) b += 1;

            let c = pick(baseCount - 2);
            const blocked = [a, b].sort((x, y) => x - y);
            if (c >= blocked[0]) c += 1;
            if (c >= blocked[1]) c += 1;

            return [a, b, c];
        }

        // Fallback para casos raros com poucos símbolos.
        const a = pick(baseCount);
        const b = (a + 1) % baseCount;
        const c = a;
        return [a, b, c];
    }

    spinSlotMachine(forcedOutcome = 'random') {
        // Anima os 3 reels e resolve quando o resultado final estiver disponível.
        this._ensureSlotTracks();

        const reels = [this.els.slotReel1, this.els.slotReel2, this.els.slotReel3];
        const spinDurations = [1100, 1400, 1700];

        const finalPositions = this._generateSlotFinalPositions(reels, forcedOutcome);

        // Armazena as posições para uso posterior
        this.lastSlotPositions = finalPositions;

        this.startSlotSpinSound();

        const SYMBOL_H = 120;

        reels.forEach((reel, index) => {
            const track = reel?.querySelector('.slot-track');
            if (!reel || !track) return;

            const baseCount = Number(reel.dataset.baseCount || 8);
            // Centraliza o símbolo alvo na posição do meio do reel (payline)
            const centering = baseCount * SYMBOL_H - SYMBOL_H;
            const loops = 2 + index;
            const targetIndex = (loops * baseCount) + finalPositions[index];
            const targetOffset = targetIndex * SYMBOL_H + centering;

            reel.style.setProperty('--spin-jolt-speed', `${108 + (index * 16)}ms`);
            reel.style.setProperty('--spin-cyl-speed', `${280 + (index * 45)}ms`);
            reel.classList.add('spinning');
            this._startReelCylinderFx(reel, track);
            track.style.transition = `transform ${spinDurations[index]}ms cubic-bezier(0.16, 0.84, 0.32, 1)`;
            track.style.transform = `translateY(-${targetOffset}px)`;

            setTimeout(() => {
                reel.classList.remove('spinning');
                reel.style.removeProperty('--spin-jolt-speed');
                reel.style.removeProperty('--spin-cyl-speed');
                this.playSlotReelStopSound();
                const finalOffset = finalPositions[index] * SYMBOL_H + centering;
                track.style.transition = 'none';
                track.style.transform = `translateY(-${finalOffset}px)`;
                reel.dataset.currentIndex = String(finalPositions[index]);

                requestAnimationFrame(() => {
                    track.style.transition = `transform ${spinDurations[index]}ms cubic-bezier(0.16, 0.84, 0.32, 1)`;
                    this._stopReelCylinderFx(reel, track);
                });
            }, spinDurations[index]);
        });

        setTimeout(() => {
            this.stopSlotSpinSound();
        }, Math.max(...spinDurations) + 40);

        return new Promise((resolve) => {
            setTimeout(() => {
                this.showSlotResult(finalPositions);
                resolve(finalPositions);
            }, Math.max(...spinDurations) + 300);
        });
    }

    showSlotResult(positions) {
        const results = this._getSlotResultsFromPositions(positions);

        let message = '';
        let isJackpot = false;

        const allEqual = results[0] === results[1] && results[1] === results[2];
        const pair1 = results[0] === results[1];
        const pair2 = results[1] === results[2];
        const pair3 = results[0] === results[2];
        const equalPairs = (pair1 ? 1 : 0) + (pair2 ? 1 : 0) + (pair3 ? 1 : 0);

        if (allEqual) {
            isJackpot = true;
            if (results[0] === '7') {
                message = `🎉 JACKPOT! 7️⃣7️⃣7️⃣<br>+200 MOEDAS!`;
            } else if (results[0] === 'BAR') {
                message = `🔥 3× BAR!<br>+150 MOEDAS!`;
            } else {
                message = `${results[0]}${results[1]}${results[2]} 3 IGUAIS!<br>+100 MOEDAS!`;
            }
            this.playCountingSound();
            setTimeout(() => this.createCoinAnimation(), 200);
            this._flashWinReels();
        } else if (equalPairs === 1) {
            message = `🎟️ 2 SÍMBOLOS IGUAIS!<br>+50 MOEDAS!`;
            this.playCountingSound();
        } else {
            message = `❌ SEM SORTE!<br>TENTE NOVAMENTE!`;
        }

        this.els.slotResult.innerHTML = message;
        this.els.slotResult.classList.remove('hidden', 'jackpot');
        if (isJackpot) {
            this.els.slotResult.classList.add('jackpot');
        }
    }

    _flashWinReels() {
        const reels = [this.els.slotReel1, this.els.slotReel2, this.els.slotReel3];
        const wrapper = this.els.slotReel1?.closest('.slot-reels-wrapper');
        reels.forEach((r) => {
            if (!r) return;
            r.classList.add('reel-win');
            setTimeout(() => r.classList.remove('reel-win'), 2200);
        });
        if (wrapper) {
            wrapper.classList.add('payline-win');
            setTimeout(() => wrapper.classList.remove('payline-win'), 2400);
        }
    }

    getPrizeFromPositions(positions) {
        const results = this._getSlotResultsFromPositions(positions);
        const allEqual = results[0] === results[1] && results[1] === results[2];
        const equalPairs = ((results[0] === results[1]) ? 1 : 0)
                         + ((results[1] === results[2]) ? 1 : 0)
                         + ((results[0] === results[2]) ? 1 : 0);

        if (allEqual) {
            if (results[0] === '7')   return 200;
            if (results[0] === 'BAR') return 150;
            return 100; // 3 frutas iguais
        }
        if (equalPairs === 1) return 50; // 2 iguais
        return 0;
    }

    showSlotFinalSummary(spins, baseScore) {
        // Mostra no centro da tela os valores de cada rodada, somando ao placar atual.
        const safeSpins = Array.isArray(spins) ? spins : [];
        const overlay = document.createElement('div');
        overlay.className = 'slot-summary-overlay';

        const card = document.createElement('div');
        card.className = 'slot-summary-card';
        card.innerHTML = `
            <h3 class="slot-summary-title">TOTAL DO BÔNUS 🎰</h3>
            <div class="slot-summary-list"></div>
            <div class="slot-summary-total">PONTUAÇÃO: ${baseScore}</div>
        `;

        overlay.appendChild(card);
        document.body.appendChild(overlay);

        const listEl = card.querySelector('.slot-summary-list');
        const totalEl = card.querySelector('.slot-summary-total');

        return new Promise((resolve) => {
            let runningScore = Number(baseScore) || 0;
            const stepDelay = 700;

            safeSpins.forEach((spin, index) => {
                setTimeout(() => {
                    const symbolsTxt = (spin.symbols || []).join(' ');
                    const prize = Number(spin.prize) || 0;

                    const row = document.createElement('div');
                    row.className = 'slot-summary-row';
                    row.innerHTML = `
                        <span>Rodada ${index + 1}: ${symbolsTxt}</span>
                        <strong>+${prize}</strong>
                    `;
                    listEl.appendChild(row);

                    const oldScore = runningScore;
                    runningScore += prize;
                    totalEl.textContent = `PONTUAÇÃO: ${runningScore}`;
                    this.animateScoreIncrease(oldScore, runningScore);
                }, stepDelay * (index + 1));
            });

            const countingEndDelay = stepDelay * (safeSpins.length + 1);
            const finishDelay = countingEndDelay + 2500;

            // Toca caixa registradora exatamente quando termina a contabilização das moedas
            setTimeout(() => {
                if (this.cashRegisterAudio) {
                    this.cashRegisterAudio.pause();
                    try {
                        this.cashRegisterAudio.currentTime = 0;
                    } catch (_) {}
                    this.cashRegisterAudio.play().catch(() => {});
                }
            }, countingEndDelay);

            setTimeout(() => {
                overlay.remove();
                resolve(runningScore);
            }, finishDelay);
        });
    }

    showPacmanFinalSummary(baseScore, reward, cherryBonus = 0) {
        const safeBase = Number(baseScore) || 0;
        const safeReward = Math.max(0, Number(reward) || 0);

        const overlay = document.createElement('div');
        overlay.className = 'slot-summary-overlay';

        const card = document.createElement('div');
        card.className = 'slot-summary-card';
        card.innerHTML = `
            <h3 class="slot-summary-title">TOTAL DO BÔNUS 👾</h3>
            <div class="slot-summary-list"></div>
            <div class="slot-summary-total">PONTUAÇÃO: ${safeBase}</div>
        `;

        overlay.appendChild(card);
        document.body.appendChild(overlay);

        const listEl = card.querySelector('.slot-summary-list');
        const totalEl = card.querySelector('.slot-summary-total');

        return new Promise((resolve) => {
            let runningScore = safeBase;

            setTimeout(() => {
                const row = document.createElement('div');
                row.className = 'slot-summary-row';
                row.innerHTML = `
                    <span>Nível completo: pellets + supervitaminas</span>
                    <strong>+${safeReward}</strong>
                `;
                listEl.appendChild(row);

                const oldScore = runningScore;
                runningScore += safeReward;
                totalEl.textContent = `PONTUAÇÃO: ${runningScore}`;
                this.animateScoreIncrease(oldScore, runningScore);
            }, 700);

            setTimeout(() => {
                if (this.cashRegisterAudio) {
                    this.cashRegisterAudio.pause();
                    try {
                        this.cashRegisterAudio.currentTime = 0;
                    } catch (_) {}
                    this.cashRegisterAudio.play().catch(() => {});
                }
            }, 2000);

            setTimeout(() => {
                overlay.remove();
                this.resumeGameMusic();
                resolve(runningScore);
            }, 4500);
        });
    }

    showEnduroFinalSummary(baseScore, reward, stagesCompleted = 4, carsPassed = 0) {
        const safeBase = Number(baseScore) || 0;
        const safeReward = Math.max(0, Number(reward) || 0);
        const safeStages = Math.max(0, Number(stagesCompleted) || 0);

        const overlay = document.createElement('div');
        overlay.className = 'slot-summary-overlay';

        const card = document.createElement('div');
        card.className = 'slot-summary-card';
        card.innerHTML = `
            <h3 class="slot-summary-title">TOTAL DO BÔNUS ENDURO 🏎️</h3>
            <div class="enduro-trophy-hero" aria-hidden="true">🧍‍♂️🏆</div>
            <div class="slot-summary-list"></div>
            <div class="slot-summary-total">PONTUAÇÃO: ${safeBase}</div>
        `;

        overlay.appendChild(card);
        document.body.appendChild(overlay);

        const listEl = card.querySelector('.slot-summary-list');
        const totalEl = card.querySelector('.slot-summary-total');

        return new Promise((resolve) => {
            let runningScore = safeBase;

            setTimeout(() => {
                const rowStages = document.createElement('div');
                rowStages.className = 'slot-summary-row';
                rowStages.innerHTML = `
                    <span>Estágios completos (Dia/Neblina/Gelo/Noite)</span>
                    <strong>${safeStages}/4</strong>
                `;
                listEl.appendChild(rowStages);
            }, 600);

            setTimeout(() => {
                const rowReward = document.createElement('div');
                rowReward.className = 'slot-summary-row';
                rowReward.innerHTML = `
                    <span>Corrida concluída</span>
                    <strong>+${safeReward}</strong>
                `;
                listEl.appendChild(rowReward);

                const oldScore = runningScore;
                runningScore += safeReward;
                totalEl.textContent = `PONTUAÇÃO: ${runningScore}`;
                this.animateScoreIncrease(oldScore, runningScore);
            }, 1250);

            setTimeout(() => {
                if (this.cashRegisterAudio) {
                    this.cashRegisterAudio.pause();
                    try {
                        this.cashRegisterAudio.currentTime = 0;
                    } catch (_) {}
                    this.cashRegisterAudio.play().catch(() => {});
                }
            }, 2900);

            setTimeout(() => {
                overlay.remove();
                this.resumeGameMusic();
                resolve(runningScore);
            }, 5400);
        });
    }

    showEnduroVictoryPopup(playerName = 'Piloto') {
        const safeName = String(playerName || 'Piloto').trim() || 'Piloto';
        const enduroVictoryImg = this.resolveAssetPath('img/f1.png');

        const overlay = document.createElement('div');
        overlay.className = 'slot-summary-overlay enduro-victory-overlay';

        const card = document.createElement('div');
        card.className = 'slot-summary-card enduro-victory-card';
        card.innerHTML = `
            <h3 class="slot-summary-title">VITÓRIA NO ENDURO! 🏁</h3>
            <p class="enduro-victory-text"><strong>${safeName}</strong>, parabéns pela corrida perfeita!</p>
            <img class="enduro-victory-img" src="${enduroVictoryImg}" alt="Piloto levantando troféu" onerror="this.style.display='none'">
        `;

        overlay.appendChild(card);
        document.body.appendChild(overlay);

        return new Promise((resolve) => {
            let done = false;

            const cleanup = () => {
                if (done) return;
                done = true;
                if (this.enduroVictoryAudio) {
                    this.enduroVictoryAudio.pause();
                    try {
                        this.enduroVictoryAudio.currentTime = 0;
                    } catch (_) {}
                }
                overlay.remove();
                resolve();
            };

            if (this.enduroVictoryAudio) {
                this.enduroVictoryAudio.pause();
                try {
                    this.enduroVictoryAudio.currentTime = 0;
                } catch (_) {}
                this.enduroVictoryAudio.play().catch(() => {});
            }

            // Exibe popup e som por 11 segundos antes da contabilidade.
            setTimeout(cleanup, 11000);
        });
    }

    showTRexVictoryPopup(playerName = 'Jogador') {
        const safeName = String(playerName || 'Jogador').trim() || 'Jogador';
        const trexVictoryImg = this.resolveAssetPath('img/t-rex.png');

        const overlay = document.createElement('div');
        overlay.className = 'slot-summary-overlay enduro-victory-overlay';

        const card = document.createElement('div');
        card.className = 'slot-summary-card enduro-victory-card';
        card.innerHTML = `
            <h3 class="slot-summary-title">VOCÊ VENCEU! 🦖🏁</h3>
            <img src="${trexVictoryImg}" alt="T-Rex Victory" style="max-width: 200px; max-height: 150px; margin: 20px auto; display: block; image-rendering: crisp-edges;" onerror="this.style.display='none'">
            <p class="enduro-victory-text"><strong>${safeName}</strong>, completou um minuto inteiro no T-REX!</p>
            <div style="font-size: 4rem; margin: 20px 0;">🎉</div>
        `;

        overlay.appendChild(card);
        document.body.appendChild(overlay);

        return new Promise((resolve) => {
            let done = false;

            const cleanup = () => {
                if (done) return;
                done = true;
                if (this.trexVictoryAudio) {
                    this.trexVictoryAudio.pause();
                    try {
                        this.trexVictoryAudio.currentTime = 0;
                    } catch (_) {}
                }
                overlay.remove();
                resolve();
            };

            if (this.trexVictoryAudio) {
                this.trexVictoryAudio.pause();
                try {
                    this.trexVictoryAudio.currentTime = 0;
                } catch (_) {}
                this.trexVictoryAudio.play().catch(() => {});
            }

            // Exibe popup e som por 11 segundos antes da contabilidade.
            setTimeout(cleanup, 11000);
        });
    }

    showTRexFinalSummary(baseScore, reward, distance = 0) {
        const safeBase = Number(baseScore) || 0;
        const safeReward = Math.max(0, Number(reward) || 0);
        const safeDistance = Math.max(0, Number(distance) || 0);

        const overlay = document.createElement('div');
        overlay.className = 'slot-summary-overlay';

        const card = document.createElement('div');
        card.className = 'slot-summary-card';
        card.innerHTML = `
            <h3 class="slot-summary-title">TOTAL DO DESAFIO T-REX 🦖</h3>
            <div class="enduro-trophy-hero" aria-hidden="true">🧍‍♂️🏆</div>
            <div class="slot-summary-list"></div>
            <div class="slot-summary-total">PONTUAÇÃO: ${safeBase}</div>
        `;

        overlay.appendChild(card);
        document.body.appendChild(overlay);

        const listEl = card.querySelector('.slot-summary-list');
        const totalEl = card.querySelector('.slot-summary-total');

        return new Promise((resolve) => {
            let runningScore = safeBase;

            setTimeout(() => {
                const rowDistance = document.createElement('div');
                rowDistance.className = 'slot-summary-row';
                rowDistance.innerHTML = `
                    <span>Distância percorrida</span>
                    <strong>${safeDistance}m</strong>
                `;
                listEl.appendChild(rowDistance);
            }, 600);

            setTimeout(() => {
                const rowReward = document.createElement('div');
                rowReward.className = 'slot-summary-row';
                rowReward.innerHTML = `
                    <span>Completou 1 minuto inteiro</span>
                    <strong>+${safeReward}</strong>
                `;
                listEl.appendChild(rowReward);

                const oldScore = runningScore;
                runningScore += safeReward;
                totalEl.textContent = `PONTUAÇÃO: ${runningScore}`;
                this.animateScoreIncrease(oldScore, runningScore);
            }, 1250);

            setTimeout(() => {
                if (this.cashRegisterAudio) {
                    this.cashRegisterAudio.pause();
                    try {
                        this.cashRegisterAudio.currentTime = 0;
                    } catch (_) {}
                    this.cashRegisterAudio.play().catch(() => {});
                }
            }, 2900);

            setTimeout(() => {
                overlay.remove();
                this.resumeGameMusic();
                resolve(runningScore);
            }, 5400);
        });
    }

    checkSlotResult(positions) {
        // Delega para os métodos canônicos (mantido por compatibilidade)
        const prize = this.getPrizeFromPositions(positions);
        this.showSlotResult(positions);
        return { prize, isJackpot: prize >= 150 };

    }

    // ─────────────────────────────────────────────────────────────────────────
    // SNAKE BONUS GAME
    // ─────────────────────────────────────────────────────────────────────────

    runSnakeBonusLevel() {
        const modal = this.els.snakeBonusModal;
        const canvas = this.els.snakeCanvas;
        if (!modal || !canvas) return Promise.resolve({ won: false, applesEaten: 0, reason: 'no_canvas' });

        const ctx = canvas.getContext('2d');
        if (!ctx) return Promise.resolve({ won: false, applesEaten: 0, reason: 'no_ctx' });

        this.pauseGameMusic();
        modal.classList.remove('hidden');

        if (this.snakeSession && this.snakeSession.cleanup) {
            this.snakeSession.cleanup(false);
        }

        let resolvePromise = null;
        const promise = new Promise((resolve) => { resolvePromise = resolve; });

        // ── CONSTANTS ───────────────────────────────────────────────────────
        const COLS = 20;
        const ROWS = 20;
        const CELL = Math.floor(canvas.width / COLS); // 25px
        const GAME_DURATION = 60;
        const INITIAL_SPEED = 160;
        const MIN_SPEED = 75;

        // ── STATE ────────────────────────────────────────────────────────────
        let lives = 3;
        let applesEaten = 0;
        let timeLeft = GAME_DURATION;
        let finished = false;
        let speed = INITIAL_SPEED;
        let snake = [];
        let dir = { x: 1, y: 0 };
        let nextDir = { x: 1, y: 0 };
        let apple = null;
        let moveInterval = null;
        let timerTick = null;
        let keyHandler = null;
        let respawnTimer = null;
        let isRespawning = false;

        // ── HELPERS ──────────────────────────────────────────────────────────
        const randomApple = () => {
            let pos;
            let tries = 0;
            do {
                pos = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
                tries++;
            } while (tries < 200 && snake.some(seg => seg.x === pos.x && seg.y === pos.y));
            return pos;
        };

        const initSnake = () => {
            const cx = Math.floor(COLS / 2);
            const cy = Math.floor(ROWS / 2);
            snake = [
                { x: cx, y: cy },
                { x: cx - 1, y: cy },
                { x: cx - 2, y: cy }
            ];
            dir = { x: 1, y: 0 };
            nextDir = { x: 1, y: 0 };
            apple = randomApple();
        };

        // ── AUDIO ────────────────────────────────────────────────────────────
        const playEatSound = () => {
            const ac = this.getSharedAudioContext();
            if (!ac) return;
            const now = ac.currentTime;
            [0, 0.06].forEach((delay, i) => {
                const osc = ac.createOscillator();
                const gain = ac.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(i === 0 ? 660 : 880, now + delay);
                gain.gain.setValueAtTime(0.001, now + delay);
                gain.gain.exponentialRampToValueAtTime(0.22, now + delay + 0.01);
                gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.08);
                osc.connect(gain);
                gain.connect(ac.destination);
                osc.start(now + delay);
                osc.stop(now + delay + 0.1);
            });
        };

        const playDeathSound = () => {
            const ac = this.getSharedAudioContext();
            if (!ac) return;
            const now = ac.currentTime;
            const osc = ac.createOscillator();
            const gain = ac.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(380, now);
            osc.frequency.exponentialRampToValueAtTime(80, now + 0.45);
            gain.gain.setValueAtTime(0.001, now);
            gain.gain.exponentialRampToValueAtTime(0.28, now + 0.015);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
            osc.connect(gain);
            gain.connect(ac.destination);
            osc.start(now);
            osc.stop(now + 0.55);
        };

        const playTickSound = () => {
            const ac = this.getSharedAudioContext();
            if (!ac) return;
            const now = ac.currentTime;
            const osc = ac.createOscillator();
            const gain = ac.createGain();
            osc.type = 'square';
            osc.frequency.setValueAtTime(1200, now);
            gain.gain.setValueAtTime(0.001, now);
            gain.gain.exponentialRampToValueAtTime(0.035, now + 0.004);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);
            osc.connect(gain);
            gain.connect(ac.destination);
            osc.start(now);
            osc.stop(now + 0.03);
        };

        // ── HUD ──────────────────────────────────────────────────────────────
        const updateHud = () => {
            if (this.els.snakeScore) this.els.snakeScore.textContent = `🍎 ${applesEaten}`;
            if (this.els.snakeTimer) this.els.snakeTimer.textContent = `Tempo: ${timeLeft}s`;
            if (this.els.snakeLives) this.els.snakeLives.textContent = `Vidas: ${'❤️'.repeat(Math.max(0, lives))}`;
        };

        // ── DRAW ──────────────────────────────────────────────────────────────
        const draw = () => {
            const W = canvas.width;
            const H = canvas.height;

            // Background
            ctx.fillStyle = '#000a00';
            ctx.fillRect(0, 0, W, H);

            // Subtle grid
            ctx.strokeStyle = 'rgba(74, 222, 128, 0.07)';
            ctx.lineWidth = 0.5;
            for (let x = 0; x <= COLS; x++) {
                ctx.beginPath();
                ctx.moveTo(x * CELL, 0);
                ctx.lineTo(x * CELL, H);
                ctx.stroke();
            }
            for (let y = 0; y <= ROWS; y++) {
                ctx.beginPath();
                ctx.moveTo(0, y * CELL);
                ctx.lineTo(W, y * CELL);
                ctx.stroke();
            }

            // Apple
            if (apple) {
                const ax = apple.x * CELL + CELL / 2;
                const ay = apple.y * CELL + CELL / 2;
                const r = CELL / 2 - 2;
                ctx.fillStyle = '#ef4444';
                ctx.beginPath();
                ctx.arc(ax, ay, r, 0, Math.PI * 2);
                ctx.fill();
                // Shine
                ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
                ctx.beginPath();
                ctx.arc(ax - r * 0.32, ay - r * 0.3, r * 0.36, 0, Math.PI * 2);
                ctx.fill();
                // Stem
                ctx.strokeStyle = '#4ade80';
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(ax + 1, ay - r);
                ctx.quadraticCurveTo(ax + r * 0.5, ay - r * 1.5, ax + r * 0.8, ay - r * 1.2);
                ctx.stroke();
            }

            // Snake
            snake.forEach((seg, idx) => {
                const sx = seg.x * CELL + 1;
                const sy = seg.y * CELL + 1;
                const sw = CELL - 2;
                const rad = idx === 0 ? 6 : (idx === snake.length - 1 ? 4 : 3);

                if (isRespawning && Math.floor(Date.now() / 150) % 2 === 0) {
                    ctx.globalAlpha = 0.35;
                }

                if (idx === 0) {
                    // Head — bright green
                    ctx.fillStyle = '#22d363';
                    ctx.beginPath();
                    if (ctx.roundRect) {
                        ctx.roundRect(sx, sy, sw, sw, rad);
                    } else {
                        ctx.rect(sx, sy, sw, sw);
                    }
                    ctx.fill();

                    // Eyes
                    ctx.fillStyle = '#000';
                    const eyeR = 2.5;
                    let e1x, e1y, e2x, e2y;
                    if (dir.x === 1)  { e1x = sx + sw * 0.72; e1y = sy + sw * 0.24; e2x = sx + sw * 0.72; e2y = sy + sw * 0.74; }
                    else if (dir.x === -1) { e1x = sx + sw * 0.28; e1y = sy + sw * 0.24; e2x = sx + sw * 0.28; e2y = sy + sw * 0.74; }
                    else if (dir.y === -1) { e1x = sx + sw * 0.24; e1y = sy + sw * 0.28; e2x = sx + sw * 0.74; e2y = sy + sw * 0.28; }
                    else              { e1x = sx + sw * 0.24; e1y = sy + sw * 0.72; e2x = sx + sw * 0.74; e2y = sy + sw * 0.72; }
                    ctx.beginPath();
                    ctx.arc(e1x, e1y, eyeR, 0, Math.PI * 2);
                    ctx.arc(e2x, e2y, eyeR, 0, Math.PI * 2);
                    ctx.fill();
                    // Pupils shine
                    ctx.fillStyle = '#ffffff';
                    ctx.beginPath();
                    ctx.arc(e1x + 0.8, e1y - 0.8, 1, 0, Math.PI * 2);
                    ctx.arc(e2x + 0.8, e2y - 0.8, 1, 0, Math.PI * 2);
                    ctx.fill();
                } else {
                    const bodyLightness = idx % 2 === 0 ? '#15803d' : '#16a34a';
                    ctx.fillStyle = idx === snake.length - 1 ? '#14532d' : bodyLightness;
                    ctx.beginPath();
                    const inset = idx === snake.length - 1 ? 2 : 0;
                    if (ctx.roundRect) {
                        ctx.roundRect(sx + inset, sy + inset, sw - inset * 2, sw - inset * 2, rad);
                    } else {
                        ctx.rect(sx + inset, sy + inset, sw - inset * 2, sw - inset * 2);
                    }
                    ctx.fill();
                }

                ctx.globalAlpha = 1;
            });

            // On-canvas mini HUD
            ctx.font = `bold ${Math.max(10, CELL * 0.52)}px Orbitron, monospace`;
            ctx.fillStyle = 'rgba(0,0,0,0.55)';
            ctx.fillRect(0, 0, W, CELL - 2);
            ctx.fillStyle = '#4ade80';
            ctx.textAlign = 'left';
            ctx.fillText(`🍎 ${applesEaten}`, 6, CELL - 6);
            ctx.textAlign = 'right';
            ctx.fillStyle = '#fbbf24';
            ctx.fillText(`⏱ ${timeLeft}s`, W - 6, CELL - 6);
            ctx.textAlign = 'center';
            ctx.fillStyle = '#ff6b6b';
            ctx.fillText('❤️'.repeat(Math.max(0, lives)), W / 2, CELL - 6);
            ctx.textAlign = 'left';
        };

        // ── STEP (game tick) ─────────────────────────────────────────────────
        const step = () => {
            if (finished || isRespawning) return;

            // Apply buffered direction (prevent reversing into self)
            if (!(nextDir.x === -dir.x && nextDir.y === -dir.y)) {
                dir = { ...nextDir };
            }

            const head = snake[0];
            const nx = head.x + dir.x;
            const ny = head.y + dir.y;

            const hitWall = nx < 0 || ny < 0 || nx >= COLS || ny >= ROWS;
            const hitSelf = snake.slice(1, -1).some(seg => seg.x === nx && seg.y === ny);

            if (hitWall || hitSelf) {
                playDeathSound();
                lives--;
                updateHud();
                draw();

                if (lives <= 0) {
                    if (moveInterval) { clearInterval(moveInterval); moveInterval = null; }
                    setTimeout(() => finish(false, 'no_lives'), 500);
                    return;
                }

                // Respawn with flash
                isRespawning = true;
                if (moveInterval) { clearInterval(moveInterval); moveInterval = null; }
                respawnTimer = setTimeout(() => {
                    if (finished) return;
                    isRespawning = false;
                    initSnake();
                    speed = INITIAL_SPEED;
                    draw();
                    moveInterval = setInterval(step, speed);
                }, 900);
                return;
            }

            const newHead = { x: nx, y: ny };
            snake.unshift(newHead);

            if (apple && nx === apple.x && ny === apple.y) {
                applesEaten++;
                playEatSound();
                apple = randomApple();
                updateHud();
                // Speed up slightly
                const newSpeed = Math.max(MIN_SPEED, speed - 4);
                if (newSpeed !== speed) {
                    speed = newSpeed;
                    if (moveInterval) { clearInterval(moveInterval); moveInterval = null; }
                    moveInterval = setInterval(step, speed);
                }
            } else {
                snake.pop();
            }

            playTickSound();
            draw();
        };

        // ── FINISH ────────────────────────────────────────────────────────────
        const finish = (won, reason = 'interrupted') => {
            if (finished) return;
            finished = true;

            if (timerTick)    { clearInterval(timerTick);  timerTick = null; }
            if (moveInterval) { clearInterval(moveInterval); moveInterval = null; }
            if (respawnTimer) { clearTimeout(respawnTimer); respawnTimer = null; }
            if (keyHandler)   { document.removeEventListener('keydown', keyHandler); keyHandler = null; }

            modal.classList.add('hidden');
            resolvePromise({ won, applesEaten, reason });
        };

        // ── INPUT ─────────────────────────────────────────────────────────────
        keyHandler = (e) => {
            if (modal.classList.contains('hidden')) return;
            const k = e.key;
            if (k === 'ArrowUp'    || k === 'w' || k === 'W') { nextDir = { x: 0,  y: -1 }; e.preventDefault(); }
            if (k === 'ArrowDown'  || k === 's' || k === 'S') { nextDir = { x: 0,  y:  1 }; e.preventDefault(); }
            if (k === 'ArrowLeft'  || k === 'a' || k === 'A') { nextDir = { x: -1, y:  0 }; e.preventDefault(); }
            if (k === 'ArrowRight' || k === 'd' || k === 'D') { nextDir = { x:  1, y:  0 }; e.preventDefault(); }
        };
        document.addEventListener('keydown', keyHandler);

        if (this.els.snakeGiveUpBtn) {
            this.els.snakeGiveUpBtn.onclick = () => finish(false, 'giveup');
        }

        // ── TIMER ─────────────────────────────────────────────────────────────
        timerTick = setInterval(() => {
            if (finished) return;
            timeLeft--;
            updateHud();
            draw();
            if (timeLeft <= 0) finish(true, 'completed');
        }, 1000);

        // ── INIT ──────────────────────────────────────────────────────────────
        initSnake();
        updateHud();
        draw();
        moveInterval = setInterval(step, speed);

        this.snakeSession = { cleanup: (won = false) => finish(won) };

        return promise;
    }

    showSnakeVictoryPopup(playerName = 'Jogador') {
        const safeName = String(playerName || 'Jogador').trim() || 'Jogador';

        const overlay = document.createElement('div');
        overlay.className = 'slot-summary-overlay enduro-victory-overlay';

        const card = document.createElement('div');
        card.className = 'slot-summary-card enduro-victory-card';
        card.innerHTML = `
            <h3 class="slot-summary-title">VOCÊ VENCEU! 🐍🏆</h3>
            <div style="font-size:4.5rem; margin:16px 0; line-height:1.2;">🎉🐍🎉</div>
            <p class="enduro-victory-text"><strong>${safeName}</strong>, sobreviveu 1 minuto completo no SNAKE!</p>
        `;

        overlay.appendChild(card);
        document.body.appendChild(overlay);

        // Victory fanfare (synthesized)
        const ac = this.getSharedAudioContext();
        if (ac) {
            const notes = [523.25, 659.25, 783.99, 1046.5];
            notes.forEach((freq, i) => {
                const delay = i * 0.13;
                const osc = ac.createOscillator();
                const gain = ac.createGain();
                const now = ac.currentTime;
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, now + delay);
                gain.gain.setValueAtTime(0.001, now + delay);
                gain.gain.exponentialRampToValueAtTime(0.22, now + delay + 0.015);
                gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.28);
                osc.connect(gain);
                gain.connect(ac.destination);
                osc.start(now + delay);
                osc.stop(now + delay + 0.32);
            });
        }

        return new Promise((resolve) => {
            let done = false;
            const cleanup = () => {
                if (done) return;
                done = true;
                overlay.remove();
                resolve();
            };
            setTimeout(cleanup, 6000);
        });
    }

    showSnakeFinalSummary(baseScore, reward, applesEaten = 0) {
        const safeBase      = Number(baseScore) || 0;
        const safeReward    = Math.max(0, Number(reward) || 0);
        const safeApples    = Math.max(0, Number(applesEaten) || 0);
        const appleBonus    = safeApples * 5;

        const overlay = document.createElement('div');
        overlay.className = 'slot-summary-overlay';

        const card = document.createElement('div');
        card.className = 'slot-summary-card';
        card.innerHTML = `
            <h3 class="slot-summary-title">TOTAL DO DESAFIO SNAKE 🐍</h3>
            <div class="enduro-trophy-hero" aria-hidden="true">🐍🏆</div>
            <div class="slot-summary-list"></div>
            <div class="slot-summary-total">PONTUAÇÃO: ${safeBase}</div>
        `;

        overlay.appendChild(card);
        document.body.appendChild(overlay);

        const listEl  = card.querySelector('.slot-summary-list');
        const totalEl = card.querySelector('.slot-summary-total');

        return new Promise((resolve) => {
            let runningScore = safeBase;

            setTimeout(() => {
                const row = document.createElement('div');
                row.className = 'slot-summary-row';
                row.innerHTML = `<span>Maçãs comidas (×5 pts)</span><strong>+${appleBonus}</strong>`;
                listEl.appendChild(row);
            }, 600);

            setTimeout(() => {
                const row = document.createElement('div');
                row.className = 'slot-summary-row';
                row.innerHTML = `<span>Sobreviveu 1 minuto inteiro</span><strong>+${safeReward}</strong>`;
                listEl.appendChild(row);

                const oldScore = runningScore;
                runningScore += appleBonus + safeReward;
                totalEl.textContent = `PONTUAÇÃO: ${runningScore}`;
                this.animateScoreIncrease(oldScore, runningScore);
            }, 1250);

            setTimeout(() => {
                overlay.remove();
                this.resumeGameMusic();
                resolve(runningScore);
            }, 5400);
        });
    }

    // ─────────────────────────────────────────────────────────────────────────
    // MEMORY BONUS GAME
    // ─────────────────────────────────────────────────────────────────────────
    runMemoryBonusLevel() {
        const modal = this.els.memoryBonusModal;
        const grid = this.els.memoryGrid;
        if (!modal || !grid) return Promise.resolve({ won: false, pairsMatched: 0, reason: 'no_element' });

        this.pauseGameMusic();
        modal.classList.remove('hidden');

        if (this.memorySession && this.memorySession.cleanup) {
            this.memorySession.cleanup(false);
        }

        let resolvePromise = null;
        const promise = new Promise((resolve) => { resolvePromise = resolve; });

        // ── CONSTANTS ───────────────────────────────────────────────────────
        // Mesmas frutas-base do caça-níquel para manter identidade visual.
        const EMOJIS = ['🍒', '🍋', '🍊', '🍇', '🍉', '🍑'];
        const TOTAL_PAIRS = EMOJIS.length;
        const GAME_DURATION = 60;

        // ── STATE ────────────────────────────────────────────────────────────
        let lives = 6;
        let pairsMatched = 0;
        let timeLeft = GAME_DURATION;
        let finished = false;
        let flippedCards = [];
        let locked = false;
        let timerTick = null;

        // ── AUDIO ────────────────────────────────────────────────────────────
        const playFlipSound = () => {
            const ac = this.getSharedAudioContext();
            if (!ac) return;
            const now = ac.currentTime;
            const osc = ac.createOscillator();
            const gain = ac.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(800, now);
            osc.frequency.exponentialRampToValueAtTime(1200, now + 0.05);
            gain.gain.setValueAtTime(0.001, now);
            gain.gain.exponentialRampToValueAtTime(0.15, now + 0.005);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
            osc.connect(gain);
            gain.connect(ac.destination);
            osc.start(now);
            osc.stop(now + 0.1);
        };

        const playMatchSound = () => {
            const ac = this.getSharedAudioContext();
            if (!ac) return;
            const now = ac.currentTime;
            [0, 0.09].forEach((delay, i) => {
                const osc = ac.createOscillator();
                const gain = ac.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(i === 0 ? 880 : 1108, now + delay);
                gain.gain.setValueAtTime(0.001, now + delay);
                gain.gain.exponentialRampToValueAtTime(0.22, now + delay + 0.01);
                gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.15);
                osc.connect(gain);
                gain.connect(ac.destination);
                osc.start(now + delay);
                osc.stop(now + delay + 0.18);
            });
        };

        const playWrongSound = () => {
            const ac = this.getSharedAudioContext();
            if (!ac) return;
            const now = ac.currentTime;
            const osc = ac.createOscillator();
            const gain = ac.createGain();
            osc.type = 'square';
            osc.frequency.setValueAtTime(220, now);
            osc.frequency.exponentialRampToValueAtTime(110, now + 0.35);
            gain.gain.setValueAtTime(0.001, now);
            gain.gain.exponentialRampToValueAtTime(0.18, now + 0.01);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
            osc.connect(gain);
            gain.connect(ac.destination);
            osc.start(now);
            osc.stop(now + 0.45);
        };

        // ── HUD ──────────────────────────────────────────────────────────────
        const updateHud = () => {
            if (this.els.memoryPairs) this.els.memoryPairs.textContent = `Pares: ${pairsMatched}/${TOTAL_PAIRS}`;
            if (this.els.memoryTimer) this.els.memoryTimer.textContent = `Tempo: ${timeLeft}s`;
            if (this.els.memoryLives) this.els.memoryLives.textContent = `Vidas: ${'❤️'.repeat(Math.max(0, lives))}`;
        };

        // ── BUILD GRID ────────────────────────────────────────────────────────
        const symbols = [...EMOJIS, ...EMOJIS].sort(() => Math.random() - 0.5);
        grid.innerHTML = '';
        symbols.forEach((emoji) => {
            const card = document.createElement('div');
            card.className = 'memory-card';
            card.dataset.symbol = emoji;
            card.innerHTML = `
                <div class="memory-card-inner">
                    <div class="memory-card-front">❓</div>
                    <div class="memory-card-back">${emoji}</div>
                </div>
            `;
            card.addEventListener('click', () => onCardClick(card));
            grid.appendChild(card);
        });

        // ── CARD CLICK ────────────────────────────────────────────────────────
        const onCardClick = (card) => {
            if (locked || finished) return;
            if (card.classList.contains('flipped') || card.classList.contains('matched')) return;

            playFlipSound();
            card.classList.add('flipped');
            flippedCards.push(card);

            if (flippedCards.length < 2) return;

            locked = true;
            const [cardA, cardB] = flippedCards;
            flippedCards = [];

            if (cardA.dataset.symbol === cardB.dataset.symbol) {
                // Match!
                setTimeout(() => {
                    playMatchSound();
                    cardA.classList.add('matched');
                    cardB.classList.add('matched');
                    pairsMatched++;
                    updateHud();
                    locked = false;
                    if (pairsMatched === TOTAL_PAIRS) {
                        setTimeout(() => finish(true, 'completed'), 400);
                    }
                }, 300);
            } else {
                // No match
                setTimeout(() => {
                    playWrongSound();
                    cardA.classList.add('wrong');
                    cardB.classList.add('wrong');
                    setTimeout(() => {
                        cardA.classList.remove('flipped', 'wrong');
                        cardB.classList.remove('flipped', 'wrong');
                        locked = false;
                        lives--;
                        updateHud();
                        if (lives <= 0) finish(false, 'no_lives');
                    }, 400);
                }, 600);
            }
        };

        // ── FINISH ────────────────────────────────────────────────────────────
        const finish = (won, reason = 'interrupted') => {
            if (finished) return;
            finished = true;
            if (timerTick) { clearInterval(timerTick); timerTick = null; }
            modal.classList.add('hidden');
            resolvePromise({ won, pairsMatched, reason });
        };

        // ── GIVE UP BUTTON ────────────────────────────────────────────────────
        if (this.els.memoryGiveUpBtn) {
            this.els.memoryGiveUpBtn.onclick = () => finish(false, 'giveup');
        }

        // ── TIMER ─────────────────────────────────────────────────────────────
        timerTick = setInterval(() => {
            if (finished) return;
            timeLeft--;
            updateHud();
            if (timeLeft <= 0) finish(false, 'timeout');
        }, 1000);

        // ── INIT ──────────────────────────────────────────────────────────────
        updateHud();
        this.memorySession = { cleanup: (won = false) => finish(won) };
        return promise;
    }

    showMemoryVictoryPopup(playerName = 'Jogador') {
        const safeName = String(playerName || 'Jogador').trim() || 'Jogador';

        const overlay = document.createElement('div');
        overlay.className = 'slot-summary-overlay enduro-victory-overlay';

        const card = document.createElement('div');
        card.className = 'slot-summary-card enduro-victory-card';
        card.innerHTML = `
            <h3 class="slot-summary-title">VOCÊ VENCEU! 🧠🏆</h3>
            <div style="font-size:4.5rem; margin:16px 0; line-height:1.2;">🎉🧠🎉</div>
            <p class="enduro-victory-text"><strong>${safeName}</strong>, encontrou todos os pares no JOGO DA MEMÓRIA!</p>
        `;

        overlay.appendChild(card);
        document.body.appendChild(overlay);

        // Victory fanfare (synthesized — ascending arpeggio)
        const ac = this.getSharedAudioContext();
        if (ac) {
            const notes = [523.25, 659.25, 783.99, 1046.5];
            notes.forEach((freq, i) => {
                const delay = i * 0.13;
                const osc = ac.createOscillator();
                const gain = ac.createGain();
                const now = ac.currentTime;
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, now + delay);
                gain.gain.setValueAtTime(0.001, now + delay);
                gain.gain.exponentialRampToValueAtTime(0.22, now + delay + 0.015);
                gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.28);
                osc.connect(gain);
                gain.connect(ac.destination);
                osc.start(now + delay);
                osc.stop(now + delay + 0.32);
            });
        }

        return new Promise((resolve) => {
            let done = false;
            const cleanup = () => {
                if (done) return;
                done = true;
                overlay.remove();
                resolve();
            };
            setTimeout(cleanup, 6000);
        });
    }

    showMemoryFinalSummary(baseScore, reward, pairsMatched = 0) {
        const safeBase      = Number(baseScore) || 0;
        const safeReward    = Math.max(0, Number(reward) || 0);
        const safePairs     = Math.max(0, Number(pairsMatched) || 0);
        const pairsBonus    = safePairs * 10;

        const overlay = document.createElement('div');
        overlay.className = 'slot-summary-overlay';

        const card = document.createElement('div');
        card.className = 'slot-summary-card';
        card.innerHTML = `
            <h3 class="slot-summary-title">TOTAL DO DESAFIO MEMÓRIA 🧠</h3>
            <div class="enduro-trophy-hero" aria-hidden="true">🧠🏆</div>
            <div class="slot-summary-list"></div>
            <div class="slot-summary-total">PONTUAÇÃO: ${safeBase}</div>
        `;

        overlay.appendChild(card);
        document.body.appendChild(overlay);

        const listEl  = card.querySelector('.slot-summary-list');
        const totalEl = card.querySelector('.slot-summary-total');

        return new Promise((resolve) => {
            let runningScore = safeBase;

            setTimeout(() => {
                const row = document.createElement('div');
                row.className = 'slot-summary-row';
                row.innerHTML = `<span>Pares encontrados (×10 pts)</span><strong>+${pairsBonus}</strong>`;
                listEl.appendChild(row);
            }, 600);

            setTimeout(() => {
                const row = document.createElement('div');
                row.className = 'slot-summary-row';
                row.innerHTML = `<span>Completou todos os pares</span><strong>+${safeReward}</strong>`;
                listEl.appendChild(row);

                const oldScore = runningScore;
                runningScore += pairsBonus + safeReward;
                totalEl.textContent = `PONTUAÇÃO: ${runningScore}`;
                this.animateScoreIncrease(oldScore, runningScore);
            }, 1250);

            setTimeout(() => {
                overlay.remove();
                this.resumeGameMusic();
                resolve(runningScore);
            }, 5400);
        });
    }
        getLordeHeroGameUrl() {
            const base = new URL('./game/lordehero-original.html', import.meta.url);
            base.searchParams.set('v', String(Date.now()));
            return base.toString();
        }

        runLordeHeroBonusLevel() {
                const modal = this.els.lordeHeroBonusModal;
                const iframe = this.els.lordeHeroIframe;
                if (!modal || !iframe) {
                        return Promise.resolve({ won: false, score: 0, maxCombo: 0, reason: 'no_element' });
                }

                this.pauseGameMusic();
                modal.classList.remove('hidden');

                if (this.lordeHeroSession && this.lordeHeroSession.cleanup) {
                        this.lordeHeroSession.cleanup(false);
                }

                let resolvePromise = null;
                const promise = new Promise((resolve) => {
                        resolvePromise = resolve;
                });

                const GAME_DURATION = 60;
                const WIN_SCORE = 120;

                let finished = false;
                let timeLeft = GAME_DURATION;
                let timerTick = null;
                let currentScore = 0;
                let maxCombo = 0;

                if (this.els.lordeHeroTimer) {
                        this.els.lordeHeroTimer.textContent = `Tempo: ${timeLeft}s`;
                }
                if (this.els.lordeHeroScore) {
                        this.els.lordeHeroScore.textContent = `Score: ${currentScore}`;
                }

                const onMessage = (event) => {
                        if (event.source !== iframe.contentWindow) return;
                        const payload = event.data || {};
                        if (payload.type !== 'lorde-hero:update') return;

                        currentScore = Math.max(0, Number(payload.score) || 0);
                        maxCombo = Math.max(0, Number(payload.maxCombo) || 0);

                        if (this.els.lordeHeroScore) {
                                this.els.lordeHeroScore.textContent = `Score: ${currentScore}`;
                        }
                };

                const finish = (won, reason = 'interrupted') => {
                        if (finished) return;
                        finished = true;

                        if (timerTick) {
                                clearInterval(timerTick);
                                timerTick = null;
                        }

                        window.removeEventListener('message', onMessage);
                        modal.classList.add('hidden');
                        iframe.src = 'about:blank';

                        resolvePromise({
                                won,
                                score: currentScore,
                                maxCombo,
                                reason
                        });
                };

                if (this.els.lordeHeroGiveUpBtn) {
                        this.els.lordeHeroGiveUpBtn.onclick = () => finish(false, 'giveup');
                }

                window.addEventListener('message', onMessage);

                iframe.src = this.getLordeHeroGameUrl();

                timerTick = setInterval(() => {
                        if (finished) return;
                        timeLeft -= 1;

                        if (this.els.lordeHeroTimer) {
                                this.els.lordeHeroTimer.textContent = `Tempo: ${Math.max(0, timeLeft)}s`;
                        }

                        if (timeLeft <= 0) {
                                const won = currentScore >= WIN_SCORE;
                                finish(won, won ? 'completed' : 'low_score');
                        }
                }, 1000);

                this.lordeHeroSession = { cleanup: (won = false) => finish(won) };

                return promise;
        }

        showLordeHeroVictoryPopup(playerName = 'Jogador') {
                const safeName = String(playerName || 'Jogador').trim() || 'Jogador';

                const overlay = document.createElement('div');
                overlay.className = 'slot-summary-overlay enduro-victory-overlay';

                const card = document.createElement('div');
                card.className = 'slot-summary-card enduro-victory-card';
                card.innerHTML = `
                        <h3 class="slot-summary-title">VOCÊ VENCEU! 🤴🎸🏆</h3>
                        <div style="font-size:4.5rem; margin:16px 0; line-height:1.2;">🎉🤴🎸🎉</div>
                        <p class="enduro-victory-text"><strong>${safeName}</strong>, concluiu o desafio LORDE HERO com maestria!</p>
                `;

                overlay.appendChild(card);
                document.body.appendChild(overlay);

                const ac = this.getSharedAudioContext();
                if (ac) {
                        const notes = [392.0, 523.25, 659.25, 783.99];
                        notes.forEach((freq, i) => {
                                const delay = i * 0.12;
                                const osc = ac.createOscillator();
                                const gain = ac.createGain();
                                const now = ac.currentTime;
                                osc.type = 'triangle';
                                osc.frequency.setValueAtTime(freq, now + delay);
                                gain.gain.setValueAtTime(0.001, now + delay);
                                gain.gain.exponentialRampToValueAtTime(0.2, now + delay + 0.015);
                                gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.28);
                                osc.connect(gain);
                                gain.connect(ac.destination);
                                osc.start(now + delay);
                                osc.stop(now + delay + 0.32);
                        });
                }

                return new Promise((resolve) => {
                        setTimeout(() => {
                                overlay.remove();
                                resolve();
                        }, 4500);
                });
        }

        showLordeHeroFinalSummary(baseScore, reward, rawScore = 0, maxCombo = 0) {
                const safeBase = Number(baseScore) || 0;
                const safeReward = Math.max(0, Number(reward) || 0);
                const safeRawScore = Math.max(0, Number(rawScore) || 0);
                const safeMaxCombo = Math.max(0, Number(maxCombo) || 0);
                const comboBonus = safeMaxCombo * 2;

                const overlay = document.createElement('div');
                overlay.className = 'slot-summary-overlay';

                const card = document.createElement('div');
                card.className = 'slot-summary-card';
                card.innerHTML = `
                        <h3 class="slot-summary-title">TOTAL DO DESAFIO LORDE HERO 🤴🎸</h3>
                        <div class="enduro-trophy-hero" aria-hidden="true">🤴🎸🏆</div>
                        <div class="slot-summary-list"></div>
                        <div class="slot-summary-total">PONTUAÇÃO: ${safeBase}</div>
                `;

                overlay.appendChild(card);
                document.body.appendChild(overlay);

                const listEl = card.querySelector('.slot-summary-list');
                const totalEl = card.querySelector('.slot-summary-total');

                return new Promise((resolve) => {
                        let runningScore = safeBase;

                        setTimeout(() => {
                                const rowScore = document.createElement('div');
                                rowScore.className = 'slot-summary-row';
                                rowScore.innerHTML = `<span>Pontuação no Lorde Hero</span><strong>+${safeRawScore}</strong>`;
                                listEl.appendChild(rowScore);
                        }, 550);

                        setTimeout(() => {
                                const rowCombo = document.createElement('div');
                                rowCombo.className = 'slot-summary-row';
                                rowCombo.innerHTML = `<span>Maior combo (×2)</span><strong>+${comboBonus}</strong>`;
                                listEl.appendChild(rowCombo);
                        }, 1150);

                        setTimeout(() => {
                                const rowReward = document.createElement('div');
                                rowReward.className = 'slot-summary-row';
                                rowReward.innerHTML = `<span>Concluiu o desafio</span><strong>+${safeReward}</strong>`;
                                listEl.appendChild(rowReward);

                                const oldScore = runningScore;
                                runningScore += safeRawScore + comboBonus + safeReward;
                                totalEl.textContent = `PONTUAÇÃO: ${runningScore}`;
                                this.animateScoreIncrease(oldScore, runningScore);
                        }, 1800);

                        setTimeout(() => {
                                overlay.remove();
                                this.resumeGameMusic();
                                resolve(runningScore);
                        }, 5600);
                });
        }

}
