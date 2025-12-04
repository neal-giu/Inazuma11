/* =========================================
   DONNÉES DU JEU (Les Scénarios)
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
                ecoImpact: -10,
                libreImpact: -40
            },
            {
                text: "Refuser et utiliser 'La Forge' (outils libres de l'Éducation Nationale).",
                impactText: "Protection des données garantie et souveraineté numérique.",
                cost: 50,
                ecoImpact: 0,
                libreImpact: +30
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
        title: "La 'Gamification' Obsessive",
        description: "Un éditeur privé vous propose un système d'évaluation des élèves 'gamifié' : des quiz ultra-rapides, chronométrés et classés en temps réel. Leur slogan : 'Rendre l'apprentissage addictif !'",
        choices: [
            {
                text: "Option A : Adopter ce système stimulant.",
                impactText: "Les élèves s'habituent à être surveillés et jugés en permanence. Forte dépendance au fournisseur.",
                cost: 200, // Coût modéré
                ecoImpact: -5, // Serveurs tournent H24
                libreImpact: -25 // Perte de souveraineté pédagogique
            },
            {
                text: "Option B : Refuser, privilégier l'évaluation formative et créer une simulation de 'Laser Game Éthique' pour décompresser.",
                impactText: "Défense d'une pédagogie saine. Tester votre rapidité pour la liberté : **JOUER AU LASER GAME**",
                cost: 0,
                ecoImpact: +10,
                libreImpact: +15,
                requiresMinigame: 'laser-game' // 🚨 Déclencheur du mini-jeu
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
    }
];

/* =========================================
   MOTEUR DU JEU & ÉTAT
   ========================================= */
let gameState = JSON.parse(localStorage.getItem('resistClasseSave')) || {
    budget: 2000, // Budget de départ
    eco: 50,      // Jauge moyenne
    libre: 20,    // Jauge faible au début
    currentIndex: 0, // A quel scénario sommes-nous ?
    isGameOver: false
};

// Éléments du DOM (mis à jour pour inclure la zone du mini-jeu)
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
    btnResetSave: document.getElementById('btn-reset-save'),
    // NOUVEAU : Zone du Laser Game
    laserGameArea: document.getElementById('laser-game-area')
};

// Fonction utilitaire pour animer les chiffres
function animateValue(element, value, isPercentage = false) {
    const current = parseInt(element.innerText);
    if (current !== value) {
        // Supposons que vous avez des variables CSS --accent-green/red définies
        element.style.color = value > current ? 'green' : 'red';
        setTimeout(() => element.style.color = 'inherit', 500);
    }
    // Afficher la valeur (avec ou sans %)
    element.innerText = isPercentage ? `${value}%` : value;
}

// Fonction principale : Mettre à jour l'affichage
function updateDisplay() {
    // 1. Sauvegarde automatique
    localStorage.setItem('resistClasseSave', JSON.stringify(gameState));

    // 2. Mise à jour des stats
    animateValue(els.budget, gameState.budget);
    animateValue(els.eco, gameState.eco, true);
    animateValue(els.libre, gameState.libre, true);

    // 3. Vérifier condition de défaite (faillite)
    if (gameState.budget <= 0 && !gameState.isGameOver) {
        endGame(false, "Faillite ! Vous n'avez plus de budget. L'école est privatisée par Goliath Corp.");
        return;
    }

    // 4. Charger le scénario ou la fin du jeu
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

    els.choicesContainer.innerHTML = '';

    scenario.choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.innerHTML = `<strong>${choice.text}</strong><br><small>${choice.impactText}</small>`;

        // Style du bouton selon l'impact
        if (choice.ecoImpact > 0 && choice.libreImpact > 0) btn.classList.add('choice-btn-sustainable');
        else if (choice.cost > 500 || choice.ecoImpact < -20) btn.classList.add('choice-btn-expensive');
        else btn.classList.add('choice-btn-neutral');

        // Action au clic (on passe le choix ET le scénario)
        btn.onclick = () => makeChoice(choice, scenario);
        els.choicesContainer.appendChild(btn);
    });

    // S'assurer que la carte du scénario est visible
    els.scenarioCard.classList.remove('hidden');
    els.endGameCard.classList.add('hidden');
    els.laserGameArea.classList.add('hidden'); // S'assurer que le mini-jeu est masqué
}

// Gérer un choix utilisateur
function makeChoice(choiceData, scenarioData) {
    // 🚨 Logique spécifique pour le Mini-Jeu
    if (choiceData.requiresMinigame === 'laser-game') {
        const baseImpact = {
            ecoImpact: choiceData.ecoImpact,
            libreImpact: choiceData.libreImpact,
            cost: choiceData.cost // Pour appliquer le coût même si le mini-jeu est réussi/raté
        };
        // Lancement du mini-jeu
        launchLaserGame(baseImpact);
        return; // Stoppe le makeChoice, la fonction de fin de mini-jeu prend le relais
    }

    // --- Logique normale de makeChoice ---
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
    els.laserGameArea.classList.add('hidden'); // S'assurer que le mini-jeu est masqué
    els.endGameCard.classList.remove('hidden');
    els.endGameMessage.innerText = message + `\n\nScore Final :\nBudget : ${gameState.budget}€\nÉcologie : ${gameState.eco}%\nLiberté : ${gameState.libre}%`;
    localStorage.removeItem('resistClasseSave'); // On nettoie à la fin
}

// Recommencer le jeu
function resetGame() {
    localStorage.removeItem('resistClasseSave');
    location.reload();
}

els.btnResetSave.onclick = resetGame;


/* =========================================
   MOTEUR DU MINI-JEU LASER GAME
   ========================================= */

// Fonction utilitaire pour appliquer l'impact après le mini-jeu
function applyImpact(baseImpact, multiplier) {
    // Appliquer le coût (même s'il est de 0 dans le scénario actuel)
    gameState.budget -= baseImpact.cost;

    // Appliquer l'impact (Éco et Libre) multiplié par le résultat
    gameState.eco += Math.round(baseImpact.ecoImpact * multiplier);
    gameState.libre += Math.round(baseImpact.libreImpact * multiplier);

    // Borner les jauges
    gameState.eco = Math.min(100, Math.max(0, gameState.eco));
    gameState.libre = Math.min(100, Math.max(0, gameState.libre));
}


function launchLaserGame(baseImpact) {
    els.scenarioCard.classList.add('hidden'); // Masquer la carte de scénario principale
    els.laserGameArea.classList.remove('hidden'); // Afficher la zone de jeu du laser game

    let gameScore = 0;
    const targetsToHit = 10; // Le nombre de cibles à toucher pour réussir
    const gameDuration = 10; // 10 secondes pour le défi

    // Ajout des styles et du contenu de base
    els.laserGameArea.innerHTML = `
        <h2>Défense Éthique : Tirez sur ${targetsToHit} cibles en ${gameDuration}s !</h2>
        <div id="minigame-score">Score : 0</div>
        <div id="minigame-timer">Temps : ${gameDuration}</div>
    `;

    // Récupération des éléments après injection dans le DOM
    const minigameScoreEl = document.getElementById('minigame-score');
    const minigameTimerEl = document.getElementById('minigame-timer');
    let targetsGenerated = [];
    let timer;
    let targetInterval;

    // Fonction de fin (appelée par le timer ou par la victoire rapide)
    function finishLaserGame() {
        clearInterval(targetInterval);
        clearInterval(timer);
        targetsGenerated.forEach(t => t.remove()); // Nettoyer les cibles restantes

        els.laserGameArea.classList.add('hidden'); // Masquer le mini-jeu

        // Appliquer l'impact en fonction de la réussite
        let message, multiplier;
        if (gameScore >= targetsToHit) {
            multiplier = 1.0;
            message = `Succès ! Vous avez touché ${gameScore} cibles. La pédagogie libre est sécurisée.`;
        } else {
            multiplier = 0.2;
            message = `Échec ! Seulement ${gameScore} cibles touchées. Vous avez perdu du terrain.`;
        }

        alert(message);
        applyImpact(baseImpact, multiplier);

        // Passer au scénario suivant
        gameState.currentIndex++;
        gameState.isGameOver = false;
        updateDisplay(); // Retour à l'affichage principal
    }

    // Fonction de création de cible
    function createMinigameTarget() {
        const target = document.createElement('div');
        target.classList.add('target');

        // Position aléatoire dans la zone de jeu
// ...
        // Définir la position aléatoire (comme dans votre code initial)
        const size = 40;
        target.style.width = target.style.height = `${size}px`;
        target.style.left = `${Math.random() * (els.laserGameArea.clientWidth - size)}px`; // 🚨 Problème ici !
        target.style.top = `${Math.random() * (els.laserGameArea.clientHeight - size)}px`; // 🚨 Problème ici !
        // ...

        target.onclick = function(e) {
            e.stopPropagation();
            gameScore++;
            minigameScoreEl.innerText = `Score : ${gameScore}`;
            target.remove();

            if (gameScore >= targetsToHit) {
                finishLaserGame();
            }
        };

        els.laserGameArea.appendChild(target);
        targetsGenerated.push(target);

        // La cible disparaît après 1.5s
        setTimeout(() => {
            if (els.laserGameArea.contains(target)) {
                target.remove();
            }
        }, 1500);
    }

    // Démarrage du jeu
    let timeLeft = gameDuration;
    minigameTimerEl.innerText = `Temps : ${timeLeft}`;

    // Lancement du timer
    timer = setInterval(() => {
        timeLeft--;
        minigameTimerEl.innerText = `Temps : ${timeLeft}`;
        if (timeLeft <= 0) {
            finishLaserGame();
        }
    }, 1000);

    // Lancement de la génération de cibles
    targetInterval = setInterval(createMinigameTarget, 500); // Une cible toutes les 0.5s
}


/* =========================================
   IA LOW-COST (Système expert)
   ========================================= */
const botKnowledge = {
    "linux": "Linux est un système d'exploitation libre et gratuit. C'est la meilleure arme contre l'obsolescence programmée car il tourne très bien sur de vieux PC !",
    "windows": "Windows 10 ne sera bientôt plus supporté. Cela force à jeter des millions d'ordinateurs fonctionnels. C'est un désastre écologique.",
    "libre": "Un logiciel 'Libre' garantit 4 libertés : utiliser, étudier, modifier et redistribuer le logiciel. C'est l'opposé des logiciels propriétaires (comme Microsoft Office).",
    "nird": "NIRD signifie Numérique Inclusif, Responsable et Durable. C'est la démarche que nous devons adopter !",
    "google": "Attention aux offres gratuites des GAFAM. Si c'est gratuit, vos données (et celles des élèves) sont le produit.",
    "rgpd": "Le RGPD protège les données personnelles. Les solutions américaines (Google, Microsoft) posent souvent problème vis-à-vis du RGPD.",
    "forge": "La 'Forge des communs numériques éducatifs' est une initiative pour créer et partager des outils libres pour l'école, sans dépendre des géants privés.",
    "bonjour": "Bonjour ! Je suis prêt à vous aider dans votre résistance numérique.",
    "default": "Je suis une IA très sobre, je n'ai pas compris ce mot. Essayez 'Linux', 'Libre', ou 'Windows'."
};

const botInput = document.getElementById('user-question');
const botBtn = document.getElementById('btn-ask-bot');
const botResponse = document.getElementById('bot-response');

function askBot() {
    const question = botInput.value.toLowerCase();
    let response = botKnowledge.default;

    for (let key in botKnowledge) {
        if (question.includes(key) && key !== 'default') {
            response = botKnowledge[key];
            break;
        }
    }

    botResponse.innerText = response;
    // Supposons que vous ayez une petite animation CSS appelée "fadeIn"
    botResponse.style.animation = "none";
    setTimeout(() => botResponse.style.animation = "fadeIn 0.5s", 10);
}

// Écouteurs pour l'IA
if (botBtn) botBtn.onclick = askBot;
if (botInput) botInput.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') askBot();
});

/* =========================================
   LANCEMENT DU JEU
   ========================================= */
// Démarre l'interface principale
updateDisplay();