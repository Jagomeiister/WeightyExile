# WeightyExile Skeleton

This repository contains the initial skeleton for the **WeightyExile** project.  The
aim of WeightyExile is to provide Path of Exile players with a web‑based tool
for building weighted search queries on the official trade site.  This
skeleton establishes the basic project structure using **React**, **TypeScript**
and **Vite**.

## Getting started

To run the project locally, ensure that you have Node.js installed, then
install dependencies and start the development server:

```bash
# navigate into the repository directory
cd weightexile

# install dependencies
npm install

# start the Vite development server
npm run dev
```

Open your browser at <http://localhost:5173> to see the application.  Vite
supports hot module replacement, so changes to components will reload
automatically.

## Project structure

```
weightexile/
├── README.md            – this file
├── package.json         – lists dependencies and scripts
├── tsconfig.json        – TypeScript configuration
├── vite.config.ts       – Vite configuration (base path set for GitHub Pages)
├── index.html           – entry point HTML for Vite
├── src/                 – application source code
│   ├── main.tsx         – React entry point
│   ├── App.tsx          – root component
│   ├── components/      – reusable UI components
│   │   ├── BaseSelector.tsx
│   │   └── StatPanel.tsx
│   ├── services/        – data service classes
│   │   ├── ItemService.ts
│   │   ├── StatService.ts
│   │   ├── StaticService.ts
│   │   └── LeagueService.ts
│   └── styles/
│       └── index.css    – basic styling for the skeleton
└── public/
    ├── data/            – cached data files pulled from the PoE trade API
    │   ├── items.json
    │   ├── stats.json
    │   ├── static.json
    │   └── leagues.json
    └── data/README.md   – describes the purpose of the data folder
```

## Next steps

This skeleton provides placeholders for the key services and components
described in the project plan.  The following steps can be taken to build
out the full functionality:

1. **Implement data services:** Extend `ItemService`, `StatService`, `StaticService`
   and `LeagueService` to parse the JSON files correctly and provide
   queryable datasets.  Integrate caching and fallback logic.
2. **Fetch real data:** Set up a GitHub Action that runs daily to fetch
   `items.json`, `stats.json`, `static.json` and `leagues.json` from the
   Path of Exile trade API and commit them into the `public/data` folder.
3. **Build UI components:** Replace the placeholder components with a fully
   featured base selector, stat search and weighting UI, query preview,
   and optional result display.  Use the design guidelines from the
   project plan to achieve a PoE‑inspired look and feel.
4. **Integrate query builder:** Implement logic to convert user selections
   into the JSON payload expected by the PoE trade API’s search endpoint.
5. **Deploy to GitHub Pages:** Configure GitHub Pages to serve the `dist` directory
   and ensure that the `vite.config.ts` base path matches the repository name.

This scaffold is deliberately minimal to provide a clean foundation.  You
can evolve the architecture (e.g., introduce routing, state management,
testing frameworks) as the project grows.