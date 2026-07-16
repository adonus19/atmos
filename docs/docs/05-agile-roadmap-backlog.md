# Atmos Agile Roadmap and Backlog

## 1. Working method

Development uses short vertical slices, but infrastructure and domain contracts precede live-provider coupling. The approved concept images are directional references, not sprint acceptance screenshots.

## 2. Definition of Ready

A story is ready when it has:

- user value
- acceptance criteria
- owning epic
- design/reference link
- data dependency
- accessibility considerations
- test approach
- unresolved questions identified
- no blocked product decision

## 3. Definition of Done

- acceptance criteria pass
- code reviewed
- calculation/state tests present
- keyboard and screen-reader behavior verified
- reduced-motion behavior implemented
- loading, missing, stale and error states handled
- provenance available
- mobile performance checked
- documentation updated
- no provider-specific type leaks into feature UI
- no fabricated meteorological values

## 4. Epics

### EPIC 1 — Application Foundation

Deployable Angular PWA, routing, design tokens, accessibility baseline and test setup.

### EPIC 2 — Atmospheric Domain and Data Platform

Normalized snapshots, units, provenance, provider adapters and caching.

### EPIC 3 — Atmospheric Interpretation

Deterministic atmospheric states, drivers, confidence and insights.

### EPIC 4 — Living Home Scene

Layered 2.5D scene and state transitions.

### EPIC 5 — Time Exploration

Synchronized timeline, playback, markers and selected-time state.

### EPIC 6 — Atmospheric Layers

Explore and Analysis modes for vertical structure.

### EPIC 7 — Regional Flow

Map, fields, overlays and temporal navigation.

### EPIC 8 — Local Sensors

Simulated devices, comparison and future hardware contract.

### EPIC 9 — Accessibility, Resilience and Performance

Reduced motion, offline/stale states, quality tiers and assistive technology.

### EPIC 10 — Live Data and Production Readiness

Official sources, backend normalization, observability and deployment.

## 5. Sprint roadmap

### Sprint 0 — Foundation and contracts

**Goal:** Create a deployable shell and stable domain foundation.

**Implementation status (July 15, 2026):**

- [x] ATM-001 Angular application foundation
- [x] ATM-002 design tokens
- [x] ATM-003 atmospheric domain models and validation foundation
- [x] ATM-004 app shell and navigation
- [x] ATM-005 documentation and decision workflow

Sprint 0 is complete when the repository gates pass in CI. Diff-aware new-code coverage remains a repository-host integration item; the local/global 60% gate is enforced now.

#### ATM-001 Create Angular application foundation

**As a developer,** I need a strict, tested Angular PWA foundation so feature work begins on a consistent platform.

Acceptance criteria:

- standalone Angular application created with current supported version
- strict TypeScript enabled
- routing configured
- production build succeeds
- linting/formatting scripts exist
- unit and e2e foundations exist
- PWA manifest/service-worker setup exists
- README records exact tool versions and commands

#### ATM-002 Implement design tokens

Acceptance criteria:

- semantic color tokens match the style guide
- typography and spacing tokens exist
- focus, motion and surface tokens exist
- reduced-motion media query is included
- sample component demonstrates tokens
- core values are not hard-coded in feature components

#### ATM-003 Define atmospheric domain models

Acceptance criteria:

- location, surface, layer, wind, interpretation and provenance types exist
- runtime fixture validation is available
- unit conversion functions are tested
- provider-specific types are isolated
- schema version is defined

#### ATM-004 Create app shell and navigation

Acceptance criteria:

- Home, Layers, Flow, Sensors and More routes
- responsive shell
- safe-area support
- current tab is announced accessibly
- reduced-motion route behavior
- placeholder pages use design tokens

#### ATM-005 Establish documentation and decision workflow

Acceptance criteria:

- `/docs` package committed
- pull-request template asks which source-of-truth docs changed
- decision-log format documented
- code owners or review expectations recorded

### Sprint 1 — Living Home proof

**Goal:** Prove the defining time-driven atmosphere experience with deterministic mock data.

**Implementation status:**

- [x] ATM-101 scenario fixtures
- [x] ATM-102 selected-time state and scrubber
- [ ] ATM-103 Home scene engine — functional mapping complete; visual acceptance reopened
- [x] ATM-104 synchronized interpretation and conditions
- [ ] ATM-105 calm-weather Home state — functional behavior complete; visual acceptance reopened

#### ATM-101 Create scenario fixtures

**Completed:** July 15, 2026. Fixtures are synthetic, deterministic, validated at runtime, and include the additional alert-presentation and sensor-divergence scenarios required by the Codex handoff.

Acceptance criteria:

- at least 25 hourly snapshots
- calm, transition and storm-development periods
- separate calm-night, stale and partial-data fixtures
- deterministic timestamps/time zone
- surface and pressure-level data
- interpretation expectations stored for tests

#### ATM-102 Build selected-time state and scrubber

**Completed:** July 15, 2026. A shared signal-backed selected-time service drives a native hourly range control, Now and playback controls, event markers, reduced-motion behavior, and an assistive-technology summary.

Acceptance criteria:

- drag, tap and keyboard operation
- hourly snapping
- Now control
- play/pause
- significant markers
- shared selected time
- reduced-motion mode disables auto-play
- screen reader announces selected time and summary

#### ATM-103 Build Home scene engine

**Functional implementation completed:** July 15, 2026. Visual acceptance reopened July 16, 2026 because the CSS-only environmental artwork does not meet the approved cinematic direction. Final completion depends on Sprint 1A.

Acceptance criteria:

- sky lighting changes with selected time
- cloud bands respond to snapshot categories
- haze responds to visibility/moisture category
- wind particles respond to direction/speed
- precipitation layer supports off/light/moderate/heavy categories
- scene has high/medium/low quality tiers
- scene remains readable without Canvas

#### ATM-104 Synchronize interpretation and conditions

**Completed:** July 15, 2026. Interpretation, drivers, confidence, surface metrics, validity time, provenance, scene, and timeline derive from the shared selected snapshot. Temperature is visually secondary, values are rounded to supported precision, and missing snapshots produce an explicit insufficient-data state.

Acceptance criteria:

- state headline, drivers, confidence and metrics match selected snapshot
- temperature remains visually secondary
- data source/validity accessible
- no timestamp mismatch between scene and content
- insufficient-data state supported

#### ATM-105 Implement calm-weather Home state

**Functional implementation completed:** July 16, 2026. Visual acceptance reopened July 16, 2026; existing baselines document the rejected CSS-only state and will be replaced in Sprint 1A.

Acceptance criteria:

- calm fixture remains visually interesting
- insight identifies meaningful non-storm change
- no unnecessary warning colors
- motion is restrained
- screenshot regression baseline created

### Sprint 1A — Home visual fidelity remediation

**Goal:** Bring the functional Home proof to the approved cinematic, atmospheric and dimensional quality without compromising data honesty, accessibility or mobile performance.

- [x] ATM-106 define production scene asset manifest
- [ ] ATM-107 create and optimize environmental assets
- [ ] ATM-108 build hybrid scene compositor
- [ ] ATM-109 implement calm dawn/day, dusk and night variants
- [ ] ATM-110 visual, accessibility and performance acceptance

#### ATM-106 Define production scene asset manifest

Acceptance criteria:

- reusable layer stack documented
- required state variants documented
- responsive formats, dimensions and budgets documented
- scientific constraints and generation provenance documented
- production asset paths established

#### ATM-107 Create and optimize environmental assets

**In progress:** July 16, 2026. All four geometry-matched environment candidates and the registered city-light emission mask have optimized WebP derivatives recorded in the scene asset manifest. Reusable cloud/fog layers and AVIF delivery are still open.

Acceptance criteria:

- high-definition distant environment plates
- reusable cloud/fog layers
- foreground foliage/tree treatment
- dusk/night city-light mask
- AVIF/WebP delivery derivatives
- no text, watermark or baked-in UI/weather values

#### ATM-108 Build hybrid scene compositor

Acceptance criteria:

- raster layers composed behind code-driven weather overlays
- selected snapshot controls layer choice and opacity
- responsive art direction and quality tiers
- missing asset fallback remains usable
- non-visual summary remains synchronized

#### ATM-109 Implement time-of-day variants

Acceptance criteria:

- calm dawn/day, dusk and night share stable geometry
- city lights appear only when appropriate
- cloud/fog categories transition without geometry jumps
- reduced motion uses static states or restrained crossfades

#### ATM-110 Visual and performance acceptance

Acceptance criteria:

- product owner approves coded calm Home against concept direction
- mobile visual baselines replaced
- asset transfer and decoded-memory budgets measured
- high/medium/low quality tiers verified
- accessibility and reduced-motion gates pass
- ATM-103 and ATM-105 visual acceptance closed

### Sprint 2 — Complete Home

Stories:

- ATM-201 compact atmospheric trends
- ATM-202 expandable insight drawer
- ATM-203 regional flow summary
- ATM-204 local sensor comparison with simulated device
- ATM-205 scroll compression behavior
- ATM-206 severe alert presentation
- ATM-207 offline, stale and partial-data states

Representative acceptance criteria for ATM-202:

- one insight is prioritized
- expansion explains evidence and confidence
- source timestamps shown
- insight can state uncertainty
- drawer works with keyboard and touch

### Sprint 3 — Live surface data

Stories:

- ATM-301 Atmos API skeleton
- ATM-302 NWS point/location resolution
- ATM-303 official alerts adapter
- ATM-304 observations adapter
- ATM-305 forecast/model adapter
- ATM-306 cache and provenance alignment
- ATM-307 client retry/fallback strategy

### Sprint 4 — Layers Explore

Stories:

- ATM-401 vertical atmospheric canvas
- ATM-402 altitude/pressure selection
- ATM-403 layer visuals
- ATM-404 selected-level cards
- ATM-405 plain-language layer insight
- ATM-406 touch/keyboard accessibility

### Sprint 5 — Layers Analysis

Stories:

- ATM-501 temperature profile
- ATM-502 dew-point/moisture profile
- ATM-503 wind profile and barbs/vectors
- ATM-504 freezing level derivation
- ATM-505 instability values
- ATM-506 provenance/source panel

### Sprint 6 — Flow

Stories:

- ATM-601 MapLibre foundation
- ATM-602 surface wind visualization
- ATM-603 pressure overlay
- ATM-604 moisture overlay
- ATM-605 precipitation overlay
- ATM-606 synchronized time and map selection
- ATM-607 static/reduced-motion fallback

### Sprint 7 — Sensors

Stories:

- ATM-701 sensor adapter interface
- ATM-702 simulated sensor service
- ATM-703 sensor list/health
- ATM-704 sensor detail/history
- ATM-705 official comparison
- ATM-706 calibration metadata
- ATM-707 future ingestion contract

### Sprint 8 — Production hardening

Stories:

- ATM-801 performance profiling and budgets
- ATM-802 WCAG audit
- ATM-803 offline/cache validation
- ATM-804 telemetry and privacy controls
- ATM-805 deployment pipeline
- ATM-806 error monitoring
- ATM-807 security review
- ATM-808 release checklist

## 6. Post-MVP epics

- Journal and event replay
- historical analog engine
- direct HRRR processing
- multi-model comparison
- physical sensor prototype
- notification strategy
- optional account sync

## 7. Backlog priority rules

1. Product-defining interaction before breadth.
2. Scientific correctness before visual flourish.
3. Calm-weather quality before rare-event spectacle.
4. Accessibility and performance are acceptance criteria, not polish.
5. Hardware cannot block software progress.
6. A new provider must fit the normalized domain rather than reshape the UI.
