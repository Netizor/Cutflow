# Cutflow - Logiciel de Montage Vidéo Professionnel

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D%2014.0.0-brightgreen)](https://nodejs.org/)
[![Framework](https://img.shields.io/badge/framework-Express-blue)](https://expressjs.com/)
[![Database](https://img.shields.io/badge/database-SQLite-003b57)](https://www.sqlite.org/)
[![Design](https://img.shields.io/badge/design-Tailwind%20CSS-38bdf8)](https://tailwindcss.com/)

**Cutflow** est un site vitrine moderne et performant conçu pour présenter un logiciel de montage vidéo innovant. Ce projet d'étude met en œuvre les meilleures pratiques du développement web pour offrir une expérience utilisateur fluide, un design responsive et une gestion robuste des données.

---

## 🚀 Fonctionnalités

Le site est composé de plusieurs sections stratégiques pour maximiser la conversion :

- **Mode Sombre** : Intégration complète d'un mode sombre avec switcher dans le header et persistance du choix via `localStorage`.
- **Page FAQ dédiée** : Section d'aide interactive avec système d'accordéon pour les questions fréquentes.
- **Bibliothèque de Plugins** : Système interactif pour rechercher, filtrer et ajouter des extensions (IA Video Finder, etc.) à son espace personnel.
- **Dashboard Utilisateur** : Interface personnalisée pour gérer sa licence, télécharger le logiciel, accéder à la documentation, gérer ses plugins et voir l'historique de ses échanges avec le support.
- **Gestion de Compte** : Options sécurisées pour l'annulation d'abonnement et la suppression définitive du compte avec modales de confirmation.
- **Système d'Authentification** : Inscription, connexion avec option "Se souvenir de moi" et redirection intelligente des utilisateurs connectés.
- **Popups Personnalisées** : Système de modales élégantes et réactives pour les confirmations et les messages d'erreur.
- **Grille de Tarifs** : Comparatif des offres (Starter, Pro, Studio) avec options d'abonnement.
- **Espace Exposé** : Section dédiée à la présentation approfondie du projet (contexte pédagogique).
- **Formulaire de Contact** : Validation des données et conformité RGPD avec stockage sécurisé en base de données.
- **Conformité Légale** : Pages dédiées aux mentions légales, politique de confidentialité, cookies, CGU et CGV.
- **Gestion des Cookies** : Bandeau de consentement avec persistance locale.

## 🛠️ Stack Technologique

Pour garantir simplicité et efficacité, les technologies suivantes ont été sélectionnées :

- **Backend** : [Node.js](https://nodejs.org/) avec le framework [Express](https://expressjs.com/) et [express-session](https://www.npmjs.com/package/express-session) pour l'authentification.
- **Frontend** : Moteur de templates [EJS](https://ejs.co/) pour un rendu dynamique côté serveur.
- **Design** : [Tailwind CSS](https://tailwindcss.com/) pour une interface moderne, accentuée (bordures marquées) et entièrement responsive.
- **Base de données** : [SQLite](https://www.sqlite.org/) pour sa légèreté et sa facilité d'intégration dans un projet d'étude.

---

## 💻 Installation et Utilisation

### Prérequis
- [Node.js](https://nodejs.org/) (version 14.x ou supérieure)
- npm (installé par défaut avec Node.js)

### Étapes d'installation

1. **Cloner le projet**
   ```bash
   git clone <url-du-depot>
   cd cutflow
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Initialiser la base de données (Hydratation)**
   Pour tester le site avec des données pré-remplies (utilisateurs et messages), exécutez le script de "seeding" :
   ```bash
   node seed.js
   ```

4. **Lancer l'application**
   ```bash
   npm start
   ```

Le site sera accessible à l'adresse : [http://localhost:3000](http://localhost:3000)

---

## 🔐 Identifiants de Test

Pour tester la fonctionnalité de connexion, vous pouvez utiliser les comptes suivants créés lors de l'hydratation :

| Rôle | Email | Mot de passe    |
| :--- | :--- |:----------------|
| **Administrateur** | `admin@cutflow.com` | `adminpassword` |
| **Utilisateur standard** | `user@example.com` | `userpassword`  |
| **Testeur** | `test@cutflow.fr` | `testpassword`  |
| **Testeur** | `nolicense@cutflow.com` | `password`      |

---

## 📂 Structure du Projet

```text
├── data/               # Fichiers de base de données SQLite
├── public/             # Assets statiques (CSS, Images, JS client)
│   ├── css/            # Fichiers de styles (Tailwind)
│   └── js/             # Scripts frontend (ex: gestion cookies)
├── views/              # Templates EJS
│   ├── partials/       # Composants réutilisables (header, footer, modal, etc.)
│   ├── dashboard.ejs   # Tableau de bord utilisateur
│   ├── plugins.ejs     # Bibliothèque de plugins
│   ├── inscription.ejs # Page d'inscription
│   ├── faq.ejs         # Page Foire Aux Questions
│   └── ...             # Autres pages (index, produit, tarifs, etc.)
├── app.js              # Point d'entrée principal de l'application
├── database.js         # Configuration et initialisation de la base de données
├── seed.js             # Script d'hydratation des données de test
├── package.json        # Dépendances et scripts npm
└── doc.md              # Spécifications fonctionnelles du projet
```

---

## ⚖️ Conformité et Sécurité

- **RGPD** : Le formulaire de contact et l'inscription incluent une case à cocher obligatoire pour l'acceptation de la politique de confidentialité.
- **Protection des données** : Les messages et les comptes utilisateurs sont enregistrés de manière structurée avec horodatage.
- **Sécurité** : Gestion de session côté serveur, redirection des utilisateurs non authentifiés et protection contre les accès non autorisés au dashboard.

---

## 📄 Licence

Ce projet est sous licence **ISC**. Voir le fichier `package.json` pour plus de détails.
