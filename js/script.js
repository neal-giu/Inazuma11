/* ================= DONNÉES DU JEU ================= */
const realSources = [
    { type: "📺", text: "Reportage France 3 : Windows 11 et l'alternative Libre", url: "https://video.echirolles.fr/w/hVykGUtRZqRen6eiutqRvQ" },
    { type: "📻", text: "France Inter : Obsolescence et Logiciel Libre", url: "https://www.radiofrance.fr/franceinter/podcasts/le-grand-reportage-de-france-inter/le-grand-reportage-du-mardi-14-octobre-2025-4136495" },
    { type: "🛠️", text: "La Forge des Communs Numériques (NIRD)", url: "https://nird.forge.apps.education.fr/" }
];

let scenarios = {};
let gameState = JSON.parse(localStorage.getItem('save')) || { budget: 2000, eco: 50, libre: 20, current: 'start', over: false, path: ['start'] };

/* ================= AMÉLIORATIONS AUDIOVISUELLES ================= */
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx;

function playSound(type = 'click') {
    if (isEco || !audioCtx) return; 

    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    if (type === 'click') {
        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(120, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
    } else if (type === 'choice') {
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(220, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
    }

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.3);
}

function initAudio() {
    if (!audioCtx) {
        try {
            audioCtx = new AudioContext();
        } catch(e) {
            console.error("Web Audio API is not supported in this browser.");
        }
    }
}
document.body.addEventListener('click', initAudio, { once: true });


/* ================= MOTEUR DE JEU ================= */
function updateDisplay() {
    localStorage.setItem('save', JSON.stringify(gameState));

    const budgetSpan = document.getElementById('score-budget');
    const ecoSpan = document.getElementById('score-eco');
    const libreSpan = document.getElementById('score-libre');

    const stats = { budget: budgetSpan, eco: ecoSpan, libre: libreSpan };
    for (const key in stats) {
        const span = stats[key];
        const newValue = gameState[key] + (key !== 'budget' ? '%' : '');
        if (span.innerText !== newValue) {
            span.classList.add('stat-updated');
            setTimeout(() => span.classList.remove('stat-updated'), 1000);
        }
    }

    budgetSpan.innerText = gameState.budget;
    ecoSpan.innerText = gameState.eco + "%";
    libreSpan.innerText = gameState.libre + "%";

    if (gameState.budget <= 0 && !gameState.over) return endGame("Faillite !");

    const scenar = scenarios[gameState.current];
    if (!scenar || scenar.choices.length === 0) {
        const endTitle = scenar ? scenar.title : "Mission Terminée !";
        const endDescription = scenar ? scenar.description : "";
        return endGame(endTitle, endDescription);
    }

    const scenarioCard = document.getElementById('scenario-card');
    scenarioCard.classList.remove('card-animated');
    void scenarioCard.offsetWidth; // Force reflow
    scenarioCard.classList.add('card-animated');

    document.getElementById('scenario-title').innerText = scenar.title;
    document.getElementById('scenario-description').innerText = scenar.description;
    const container = document.getElementById('choices-container');
    container.innerHTML = '';

    scenar.choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.innerHTML = `<strong>${choice.text}</strong><br><small>${choice.impactText}</small>`;
        if (choice.eco > 10) btn.className = 'choice-btn-sustainable';
        else if (choice.cost > 500) btn.className = 'choice-btn-expensive';
        else btn.className = 'choice-btn-neutral';

        btn.onclick = () => {
            playSound('choice');
            gameState.budget -= choice.cost;
            gameState.eco += choice.eco;
            gameState.libre += choice.libre;
            gameState.current = choice.next;
            if(!gameState.path.includes(choice.next)) {
                gameState.path.push(choice.next);
            }
            updateDisplay();
        };
        container.appendChild(btn);
    });
}

function endGame(title, description) {
    gameState.over = true;
    document.getElementById('scenario-card').classList.add('hidden');
    const endCard = document.getElementById('end-game-card');
    endCard.classList.remove('hidden');
    endCard.classList.add('card-animated');

    let resourcesHTML = `<div style="margin-top:20px;border-top:1px dashed #666;padding-top:10px"><h3>📚 Sources Réelles (Sujet NIRD) :</h3><ul style="list-style:none;padding:0">`;
    realSources.forEach(s => resourcesHTML += `<li style="margin-bottom:5px">${s.type} <a href="${s.url}" target="_blank" style="color:var(--neon-blue)">${s.text}</a></li>`);
    resourcesHTML += "</ul></div>";

    document.getElementById('end-game-message').innerHTML = `<strong>${title}</strong><br>${description}<br><br>Budget: ${gameState.budget} | Eco: ${gameState.eco}% | Libre: ${gameState.libre}%` + resourcesHTML;
    
    generateFlowchart();
    localStorage.removeItem('save');
}

document.getElementById('btn-reset-save').onclick = () => { playSound(); localStorage.removeItem('save'); location.reload(); };
document.getElementById('btn-end-reset').onclick = () => { playSound(); location.reload(); };

/* ================= DÉFI 482 : MODE ÉCO ================= */
const ecoBtn = document.getElementById('btn-eco-mode');
let isEco = localStorage.getItem('modeEco') === 'true';

function toggleMode() {
    isEco = !isEco;
    localStorage.setItem('modeEco', isEco);
    applyMode();
    playSound();
}

function applyMode() {
    if (isEco) {
        document.body.classList.add('eco-mode');
        ecoBtn.innerText = "⚡ Activer Design Néon";
    } else {
        document.body.classList.remove('eco-mode');
        ecoBtn.innerText = "🌸 Mode Éco";
    }
}
ecoBtn.onclick = toggleMode;

/* ================= DÉFI 514 : IA LOW-COST (FR / AR) ================= */
let currentLang = 'fr';
const botDictionary = {
    fr: {
        subtitle: "Assistant optimisé pour les zones à faible connexion.",
        placeholder: "Question (ex: CAF, Linux...)",
        btnAsk: "Demander",
        welcome: "Bonjour. Je suis une IA locale. Posez-moi une question sur les services publics ou le logiciel libre.",
        unknown: "Je ne connais pas ce service. Essayez : CAF, Impôts, Santé, Linux..."
    },
    ar: {
        subtitle: "المساعد الذكي الأمثل للمناطق ذات الاتصال الضعيف",
        placeholder: "سؤال (مثال: كاف، لينكس...)",
        btnAsk: "إرسال",
        welcome: "مرحباً. أنا ذكاء اصطناعي محلي. اسألني عن الخدمات العامة أو البرمجيات الحرة.",
        unknown: "لا أعرف هذه الخدمة. جرب: كاف، ضرائب، صحة، لينكس..."
    }
};
const botData = [
    { key: ["caf", "aide", "apl", "كاف", "مساعدة"], respFr: "🏛️ SERVICE PUBLIC - CAF :\nPas d'internet ? Utilisez les bornes interactives en mairie ou l'application mobile.", respAr: "🏛️ الخدمة العامة - كاف:\nلا يوجد إنترنت؟ استخدم المحطات التفاعلية في البلدية أو تطبيق الهاتف المحمول." },
    { key: ["linux", "windows", "لينكس", "ويندوز"], respFr: "🐧 LINUX :\nUn système libre qui prolonge la vie des ordinateurs de 5 à 10 ans.", respAr: "🐧 لينكس:\nنظام حر يطيل عمر أجهزة الكمبيوتر من 5 إلى 10 سنوات." },
    { key: ["libre", "open source", "حر", "مفتوح المصدر"], respFr: "✊ LOGICIEL LIBRE :\nGarantit l'indépendance de l'école et protège les données.", respAr: "✊ البرمجيات الحرة:\nتضمن استقلالية المدرسة وتحمي البيانات." },
    { key: ["nird", "responsable", "نيرد", "مسؤول"], respFr: "🌱 NIRD :\nNumérique Inclusif, Responsable et Durable.", respAr: "🌱 NIRD:\nرقمي شامل ومسؤول ومستدام." },
    { key: ["impot", "taxe", "ضرائب", "ضريبة"], respFr: "🏛️ IMPÔTS :\nLe formulaire papier 2042 est disponible sur demande.", respAr: "🏛️ الضرائب:\nنموذج الورق 2042 متاح عند الطلب." },
    { key: ["sante", "ameli", "vitale", "صحة", "تأمين"], respFr: "🏛️ SANTÉ / AMELI :\nEn zone blanche, mettez à jour votre carte vitale en pharmacie.", respAr: "🏛️ الصحة:\nفي المناطق المعزولة، قم بتحديث بطاقتك الصحية في الصيدلية." }
];

document.getElementById('btn-lang-switch').onclick = () => {
    playSound();
    currentLang = currentLang === 'fr' ? 'ar' : 'fr';
    const texts = botDictionary[currentLang];
    document.getElementById('ia-subtitle').innerText = texts.subtitle;
    document.getElementById('user-question').placeholder = texts.placeholder;
    document.getElementById('btn-ask-bot').innerText = texts.btnAsk;
    document.getElementById('bot-response').innerText = texts.welcome;
    document.getElementById('assistant-ia').style.direction = currentLang === 'ar' ? 'rtl' : 'ltr';
};

function levenshtein(a, b) {
    if (a.length === 0) return b.length; if (b.length === 0) return a.length;
    const matrix = Array.from(Array(b.length + 1), (_, i) => [i]);
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            const cost = b.charAt(i - 1) === a.charAt(j - 1) ? 0 : 1;
            matrix[i][j] = Math.min(matrix[i - 1][j - 1] + cost, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1);
        }
    }
    return matrix[b.length][a.length];
}

document.getElementById('btn-ask-bot').onclick = () => {
    playSound();
    const q = document.getElementById('user-question').value.toLowerCase().trim();
    if (!q) return;

    let best = null, minDid = 99;
    botData.forEach(d => {
        d.key.forEach(k => {
            if (q.includes(k)) { best = d; minDid = 0; }
            const dist = levenshtein(q, k);
            if (dist < 2 && k.length > 2 && dist < minDid) { minDid = dist; best = d; }
        });
    });

    const respBox = document.getElementById('bot-response');
    respBox.innerHTML = "<i>...</i>";
    setTimeout(() => {
        respBox.innerText = best ? (currentLang === 'fr' ? best.respFr : best.respAr) : botDictionary[currentLang].unknown;
    }, 400);
};

/* ================= DÉFI 508 : CONTRIBUTION RSE (Numih France) ================= */
document.getElementById('btn-rse-contrib').onclick = () => {
    playSound();
    const idea = prompt("💡 DÉFI RSE (Défi 508)\nProposez une idée éthique pour améliorer l'école :");
    if (idea) {
        alert("✅ Merci ! Votre proposition : \"" + idea + "\" a été enregistrée dans la démarche citoyenne de l'établissement.\n\nBonus : +10% de Cohésion Sociale !");
        gameState.libre = Math.min(100, gameState.libre + 10);
        updateDisplay();
    }
};

/* ================= DÉFI 509 : LASER GAME ================= */
const laserBtn = document.getElementById('btn-laser-game');
let laserScore = 0, laserInterval = null;
const targets = ['👾', '🍪', '☁️', '🤖', '👁️'];

laserBtn.onclick = () => {
    playSound();
    const area = document.getElementById('laser-game-area');
    area.classList.remove('hidden');
    laserScore = 0;
    area.innerHTML = `<h2 style="color:red;text-shadow:0 0 10px red">💥 NETTOYAGE NUMÉRIQUE 💥</h2><div style="font-size:2rem;margin-bottom:20px">Score: <span id="l-score">0</span></div><button id="l-quit" style="position:absolute;top:20px;right:20px;background:red;border:none;color:white;padding:10px;cursor:pointer;">QUITTER</button>`;
    
    document.getElementById('l-quit').onclick = () => {
        playSound();
        clearInterval(laserInterval);
        area.classList.add('hidden');
    };

    laserInterval = setInterval(() => {
        const el = document.createElement('div');
        el.innerText = targets[Math.floor(Math.random() * targets.length)];
        el.style.cssText = `position:absolute;font-size:3rem;cursor:crosshair;user-select:none;animation:popIn 0.3s;left:${Math.random()*90}%;top:${Math.random()*80+10}%;`;
        el.onmousedown = (e) => {
            e.stopPropagation();
            laserScore += 100;
            document.getElementById('l-score').innerText = laserScore;
            el.innerText = "💥";
            if (audioCtx) {
                const o = audioCtx.createOscillator();
                o.type = 'square';
                o.frequency.value = 150;
                o.connect(audioCtx.destination);
                o.start();
                o.stop(audioCtx.currentTime + 0.1);
            }
            setTimeout(() => el.remove(), 200);
        };
        area.appendChild(el);
        setTimeout(() => { if(el.parentElement) el.remove(); }, 1500);
    }, 700);
};

/* ================= DÉFI 488 : GREEN IT BADGE ================= */
window.addEventListener('load', () => {
    const domCount = document.getElementsByTagName('*').length;
    const weight = document.documentElement.innerHTML.length / 1024;
    const badge = document.createElement('div');
    badge.style.cssText = "margin-top:20px;display:inline-block;padding:5px 10px;border:1px dashed var(--neon-green);color:var(--neon-green);font-family:monospace;font-size:0.8rem";
    badge.innerHTML = `📊 AUDIT GREEN IT : DOM=${domCount} | Poids=~${weight.toFixed(1)} KB`;
    document.querySelector('footer').appendChild(badge);
});

/* ================= ARBRE DE VISUALISATION ================= */
function generateFlowchart() {
    const container = document.getElementById('flowchart-container');
    container.innerHTML = '<h2>Arbre de votre parcours</h2>';
    container.classList.remove('hidden');

    const nodes = {};
    const edges = [];

    // Créer tous les nœuds
    for (const key in scenarios) {
        nodes[key] = { id: key, label: scenarios[key].title, visited: gameState.path.includes(key) };
        if (scenarios[key].choices) {
            scenarios[key].choices.forEach(choice => {
                edges.push({ from: key, to: choice.next });
            });
        }
    }

    // Construire l'arbre HTML
    const buildBranch = (nodeId, level = 0) => {
        const node = nodes[nodeId];
        if (!node) return '';

        let html = `<div class="flow-node-container" style="margin-left: ${level * 20}px;">`;
        html += `<div class="flow-node ${node.visited ? 'visited' : ''}">${node.label}</div>`;
        
        const children = edges.filter(edge => edge.from === nodeId);
        if (children.length > 0) {
            html += '<div class="flow-branch">';
            children.forEach(childEdge => {
                html += buildBranch(childEdge.to, level + 1);
            });
            html += '</div>';
        }
        html += `</div>`;
        return html;
    };

    container.innerHTML += buildBranch('start');
}


async function init() {
    // Réinitialiser le path si c'est une nouvelle partie
    if (!localStorage.getItem('save')) {
        gameState.path = ['start'];
    }

    await fetch('js/story.json')
        .then(response => response.json())
        .then(data => {
            scenarios = data;
        });
    applyMode();
    updateDisplay();
}

window.addEventListener('DOMContentLoaded', init);