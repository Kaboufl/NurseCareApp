# NurseCareApp

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Comment travailler sur le projet ?

La branche `main` du projet est la branche supposée être la plus stable, constituant ainsi une base saine avec laquelle partir pour développer une nouvelle fonctionnalité :

- Assurez vous d'avoir récupéré les dernières modifications (avec un `git pull`)
- Créez une nouvelle branche `git checkout -b <votre-nom-de-branche>`
- Une fois vos modifications faites (ainsi que vos commits), répliquez votre branche sur github `git push --set-upstream origin <votre-nom-de-branche>`
- Une fois votre fonctionnalitée prête, vous pouvez intégrer vos changements à la branche `main` :
  - Mettez vous sur la branche main `git checkout main`
  - Récupérez vos changements sur votre branche `git pull origin <votre-nom-de-branche>`
  - Résolvez d'éventuels conflits
  - Poussez vos modifications
