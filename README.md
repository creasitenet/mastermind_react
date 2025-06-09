# Mastermind React

Un jeu de Mastermind développé avec des technologies web modernes. Ce jeu reprend les règles classiques du Mastermind où vous devez deviner une combinaison de couleurs en un nombre limité d'essais.

## Technologies utilisées

Ce projet utilise les technologies suivantes :

- **React 19** - Bibliothèque JavaScript pour construire des interfaces utilisateur
- **TypeScript** - Superset de JavaScript ajoutant le typage statique
- **Vite** - Outil de build ultra-rapide pour le développement web moderne
- **Tailwind CSS** - Framework CSS utilitaire pour créer rapidement des designs personnalisés
- **SWC** - Compilateur JavaScript/TypeScript rapide écrit en Rust

## Prérequis

- Node.js (version 18 ou supérieure recommandée)
- npm ou yarn

## Installation

1. Clonez ce dépôt sur votre machine locale :
```bash
git clone https://github.com/votre-nom/mastermind_react.git
cd mastermind_react
```

2. Installez les dépendances :
```bash
npm install
```
ou si vous utilisez yarn :
```bash
yarn install
```

## Lancement de l'application

1. Pour démarrer l'application en mode développement :
```bash
npm run dev
```
ou avec yarn :
```bash
yarn dev
```

2. Ouvrez votre navigateur et accédez à `http://localhost:5173` (ou le port indiqué dans la console Vite, généralement 5173 par défaut).

## Scripts disponibles

Ce projet dispose des scripts npm/yarn suivants :

- `dev` : Lance le serveur de développement Vite
  ```bash
  npm run dev
  # ou
  yarn dev
  ```

- `build` : Compile l'application pour la production dans le dossier `dist/`
  ```bash
  npm run build
  # ou
  yarn build
  ```

- `lint` : Exécute ESLint pour analyser le code
  ```bash
  npm run lint
  # ou
  yarn lint
  ```

- `preview` : Lance un serveur local pour prévisualiser le build de production
  ```bash
  npm run preview
  # ou
  yarn preview
  ```

## Comment jouer

Le but du jeu est de deviner la combinaison secrète de couleurs en un nombre limité d'essais. Après chaque tentative, vous recevrez des indices :

- Un indicateur noir signifie qu'une couleur est correcte et bien placée
- Un indicateur blanc signifie qu'une couleur est correcte mais mal placée

Utilisez ces indices pour affiner vos prochaines tentatives et trouver la combinaison gagnante avant d'épuiser tous vos essais !
