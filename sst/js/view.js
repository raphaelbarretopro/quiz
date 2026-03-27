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
            fbModalBtn: document.getElementById('fb-modal-btn')
        };
        
        this.rot = 0;
        this.spinTimer = null;
        this.dragsFixed = 0;
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
        this.els.btnUp.addEventListener('click', () => handler(0, -1));
        this.els.btnDown.addEventListener('click', () => handler(0, 1));
        this.els.btnLeft.addEventListener('click', () => handler(-1, 0));
        this.els.btnRight.addEventListener('click', () => handler(1, 0));
        window.addEventListener("keydown", (e) => {
            if (e.key === "ArrowUp") handler(0, -1);
            if (e.key === "ArrowDown") handler(0, 1);
            if (e.key === "ArrowLeft") handler(-1, 0);
            if (e.key === "ArrowRight") handler(1, 0);
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
    }

    startSpin() {
        this.els.spinBtn.classList.add('hidden');
        this.els.stopBtn.classList.remove('hidden');
        // Rotação contínua para simular o giro da roleta.
        this.spinTimer = setInterval(() => { 
            this.rot += 45; 
            this.els.wheel.style.transform = `rotate(${this.rot}deg)`; 
        }, 40);
    }

    stopSpin(topicIndex, totalTopics, topicData) {
        clearInterval(this.spinTimer);
        
        // Calcula a angulação exata para parar a roleta no tópico correto
        const segmentAngle = 360 / totalTopics;
        const targetAngle = (360 - (topicIndex * segmentAngle)) % 360;
        
        // Adiciona voltas extras (1800deg = 5 voltas) para efeito visual
        this.els.wheel.style.transform = `rotate(${targetAngle + 1800}deg)`;
        
        setTimeout(() => {
            this.els.modalTitle.innerText = "NOVA ERA: " + topicData.name;
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
        this.triggerExplosion();
        setTimeout(() => {
            this.els.sokobanScreen.classList.add('hidden');
            callback();
        }, 1500);
    }

    renderQuestion(q, topicData, playerName, answerHandler) {
        // Limpa estado visual da pergunta anterior antes de renderizar a próxima.
        this.els.opts.innerHTML = ""; 
        this.els.dragDrop.innerHTML = ""; 
        this.els.fbArea.innerText = "";
        
        this.els.dragDrop.classList.add('hidden'); 
        this.els.opts.classList.remove('hidden');
        this.els.nextBtn.classList.add('hidden'); 
        this.els.valBtn.classList.add('hidden');
        this.els.quizScreen.classList.remove('hidden');
        
        this.applyTheme(topicData);
        this.els.eraTag.innerText = `MODALIDADE: ${topicData.name}`;

        let newValBtn = this.els.valBtn.cloneNode(true);
        this.els.valBtn.parentNode.replaceChild(newValBtn, this.els.valBtn);
        this.els.valBtn = newValBtn;

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
            this.els.qTxt.innerText = q.questions.replace("[NAME]", playerName);
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
            this.els.qTxt.innerText = q.questions.replace("[NAME]", playerName);
            this.els.opts.classList.add('hidden'); 
            this.els.dragDrop.classList.remove('hidden');
            this.renderDrag(q, answerHandler);
        }
        else {
            this.els.qTxt.innerText = q.questions.replace("[NAME]", playerName);
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
            // Exibe modal com a dica da questão nas cores do tópico atual.
            this.showAlert(`✗ Foco nos detalhes, ${playerName}...`, tip);
        }
    }

    showEndScreen(stats, playerName) {
        this.els.quizScreen.innerHTML = `
            <h2 style="font-family:'Cinzel'; color:gold;">🏆 JORNADA CONCLUÍDA: ${playerName}</h2>
            <p style="font-size:1.1rem;">Veja os pontos que merecem sua atenção para o futuro:</p>
            <div style="background:#000; padding:20px; border-radius:15px; text-align:left; border:1px solid var(--primary); max-height:300px; overflow-y:auto; margin-bottom:20px;">
                ${stats.mistakes.map(m => `<p style='font-size:0.95rem; border-bottom:1px solid #333; padding-bottom:10px;'><b>QUESTÃO:</b> ${m.q}<br><b style="color:var(--primary)">DICA DE MESTRE:</b> ${m.h}</p>`).join("") || "<p style='text-align:center; color:#2ecc71;'><b>VOCÊ FOI IMPECÁVEL! DOMÍNIO TOTAL DAS ERAS!</b></p>"}
            </div>
            <button class="opt-btn" style="width:300px; background:gold; color:#000; font-weight:bold; font-size:1.2rem;" onclick="location.reload()">REINICIAR JORNADA</button>
            <p style="margin-top:20px; font-size:0.8rem; opacity:0.7;">Professor Raphael Barreto | Firjan SENAI</p>
        `;
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
        // Gera partículas temporárias para feedback visual de acerto/conclusão.
        for (let i = 0; i < 40; i++) {
            const f = document.createElement('div'); f.className = 'firework';
            f.style.left = '50vw'; f.style.top = '50vh';
            f.style.setProperty('--tx', (Math.random() - 0.5) * window.innerWidth * 2 + 'px');
            f.style.setProperty('--ty', (Math.random() - 0.5) * window.innerHeight * 2 + 'px');
            f.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            document.body.appendChild(f);
            setTimeout(() => f.remove(), 1000);
        }
    }
}