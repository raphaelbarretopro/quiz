export default class View {
    constructor() {
        // Cache centralizado dos elementos da interface para evitar buscas repetidas no DOM.
        this.els = {
            mainTitle: document.getElementById('main-title'),
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
            
            btnUp: document.getElementById('btn-up'),
            btnDown: document.getElementById('btn-down'),
            btnLeft: document.getElementById('btn-left'),
            btnRight: document.getElementById('btn-right'),
            btnResetSokoban: document.getElementById('btn-reset-sokoban'),
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
            firjanLogo: document.getElementById('firjan-logo'),

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
            trexGiveUpBtn: document.getElementById('trex-giveup-btn')
        };

        this.rot = 0;
        this.spinTimer = null;
        this.dragsFixed = 0;
        this.audioContext = null;
        this.questionCount = 0;
        this.lastSlotPositions = [0, 0, 0];
        this.slotSpinSoundTimer = null;
        this.reelFxRaf = new Map();
        this.slotStopAudioCursor = 0;
        this.assetsBaseUrl = new URL('../assets/', import.meta.url);
        this.pacmanSession = null;
        this.enduroSession = null;
        this.trexSession = null;

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
        this.els.btnStart.innerText = "INICIAR JORNADA";
        this.els.btnStart.disabled = false;

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
            const name = this.els.pNameInput.value.trim();
            if (name.length < 3) { this.showAlert("Atenção!", "Digite seu nome completo (mínimo 3 letras)."); return; }
            handler(name);
            this.startBackgroundMusic(true);
        });
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
    bindSokobanReset(handler) { this.els.btnResetSokoban.addEventListener('click', handler); }
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

    showPortal() {
        this.els.quizScreen.classList.add('hidden');
        this.els.portalScreen.classList.remove('hidden');
        this.els.spinBtn.classList.remove('hidden');
        this.els.stopBtn.classList.add('hidden');
        this.els.stopBtn.innerText = "PARAR AGORA!";
        // Oculta a logo Firjan ao sair da tela inicial.
        if (this.els.firjanLogo) this.els.firjanLogo.classList.add('hidden');
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
        this.createCoinAnimation();
        
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
        this.els.quizScreen.classList.remove('is-drag-question');
        
        this.els.dragDrop.classList.add('hidden'); 
        this.els.opts.classList.remove('hidden');
        this.els.nextBtn.classList.add('hidden'); 
        this.els.valBtn.classList.add('hidden');
        this.els.quizScreen.classList.remove('hidden');
        if (this.els.firjanLogo) this.els.firjanLogo.classList.add('hidden');
        
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

        // Fluxo de renderização muda conforme o tipo da questão.
        if (q.type === "combo") {
            const parts = q.questions.split("[COMBO]");
            this.els.qTxt.innerHTML = parts[0].replace("[NAME]", playerName);
            const sel = document.createElement('select');
            sel.className = "combo-box";
            
            const shuffledOptions = this.shuffle([...q.options]);
            
            sel.innerHTML = `<option value="">-- selecione --</option>` + shuffledOptions.map(o => `<option value="${o}">${o}</option>`).join("");
            this.els.qTxt.appendChild(sel);
            this.els.qTxt.append(parts[1] || "");
            
            this.els.valBtn.classList.remove('hidden');
            this.els.valBtn.onclick = () => answerHandler(sel.value, null);
        } 
        else if (q.type === "multi") {
            this.els.qTxt.innerHTML = q.questions.replace("[NAME]", playerName);
            const shuffledAnswers = this.shuffle([...q.answers]);
            
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
            this.els.valBtn.classList.remove('hidden');
            this.els.valBtn.disabled = true;

            const updateMultiValidateState = () => {
                const checkedCount = this.els.opts.querySelectorAll('input:checked').length;
                this.els.valBtn.disabled = checkedCount === 0;
            };

            this.els.opts.querySelectorAll('input[type="checkbox"]').forEach((input) => {
                input.addEventListener('change', updateMultiValidateState);
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
        let dragFailed = false;
        const shuffledItems = this.shuffle([...q.items]);
        
        shuffledItems.forEach(item => {
            const div = document.createElement('div'); 
            div.className = "drag-card"; 
            div.innerText = item.txt; 
            div.draggable = true; 
            div.id = item.id;
            div.ondragstart = (e) => e.dataTransfer.setData("text", e.target.id);
            document.getElementById('drag-pool').appendChild(div);
        });
        
        q.zones.forEach(z => {
            const box = document.createElement('div'); box.className = "drop-box";
            box.innerHTML = `<span>${z.label}</span><div class="target-zone" data-match="${z.id}"></div>`;
            document.getElementById('drop-zones').appendChild(box);
        });
        
        document.querySelectorAll('.target-zone').forEach(zone => {
            zone.ondragover = (e) => { e.preventDefault(); zone.style.background = "rgba(0,212,255,0.2)"; };
            zone.ondragleave = () => { zone.style.background = "rgba(255,255,255,0.1)"; };
            zone.ondrop = (e) => {
                if (dragFailed) return;
                const id = e.dataTransfer.getData("text");
                const item = q.items.find(i => i.id === id);
                if (!item) return;
                // Valida o vínculo item -> zona pelo id de correspondência.
                if (item.match === zone.dataset.match) {
                    zone.appendChild(document.getElementById(id)); 
                    zone.style.background = "#2ecc71";
                    this.dragsFixed++;
                    if (this.dragsFixed === q.items.length) { 
                        answerHandler(q.correct, null); 
                    }
                } else {
                    dragFailed = true;
                    answerHandler({ __dragdropWrong: true }, null);
                }
            };
        });
    }

    showFeedback(isCorrect, tip, playerName, btnElement, questionData = null) {
        if (isCorrect) {
            this.els.fbArea.innerHTML = `<span style="color:#2ecc71">✓ Excelente análise, ${playerName}!</span><br><small style="color:#ccc">${tip}</small>`;
            if (btnElement) btnElement.style.background = "#2ecc71";
            this.els.nextBtn.classList.remove('hidden');
            this.els.valBtn.classList.add('hidden');
        } else {
            if (btnElement) btnElement.style.background = "#ff4b4b";
            if (questionData?.type === 'drag') {
                this.els.fbArea.innerHTML = `
                    <span style="color:#ff8f8f">✗ Resposta incorreta, ${playerName}.</span><br>
                    <small style="color:#ccc">${tip}</small>
                `;
            } else {
                const correctAnswer = this.formatCorrectAnswer(questionData);
                this.els.fbArea.innerHTML = `
                    <span style="color:#ff8f8f">✗ Resposta incorreta, ${playerName}.</span><br>
                    <small style="color:#ccc">${tip}</small><br>
                    <div class="correct-answer-box"><b>Resposta correta:</b> ${correctAnswer}</div>
                `;
            }
            this.playErrorSound();
            this.lockQuestionAfterError(questionData, btnElement);
            this.els.nextBtn.classList.remove('hidden');
            this.els.valBtn.classList.add('hidden');
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

            const zoneByMatch = new Map(zones.map((zone) => [zone.dataset.match, zone]));
            zones.forEach((zone) => {
                zone.innerHTML = '';
                zone.style.background = 'rgba(255,255,255,0.12)';
            });

            // Mostra a solução no próprio grid de drop para economizar espaço na tela.
            q.items.forEach((item) => {
                const targetZone = zoneByMatch.get(item.match);
                const card = document.getElementById(item.id) || cards.find((c) => c.id === item.id);
                if (!targetZone || !card) return;
                card.draggable = false;
                card.classList.add('locked-option');
                card.style.pointerEvents = 'none';
                targetZone.appendChild(card);
            });

            cards.forEach((card) => {
                card.draggable = false;
                card.classList.add('locked-option');
                card.style.pointerEvents = 'none';
            });

            const zonesLocked = this.els.dragDrop.querySelectorAll('.target-zone');
            zonesLocked.forEach((zone) => {
                zone.classList.add('locked-option');
                zone.style.pointerEvents = 'none';
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

    showEndScreen(stats, playerName, totalScore = 0, onShowRanking, totalGameTime = 0) {
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

    animateScoreIncrease(oldScore, newScore) {
        // Anima o aumento de pontos com som e moedas caindo.
        this.playCountingSound();
        this.createCoinAnimation();
        
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

    createCoinAnimation() {
        // Cria animação de moedas caindo estilo caça-níqueis alinhadas à janela de perguntas.
        const count = 30; // Número de moedas
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

            if (index < 3) {
                row.classList.add('is-podium');
            }

            row.innerHTML = `
                <span class="top15-pos">${index + 1}</span>
                <span class="top15-name">${medal ? `<span class="top15-medal">${medal}</span>` : ''}${score.name || '---'}</span>
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

            row.style.cssText = `background: ${bgColor}; border-bottom: 1px solid rgba(255,255,255,0.1);`;
            row.innerHTML = `
                <td style="padding:10px; color:gold; font-weight:bold;">${medal} ${index + 1}</td>
                <td style="padding:10px; color:#f0f0f0;">${this.escapeHtml(score.name || '---')}</td>
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

                    if (intersects(playerBox, obstacleHitbox(obs))) {
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

    shouldShowSlotMachine() {
        // Retorna true se deve mostrar o caça níquel (a cada 5-10 questões)
        const minQuestions = 5;
        const maxQuestions = 10;
        const range = maxQuestions - minQuestions;
        const randomTrigger = minQuestions + Math.floor(Math.random() * range);
        
        return this.questionCount % randomTrigger === 0 && this.questionCount > 0;
    }

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

    _generateSlotFinalPositions(reels) {
        const counts = reels.map((reel) => Math.max(1, Number(reel?.dataset.baseCount || 5)));
        const baseCount = Math.max(1, Math.min(...counts));

        if (baseCount <= 1) {
            return [0, 0, 0];
        }

        const pick = (max) => Math.floor(Math.random() * Math.max(1, max));
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

    spinSlotMachine() {
        // Anima os 3 reels e resolve quando o resultado final estiver disponível.
        this._ensureSlotTracks();

        const reels = [this.els.slotReel1, this.els.slotReel2, this.els.slotReel3];
        const spinDurations = [1100, 1400, 1700];

        const finalPositions = this._generateSlotFinalPositions(reels);

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
                message = `🎉 JACKPOT! 7️⃣7️⃣7️⃣<br>+500 MOEDAS!`;
            } else if (results[0] === 'BAR') {
                message = `🔥 3× BAR!<br>+300 MOEDAS!`;
            } else {
                message = `${results[0]}${results[1]}${results[2]} 3 IGUAIS!<br>+150 MOEDAS!`;
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
            if (results[0] === '7')   return 500;
            if (results[0] === 'BAR') return 300;
            return 150; // 3 frutas iguais
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
        const safeCherryBonus = Math.max(0, Number(cherryBonus) || 0);

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

            if (safeCherryBonus > 0) {
                setTimeout(() => {
                    const cherryRow = document.createElement('div');
                    cherryRow.className = 'slot-summary-row';
                    cherryRow.innerHTML = `
                        <span>🍒 Cerejas coletadas</span>
                        <strong>+${safeCherryBonus}</strong>
                    `;
                    listEl.appendChild(cherryRow);

                    const oldScore2 = runningScore;
                    runningScore += safeCherryBonus;
                    totalEl.textContent = `PONTUAÇÃO: ${runningScore}`;
                    this.animateScoreIncrease(oldScore2, runningScore);
                }, 1300);
            }

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
        const safeCarsPassed = Math.max(0, Number(carsPassed) || 0);
        const trafficBonus = safeCarsPassed * 10;

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
                const rowTraffic = document.createElement('div');
                rowTraffic.className = 'slot-summary-row';
                rowTraffic.innerHTML = `
                    <span>Carros ultrapassados (${safeCarsPassed} x 10)</span>
                    <strong>+${trafficBonus}</strong>
                `;
                listEl.appendChild(rowTraffic);

                const oldScore2 = runningScore;
                runningScore += trafficBonus;
                totalEl.textContent = `PONTUAÇÃO: ${runningScore}`;
                this.animateScoreIncrease(oldScore2, runningScore);
            }, 2000);

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

        const overlay = document.createElement('div');
        overlay.className = 'slot-summary-overlay enduro-victory-overlay';

        const card = document.createElement('div');
        card.className = 'slot-summary-card enduro-victory-card';
        card.innerHTML = `
            <h3 class="slot-summary-title">VITÓRIA NO ENDURO! 🏁</h3>
            <p class="enduro-victory-text"><strong>${safeName}</strong>, parabéns pela corrida perfeita!</p>
            <img class="enduro-victory-img" src="img/f1.png" alt="Piloto levantando troféu">
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

        const overlay = document.createElement('div');
        overlay.className = 'slot-summary-overlay enduro-victory-overlay';

        const card = document.createElement('div');
        card.className = 'slot-summary-card enduro-victory-card';
        card.innerHTML = `
            <h3 class="slot-summary-title">VOCÊ VENCEU! 🦖🏁</h3>
            <img src="img/t-rex.png" alt="T-Rex Victory" style="max-width: 200px; max-height: 150px; margin: 20px auto; display: block; image-rendering: crisp-edges;">
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
        const distanceBonus = Math.floor(safeDistance / 100) * 10;

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
                const rowDistance = document.createElement('div');
                rowDistance.className = 'slot-summary-row';
                rowDistance.innerHTML = `
                    <span>Bônus de distância (${Math.floor(safeDistance / 100)} x 10)</span>
                    <strong>+${distanceBonus}</strong>
                `;
                listEl.appendChild(rowDistance);

                const oldScore2 = runningScore;
                runningScore += distanceBonus;
                totalEl.textContent = `PONTUAÇÃO: ${runningScore}`;
                this.animateScoreIncrease(oldScore2, runningScore);
            }, 2000);

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
}