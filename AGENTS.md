# Repository Guidelines

## Project Structure & Module Organization
Vite bootstraps the Vue 3 app from `src/main.js`, rendering the root `src/App.vue` and routing through `src/router/index.js`. Feature screens live in `src/views`, while reusable UI lives in `src/components` (e.g., `ProgressCircle.vue` and `BottomNav.vue`). Static assets and the base HTML shell are served from `public/` and `index.html`. Keep API references in `API_DOCUMENTATION.md` and any future data mocks in a `mocks/` folder so they stay isolated from production bundles.

## Build, Test, and Development Commands
Run `npm install` with Node 20+ (see `package.json` engines) before any work. Use `npm run dev` for hot-reload development, `npm run build` to generate the production bundle under `dist/`, and `npm run preview` to sanity-check the built output locally. When adding utilities or CLIs, expose them via `package.json` scripts so other agents discover them quickly.

## Coding Style & Naming Conventions
Follow Vue `<script setup>` single-file component patterns with 2-space indentation and semicolons omitted (matching existing files). Name view-level files in PascalCase (`FamilyDashboard.vue`) and composables/hooks in camelCase. Scope CSS within components and favor descriptive utility classes over deeply nested selectors. Before committing, run the formatter or `npx eslint .` if lint tooling is added; lint configs should live beside the affected package.

## Testing Guidelines
Automated tests are not yet configured, so every change should include manual verification notes in the PR. When introducing tests, prefer Vitest to stay inside the Vite toolchain, mirror the `src/` structure under `tests/`, and name files `*.spec.js`. Capture regression cases for routing and component state transitions first, and document any new `npm run test` script you create inside this guide.

## Commit & Pull Request Guidelines
Recent history shows bracketed prefixes such as `[new]` and `[modify]`; keep using a short tag plus an imperative summary (`[fix] align BottomNav spacing`). Commits should be scoped to one feature or bug. Pull requests must include: purpose, before/after notes or screenshots for UI changes, reproduction/test steps, and linked issue IDs. Highlight any config or dependency changes and mention required environment variables (prefixed with `VITE_`) so maintainers can review quickly.

## Configuration & Secrets
Vite exposes only `VITE_*` variables to the client; store them in `.env.local` and never commit secrets. For local API stubs, create `/public/mock` JSON fixtures rather than hard-coding responses, and document endpoints in `API_DOCUMENTATION.md`.
