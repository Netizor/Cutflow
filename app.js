const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuration d'EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// --- Configuration du serveur et des middlewares ---
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'cutflow-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Utiliser secure: true en production avec HTTPS
}));

// Injection de l'utilisateur dans les variables locales des vues
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

// Protection des routes nécessitant une connexion
const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/connexion?error=Veuillez vous connecter pour accéder à cette page');
    }
};

// --- Définition des routes (Endpoints) ---

// Gestion des abonnements
app.post('/annuler-abonnement', isAuthenticated, (req, res) => {
    const userId = req.session.user.id;
    const stmt = db.prepare('UPDATE users SET license_status = "Inactif", license_type = "Aucune", next_billing_date = NULL WHERE id = ?');
    stmt.run(userId, (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).send("Erreur lors de l'annulation de l'abonnement.");
        } else {
            // Mise à jour immédiate de la session pour refléter les changements
            req.session.user.license_status = 'Inactif';
            req.session.user.license_type = 'Aucune';
            req.session.user.next_billing_date = null;
            res.redirect('/dashboard?success=Abonnement annulé avec succès');
        }
    });
    stmt.finalize();
});

app.post('/supprimer-compte', isAuthenticated, (req, res) => {
    const userId = req.session.user.id;
    const stmt = db.prepare('DELETE FROM users WHERE id = ?');
    stmt.run(userId, (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).send("Erreur lors de la suppression du compte.");
        } else {
            req.session.destroy();
            res.redirect('/?success=Compte supprimé');
        }
    });
    stmt.finalize();
});

app.get('/', (req, res) => {
    res.render('index', { title: 'Accueil - Cutflow', success: req.query.success });
});

app.get('/produit', (req, res) => {
    res.render('produit', { title: 'Produit - Cutflow' });
});

app.get('/tarifs', (req, res) => {
    res.render('tarifs', { title: 'Tarifs - Cutflow' });
});

app.get('/expose', (req, res) => {
    res.render('expose', { title: 'Exposé - Cutflow' });
});

app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact - Cutflow', success: req.query.success });
});

app.post('/contact', (req, res) => {
    const { name, email, subject, message, rgpd } = req.body;
    if (rgpd) {
        const stmt = db.prepare('INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)');
        stmt.run(name, email, subject, message, (err) => {
            if (err) {
                console.error(err.message);
                res.status(500).send("Erreur lors de l'envoi du message.");
            } else {
                res.redirect('/contact?success=true');
            }
        });
        stmt.finalize();
    } else {
        res.status(400).send("Vous devez accepter la politique de confidentialité.");
    }
});

app.get('/connexion', (req, res) => {
    if (req.session.user) {
        return res.redirect('/dashboard');
    }
    res.render('connexion', { title: 'Connexion - Cutflow', error: req.query.error });
});

app.get('/inscription', (req, res) => {
    if (req.session.user) {
        return res.redirect('/dashboard');
    }
    res.render('inscription', { title: 'Inscription - Cutflow', error: req.query.error });
});

app.post('/inscription', (req, res) => {
    const { email, password, 'confirm-password': confirmPassword, rgpd } = req.body;

    // Validation simple des champs obligatoires
    if (!rgpd) {
        return res.redirect('/inscription?error=Vous devez accepter les conditions');
    }

    if (password !== confirmPassword) {
        return res.redirect('/inscription?error=Les mots de passe ne correspondent pas');
    }

    // On s'assure que le compte n'existe pas déjà
    const checkStmt = db.prepare('SELECT id FROM users WHERE email = ?');
    checkStmt.get(email, (err, row) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send("Erreur lors de l'inscription.");
        }
        if (row) {
            return res.redirect('/inscription?error=Cet email est déjà utilisé');
        }

        // Création du nouvel utilisateur (période d'essai par défaut)
        const stmt = db.prepare('INSERT INTO users (email, password, next_billing_date) VALUES (?, ?, ?)');
        const nextBilling = new Date();
        nextBilling.setMonth(nextBilling.getMonth() + 1); // +1 mois
        const nextBillingStr = nextBilling.toISOString().split('T')[0];

        stmt.run(email, password, nextBillingStr, function(err) {
            if (err) {
                console.error(err.message);
                res.status(500).send("Erreur lors de l'inscription.");
            } else {
                // Connexion automatique après la création du compte
                req.session.user = {
                    id: this.lastID,
                    email: email,
                    license_type: 'Gratuit',
                    license_status: 'Actif',
                    next_billing_date: nextBillingStr,
                    software_version: '1.0.0'
                };
                res.redirect('/dashboard');
            }
        });
        stmt.finalize();
    });
    checkStmt.finalize();
});

app.post('/connexion', (req, res) => {
    const { email, password } = req.body;
    const stmt = db.prepare('SELECT * FROM users WHERE email = ? AND password = ?');
    stmt.get(email, password, (err, row) => {
        if (err) {
            console.error(err.message);
            res.status(500).send("Erreur lors de la connexion.");
        } else if (row) {
            req.session.user = {
                id: row.id,
                email: row.email,
                license_type: row.license_type,
                license_status: row.license_status,
                next_billing_date: row.next_billing_date,
                software_version: row.software_version
            };
            res.redirect('/dashboard');
        } else {
            res.redirect('/connexion?error=Identifiants incorrects');
        }
    });
    stmt.finalize();
});

app.get('/faq', (req, res) => {
    res.render('faq', { title: 'FAQ - Cutflow' });
});

app.get('/dashboard', isAuthenticated, (req, res) => {
    db.all('SELECT * FROM contacts WHERE email = ? ORDER BY created_at DESC LIMIT 3', [req.session.user.email], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.render('dashboard', { title: 'Tableau de bord - Cutflow', user: req.session.user, success: req.query.success, contacts: [] });
        } else {
            res.render('dashboard', { title: 'Tableau de bord - Cutflow', user: req.session.user, success: req.query.success, contacts: rows });
        }
    });
});

app.get('/plugins', (req, res) => {
    db.all('SELECT * FROM plugins', (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send("Erreur lors de la récupération des plugins.");
        } else {
            res.render('plugins', { title: 'Bibliothèque de Plugins - Cutflow', plugins: rows });
        }
    });
});

app.get('/deconnexion', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

app.get('/legal/:page', (req, res) => {
    const page = req.params.page;
    const titles = {
        'mentions-legales': 'Mentions Légales',
        'confidentialite': 'Politique de Confidentialité',
        'cookies': 'Politique de Cookies',
        'cgu': 'CGU',
        'cgv': 'CGV'
    };
    if (titles[page]) {
        res.render('legal', { title: titles[page], page: page });
    } else {
        res.status(404).render('404', { title: 'Page non trouvée' });
    }
});

// --- Fin du routage ---

// Catch-all pour les pages non trouvées
app.use((req, res) => {
    res.status(404).render('404', { title: 'Page non trouvée' });
});

app.listen(PORT, () => {
    console.log(`Le serveur Cutflow est prêt : http://localhost:${PORT}`);
});
