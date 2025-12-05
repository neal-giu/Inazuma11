/**
 * =================================================================
 * DÉFI 514 : IA LOW-COST (FR / AR)
 * Isolé dans son propre module pour une meilleure maintenabilité.
 * =================================================================
 */
function initializeIA() {
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
        { key: ["caf", "aide", "apl", "كاف", "مساعدة"], respFr: "🏛️ SERVICE PUBLIC - CAF :\nPas d'internet ? Utilisez les bornes interactives en mairie ou l'application mobile.", respAr: "🏛️ الخدمة العامة - كاف:\nلا يوجد إنترنت؟ استخدم المحطات التفاعلية في البلدية أو تطبيق الهاتف المحمول." },
        { key: ["linux", "windows", "لينكس", "ويندوز"], respFr: "🐧 LINUX :\nUn système libre qui prolonge la vie des ordinateurs de 5 à 10 ans.", respAr: "🐧 لينكس:\nنظام حر يطيل عمر أجهزة الكمبيوتر من 5 إلى 10 سنوات." },
        { key: ["libre", "open source", "حر", "مفتوح المصدر"], respFr: "✊ LOGICIEL LIBRE :\nGarantit l'indépendance de l'école et protège les données.", respAr: "✊ البرمجيات الحرة:\nتضمن استقلالية المدرسة وتحمي البيانات." },
        { key: ["nird", "responsable", "نيرد", "مسؤول"], respFr: "🌱 NIRD :\nNumérique Inclusif, Responsable et Durable.", respAr: "🌱 NIRD:\nرقمي شامل ومسؤول ومستدام." },
        { key: ["impot", "taxe", "ضرائب", "ضريبة"], respFr: "🏛️ IMPÔTS :\nLe formulaire papier 2042 est disponible sur demande.", respAr: "🏛️ الضرائب:\nنموذج الورق 2042 متاح عند الطلب." },
        { key: ["sante", "ameli", "vitale", "صحة", "تأمين"], respFr: "🏛️ SANTÉ / AMELI :\nEn zone blanche, mettez à jour votre carte vitale en pharmacie.", respAr: "🏛️ الصحة:\nفي المناطق المعزولة، قم بتحديث بطاقتك الصحية في الصيدلية." }
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
        for (let i = 0; i <= b.length; i++) { matrix[i] = [i]; }
        for (let j = 0; j <= a.length; j++) { matrix[0][j] = j; }
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
        if (!q) return;

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
            if (best) {
                respBox.innerText = currentLang === 'fr' ? best.respFr : best.respAr;
            } else {
                respBox.innerText = texts.unknown;
            }
        }, 400);
    };
}

initializeIA();