# Nurse Care

## Contexte

Le cabinet d'infirmiers **NurseCare**, situé à Toulouse, propose des prestations de soins au cabinet et à domicile chez les patients en faisant la demande ( ayant des difficultés à se déplacer par exemple ).

Nurse Care a des difficultés pour organiser facilement ses tournées de soin à domicile de ses patients.

Notre mission est de créer une application permettant d'améliorer et de fluidifier les interactions entres les différents intervenants de NurseCare.

Fonctionnalités clés de l'application :

- Gestion centralisée des interventions : L'agenda des différentes prestations des soignants du cabinet doivent être facilement consultables et modifiables pour le personnel soignant et les secrétaires médicales (facturation, intégration...)
- Affectation des ressources : Assignations des aide soignants sur différentes interventions programmées par les secrétaires médicaux
- Interfaces utilisateur dédiées : Des interfaces ergonomiques et intuitives conçues pour répondre aux besoins spécifiques de chaque type d'utilisateur.

## Interprétation du cahier des charges

### Les patients

Les patients sont les clients du cabinet. Ils passent commande pour une intervention et ses prestations auprès des secrétaires médicales qui les affecteront au personnel soignant pour leurs tournées.

### Les interventions

Les interventions représentent les rendez-vous entre le personnel soignant et les patients du cabinet, celles-ci sont directement facturées au client aux termes de celles-ci.

Ce sont les secrétaire médicales qui créent les interventions dans l'application, elles référencent le patient ainsi que l'infirmier / infirmière assigné(e), et est composée de plusieurs prestations de soins à réaliser.

### Les prestations

Les prestations représentent l'action de prodiguer un soin lors d'une intervention. Celles-ci peuvent également référencer un bon d'obervation dans le cas ou un stagiaire serait présent lors de l'intervention.

### Les soins

Le cabinet propose un catalogue de soins défini à prodiguer à ses patients. Ils portent un nom, un prix, et sont rattachés à des catégories de soin afin de les organiser.

### Le personnel soignant

Le personnel soignant du cabinet réalise les pretations des interventions et facture le patient au termes de celle-ci. L'objectif est d'afficher de manière claire et simple les différentes interventions assignées à un infirmier / infirmière donné(e) par les secrétaires du cabinet. 

Il leur faut donc un portail dédié au sein de l'application

### Les secrétaires médicales

Les secrétaires médicales s'occupent le programmer les interventions du personnel soignant en fonctions des commandes des patients sollicitant le cabinet.

Il leur faut donc un portail dédié au sein de l'application permettant de créer et de gérer les interventions du calendrier du cabinet.

### Le gérant / directeur de cabinet

Le / la gérant(e) du cabinet s'occupe du recrutement du personnel soignant ainsi que des secrétaires médicales.

Il lui faut également un portail dédié au sein de l'application permettant de créer de nouveaux profils secrétaires médicales ou personnel soignant et de pouvoir jauger le besoin en personnel en fonction de la demande du cabinet.

### Les stagiaires

Le cabinet NurseCare prend en charges des stagiaires apprentis infirmiers / infirmières. Le cabinet est en relation avec différents centres de formation qui gèrent ces derniers.

Lors d'une intervention, le personnel soignant peut choisir de faire réaliser la dite intervention par le stagiaire, dans ce cas, l'infirmier / infirmière en charge de la prestation doit compléter un bon d'obervation pour assurer le suivi de la formation de l'apprenti.

## L'architecture de l'application

L'application devra proposer différentes interfaces à différents types d'utilisateurs :

- Un portail directeur / gérant :
  - Doit pouvoir mesurer la répartition des interventions sur le personnel médical
  - Gestion du personnel (infirmiers et secrétaires)
- Un portail secrétaire médical
  - Gestion des interventions (création, annulation)
  - Affectation du personnel soignant aux interventions
  - Déclarer une intervention facturée comme intégrée dans la comptabilité du cabinet
- Un portail personnel soignant
  - Affichage des interventions affectées par jour
  - Passer une intervention à l'état facturé
  - Remplir un bon d'observation dans le cadre de la formation d'un stagiaire sur une prestation
  - Consulter un itinéraire optimisé pour réaliser les interventions du jour

## Stack technique du projet

Pour réaliser cette application, notre choix s'est porté sur une solution de type *WebApp* consommant une API externe. L'application est réalisée avec le framework [Vue 3](https://vuejs.org/) en langage *TypeScript*. L'API sera quant à elle développée avec un serveur [Node JS](https://nodejs.org/en) avec le framework [Express](https://expressjs.com/fr/) toujours en langage *TypeScript*. Une base de données [MySQL](https://www.mysql.com/fr/) assurera le stockage des informations de l'application, celle ci sera accédée par l'API via l'ORM [Prisma](https://www.prisma.io/) qui permet de travailler sur la base de données en conservant une syntaxe de programmation orientée objet.

![Arhitecture de NurseCare](/docs/AAD%20NC.png)

Le projet est scindé en deux dépôts de code distincs, la partie [*WebApp*](https://github.com/Kaboufl/NurseCareApp) et la partie [*API*](https://github.com/Kaboufl/NurseCare/).

La partie *WebApp* prend la forme d'un serveur de développement [Vite](https://vitejs.dev/) intégré au framework *Vue 3*.

La partie *API* prend la forme d'un serveur de développement sous *NodeJS* pour la partie API à proprement parler, la base de donnée elle peut être mise en place facilement avec l'utilisation de [Docker](https://www.docker.com/) et le fichier orchestrateur paramétrant un cluster MySQL avec toutes les informations de connexion renseignées dans le fichier d'environnement.

## Le modèle de données

Le modèle de données est réalisé à l'aide l'outil [dbdiagram.io](), il est possible de le consulter [ici](https://dbdiagram.io/d/MCD-NC-666efc6fa179551be6008b67)

![MCD NurseCare](/docs/MCD%20NC.png)

# NurseCareApp

Ce repository contient les sources de l'application client **NurseCare**, elle est réalisée avec vue 3 et exploite les données de l'[API NurseCare](https://github.com/Kaboufl/NurseCare).

Les modèles de données mappés sur le schema de la base de donnée sont dans le fichier `./src/models.ts`, il faut penser à reporter les migrations de la base de données dans ce fichier.

## Extensions VScode recommandées

 - [Extension vue pour TypeScript (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)
 - [Tailwind CSS Intellisense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

## Comment travailler sur le projet ?

La branche `main` du projet est la branche supposée être la plus stable, constituant ainsi une base saine avec laquelle partir pour développer une nouvelle fonctionnalité :

- Assurez vous d'avoir récupéré les dernières modifications (avec un `git fetch --all` puis `git pull`)
- Créez une nouvelle branche `git checkout -b <votre-nom-de-branche>`
- Une fois vos modifications faites (ainsi que vos commits), répliquez votre branche sur github `git push -u origin <votre-nom-de-branche>`
- Une fois votre fonctionnalitée prête, vous pouvez intégrer vos changements à la branche `main` :
  - Rendez vous sur le [GitHub du projet](https://github.com/Kaboufl/NurseCare)
  - Créez une nouvelle pull request ( `main <-- <votre-branche>` )
  - Commentez vos changements
  - Chaque merge devra etre approuvé par chacun de nous
  - _Rinse and repeat_

## Support de type pour les imports `.vue` en TS
Par défaut, TypeScript ne peut pas gérer les informations de type pour les imports `.vue`, donc nous remplaçons la CLI `tsc` par `vue-tsc` pour la vérification de type. Dans les éditeurs, nous avons besoin du [Plugin TypeScript Vue (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) pour rendre le service de langage TypeScript conscient des types `.vue`.

Si le plugin TypeScript autonome ne vous semble pas assez rapide, Volar a également mis en œuvre un [Mode de prise de contrôle](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) qui est plus performant. Vous pouvez l'activer en suivant les étapes suivantes :

1. Désactivez l'extension TypeScript intégrée
   1. Exécutez `Extensions: Afficher les extensions intégrées` à partir de la palette de commandes de VSCode
   2. Trouvez `Fonctionnalités de langage TypeScript et JavaScript`, faites un clic droit et sélectionnez `Désactiver (Espace de travail)`
2. Rechargez la fenêtre VSCode en exécutant `Développeur: Recharger la fenêtre` à partir de la palette de commandes.

## Personnaliser le serveur de développement

Vous pouvez configurer le comportement du serveur de développement via le fichier `vite.config.ts` ([Documentation](https://vitejs.dev/config/)).

- ### Installation des librairies et dépendances

  À la racine du projet, tapez la commande `npm install` pour installer les dépendances du projet, lesquelles sont :

    - ``Vue``, Le framework frontend utilisé, avec `vue-router` pour la gestion des routes
    - ``vue-multiselect``, librairie permettant la sélection d'éléments multiples de manière réactive
    - ``pdf-lib``, prend en charge la création de fichiers PDF pour la facturation (voir CDC)
    - ``qalendar``, calendrier compatible vue 3 et personnalisable
    - ``headlessUI``, pour des composants pré-fabriqués
    - ``heroicons``, pour l'affichage d'icônes
    - ``vue3-toastify``, pour faire les notifications de l'application

### Démarrer le serveur de Dev (HotModuleReplacement)

```sh
npm run dev
```

### Compiler les sources du projet

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```


