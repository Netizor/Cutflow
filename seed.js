const db = require('./database');

const users = [
    { email: 'admin@cutflow.com', password: 'adminpassword' },
    { email: 'user@example.com', password: 'userpassword' },
    { email: 'test@cutflow.fr', password: 'testpassword' }
];

const contacts = [
    { name: 'Jean Dupont', email: 'jean.dupont@gmail.com', subject: 'Question sur les tarifs', message: 'Bonjour, je souhaiterais en savoir plus sur l\'offre Studio.' },
    { name: 'Alice Martin', email: 'alice.martin@yahoo.fr', subject: 'Problème technique', message: 'Je n\'arrive pas à importer mes fichiers MP4.' },
    { name: 'Robert Smith', email: 'robert.smith@company.com', subject: 'Partenariat', message: 'Seriez-vous intéressés par un partenariat commercial ?' }
];

db.serialize(() => {
    // Nettoyage optionnel (à commenter si on veut garder les données existantes)
    // db.run('DELETE FROM users');
    // db.run('DELETE FROM contacts');

    const userStmt = db.prepare('INSERT INTO users (email, password) VALUES (?, ?)');
    users.forEach(user => {
        userStmt.run(user.email, user.password, (err) => {
            if (err) {
                if (err.message.includes('UNIQUE constraint failed')) {
                    console.log(`Utilisateur ${user.email} existe déjà.`);
                } else {
                    console.error(`Erreur lors de l'insertion de l'utilisateur ${user.email}:`, err.message);
                }
            } else {
                console.log(`Utilisateur ${user.email} ajouté.`);
            }
        });
    });
    userStmt.finalize();

    const contactStmt = db.prepare('INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)');
    contacts.forEach(contact => {
        contactStmt.run(contact.name, contact.email, contact.subject, contact.message, (err) => {
            if (err) {
                console.error(`Erreur lors de l'insertion du contact ${contact.name}:`, err.message);
            } else {
                console.log(`Contact ${contact.name} ajouté.`);
            }
        });
    });
    contactStmt.finalize();
});

// Ne pas fermer la bdd ici car db est partagé et exporté depuis database.js qui peut être utilisé ailleurs
// Mais pour un script indépendant, on pourrait vouloir fermer après un délai
setTimeout(() => {
    console.log('Hydratation terminée.');
    process.exit(0);
}, 2000);
