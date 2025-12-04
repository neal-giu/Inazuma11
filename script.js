/* =========================================
   DONNÉES DU JEU (Les Scénarios)
   Basés sur les documents "Sujet 2025" et "NIRD"
   ========================================= */
const scenarios = [
    {
        title: "Le choc de l'obsolescence",
        description: "Alerte ! Microsoft annonce la fin du support de Windows 10. Vos 200 PC d'école, pourtant fonctionnels, deviennent 'obsolètes' et vulnérables. La mairie panique.",
        choices: [
            {
                text: "Solution facile : Acheter 200 nouveaux PC sous Windows 11.",
                impactText: "Coût énorme, désastre écologique. Mais c'est facile...",
                cost: 1500, // Coût élevé
                ecoImpact: -30, // Grosse pollution
                libreImpact: -10 // Renforcement de la dépendance
            },
            {
                text: "La voie Résistante : Installer Linux Mint sur les PC existants.",
                impactText: "Gratuit, prolonge la vie du matériel de 5 ans. Nécessite un peu de formation.",
                cost: 100, // Juste un peu de temps/formation
                ecoImpact: +40, // Excellent pour la planète
                libreImpact: +30 // Vive la liberté !
            }
        ]
    },
    {
        title: "L'offre empoisonnée du Géant",
        description: "Un GAFAM propose d'équiper gratuitement toutes les classes avec ses tablettes et sa suite logicielle Cloud. 'C'est gratuit pour l'éducation !', disent-ils.",
        choices: [
            {
                text: "Accepter le cadeau. C'est gratuit, pourquoi refuser ?",
                impactText: "C'est gratuit car vos élèves sont le produit. Leurs données partent aux USA.",
                cost: 0,
                ecoImpact: -10, //(Matériel neuf non nécessaire)
                    libreImpact: -40 // Dépendance totale
                    },
                    {
                        text: "Refuser et utiliser 'La Forge' (outils libres de l'Éducation Nationale).",
                            impactText: "Protection des données garantie et souveraineté numérique.",
                        cost: 50, // Un peu de configuration
                        ecoImpact: 0,
                        libreImpact: +30
                    }
                    ]
                    },
    {
        title: "Le Projecteur 'Intelligent'",
        description: "Pour 'moderniser' les salles, on vous propose un vidéoprojecteur 'intelligent' avec OS intégré et assistant vocal. Il est plus cher et sa durée de vie est limitée par son logiciel.",
        choices: [
            {
                text: "Acheter ce projecteur 'smart'. C'est tendance !",
                impactText: "Cher, collecte des données, et sera obsolète dans 3 ans. Pas très 'smart'.",
                cost: 600,
                ecoImpact: -15,
                libreImpact: -10
            },
            {
                text: "Acheter un projecteur 'idiot' et y brancher un nano-ordinateur avec un OS libre.",
                impactText: "Moins cher, durable, réparable et ne vous espionne pas. La vraie intelligence !",
                cost: 300,
                ecoImpact: +10,
                libreImpact: +15
            }
        ]
    },
    {
        title: "Le Site Web de l'École",
        description: "Une grosse entreprise propose de refaire 'gratuitement' le site de l'école avec leur outil facile. En échange : des publicités et l'analyse des données des visiteurs.",
        choices: [
            {
                text: "Accepter l'offre 'gratuite'. C'est simple et sans effort.",
                impactText: "Le site sera lent, plein de pubs et vos visiteurs seront pistés. L'image de l'école en prend un coup.",
                cost: 0,
                ecoImpact: -5,
                libreImpact: -20
            },
            {
                text: "Garder le site actuel, hébergé localement, et former un enseignant.",
                impactText: "Vous gardez le contrôle, soutenez l'économie locale et protégez vos visiteurs.",
                cost: 150, // Coût de la formation
                ecoImpact: +5,
                libreImpact: +20
            }
        ]
    },
    {
        title: "La Formation des Enseignants",
        description: "Un géant du logiciel offre une journée de formation 'gratuite' à vos enseignants sur sa suite bureautique. L'inspection académique vous y incite fortement.",
        choices: [
            {
                text: "Accepter. C'est une formation gratuite et validée par la hiérarchie.",
                impactText: "Les enseignants ne connaîtront que cet écosystème et y deviendront dépendants.",
                cost: 0,
                ecoImpact: 0,
                libreImpact: -25
            },
            {
                text: "Refuser et financer une formation aux outils libres et souverains (La Forge, etc.).",
                impactText: "Un investissement pour une compétence durable et une vraie souveraineté numérique.",
                cost: 400,
                ecoImpact: +5,
                libreImpact: +25
            }
        ]
    },
                    {
                        title: "Sobriété vs Gaspillage",
                            description: "Le conseil d'école veut 'moderniser' l'image de l'établissement en installant des écrans 4K connectés dans le hall d'entrée qui tourneront 24h/24.",
                        choices: [
                        {
                            text: "Installer les écrans pour faire 'moderne'.",
                            impactText: "Grosse consommation électrique inutile.",
                            cost: 800,
                            ecoImpact: -25,
                            libreImpact: 0
                        },
                        {
                            text: "Refuser : Sensibiliser à la sobriété numérique.",
                            impactText: "L'argent est mieux investi dans des projets pédagogiques.",
                            cost: 0,
                            ecoImpact: +15,
                            libreImpact: +5
                        }
                    ]
                    },
                    // Ajoute d'autres scénarios ici si tu veux !
                    ];

/* =========================================
   MOTEUR DU JEU
   ========================================= */
// État initial (ou chargé depuis le localStorage pour le défi "Web sans traces")
let gameState = JSON.parse(localStorage.getItem('resistClasseSave')) || {
    budget: 2000, // Budget de départ
    eco: 50,      // Jauge moyenne
    libre: 20,    // Jauge faible au début
    currentIndex: 0, // A quel scénario sommes-nous ?
    isGameOver: false
};

// Éléments du DOM
const els = {
    budget: document.getElementById('score-budget'),
    eco: document.getElementById('score-eco'),
    libre: document.getElementById('score-libre'),
    scenarioCard: document.getElementById('scenario-card'),
    scenarioTitle: document.getElementById('scenario-title'),
    scenarioDesc: document.getElementById('scenario-description'),
    choicesContainer: document.getElementById('choices-container'),
    endGameCard: document.getElementById('end-game-card'),
    endGameMessage: document.getElementById('end-game-message'),
    btnResetSave: document.getElementById('btn-reset-save')
};

// Fonction principale : Mettre à jour l'affichage
function updateDisplay() {
    // Sauvegarde automatique (localStorage)
    localStorage.setItem('resistClasseSave', JSON.stringify(gameState));

    // Mise à jour des stats avec animation couleur
    animateValue(els.budget, gameState.budget);
    animateValue(els.eco, gameState.eco, true); // true = borné 0-100
    animateValue(els.libre, gameState.libre, true);

    // Vérifier condition de défaite (faillite)
    if (gameState.budget <= 0 && !gameState.isGameOver) {
        endGame(false, "Faillite ! Vous n'avez plus de budget. L'école est privatisée par Goliath Corp.");
        return;
    }

    // Charger le scénario ou la fin du jeu
    if (gameState.currentIndex < scenarios.length) {
        loadScenario(gameState.currentIndex);
    } else {
        endGame(true, "Félicitations ! Vous avez traversé la crise. Votre école est désormais un modèle de résistance numérique NIRD.");
    }
}

// Charger un scénario spécifique
function loadScenario(index) {
    const scenario = scenarios[index];
    els.scenarioTitle.innerText = `Scénario ${index + 1}/${scenarios.length} : ${scenario.title}`;
    els.scenarioDesc.innerText = scenario.description;

    // Vider les anciens choix
    els.choicesContainer.innerHTML = '';

    // Créer les nouveaux boutons
    scenario.choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.innerHTML = `<strong>${choice.text}</strong><br><small>${choice.impactText}</small>`;

        // Style du bouton selon l'impact
        if (choice.ecoImpact > 0 && choice.libreImpact > 0) btn.classList.add('choice-btn-sustainable');
        else if (choice.cost > 500 || choice.ecoImpact < -20) btn.classList.add('choice-btn-expensive');
        else btn.classList.add('choice-btn-neutral');

        // Action au clic
        btn.onclick = () => makeChoice(choice);
        els.choicesContainer.appendChild(btn);
    });

    els.scenarioCard.classList.remove('hidden');
    els.endGameCard.classList.add('hidden');
}

// Gérer un choix utilisateur
function makeChoice(choiceData) {
    gameState.budget -= choiceData.cost;
    gameState.eco += choiceData.ecoImpact;
    gameState.libre += choiceData.libreImpact;

    // Borner les jauges entre 0 et 100
    gameState.eco = Math.min(100, Math.max(0, gameState.eco));
    gameState.libre = Math.min(100, Math.max(0, gameState.libre));

    gameState.currentIndex++;
    updateDisplay();
}

// Gérer la fin du jeu
function endGame(isVictory, message) {
    gameState.isGameOver = true;
    els.scenarioCard.classList.add('hidden');
    els.endGameCard.classList.remove('hidden');
    els.endGameMessage.innerText = message + `\n\nScore Final :\nBudget : ${gameState.budget}€\nÉcologie : ${gameState.eco}%\nLiberté : ${gameState.libre}%`;
    localStorage.removeItem('resistClasseSave'); // On nettoie à la fin
}

// Recommencer le jeu
function resetGame() {
    localStorage.removeItem('resistClasseSave');
    location.reload();
}

// Petit utilitaire pour animer les chiffres (UX sympa)
function animateValue(element, value, isPercentage = false) {
    const current = parseInt(element.innerText);
    if (current !== value) {
        element.style.color = value > current ? 'var(--accent-green)' : 'var(--accent-red)';
        setTimeout(() => element.style.color = 'inherit', 500);
    }
    element.innerText = value;
}

els.btnResetSave.onclick = resetGame;


/* =========================================
   IA LOW-COST (Défi IA Bilingue) - VERSION AMÉLIORÉE
   ========================================= */
let currentLang = 'fr';
let lastTopic = null; // "Micro-mémoire" pour le contexte

const botKnowledge = {
    fr: {
        "linux": { response: "Linux est un système d'exploitation libre et gratuit. C'est la meilleure arme contre l'obsolescence programmée car il tourne très bien sur de vieux PC !", related: ["windows", "libre"] },
        "windows": { response: "Windows 10 ne sera bientôt plus supporté. Cela force à jeter des millions d'ordinateurs fonctionnels. C'est un désastre écologique.", related: ["linux", "obsolescence"] },
        "obsolescence": { response: "L'obsolescence programmée est une stratégie d'entreprise pour qu'un produit devienne inutile après un certain temps, forçant son remplacement. Le logiciel libre combat cela.", related: ["linux", "nird"] },
        "libre": { response: "Un logiciel 'Libre' garantit 4 libertés : utiliser, étudier, modifier et redistribuer le logiciel. C'est l'opposé des logiciels propriétaires comme Windows ou MacOS.", related: ["rgpd", "forge"] },
        "nird": { response: "NIRD signifie Numérique Inclusif, Responsable et Durable. C'est la démarche que ce jeu promeut pour une technologie plus éthique et durable.", related: ["libre", "obsolescence"] },
        "google": { response: "Attention aux offres gratuites des GAFAM (Google, Apple...). Si c'est gratuit, c'est souvent que vos données personnelles (et celles des élèves) sont le vrai produit.", related: ["rgpd", "libre"] },
        "rgpd": { response: "Le RGPD est le règlement européen sur la protection des données. Il garantit que vos données sont protégées. Les solutions américaines posent souvent problème de compatibilité.", related: ["google", "libre"] },
        "forge": { response: "La 'Forge des communs numériques éducatifs' est une initiative pour créer et partager des outils libres et souverains pour l'école, comme une alternative aux GAFAM.", related: ["libre", "nird"] },
        "caf": { response: "Pour la CAF, préparez vos documents (avis d'imposition, RIB) et allez sur CAF.fr. Si c'est compliqué, vous pouvez prendre RDV dans un point d'accueil France Services.", related: ["mairie"] },
        "mairie": { response: "Pour la mairie (carte d'identité, passeport), il faut souvent prendre RDV en ligne sur le site de votre ville. Préparez bien les documents demandés avant d'y aller.", related: ["caf"] },
        "bonjour": { response: "Bonjour ! Je suis prêt à vous aider dans votre résistance numérique.", related: ["linux", "nird"] },
        "default": { response: "Je suis une IA très sobre et je n'ai pas compris. Essayez une question sur l'un de ces sujets : Linux, RGPD, NIRD, Mairie, CAF, Obsolescence.", related: ["linux", "rgpd", "nird"] }
    },
    ar: {
        "linux": { response: "لينكس نظام تشغيل حر ومجاني. إنه أفضل سلاح ضد التقادم المبرمج لأنه يعمل جيدًا على أجهزة الكمبيوتر القديمة!", related: ["windows", "libre"] },
        "windows": { response: "سيتم إيقاف دعم Windows 10 قريبًا. هذا يجبر على التخلص من ملايين أجهزة الكمبيوتر الصالحة للاستعمال. إنها كارثة بيئية.", related: ["linux", "obsolescence"] },
        "obsolescence": { response: "التقادم المبرمج هو استراتيجية شركة لجعل المنتج غير صالح للاستخدام بعد فترة معينة، مما يفرض استبداله. البرمجيات الحرة تحارب ذلك.", related: ["linux", "nird"] },
        "libre": { response: "يضمن برنامج 'Libre' 4 حريات: استخدام البرنامج ودراسته وتعديله وإعادة توزيعه. وهو عكس البرامج الاحتكارية مثل Windows أو MacOS.", related: ["rgpd", "forge"] },
        "nird": { response: "NIRD تعني رقمية شاملة ومسؤولة ومستدامة. هذا هو النهج الذي تروج له هذه اللعبة من أجل تقنية أكثر أخلاقية واستدامة.", related: ["libre", "obsolescence"] },
        "google": { response: "احذر من العروض المجانية من GAFAM (Google ، Apple ...). إذا كان مجانيًا، فغالبًا ما تكون بياناتك الشخصية (وبيانات الطلاب) هي المنتج الحقيقي.", related: ["rgpd", "libre"] },
        "rgpd": { response: "GDPR هي اللائحة الأوروبية لحماية البيانات. وتضمن حماية بياناتك. غالبًا ما تثير الحلول الأمريكية مشاكل التوافق.", related: ["google", "libre"] },
        "forge": { response: "'La Forge' هي مبادرة لإنشاء ومشاركة أدوات مجانية وذات سيادة للمدرسة، كبديل لـ GAFAM.", related: ["libre", "nird"] },
        "caf": { response: "بالنسبة لـ CAF، قم بإعداد مستنداتك (إشعار ضريبي، RIB) واذهب إلى CAF.fr. إذا كان الأمر معقدًا، يمكنك تحديد موعد في نقطة استقبال France Services.", related: ["mairie"] },
        "mairie": { response: "بالنسبة للبلدية (بطاقة الهوية، جواز السفر)، غالبًا ما تحتاج إلى تحديد موعد عبر الإنترنت على موقع مدينتك. قم بإعداد المستندات المطلوبة جيدًا قبل الذهاب.", related: ["caf"] },
        "bonjour": { response: "مرحبا! أنا مستعد لمساعدتك في مقاومتك الرقمية.", related: ["linux", "nird"] },
        "default": { response: "أنا ذكاء اصطناعي بسيط، لم أفهم. جرب سؤالاً حول أحد هذه المواضيع: لينكس، GDPR، NIRD، البلدية، CAF، التقادم.", related: ["linux", "rgpd", "nird"] }
    }
};

const uiStrings = {
    fr: {
        placeholder: "Posez une question (ex: CAF, Linux...)",
        greeting: "Bonjour ! Je suis une IA sobre qui tourne localement. Posez-moi une question sur Linux, la CAF ou la Mairie !",
        suggestionTitle: "Sujets liés :"
    },
    ar: {
        placeholder: "اطرح سؤالاً (مثال: كاف، لينكس...)",
        greeting: "مرحبا! أنا ذكاء اصطناعي بسيط يعمل محليًا. اطرح عليّ سؤالاً عن لينكس، CAF أو البلدية!",
        suggestionTitle: "مواضيع ذات صلة:"
    }
};

const botInput = document.getElementById('user-question');
const botBtn = document.getElementById('btn-ask-bot');
const botResponse = document.getElementById('bot-response');
const botSuggestions = document.getElementById('bot-suggestions');
const btnLangSwitch = document.getElementById('btn-lang-switch');

function switchLanguage() {
    currentLang = (currentLang === 'fr') ? 'ar' : 'fr';
    const isRTL = currentLang === 'ar';
    const dir = isRTL ? 'rtl' : 'ltr';

    botInput.placeholder = uiStrings[currentLang].placeholder;
    botResponse.innerText = uiStrings[currentLang].greeting;
    botSuggestions.innerHTML = '';
    
    botInput.dir = dir;
    botResponse.dir = dir;
    botSuggestions.dir = dir;
    botResponse.lang = currentLang;
}

function askBot(questionText) {
    const question = (questionText || botInput.value).toLowerCase();
    if (!question) return;

    const knowledge = botKnowledge[currentLang];
    let foundTopics = [];
    let relatedTopics = new Set();

    // 1. Recherche de mots-clés multiples
    for (let key in knowledge) {
        if (key !== 'default' && question.includes(key)) {
            foundTopics.push(knowledge[key]);
            knowledge[key].related.forEach(topic => relatedTopics.add(topic));
            lastTopic = key; // Mémorise le dernier sujet principal trouvé
        }
    }

    let finalResponse;
    if (foundTopics.length > 0) {
        // 2. Combinaison des réponses
        finalResponse = foundTopics.map(t => t.response).join('\n\n');
    } else if (lastTopic && (question.includes('pourquoi') || question.includes('comment'))) {
        // 3. Gestion du contexte (micro-mémoire)
        finalResponse = `Reformulez votre question sur "${lastTopic}", s'il vous plaît. Je suis une IA simple !`;
    } else {
        // 4. Réponse par défaut améliorée
        finalResponse = knowledge.default.response;
        knowledge.default.related.forEach(topic => relatedTopics.add(topic));
        lastTopic = null;
    }

    botResponse.innerText = finalResponse;
    botResponse.style.animation = "none";
    void botResponse.offsetWidth; // Force reflow
    botResponse.style.animation = "fadeIn 0.5s";

    // 5. Affichage des suggestions
    displaySuggestions(Array.from(relatedTopics));
    botInput.value = ''; // Vider l'input après la question
}

function displaySuggestions(topics) {
    botSuggestions.innerHTML = '';
    if (topics.length === 0) return;

    const title = document.createElement('p');
    title.innerText = uiStrings[currentLang].suggestionTitle;
    botSuggestions.appendChild(title);

    topics.forEach(topicKey => {
        const btn = document.createElement('button');
        btn.innerText = topicKey;
        btn.className = 'suggestion-btn';
        btn.onclick = () => {
            botInput.value = topicKey;
            askBot(topicKey);
        };
        botSuggestions.appendChild(btn);
    });
}

function initBot() {
    const lang = uiStrings[currentLang];
    botInput.placeholder = lang.placeholder;
    botResponse.innerText = lang.greeting;
    botSuggestions.innerHTML = '';
}

// Écouteurs pour l'IA
botBtn.onclick = () => askBot();
btnLangSwitch.onclick = switchLanguage;
botInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault(); // Empêche le rechargement de la page si le bouton est dans un formulaire
        askBot();
    }
});

// --- LANCEMENT DU JEU AU DÉMARRAGE ---
updateDisplay();
initBot();
