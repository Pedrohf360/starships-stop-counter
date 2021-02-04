<br />
<p align="center">
    <img src="./src/assets/img/the-way.jpg" alt="Logo" width="340" height="190">

  <h2 align="center">Starship Stop Counter</h2>
</p>

## Fast Access

* [About](#about)
* [Requirements](#requirements)
* [Starting](#startin)
* [Structure](#structure)
## About

The main objective of this project is count the stops number of each Star Wars ship, given a distance in MGLT.

## Requirements

In this section, used tools and their respective versions will be informed.

* [Angular 11](https://angular.io/)
* [npm 6](https://www.npmjs.com/)
* [TypeScript 4](https://www.typescriptlang.org/)

## Starting

1) Run ``git clone https://github.com/Pedrohf360/starships-stop-counter.git``;
2) Run ``npm install`` from project root (same path as the package.json);
3) Run ``ng serve`` from project root;
4) Project is running! :D
## Structure

```
./
README.md
│
└───src
│   │
│   └───app
│       │   app.component.html
│       │   app.component.scss
│       │   app.component.ts
│       │   app.module.ts
|       |
│       └───core
│       │   │    base.service.ts       (abstractions for CRUD operations)
│       │   │    shared.module.ts      (import common modules, e.g. material design modules)
│       │   │    star-wars.service.ts  (call API using base.service abstractions and do MGLT calculations)
|       |   │
│       │   └───model
│       │_______│     starship.interface.ts
|       │   
│       └───dashboard       (dashboard receive MGLT value and call API)
│       │   dashboard.component.html
│       │   dashboard.component.scss
│       │   dashboard.component.ts
|       |
│       └───header
│       │   header.component.html
│       │   header.component.scss
│       │   header.component.ts
|       |
│       └───main-layout     (call angular selector of header and dashboard components)
│       │   main-layout.component.html
│       │   main-layout.component.scss
│       │   main-layout.component.ts
|       |
│       └───sidebar         (MGLT search value is sent from sidebar to dashboard.component)
│       │   sidebar.component.html
│       │   sidebar.component.scss
│       │   sidebar.component.ts
```