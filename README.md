# 💰 Gestionnaire de Dépenses

Application web moderne de gestion des dépenses, développée en **Next.js**, permettant aux utilisateurs de suivre, catégoriser et analyser leurs dépenses de manière simple et intuitive.

---

## 🚀 Fonctionnalités

- **Ajout de dépenses** : enregistrement rapide avec nom, montant et catégorie.
- **Catégorisation** : dépenses organisées par catégories (Nourriture, Transport, Logement, Loisirs, Autres).
- **Visualisation des données** :
  - Liste des dépenses avec détails.
  - Statistiques globales (total dépensé).
  - Graphiques interactifs (dépenses par catégorie).
- **Suppression / Modification** : possibilité d’éditer ou supprimer une dépense.
- **Design Responsive** : utilisation de **Tailwind CSS** pour une interface fluide sur mobile, tablette et desktop.

---

## 🎯 Objectifs

- Aider les utilisateurs à **mieux gérer leur budget**.
- Fournir une **vue claire des dépenses** par catégorie.
- Offrir une interface **simple, rapide et moderne**.

---

## 🛠️ Technologies utilisées

- **Framework** : [Next.js](https://nextjs.org/)  
- **Langage** : TypeScript  
- **Styling** : [Tailwind CSS](https://tailwindcss.com/)  
- **Graphiques** : [Recharts](https://recharts.org/)  
- **Base de données** : [Supabase](https://supabase.com/) *(optionnel si tu souhaites stocker les données)*

---

## 📂 Structure du projet

gestionnaire-depenses/
│── README.md
│── package.json
│── tsconfig.json
│── next.config.js
│── public/
│ └── images/ # logos et icônes
│── src/
│ ├── components/ # composants UI réutilisables
│ ├── pages/ # pages Next.js
│ ├── lib/ # utilitaires (formatage, helpers)
│ └── styles/ # styles globaux


---

## ⚙️ Installation et lancement

### 1. Cloner le projet
```bash
git clone https://github.com/maneau-88/gestionnaire-depenses.git
cd gestionnaire-depenses

2. Installer les dépendances
npm install

3. Lancer en local
npm run dev


Application disponible sur http://localhost:3000

📊 Exemple d’utilisation

Ajout d’une dépense :

Nom : "Pizza"

Montant : 7000 FCFA

Catégorie : Nourriture

Résultat : la dépense est affichée dans la liste + intégrée dans le graphique des dépenses.

🔒 Sécurité & Données

Sauvegarde des données

Stockage dans localStorage (mode hors ligne).

(Optionnel) Connexion à Supabase pour stockage cloud multi-appareils.

Protection des accès par authentification (à implémenter si besoin).

🌍 Déploiement

Hébergement possible sur Vercel (optimisé pour Next.js).

Hébergement alternatif : Netlify.

📌 Améliorations futures

Authentification utilisateur (connexion, inscription).

Export des dépenses (Excel, PDF).

Ajout de budgets mensuels.

Notifications pour alerter sur le dépassement d’un budget.

👨‍💻 Auteur

Développé par [ Stephane MBA ] dans le cadre d’un projet de développement web front-end.