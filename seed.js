const db = require('./database');

const users = [
    { email: 'admin@cutflow.com', password: 'adminpassword', license_type: 'Studio', next_billing_date: '2026-12-31', license_status: 'Actif' },
    { email: 'user@example.com', password: 'userpassword', license_type: 'Pro', next_billing_date: '2026-06-15', license_status: 'Actif' },
    { email: 'test@cutflow.fr', password: 'testpassword', license_type: 'Starter', next_billing_date: '2026-02-20', license_status: 'Actif' },
    { email: 'nolicense@cutflow.com', password: 'password', license_type: 'Aucune', next_billing_date: null, license_status: 'Inactif' }
];

const plugins = [
    { id: '1', name: 'Video Finder IA', category: 'IA', price: 'Gratuit', creator: 'Cutflow', description: 'Retrouvez n\'importe quelle vidéo à partir d\'un simple extrait grâce à la recherche web par IA.', longDescription: 'Ce plugin révolutionnaire utilise des algorithmes d\'apprentissage profond pour analyser les images d\'un extrait vidéo et effectuer une recherche inversée sur le web. Idéal pour retrouver des sources originales, vérifier des droits d\'auteur ou trouver des versions haute résolution d\'un clip.' },
    { id: '2', name: 'Auto-Color Grade', category: 'Image', price: '15€', creator: 'Cutflow', description: 'Étalonnage automatique basé sur des styles cinématographiques célèbres.', longDescription: 'Appliquez instantanément des looks professionnels à vos vidéos. Auto-Color Grade analyse l\'exposition et la balance des blancs de vos rushes pour appliquer la correction de couleur la plus adaptée selon le style choisi (Teal & Orange, Vintage, Noir & Blanc Pro, etc.).' },
    { id: '3', name: 'Smart Transitions', category: 'Effets', price: 'Gratuit', creator: 'Communauté', description: 'Pack de transitions fluides qui s\'adaptent au rythme de votre musique.', longDescription: 'Un ensemble de 50 transitions dynamiques créées par la communauté. Le plugin synchronise automatiquement le point de coupe avec les beats de votre piste audio pour un montage parfaitement rythmé.' },
    { id: '4', name: 'Voice Enhancer Pro', category: 'Audio', price: '29€', creator: 'Cutflow', description: 'Supprimez le bruit de fond et améliorez la clarté des voix instantanément.', longDescription: 'Utilisez la puissance de l\'IA pour isoler les voix humaines des bruits ambiants (vent, circulation, clim). Parfait pour les interviews réalisées dans des conditions difficiles. Inclut également un égaliseur automatique.' },
    { id: '5', name: 'Subtitle Generator', category: 'IA', price: 'Gratuit', creator: 'Communauté', description: 'Générez des sous-titres précis en plus de 50 langues.', longDescription: 'Gagnez un temps précieux grâce à la transcription automatique. Ce plugin détecte la parole, génère le texte avec les timecodes exacts et permet une édition rapide avant l\'exportation. Supporte plus de 50 langues et dialectes.' },
    { id: '6', name: 'Motion Graphics Pack', category: 'Graphisme', price: '19€', creator: 'Cutflow', description: 'Titres et tiers inférieurs animés personnalisables.', longDescription: 'Une collection de graphismes animés modernes et épurés. Changez les textes, les couleurs et les polices directement dans Cutflow. Idéal pour donner une touche professionnelle à vos vidéos YouTube ou présentations d\'entreprise.' },
    { id: '7', name: 'AI Slow Motion', category: 'IA', price: 'Gratuit', creator: 'Cutflow', description: 'Créez des ralentis ultra-fluides même à partir de vidéos 24 fps.', longDescription: 'Générez des images intermédiaires par IA pour transformer n\'importe quelle séquence en ralenti cinématographique sans saccades.' },
    { id: '8', name: 'Noise Gate Studio', category: 'Audio', price: '9€', creator: 'Communauté', description: 'Un noise gate précis pour nettoyer vos pistes voix.', longDescription: 'Éliminez le souffle et les bruits parasites entre les phrases pour un son studio professionnel.' },
    { id: '9', name: 'Vintage Film Look', category: 'Effets', price: '5€', creator: 'Communauté', description: 'Donnez un look de pellicule 16mm ou 35mm à vos vidéos.', longDescription: 'Simulez le grain, les poussières et les rayures des vieux films avec une fidélité incroyable.' },
    { id: '10', name: 'Face Blur IA', category: 'IA', price: 'Gratuit', creator: 'Cutflow', description: 'Floutez automatiquement les visages pour respecter la vie privée.', longDescription: 'Détecte et suit les visages dans vos vidéos pour appliquer un flou automatique, idéal pour les reportages ou les vidéos publiques.' },
    { id: '11', name: 'Scene Detector IA', category: 'IA', price: 'Gratuit', creator: 'Cutflow', description: 'Détecte automatiquement les changements de scènes.', longDescription: 'Analyse la structure visuelle de vos vidéos pour découper automatiquement les scènes et accélérer le montage.' },
    { id: '12', name: 'Auto Reframe', category: 'IA', price: 'Gratuit', creator: 'Cutflow', description: 'Adapte vos vidéos à tous les formats.', longDescription: 'Recadre intelligemment vos vidéos pour YouTube, Shorts, TikTok ou Instagram sans perdre les sujets importants.' },
    { id: '13', name: 'Emotion Detector', category: 'IA', price: '19€', creator: 'Cutflow', description: 'Analyse les émotions des visages.', longDescription: 'Identifie les émotions clés pour vous aider à sélectionner les meilleurs moments d’une interview ou d’un vlog.' },
    { id: '14', name: 'AI Cut Assistant', category: 'IA', price: 'Gratuit', creator: 'Cutflow', description: 'Coupe automatiquement les silences.', longDescription: 'Supprime les blancs, hésitations et silences pour un rythme dynamique.' },
    { id: '15', name: 'Object Tracker IA', category: 'IA', price: '29€', creator: 'Cutflow', description: 'Suit un objet dans toute la vidéo.', longDescription: 'Appliquez effets ou textes sur un objet en mouvement grâce au tracking IA.' },
    { id: '16', name: 'Auto Loudness', category: 'Audio', price: 'Gratuit', creator: 'Cutflow', description: 'Normalisation audio automatique.', longDescription: 'Respecte les normes LUFS pour YouTube et plateformes sociales.' },
    { id: '17', name: 'Podcast Enhancer', category: 'Audio', price: '15€', creator: 'Communauté', description: 'Optimisé pour podcasts vidéo.', longDescription: 'Améliore la voix, réduit la réverbération et équilibre les niveaux.' },
    { id: '18', name: 'Reverb Cleaner', category: 'Audio', price: '19€', creator: 'Cutflow', description: 'Supprime l’écho des pièces.', longDescription: 'Idéal pour les enregistrements réalisés dans des environnements non traités.' },
    { id: '19', name: 'Music Ducking Pro', category: 'Audio', price: '9€', creator: 'Communauté', description: 'Baisse la musique automatiquement sous la voix.', longDescription: 'Ajuste dynamiquement le volume musical pendant les dialogues.' },
    { id: '20', name: 'Bass Booster', category: 'Audio', price: '5€', creator: 'Communauté', description: 'Renforce les basses fréquences.', longDescription: 'Ajoute de la profondeur aux musiques et ambiances.' },
    { id: '21', name: 'HDR Booster', category: 'Image', price: '15€', creator: 'Cutflow', description: 'Améliore les vidéos HDR.', longDescription: 'Optimise la dynamique et les contrastes pour un rendu plus percutant.' },
    { id: '22', name: 'Skin Tone Corrector', category: 'Image', price: 'Gratuit', creator: 'Cutflow', description: 'Corrige automatiquement les tons de peau.', longDescription: 'Idéal pour interviews et vidéos face caméra.' },
    { id: '23', name: 'Sharpness Pro', category: 'Image', price: '9€', creator: 'Communauté', description: 'Amélioration intelligente de la netteté.', longDescription: 'Accentue les détails sans créer d’artefacts.' },
    { id: '24', name: 'Low Light Fix', category: 'Image', price: '19€', creator: 'Cutflow', description: 'Rattrape les vidéos filmées en basse lumière.', longDescription: 'Réduit le bruit et améliore la luminosité automatiquement.' },
    { id: '25', name: 'Glitch FX Pack', category: 'Effets', price: '5€', creator: 'Communauté', description: 'Effets glitch dynamiques.', longDescription: 'Parfait pour vidéos gaming ou techno.' },
    { id: '26', name: 'Cinematic Zoom', category: 'Effets', price: '9€', creator: 'Cutflow', description: 'Zooms cinématographiques animés.', longDescription: 'Ajoutez du mouvement sans caméra.' },
    { id: '27', name: 'Light Leaks', category: 'Effets', price: 'Gratuit', creator: 'Communauté', description: 'Fuites de lumière réalistes.', longDescription: 'Ajoutez une ambiance chaleureuse et artistique.' },
    { id: '28', name: 'Camera Shake', category: 'Effets', price: '5€', creator: 'Communauté', description: 'Simulation de tremblements caméra.', longDescription: 'Ajoute du réalisme aux scènes d’action.' },
    { id: '29', name: 'YouTube Title Pack', category: 'Graphisme', price: 'Gratuit', creator: 'Cutflow', description: 'Titres optimisés pour YouTube.', longDescription: 'Textes animés accrocheurs pour améliorer le taux de clic.' },
    { id: '30', name: 'Lower Thirds Clean', category: 'Graphisme', price: '9€', creator: 'Communauté', description: 'Tiers inférieurs minimalistes.', longDescription: 'Design sobre et moderne.' },
    { id: '31', name: 'Call To Action Pack', category: 'Graphisme', price: '5€', creator: 'Communauté', description: 'Animations Like / Subscribe.', longDescription: 'Boostez l’engagement de votre audience.' },
    { id: '32', name: 'Infographic Builder', category: 'Graphisme', price: '19€', creator: 'Cutflow', description: 'Graphiques animés intégrés.', longDescription: 'Créez des graphiques animés directement dans Cutflow.' },
    { id: '33', name: 'Auto Backup', category: 'Utilitaires', price: 'Gratuit', creator: 'Cutflow', description: 'Sauvegarde automatique des projets.', longDescription: 'Évite toute perte de données en cas de crash.' },
    { id: '34', name: 'Project Cleaner', category: 'Utilitaires', price: 'Gratuit', creator: 'Communauté', description: 'Nettoyage des fichiers inutiles.', longDescription: 'Supprime les médias non utilisés pour alléger les projets.' },
    { id: '35', name: 'Version Control', category: 'Utilitaires', price: '29€', creator: 'Cutflow', description: 'Gestion des versions de montage.', longDescription: 'Revenez facilement à une version précédente de votre projet.' },
    { id: '36', name: 'Cloud Sync', category: 'Utilitaires', price: '19€', creator: 'Cutflow', description: 'Synchronisation cloud.', longDescription: 'Travaillez sur vos projets depuis plusieurs appareils.' },
    { id: '37', name: 'YouTube SEO Helper', category: 'IA', price: 'Gratuit', creator: 'Communauté', description: 'Optimise titres et descriptions.', longDescription: 'Analyse les tendances pour améliorer la visibilité de vos vidéos.' },
    { id: '38', name: 'Shorts Generator', category: 'IA', price: 'Gratuit', creator: 'Cutflow', description: 'Crée automatiquement des shorts.', longDescription: 'Découpe les moments forts pour TikTok, Shorts et Reels.' },
    { id: '39', name: 'Thumbnail Maker', category: 'Graphisme', price: '9€', creator: 'Cutflow', description: 'Création de miniatures YouTube.', longDescription: 'Design rapide de thumbnails percutantes.' },
    { id: '40', name: 'Export Presets Pro', category: 'Utilitaires', price: 'Gratuit', creator: 'Cutflow', description: 'Presets d’export optimisés.', longDescription: 'Exports parfaits selon la plateforme cible.' }
];

const contacts = [
    { name: 'Jean Dupont', email: 'jean.dupont@gmail.com', subject: 'Question sur les tarifs', message: 'Bonjour, je souhaiterais en savoir plus sur l\'offre Studio.' },
    { name: 'Alice Martin', email: 'alice.martin@yahoo.fr', subject: 'Problème technique', message: 'Je n\'arrive pas à importer mes fichiers MP4.' },
    { name: 'Robert Smith', email: 'robert.smith@company.com', subject: 'Partenariat', message: 'Seriez-vous intéressés par un partenariat commercial ?' },
    { name: 'Testeur Cutflow', email: 'user@example.com', subject: 'Question sur l\'IA', message: 'Est-ce que le plugin Video Finder IA fonctionne avec des vidéos privées ?' },
    { name: 'Utilisateur No License', email: 'nolicense@cutflow.com', subject: 'Accès restreint', message: 'Pourquoi je ne peux pas télécharger le logiciel sans licence ?' }
];

db.serialize(() => {
    // Création des tables si elles n'existent pas (sécurité)
    db.run(`CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        subject TEXT NOT NULL,
        message TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
    
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        license_type TEXT DEFAULT 'Gratuit',
        license_status TEXT DEFAULT 'Actif',
        next_billing_date DATE,
        software_version TEXT DEFAULT '1.0.0'
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS plugins (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        price TEXT NOT NULL,
        creator TEXT NOT NULL,
        description TEXT NOT NULL,
        longDescription TEXT NOT NULL
    )`);

    // Insertion des comptes de test
    const userStmt = db.prepare('INSERT INTO users (email, password, license_type, next_billing_date, license_status) VALUES (?, ?, ?, ?, ?)');
    users.forEach(user => {
        userStmt.run(user.email, user.password, user.license_type, user.next_billing_date, user.license_status, (err) => {
            if (err) {
                if (err.message.includes('UNIQUE constraint failed')) {
                    // L'utilisateur existe déjà, on ignore proprement
                } else {
                    console.error(`Erreur lors de l'ajout de ${user.email}:`, err.message);
                }
            } else {
                console.log(`Utilisateur créé : ${user.email}`);
            }
        });
    });
    userStmt.finalize();

    // Remplissage du catalogue de plugins
    const pluginStmt = db.prepare('INSERT INTO plugins (id, name, category, price, creator, description, longDescription) VALUES (?, ?, ?, ?, ?, ?, ?)');
    plugins.forEach(plugin => {
        pluginStmt.run(plugin.id, plugin.name, plugin.category, plugin.price, plugin.creator, plugin.description, plugin.longDescription, (err) => {
            if (err) {
                // Probablement déjà présent
            }
        });
    });
    pluginStmt.finalize();

    // Ajout de quelques messages de contact pour peupler le dashboard
    const contactStmt = db.prepare('INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)');
    contacts.forEach(contact => {
        contactStmt.run(contact.name, contact.email, contact.subject, contact.message, (err) => {
            if (err) {
                console.error(`Erreur lors de l'ajout du message de ${contact.name}:`, err.message);
            } else {
                console.log(`Message ajouté pour : ${contact.name}`);
            }
        });
    });
    contactStmt.finalize();
});

// On laisse un petit délai pour s'assurer que SQLite a fini d'écrire
setTimeout(() => {
    console.log('--- Hydratation terminée avec succès ---');
    process.exit(0);
}, 2000);
