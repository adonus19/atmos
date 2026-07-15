# Contributing to Atmos

Read [the documentation map](docs/README.md) and the owning source-of-truth document before changing behavior. Work one backlog story at a time and use test-driven development: add a failing test, implement the smallest behavior that passes, then refactor while green.

Every change requires review by the product owner or a designated maintainer. Material product, architecture, data, accessibility, privacy, or visual decisions require an ADR and owner approval. Do not infer behavior from concept images.

Run `npm run check` before review. Run `npm run e2e` with the app available at `http://localhost:4200` when a critical user journey changes.
