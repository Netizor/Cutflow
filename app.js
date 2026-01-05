const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuration d'EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.render('index', { title: 'Accueil - Cutflow' });
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
    res.render('connexion', { title: 'Connexion - Cutflow', error: req.query.error });
});

app.post('/connexion', (req, res) => {
    const { email, password } = req.body;
    const stmt = db.prepare('SELECT * FROM users WHERE email = ? AND password = ?');
    stmt.get(email, password, (err, row) => {
        if (err) {
            console.error(err.message);
            res.status(500).send("Erreur lors de la connexion.");
        } else if (row) {
            // Dans un vrai projet, on utiliserait des sessions ou des tokens
            res.send(`<h1>Bienvenue, ${row.email} !</h1><p>Connexion réussie.</p><a href="/">Retour à l'accueil</a>`);
        } else {
            res.redirect('/connexion?error=Identifiants incorrects');
        }
    });
    stmt.finalize();
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

// Gestion des erreurs 404
app.use((req, res) => {
    res.status(404).render('404', { title: 'Page non trouvée' });
});

app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
