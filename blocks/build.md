# Block build instructions

The block uses `@wordpress/scripts` (wp-scripts) with a standard webpack setup. Node 20+ is required (see `.nvmrc`).

## Setup

```bash
nvm use          # or: nvm use 20
npm ci           # installs the exact deps pinned in package-lock.json
```

## Build

```bash
npm run build    # one-time production build → blocks/build/
```

`npm start` runs webpack in watch mode — every save to `blocks/src/` rebuilds `blocks/build/` automatically for local development.

## Local testing

`blocks/build/` is **gitignored** — a fresh checkout has no built assets, so run `npm run build` once before testing the plugin in a local WordPress install (symlink `wp-content/plugins/embed-pdf-viewer` → this checkout). CI rebuilds from source for releases (`deploy.yml`), so build output is disposable locally; deleting it and re-running `npm run build` is always safe.

## Lint

```bash
npm run lint:js  # eslint on blocks/src
```
