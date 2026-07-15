# Atmos

Atmos is a mobile-first personal atmospheric observatory. It explains atmospheric state, drivers, likely transitions, confidence, and local differences without pretending to replace an official forecast or warning service.

The Markdown package under [docs/](docs/README.md) is the project source of truth. Sprint 0 builds only the application foundation; the Living Home experience begins in Sprint 1.

## Toolchain

- Angular 22.0.x (standalone, strict TypeScript, zoneless Vitest runner)
- Angular CLI 22.0.0
- Node.js 24.16.0
- npm 11.13.0
- TypeScript 6.0.x
- Cypress e2e foundation

Use the Node version in `.nvmrc`, then install with `npm ci`.

## Commands

| Command                 | Purpose                                                    |
| ----------------------- | ---------------------------------------------------------- |
| `npm start`             | Start the local development server after explicit approval |
| `npm run build`         | Create the production build                                |
| `npm test`              | Run unit/component tests once                              |
| `npm run test:watch`    | Run tests in watch mode                                    |
| `npm run test:coverage` | Enforce 60% statements, branches, functions, and lines     |
| `npm run e2e`           | Run Cypress against an app at `http://localhost:4200`      |
| `npm run lint`          | Run Angular ESLint                                         |
| `npm run format:check`  | Verify Prettier formatting                                 |
| `npm run check`         | Run lint, formatting, coverage, and production build gates |

The 60% native threshold is repository-wide. New/changed-code coverage is also expected to remain at or above 60%; a diff-aware service/check must be selected when the repository host is finalized.

## Working agreements

See [CONTRIBUTING.md](CONTRIBUTING.md). Synthetic fixtures must be labeled, provider responses stay behind adapters, domain calculations remain pure and tested, and behavior changes update their owning docs in the same change.

## License

Atmos is available under the [MIT License](LICENSE).
