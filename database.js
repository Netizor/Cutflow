const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// --- Initialisation de la base de données SQLite ---
const dbPath = path.join(__dirname, 'data', 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Impossible de se connecter à SQLite :', err.message);
    } else {
        console.log('Connexion réussie à la base de données SQLite.');
        db.serialize(() => {
            // Table pour stocker les messages du formulaire de contact
            db.run(`CREATE TABLE IF NOT EXISTS contacts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                subject TEXT NOT NULL,
                message TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )`);
            
            // Table des utilisateurs et de leurs licences
            db.run(`CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                license_type TEXT DEFAULT 'Gratuit',
                license_status TEXT DEFAULT 'Actif',
                next_billing_date DATE,
                software_version TEXT DEFAULT '1.0.0'
            )`);

            // Catalogue des plugins disponibles
            db.run(`CREATE TABLE IF NOT EXISTS plugins (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                category TEXT NOT NULL,
                price TEXT NOT NULL,
                creator TEXT NOT NULL,
                description TEXT NOT NULL,
                longDescription TEXT NOT NULL
            )`);
        });
    }
});

module.exports = db;
