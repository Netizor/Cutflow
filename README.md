# Cutflow - Logiciel de Montage Vidéo Professionnel

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D%2014.0.0-brightgreen)](https://nodejs.org/)
[![Framework](https://img.shields.io/badge/framework-Express-blue)](https://expressjs.com/)
[![Database](https://img.shields.io/badge/database-SQLite-003b57)](https://www.sqlite.org/)
[![Design](https://img.shields.io/badge/design-Tailwind%20CSS-38bdf8)](https://tailwindcss.com/)

**Cutflow** est un site vitrine moderne et performant conçu pour présenter un logiciel de montage vidéo innovant. Ce projet d'étude met en œuvre les meilleures pratiques du développement web pour offrir une expérience utilisateur fluide, un design responsive et une gestion robuste des données.

---

## 🚀 Fonctionnalités

Le site est composé de plusieurs sections stratégiques pour maximiser la conversion :

- **Page d'Accueil** : Hero section impactante avec promesse de valeur, vidéo promotionnelle et témoignages.
- **Présentation Produit** : Détails techniques, cas d'usage (YouTubeurs, créateurs) et captures d'écran.
- **Grille de Tarifs** : Comparatif des offres (Starter, Pro, Studio) avec options d'abonnement.
- **Espace Exposé** : Section dédiée à la présentation approfondie du projet (contexte pédagogique).
- **Formulaire de Contact** : Validation des données et conformité RGPD avec stockage sécurisé en base de données.
- **Espace Connexion** : Interface authentifiée pour les utilisateurs enregistrés.
- **Conformité Légale** : Pages dédiées aux mentions légales, politique de confidentialité, cookies, CGU et CGV.
- **Gestion des Cookies** : Bandeau de consentement avec persistance locale.

## 🛠️ Stack Technologique

Pour garantir simplicité et efficacité, les technologies suivantes ont été sélectionnées :

- **Backend** : [Node.js](https://nodejs.org/) avec le framework [Express](https://expressjs.com/).
- **Frontend** : Moteur de templates [EJS](https://ejs.co/) pour un rendu dynamique côté serveur.
- **Design** : [Tailwind CSS](https://tailwindcss.com/) pour une interface moderne et entièrement responsive.
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

| Rôle | Email | Mot de passe |
| :--- | :--- | :--- |
| **Administrateur** | `admin@cutflow.com` | `adminpassword` |
| **Utilisateur standard** | `user@example.com` | `userpassword` |
| **Testeur** | `test@cutflow.fr` | `testpassword` |

---

## 📂 Structure du Projet

```text
├── data/               # Fichiers de base de données SQLite
├── public/             # Assets statiques (CSS, Images, JS client)
│   ├── css/            # Fichiers de styles (Tailwind)
│   └── js/             # Scripts frontend (ex: gestion cookies)
├── views/              # Templates EJS
│   └── partials/       # Composants réutilisables (header, footer, etc.)
├── app.js              # Point d'entrée principal de l'application
├── database.js         # Configuration et initialisation de la base de données
├── seed.js             # Script d'hydratation des données de test
├── package.json        # Dépendances et scripts npm
└── doc.md              # Spécifications fonctionnelles du projet
```

---

## ⚖️ Conformité et Sécurité

- **RGPD** : Le formulaire de contact inclut une case à cocher obligatoire pour l'acceptation de la politique de confidentialité.
- **Protection des données** : Les messages sont enregistrés en base de données avec horodatage.
- **Sécurité** : Les routes sont structurées pour séparer la logique métier du rendu visuel.

---

## 📄 Licence

Ce projet est sous licence **ISC**. Voir le fichier `package.json` pour plus de détails.
