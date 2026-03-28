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
            scorePlayer: document.getElementById('score-player'),
            coinsContainer: document.getElementById('coins-container'),
            top15Panel: document.getElementById('top15-panel'),
            top15Body: document.getElementById('top15-body'),
            firjanLogo: document.getElementById('firjan-logo'),

            // Modal de Ranking
            rankingModal: document.getElementById('ranking-modal'),
            rankingList: document.getElementById('ranking-list'),
            rankingModalClose: document.getElementById('ranking-modal-close')
        };
        
        this.rot = 0;
        this.spinTimer = null;
        this.dragsFixed = 0;
        this.audioContext = null;
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
        document.documentElement.style.setProperty('--bg-img', `url('${topicData.img_url}')`);
    }

    bindStart(handler) {
        this.els.btnStart.addEventListener('click', () => {
            const name = this.els.pNameInput.value.trim();
            if (name.length < 3) { this.showAlert("Atenção!", "Digite seu nome completo (mínimo 3 letras)."); return; }
            handler(name);
        });
    }

    bindWheelStart(handler) { this.els.spinBtn.addEventListener('click', handler); }
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
        this.playSokobanWinSound();
        this.triggerExplosion();
        setTimeout(() => {
            this.els.sokobanScreen.classList.add('hidden');
            callback();
        }, 1500);
    }

    renderQuestion(q, topicData, playerName, answerHandler, currentStep = 0, totalQuestions = 0) {
        // Limpa estado visual da pergunta anterior antes de renderizar a próxima.
        this.els.opts.innerHTML = ""; 
        this.els.dragDrop.innerHTML = ""; 
        this.els.fbArea.innerText = "";
        
        this.els.dragDrop.classList.add('hidden'); 
        this.els.opts.classList.remove('hidden');
        this.els.nextBtn.classList.add('hidden'); 
        this.els.valBtn.classList.add('hidden');
        this.els.quizScreen.classList.remove('hidden');
        if (this.els.firjanLogo) this.els.firjanLogo.classList.add('hidden');
        
        this.applyTheme(topicData);
        this.els.eraTag.innerText = `MODALIDADE: ${topicData.name}`;
        const questionNumber = `QUESTÃO ${currentStep + 1}/${totalQuestions}`;
        const questionNumberHtml = `<span style="display:inline-block; font-size:0.85rem; color:var(--primary); letter-spacing:0.8px; font-family:'Orbitron'; margin-bottom:8px;">${questionNumber}</span><br>`;

        let newValBtn = this.els.valBtn.cloneNode(true);
        this.els.valBtn.parentNode.replaceChild(newValBtn, this.els.valBtn);
        this.els.valBtn = newValBtn;

        // Fluxo de renderização muda conforme o tipo da questão.
        if (q.type === "combo") {
            const parts = q.questions.split("[COMBO]");
            this.els.qTxt.innerHTML = questionNumberHtml + parts[0].replace("[NAME]", playerName);
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
            this.els.qTxt.innerHTML = questionNumberHtml + q.questions.replace("[NAME]", playerName);
            const shuffledAnswers = this.shuffle([...q.answers]);
            
            shuffledAnswers.forEach(a => {
                const l = document.createElement('label');
                l.className = "multi-opt";
                l.innerHTML = `<input type="checkbox" value="${a}"> <span>${a}</span>`;
                this.els.opts.appendChild(l);
            });
            this.els.valBtn.classList.remove('hidden');
            this.els.valBtn.onclick = () => {
                const sel = Array.from(this.els.opts.querySelectorAll('input:checked')).map(i => i.value);
                const isCor = sel.length === q.correct.length && sel.every(v => q.correct.includes(v));
                answerHandler(isCor ? q.correct : sel, null);
            };
        }
        else if (q.type === "drag") {
            this.els.qTxt.innerHTML = questionNumberHtml + q.questions.replace("[NAME]", playerName);
            this.els.opts.classList.add('hidden'); 
            this.els.dragDrop.classList.remove('hidden');
            this.renderDrag(q, answerHandler);
        }
        else {
            this.els.qTxt.innerHTML = questionNumberHtml + q.questions.replace("[NAME]", playerName);
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
                const id = e.dataTransfer.getData("text");
                const item = q.items.find(i => i.id === id);
                // Valida o vínculo item -> zona pelo id de correspondência.
                if (item.match === zone.dataset.match) {
                    zone.appendChild(document.getElementById(id)); 
                    zone.style.background = "#2ecc71";
                    this.dragsFixed++;
                    if (this.dragsFixed === q.items.length) { 
                        answerHandler(q.correct, null); 
                    }
                } else {
                    this.playErrorSound();
                    this.showAlert("✗ Definição Incorreta!", "Tente novamente. Arraste o item para a zona correta.");
                    zone.style.background = "rgba(255,255,255,0.1)";
                }
            };
        });
    }

    showFeedback(isCorrect, tip, playerName, btnElement) {
        if (isCorrect) {
            this.els.fbArea.innerHTML = `<span style="color:#2ecc71">✓ Excelente análise, ${playerName}!</span><br><small style="color:#ccc">${tip}</small>`;
            if (btnElement) btnElement.style.background = "#2ecc71";
            this.els.nextBtn.classList.remove('hidden');
            this.els.valBtn.classList.add('hidden');
            this.triggerExplosion();
        } else {
            if (btnElement) btnElement.style.background = "#ff4b4b";
            this.playErrorSound();
            // Exibe modal com a dica da questão nas cores do tópico atual.
            this.showAlert(`✗ Foco nos detalhes, ${playerName}...`, tip);
        }
    }

    showEndScreen(stats, playerName, totalScore = 0, onShowRanking) {
        this.els.quizScreen.innerHTML = `
            <h2 style="font-family:'Cinzel'; color:gold;">🏆 JORNADA CONCLUÍDA: ${playerName}</h2>
            <div style="background:rgba(255,215,0,0.1); border:2px solid gold; padding:20px; border-radius:15px; margin-bottom:20px;">
                <p style="font-size:1.8rem; font-weight:bold; color:gold; margin:0;">💰 ${totalScore} PONTOS</p>
                <p style="font-size:0.95rem; color:#ccc; margin:5px 0 0 0;">Acertos: ${stats.correct}</p>
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
        
        this.triggerExplosion();
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

    playCountingSound() {
        // Gera som de contagem usando Web Audio API (sem dependências).
        const audioContext = this.getSharedAudioContext();
        if (!audioContext) return;
        const now = audioContext.currentTime;
        
        // "Ding" - tom de coin/moeda
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        
        osc.connect(gain);
        gain.connect(audioContext.destination);
        
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(600, now + 0.1);
        
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        
        osc.start(now);
        osc.stop(now + 0.1);
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
        const primary = getComputedStyle(document.documentElement)
            .getPropertyValue('--primary').trim() || '#ffd700';
        
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
            coin.style.backgroundColor = primary;
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

    setTimerVisibility(isVisible) {
        if (!this.els.timerDisplay) return;
        this.els.timerDisplay.classList.toggle('hidden', !isVisible);
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

            if (index < 3) {
                row.classList.add('is-podium');
            }

            row.innerHTML = `
                <span class="top15-pos">${index + 1}</span>
                <span class="top15-name">${score.name || '---'}</span>
                <span class="top15-score">${score.score || 0}</span>
            `;
            this.els.top15Body.appendChild(row);
        });
    }

    bindRankingModalClose(handler) {
        // Liga evento de fechar ranking modal.
        this.els.rankingModalClose.addEventListener('click', handler);
    }

    showRankingModal(scores) {
        // Abre o modal com o ranking global.
        this.els.rankingList.innerHTML = '';

        if (scores.length === 0) {
            this.els.rankingList.innerHTML = '<p style="color: #ccc; text-align: center; padding: 20px;">Nenhum ranking disponível ainda...</p>';
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
                <td style="padding:10px; color:#f0f0f0;">${score.name}</td>
                <td style="padding:10px; text-align:center; color:#ffd700; font-weight:bold;">${score.score}</td>
                <td style="padding:10px; text-align:center; color:#ffef9f;">${this.formatGameTime(score.gameTime)}</td>
                <td style="padding:10px; text-align:center; color:#2ecc71;">${score.correct}/${score.total}</td>
                <td style="padding:10px; text-align:center; color:#00d4ff;">${score.accuracy}%</td>
            `;
            table.appendChild(row);
        });

        this.els.rankingList.appendChild(table);
        this.els.rankingModal.classList.remove('hidden');
    }

    hideRankingModal() {
        // Fecha o modal de ranking.
        this.els.rankingModal.classList.add('hidden');
    }

    formatGameTime(totalSeconds) {
        const safe = Math.max(0, Math.floor(Number(totalSeconds) || 0));
        const min = Math.floor(safe / 60).toString().padStart(2, '0');
        const sec = (safe % 60).toString().padStart(2, '0');
        return `${min}:${sec}`;
    }
}