# WeightyExile

A web-based tool for Path of Exile players to build and preview weighted search queries for the official trade site. **This app is fully static and designed to be deployed on GitHub Pages.**

---

## Features

- **Web-based static site**—host on GitHub Pages or any static file server
- **Modern UI** powered by Vite, React, and TypeScript
- Loads item, stat, and league data directly from static JSON files
- Clean separation between UI, services, and helpers
- Extendable for advanced query-building, filtering, and PoE-inspired theming
- Data files auto-refreshed daily in production by GitHub Actions

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Development](#development)
- [Project Structure](#project-structure)
- [Data & Static Content](#data--static-content)
- [Deployment](#deployment)
- [Contribution](#contribution)
- [License](#license)

## Installation

Requires [Node.js](https://nodejs.org/) (latest LTS recommended).

```bash
# Clone this repository
git clone <repo-url>
cd WeightyExile

# Install dependencies
npm install
```

## Usage (Development)

Run the local dev server with hot reload:

```bash
npm run dev
```

Open your browser at http://localhost:5173/.

### Production Build

```bash
npm run build
```

Builds to the `dist/` directory. Preview final build with:

```bash
npm run preview
```

## Project Structure

```
WeightyExile/
├── README.md            – this file
├── package.json         – dependencies and project scripts
├── tsconfig.json        – TypeScript config
├── vite.config.ts       – Vite & build config
├── index.html           – HTML entry
├── src/                 – Application source code
│   ├── main.tsx         – React entry point
│   ├── App.tsx          – Root component
│   ├── components/      – UI feature components
│   ├── services/        – Domain logic, API adapters
│   ├── styles/          – Global/module styling
│   └── utils/           – Shared helpers
├── public/
│   └── data/            – Cached data pulled from PoE trade API
│       ├── items.json
│       ├── leagues.json
│       ├── static.json
│       ├── stats.json
│       └── README.md    – Data format & update notes
└── dist/                – Production static bundle
```

## Data & Static Content

- JSON files in `public/data/` are updated by scheduled GitHub Actions for production. They are served as part of the static bundle for all users and never loaded dynamically from a backend.
- During development, these files can be minimal or stale—services in `src/services/` handle fallbacks.
- See `public/data/README.md` for more detail.

## Deployment

WeightyExile is built as a **static web app** and is ready for deployment to [GitHub Pages](https://pages.github.com/) or any static hosting provider.

### Quick Deploy to GitHub Pages

1. **Set your base URL in `vite.config.ts`:**
   - Update the `base` option in `vite.config.ts` to your repository name (e.g., `/WeightyExile/`).

2. **Build for production:**
   ```bash
   npm run build
   ```

3. **Push your code to GitHub, configure Pages:**
   - Serve from the `/dist` directory, usually on the `main` branch or a `gh-pages` branch created by your workflow.
   - You can use [GitHub Actions with `peaceiris/actions-gh-pages`](https://github.com/peaceiris/actions-gh-pages) to automate deploys.

4. **Access:** Your deployed site will be available at:
   `https://<username>.github.io/<repository>/`

- For detailed static site/GitHub Pages deploy instructions, see the [Vite docs](https://vitejs.dev/guide/static-deploy.html#github-pages).
- **Note:** The app is 100% client-side—no backend, no server requirements!

## Development & Contribution

- Follow [Vite](https://vitejs.dev/) & [React](https://react.dev/) best practices
- Keep components declarative and styles modular
- Domain/data logic lives in `src/services/`
- Utility code in `src/utils/`
- PRs should be focused, reference issue IDs, and describe any test or visual steps
- Data edits should happen via automation, not by hand—see [public/data/README.md](public/data/README.md)

## License

Distributed under the MIT License. See [LICENSE](LICENSE).

---

For questions, suggestions, or bug reports, please open an issue or contact project maintainers.