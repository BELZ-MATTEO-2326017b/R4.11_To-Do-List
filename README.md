# Application de TO-DO LIST

## Résumé de l'application

Cette application est une To-Do List interactive développée avec React qui permet aux utilisateurs de créer, organiser et suivre leurs tâches quotidiennes. L'application offre des fonctionnalités telles que la catégorisation des tâches, la définition de dates d'échéance, le marquage des tâches urgentes, l'ajout de contacts associés et la gestion des tâches récurrentes.

## Structure des fichiers (src)

```
to-do-list/
└── src/
    ├── assets/
    │   └── App.css
    ├── components/
    │   ├── TaskForm.js
    │   ├── TaskList.js
    │   ├── TaskCard.js
    │   ├── CategoryManager.js
    │   └── ...
    ├── App.js
    └── index.js
```

## Description des fichiers

### App.js
Composant principal qui gère l'état global de l'application et l'affichage des différents composants.

### components/TaskForm.js
Formulaire de création et d'édition de tâches avec validation des champs, gestion des tâches récurrentes, catégories et contacts associés.

### components/TaskList.js
Affiche la liste des tâches avec options de filtrage et de tri.

### components/TaskCard.js
Composant qui affiche une tâche individuelle avec ses détails et options d'actions.

### components/CategoryManager.js
Permet de créer, modifier et supprimer des catégories pour organiser les tâches.

### assets/App.css
Contient les styles de l'application, notamment pour les modales, la liste des tâches, les boutons d'action flottants, et l'apparence générale de l'interface.

## Hébergement

L'application est hébergée et accessible à l'adresse suivante:
[https://r4-11-to-do-list.vercel.app](https://r4-11-to-do-list.vercel.app)

## Exécution du projet en local

Pour lancer le projet sur votre machine locale, suivez ces étapes:

```
cd .\to-do-list\
npm start
```

L'application sera accessible à l'adresse [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## Auteur

Projet réalisé par Belz Matteo dans le cadre de la ressource R4-11.