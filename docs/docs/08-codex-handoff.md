# Atmos Codex Handoff

## 1. Read order

Before writing code, Codex should read:

1. repository `README.md`
2. `docs/01-product-requirements.md`
3. `docs/03-design-system-style-guide.md`
4. `docs/04-technical-architecture-data.md`
5. the current sprint in `docs/05-agile-roadmap-backlog.md`
6. `docs/07-decision-log-traceability.md`

Do not infer missing product behavior from screenshots.

## 2. First Codex scope

Implement **Sprint 0 only**. Do not build the full Home concept in the first session.

Expected deliverables:

- Angular workspace
- strict configuration
- routes and responsive shell
- design-token files
- domain models
- mock fixture schema/validation foundation
- testing foundations
- PWA setup
- repository documentation and commands

## 3. Repository working agreements

- standalone components
- feature-first structure
- strict TypeScript; avoid `any`
- Angular Signals for synchronous app state, RxJS for async streams
- provider adapters cannot leak types into feature UI
- domain calculations are pure and tested
- no hard-coded color values outside token definitions
- all interactive graphics need accessible alternatives
- reduced motion included with each animated feature
- document material decisions
- small, reviewable commits

## 4. Initial component map

```text
AppShellComponent
  TopContextBarComponent
  RouterOutlet
  BottomNavigationComponent

HomePageComponent (Sprint 1+)
  AtmosphericSceneComponent
    SkyLayerComponent
    CloudBandsComponent
    WindParticleCanvasComponent
    PrecipitationCanvasComponent
  AtmosphericInterpretationComponent
  TimeScrubberComponent
  AtmosphericTrendsComponent
  InsightDrawerComponent
  LocalComparisonComponent
  RegionalFlowSummaryComponent

LayersPageComponent (Sprint 4+)
  AtmosphericColumnComponent
  AltitudeSelectorComponent
  SelectedLayerSummaryComponent
  ProfileChartsComponent
```

## 5. Mock-data requirements

Mock data must be deterministic and checked into source control. Use York, South Carolina as the initial demo location without implying the fixture is live.

Required scenarios:

- calm sunny day with drying trend
- humid day transitioning toward evening storms
- overnight fog-risk development
- official-alert presentation fixture
- stale cached data
- partial pressure-level data
- simulated backyard sensor divergence

Use realistic units/ranges and clearly label fixtures as synthetic.

## 6. Coding sequence

1. scaffold and verify build/test
2. create design tokens and global foundation
3. create domain types and unit utilities
4. create fixture validation
5. create app shell/routes
6. add placeholder pages
7. add accessibility baseline
8. add CI/check scripts
9. update docs with exact versions and commands

## 7. Stop conditions

Codex should stop and flag a decision rather than guessing when:

- behavior conflicts with source-of-truth documents
- a provider license or API field is uncertain
- an interpretation threshold lacks an approved rule
- the design requires inaccessible interaction
- a screenshot suggests data not represented in the domain
- scope would move beyond the current sprint

## 8. Suggested first prompt for Codex

> Create the Atmos application foundation according to Sprint 0 in `docs/05-agile-roadmap-backlog.md`. Read the product requirements, design system, architecture and decision log before coding. Use the current supported Angular version, standalone components, strict TypeScript, Angular Signals for synchronous shared state and RxJS for asynchronous streams. Build only the app shell, routes, design tokens, domain models, fixture-validation foundation, PWA/test tooling and repository documentation. Do not implement the Home scene yet. Run all available tests/builds, report exact versions, list files changed and identify any decisions that remain open.

## 9. Visual assets

Copy `assets/` into the repository documentation. These images are design references and should not be bundled into the production app unless separately optimized and approved.

- `03-home-concept-v3-calm-approved-direction.png` — approved Home direction
- `04-layers-concept-v1-approved-direction.png` — approved Layers direction
- earlier images — historical context only

## 10. Handoff checklist

- [x] docs present under `/docs`
- [x] assets present under `/docs/assets`
- Sprint 0 stories copied to issue tracker if used
- [x] Node 24.16.0 and npm 11.13.0 selected
- [x] workspace/package name confirmed as `atmos`
- [x] MIT license selected
- [x] GitHub Actions confirmed as CI target
- [x] first Codex prompt supplied

## 11. Implemented foundation

As of July 15, 2026, the repository uses Angular 22, standalone lazy-loaded feature pages, SCSS design tokens, Angular service-worker/PWA configuration, Vitest with 60% global thresholds, Angular ESLint, Prettier, and Cypress. Use the commands in the repository `README.md`.

The Sprint 0 Cypress route journey was verified against the local development server on July 15, 2026.
