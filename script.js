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
        title: "La Cantine Connectée",
        description: "Une startup propose de 'moderniser' la cantine avec un système de paiement et de réservation par badge RFID, lié à une application mobile pour les parents.",
        choices: [
            {
                text: "Adopter la solution. C'est pratique pour suivre les consommations.",
                impactText: "Les données alimentaires des enfants sont stockées sur un cloud privé. Des frais de service s'appliquent.",
                cost: 200,
                ecoImpact: -5,
                libreImpact: -15
            },
            {
                text: "Développer un système simple avec des cartes et un tableur partagé en interne.",
                impactText: "C'est moins 'sexy', mais les données restent à l'école et ça ne coûte rien.",
                cost: 20,
                ecoImpact: +5,
                libreImpact: +10
            }
        ]
    },
    {
        title: "Le Fossé Numérique",
        description: "Plusieurs élèves n'ont pas d'ordinateur à la maison. Une fondation partenaire d'un GAFAM propose des tablettes reconditionnées, mais verrouillées sur leur écosystème.",
        choices: [
            {
                text: "Accepter les tablettes. C'est mieux que rien pour ces élèves.",
                impactText: "Les élèves sont enfermés dans un écosystème et leurs données sont collectées.",
                cost: 0,
                ecoImpact: +5, // Reconditionné
                libreImpact: -20
            },
            {
                text: "Lancer un atelier de reconditionnement de PC avec une association locale.",
                impactText: "Formateur pour les élèves, promeut l'économie circulaire et installe des systèmes libres.",
                cost: 250, // Achat de pièces
                ecoImpact: +25,
                libreImpact: +20
            }
        ]
    },
    {
        title: "Les Caméras de Surveillance",
        description: "Suite à des dégradations mineures, des parents d'élèves demandent l'installation de caméras de surveillance 'intelligentes' dans les couloirs et la cour.",
        choices: [
            {
                text: "Installer les caméras cloud avec IA. La sécurité avant tout.",
                impactText: "L'école devient un lieu de surveillance. Les données sont analysées par des algorithmes opaques.",
                cost: 1200,
                ecoImpact: -10,
                libreImpact: -35
            },
            {
                text: "Refuser et lancer un dialogue avec élèves et parents sur le respect du lieu.",
                impactText: "Privilégier l'humain et l'éducation à la surveillance technologique. C'est un pari sur la confiance.",
                cost: 0,
                ecoImpact: +10,
                libreImpact: +15
            }
        ]
    },
    {
        title: "La Plateforme de Communication",
        description: "Pour faciliter la communication entre enseignants, parents et élèves, on vous suggère d'adopter une plateforme 'tout-en-un' très populaire, mais propriétaire.",
        choices: [
            {
                text: "Adopter la plateforme populaire. Tout le monde l'utilise déjà.",
                impactText: "Les conversations, notes et données des élèves sont hébergées et analysées par un tiers.",
                cost: 300, // Coût de licence annuel
                ecoImpact: -5,
                libreImpact: -20
            },
            {
                text: "Mettre en place un serveur auto-hébergé avec une solution libre comme Matrix ou Nextcloud.",
                impactText: "Contrôle total des données, pas de frais de licence, mais demande une petite maintenance.",
                cost: 100, // Coût du matériel/serveur
                ecoImpact: +5,
                libreImpact: +25
            }
        ]
    },
    {
        title: "Le Logiciel Éducatif",
        description: "Un nouvel outil d'apprentissage des langues fait fureur. Il est basé sur un abonnement mensuel par élève et utilise l'IA pour 'personnaliser' les parcours.",
        choices: [
            {
                text: "Souscrire à l'abonnement pour tous les élèves. Il faut être à la pointe !",
                impactText: "Très cher à long terme. Les progrès des élèves sont une mine d'or pour l'entreprise.",
                cost: 500,
                ecoImpact: -5,
                libreImpact: -15
            },
            {
                text: "Utiliser des applications libres et gratuites (comme Anki, Moodle) et former les enseignants.",
                impactText: "Moins de 'paillettes', mais tout aussi efficace et respectueux des données.",
                cost: 50, // Temps de formation
                ecoImpact: +10,
                libreImpact: +15
            }
        ]
    },
    {
        title: "Réparation et Maintenance",
        description: "Plusieurs ordinateurs de la salle informatique sont en panne. Le fabricant propose un devis de réparation exorbitant, presque le prix du neuf.",
        choices: [
            {
                text: "Payer le fabricant pour les réparations. C'est la procédure standard.",
                impactText: "Le coût est élevé et cela renforce le monopole du fabricant sur la réparation.",
                cost: 700,
                ecoImpact: -10,
                libreImpact: -10
            },
            {
                text: "Créer un 'Repair Café' à l'école avec des parents et des associations locales.",
                impactText: "Pédagogique, économique, et crée du lien social. Vive la débrouille !",
                cost: 100, // Achat de composants
                ecoImpact: +20,
                libreImpact: +10
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
    element.innerText = value + (isPercentage ? '%' : '');
}

els.btnResetSave.onclick = resetGame;


/* =========================================
   IA LOW-COST (Défi IA)
   Système expert simple basé sur des mots-clés.
   Ne consomme quasi rien en ressources.
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

    // Recherche de mots-clés simple
    for (let key in botKnowledge) {
        if (question.includes(key) && key !== 'default') {
            response = botKnowledge[key];
            break;
        }
    }

    botResponse.innerText = response;
    botResponse.style.animation = "none";
    setTimeout(() => botResponse.style.animation = "fadeIn 0.5s", 10); // Petite animation
}

// Écouteurs pour l'IA
botBtn.onclick = askBot;
botInput.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') askBot();
});

// --- LANCEMENT DU JEU AU DÉMARRAGE ---
updateDisplay();