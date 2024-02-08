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

## Installation du projet

```sh
npm install
```

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


