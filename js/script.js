/* ================= DONNÉES DU JEU ================= */
const realSources = [
    { type: "📺", text: "Reportage France 3 : Windows 11 et l'alternative Libre", url: "https://video.echirolles.fr/w/hVykGUtRZqRen6eiutqRvQ" },
    { type: "📻", text: "France Inter : Obsolescence et Logiciel Libre", url: "https://www.radiofrance.fr/franceinter/podcasts/le-grand-reportage-de-france-inter/le-grand-reportage-du-mardi-14-octobre-2025-4136495" },
    { type: "🛠️", text: "La Forge des Communs Numériques (NIRD)", url: "https://nird.forge.apps.education.fr/" }
];

const scenarios = {
    'start': {
        title: "Le Choc de l'Obsolescence",
        description: "Microsoft arrête le support de Windows 10. Vos 200 PC deviennent obsolètes.",
        choices: [
            { text: "Acheter 200 PC Windows 11", impactText: "Coût: 1500€ | Écologie: -30", cost: 1500, eco: -30, libre: -10, next: 'gafam' },
            { text: "Installer Linux Mint", impactText: "Coût: 100€ | Écologie: +40", cost: 100, eco: 40, libre: 30, next: 'linux_party' }
        ]
    },
    'gafam': {
        title: "L'Offre Empoisonnée",
        description: "Goliath Corp offre des tablettes gratuites en échange des données élèves.",
        choices: [
            { text: "Accepter (C'est gratuit !)", impactText: "Liberté: -40 | Vie privée: 0", cost: 0, eco: -10, libre: -40, next: 'panne' },
            { text: "Refuser et résister", impactText: "On garde nos vieux PC.", cost: 0, eco: 10, libre: 20, next: 'linux_party' }
        ]
    },
    'linux_party': {
        title: "L'Install Party",
        description: "Les parents veulent apprendre à installer Linux chez eux.",
        choices: [
            { text: "Organiser l'atelier", impactText: "Cohésion sociale maximale.", cost: 50, eco: 10, libre: 20, next: 'site_web' },
            { text: "Pas le temps", impactText: "Occasion manquée.", cost: 0, eco: 0, libre: -5, next: 'site_web' }
        ]
    },
    'panne': {
        title: "Panne Mondiale",
        description: "Le cloud est en panne. Plus personne ne peut travailler.",
        choices: [
            { text: "Attendre...", impactText: "Impuissance totale.", cost: 0, eco: 0, libre: -10, next: 'site_web' },
            { text: "Monter un serveur local", impactText: "Difficile mais formateur.", cost: 200, eco: 5, libre: 15, next: 'site_web' }
        ]
    },
    'site_web': {
        title: "Le Site de l'École",
        description: "Il faut refaire le site web. Quelle technologie choisir ?",
        choices: [
            { text: "Un CMS lourd (Wordpress + Plugins)", impactText: "Facile mais énergivore.", cost: 100, eco: -20, libre: 0, next: 'end' },
            { text: "Site statique léger (HTML/CSS)", impactText: "Green IT validé (Défi 488) !", cost: 200, eco: 20, libre: 10, next: 'end' }
        ]
    }
};

let gameState = JSON.parse(localStorage.getItem('save')) || { budget: 2000, eco: 50, libre: 20, current: 'start', over: false };

/* ================= MOTEUR DE JEU ================= */
function updateDisplay() {
    localStorage.setItem('save', JSON.stringify(gameState));
    document.getElementById('score-budget').innerText = gameState.budget;
    document.getElementById('score-eco').innerText = gameState.eco + "%";
    document.getElementById('score-libre').innerText = gameState.libre + "%";

    if (gameState.budget <= 0 && !gameState.over) return endGame(false, "Faillite !");

    const scenar = scenarios[gameState.current];
    if (!scenar || gameState.current === 'end') return endGame(true, "Mission Terminée !");

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
            gameState.budget -= choice.cost;
            gameState.eco += choice.eco;
            gameState.libre += choice.libre;
            gameState.current = choice.next;
            updateDisplay();
        };
        container.appendChild(btn);
    });
}

function endGame(victory, msg) {
    gameState.over = true;
    document.getElementById('scenario-card').classList.add('hidden');
    document.getElementById('end-game-card').classList.remove('hidden');

    let resourcesHTML = `<div style="margin-top:20px;border-top:1px dashed #666;padding-top:10px"><h3>📚 Sources Réelles (Sujet NIRD) :</h3><ul style="list-style:none;padding:0">`;
    realSources.forEach(s => resourcesHTML += `<li style="margin-bottom:5px">${s.type} <a href="${s.url}" target="_blank" style="color:var(--neon-blue)">${s.text}</a></li>`);
    resourcesHTML += "</ul></div>";

    document.getElementById('end-game-message').innerHTML = `<strong>${msg}</strong><br>Budget: ${gameState.budget} | Eco: ${gameState.eco}% | Libre: ${gameState.libre}%` + resourcesHTML;
    localStorage.removeItem('save');
}

document.getElementById('btn-reset-save').onclick = () => { localStorage.removeItem('save'); location.reload(); };
document.getElementById('btn-end-reset').onclick = () => location.reload();

/* ================= DÉFI 482 : MODE ÉCO ================= */
const ecoBtn = document.getElementById('btn-eco-mode');
let isEco = localStorage.getItem('modeEco') === 'true';

function toggleMode() {
    isEco = !isEco;
    localStorage.setItem('modeEco', isEco);
    applyMode();
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
applyMode();

/* ================= DÉFI 514 : IA LOW-COST (FR / AR) ================= */
// État de la langue
let currentLang = 'fr';

// Dictionnaire bilingue
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
    {
        key: ["caf", "aide", "apl", "كاف", "مساعدة"],
        respFr: "🏛️ SERVICE PUBLIC - CAF :\nPas d'internet ? Utilisez les bornes interactives en mairie ou l'application mobile.",
        respAr: "🏛️ الخدمة العامة - كاف:\nلا يوجد إنترنت؟ استخدم المحطات التفاعلية في البلدية أو تطبيق الهاتف المحمول."
    },
    {
        key: ["linux", "windows", "لينكس", "ويندوز"],
        respFr: "🐧 LINUX :\nUn système libre qui prolonge la vie des ordinateurs de 5 à 10 ans.",
        respAr: "🐧 لينكس:\nنظام حر يطيل عمر أجهزة الكمبيوتر من 5 إلى 10 سنوات."
    },
    {
        key: ["libre", "open source", "حر", "مفتوح المصدر"],
        respFr: "✊ LOGICIEL LIBRE :\nGarantit l'indépendance de l'école et protège les données.",
        respAr: "✊ البرمجيات الحرة:\nتضمن استقلالية المدرسة وتحمي البيانات."
    },
    {
        key: ["nird", "responsable", "نيرد", "مسؤول"],
        respFr: "🌱 NIRD :\nNumérique Inclusif, Responsable et Durable.",
        respAr: "🌱 NIRD:\nرقمي شامل ومسؤول ومستدام."
    },
    {
        key: ["impot", "taxe", "ضرائب", "ضريبة"],
        respFr: "🏛️ IMPÔTS :\nLe formulaire papier 2042 est disponible sur demande.",
        respAr: "🏛️ الضرائب:\nنموذج الورق 2042 متاح عند الطلب."
    },
    {
        key: ["sante", "ameli", "vitale", "صحة", "تأمين"],
        respFr: "🏛️ SANTÉ / AMELI :\nEn zone blanche, mettez à jour votre carte vitale en pharmacie.",
        respAr: "🏛️ الصحة:\nفي المناطق المعزولة، قم بتحديث بطاقتك الصحية في الصيدلية."
    }
];

// Fonction de bascule langue
document.getElementById('btn-lang-switch').onclick = () => {
    currentLang = currentLang === 'fr' ? 'ar' : 'fr';
    const texts = botDictionary[currentLang];

    document.getElementById('ia-subtitle').innerText = texts.subtitle;
    document.getElementById('user-question').placeholder = texts.placeholder;
    document.getElementById('btn-ask-bot').innerText = texts.btnAsk;
    document.getElementById('bot-response').innerText = texts.welcome;

    // Direction du texte (RTL pour Arabe)
    document.getElementById('assistant-ia').style.direction = currentLang === 'ar' ? 'rtl' : 'ltr';
};

// Fuzzy Logic (Offline)
function levenshtein(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
    const matrix = [];
    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1);
            }
        }
    }
    return matrix[b.length][a.length];
}

document.getElementById('btn-ask-bot').onclick = () => {
    const q = document.getElementById('user-question').value.toLowerCase().trim();
    if(!q) return;

    let best = null;
    let minDid = 99;

    botData.forEach(d => {
        d.key.forEach(k => {
            if (q.includes(k)) { best = d; minDid = 0; }
            const dist = levenshtein(q, k);
            if (dist < 2 && k.length > 2 && dist < minDid) { minDid = dist; best = d; }
        });
    });

    const respBox = document.getElementById('bot-response');
    const texts = botDictionary[currentLang];

    respBox.innerHTML = "<i>...</i>";
    setTimeout(() => {
        if(best) {
            respBox.innerText = currentLang === 'fr' ? best.respFr : best.respAr;
        } else {
            respBox.innerText = texts.unknown;
        }
    }, 400);
};

/* ================= DÉFI 508 : CONTRIBUTION RSE (Numih France) ================= */
// On permet à l'utilisateur de "Contribuer" (RSE by Design)
document.getElementById('btn-rse-contrib').onclick = () => {
    const idea = prompt("💡 DÉFI RSE (Défi 508)\nProposez une idée éthique pour améliorer l'école :");
    if (idea) {
        alert("✅ Merci ! Votre proposition : \"" + idea + "\" a été enregistrée dans la démarche citoyenne de l'établissement.\n\nBonus : +10% de Cohésion Sociale !");
        gameState.libre += 10; // Récompense in-game
        gameState.libre = Math.min(100, gameState.libre);
        updateDisplay();
    }
};

/* ================= DÉFI 509 : LASER GAME ================= */
const laserBtn = document.getElementById('btn-laser-game');
let laserScore = 0;
let laserInterval = null;
const targets = ['👾', '🍪', '☁️', '🤖', '👁️'];

laserBtn.onclick = () => {
    const area = document.getElementById('laser-game-area');
    area.classList.remove('hidden');
    laserScore = 0;

    area.innerHTML = `
        <h2 style="color:red;text-shadow:0 0 10px red">💥 NETTOYAGE NUMÉRIQUE 💥</h2>
        <div style="font-size:2rem;margin-bottom:20px">Score: <span id="l-score">0</span></div>
        <button id="l-quit" style="position:absolute;top:20px;right:20px;background:red;border:none;color:white;padding:10px;cursor:pointer;">QUITTER</button>
    `;

    document.getElementById('l-quit').onclick = () => {
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
            const AudioContext = window.AudioContext || window['webkitAudioContext'];
            if (AudioContext) {
                const ac = new AudioContext();
                const o = ac.createOscillator();
                o.type = 'square';
                o.frequency.value = 150;
                o.connect(ac.destination);
                o.start();
                o.stop(ac.currentTime + 0.1);
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

updateDisplay();