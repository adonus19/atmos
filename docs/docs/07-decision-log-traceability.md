# Atmos Decision Log, Traceability and Change Control

## 1. Locked decisions

| ID      | Decision                                                                                                               | Rationale                                                                                                                                                                  | Status |
| ------- | ---------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| ADR-001 | Atmos is an atmospheric observatory, not a conventional forecast dashboard.                                            | Protects differentiation.                                                                                                                                                  | Locked |
| ADR-002 | Home prioritizes atmospheric state over temperature.                                                                   | Aligns information hierarchy with product promise.                                                                                                                         | Locked |
| ADR-003 | The time scrubber is the defining interaction.                                                                         | Connects visuals, data and explanation.                                                                                                                                    | Locked |
| ADR-004 | Build 2.5D with CSS/SVG/Canvas before full 3D.                                                                         | Better performance and manageable asset production.                                                                                                                        | Locked |
| ADR-005 | Use deterministic interpretation before generative AI.                                                                 | Testability and scientific honesty.                                                                                                                                        | Locked |
| ADR-006 | Use mock data before live APIs.                                                                                        | Proves experience independently of provider complexity.                                                                                                                    | Locked |
| ADR-007 | Use normalized Atmos domain models.                                                                                    | Prevents provider lock-in.                                                                                                                                                 | Locked |
| ADR-008 | Use NWS for official U.S. alerts/observations where applicable.                                                        | Official provenance.                                                                                                                                                       | Locked |
| ADR-009 | Pressure-level data powers Layers; pressure levels are not fixed altitudes.                                            | Scientific correctness.                                                                                                                                                    | Locked |
| ADR-010 | MapLibre is the initial Flow map renderer.                                                                             | Open TypeScript/WebGL ecosystem.                                                                                                                                           | Locked |
| ADR-011 | Sensors are simulated before physical hardware.                                                                        | Hardware cannot block software.                                                                                                                                            | Locked |
| ADR-012 | Journal is post-MVP.                                                                                                   | Focuses the first release.                                                                                                                                                 | Locked |
| ADR-013 | Reduced motion, provenance and stale data are foundational.                                                            | Trust and accessibility.                                                                                                                                                   | Locked |
| ADR-014 | Approved images are directional, not pixel specifications.                                                             | Avoids impossible/overcrowded implementation.                                                                                                                              | Locked |
| ADR-015 | Enforce at least 60% coverage across statements, branches, functions and lines, with the same target for changed code. | Establishes a measurable TDD floor while the foundation grows. Angular enforces repository-wide coverage; changed-code enforcement will be added with the repository host. | Locked |
| ADR-016 | Use SCSS for token organization and GitHub Actions for CI.                                                             | SCSS supports maintainable global tokens; GitHub matches the required PR and review workflow.                                                                              | Locked |
| ADR-017 | License Atmos under the MIT License.                                                                                   | Keeps reuse and contribution terms permissive and explicit.                                                                                                                | Locked |
| ADR-018 | Use a hybrid 2.5D Home renderer with production raster environment layers and code-driven data overlays.                | CSS primitives alone did not meet the approved cinematic direction. Layered raster art adds natural detail while SVG/Canvas/CSS preserve data-driven behavior and accessibility. | Locked |

## 2. Visual decision history

- Concept 1 demonstrated cinematic mood but was rejected as too close to a typical weather app.
- Concept 2 established interpretive state, vertical layers and local comparison but was too dense.
- Concept 3 established approved calm-weather Home direction and proved non-storm usefulness.
- Layers concept established approved direction for vertical atmospheric exploration.

## 3. Requirement traceability

| Requirement                         | Primary stories                    |
| ----------------------------------- | ---------------------------------- |
| Interpret current atmospheric state | ATM-104, ATM-202, ATM-301–306      |
| Time-synchronized experience        | ATM-102, ATM-104, ATM-606          |
| Data-driven 2.5D scene              | ATM-103, ATM-105, ATM-801          |
| Calm-weather usefulness             | ATM-105, ATM-201–203               |
| Official alert trust                | ATM-206, ATM-303                   |
| Vertical atmospheric exploration    | ATM-401–406, ATM-501–506           |
| Regional movement                   | ATM-601–607                        |
| Local sensor comparison             | ATM-204, ATM-701–707               |
| Provenance and freshness            | ATM-003, ATM-306, ATM-506          |
| Reduced motion                      | ATM-002, ATM-102, ATM-607, ATM-802 |
| Offline/stale resilience            | ATM-207, ATM-307, ATM-803          |

## 4. Open decisions

These are intentionally unresolved until evidence exists:

- chart implementation library versus custom SVG
- exact backend language/runtime
- account/authentication timing
- production Open-Meteo/commercial licensing plan
- HRRR extraction/tiling technology
- final Atmos logo and app icon
- analytics product and consent model
- exact initial geographic coverage beyond the United States

## 5. Change-control process

Material changes require:

1. New or updated ADR entry.
2. Product impact statement.
3. Architecture/data impact statement.
4. Backlog and acceptance-criteria update.
5. Visual/design-system update when applicable.
6. Approval by the product owner.

A decision may be superseded, never silently deleted. Mark the prior entry superseded and link the replacing decision.

## 6. Feature request template

- Problem/user need
- Proposed behavior
- Product pillar served
- MVP or post-MVP
- Data needed and source confidence
- Visual/interaction impact
- Accessibility impact
- Performance impact
- Privacy/security impact
- Acceptance criteria
- Decision needed
