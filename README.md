# MlVisualArchive

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Notes about recent edits

I added a minimal Home page and app shell to bootstrap the Visual Archive UI:

- `src/app/features/home/` — `home.page.ts/html/css` (standalone component)
- `src/app/core/layout/header/` — header component used by the app shell
- `src/app/app.routes.ts` — route for `/` wired to `HomePage`

Tailwind utilities are used in templates but Tailwind itself isn't installed/configured by these edits — I can add that next if you want an exact match to the design system.
