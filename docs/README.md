# Atmos Project Documentation

**Status:** Approved planning baseline for development  
**Last updated:** July 15, 2026  
**Owner:** Product owner / project maintainer

This folder is the source of truth for Atmos. Codex and human contributors should read this file first, then consult the owning document for the decision being implemented.

## Document map

| Document                                                                        | Owns                                                                                           |
| ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| [01-product-requirements.md](docs/01-product-requirements.md)                   | Product vision, scope, personas, feature definitions, non-goals, success measures              |
| [02-experience-interaction-spec.md](docs/02-experience-interaction-spec.md)     | Navigation, screen behavior, interactions, states, motion and accessibility                    |
| [03-design-system-style-guide.md](docs/03-design-system-style-guide.md)         | Color, typography, spacing, surfaces, iconography, visual effects and asset rules              |
| [04-technical-architecture-data.md](docs/04-technical-architecture-data.md)     | Frontend/backend architecture, domain models, graphics stack, data sources and provenance      |
| [05-agile-roadmap-backlog.md](docs/05-agile-roadmap-backlog.md)                 | Epics, sprint phases, user stories, acceptance criteria and definitions of ready/done          |
| [06-quality-testing-observability.md](docs/06-quality-testing-observability.md) | Test strategy, accessibility, performance budgets, error handling, telemetry and release gates |
| [07-decision-log-traceability.md](docs/07-decision-log-traceability.md)         | Locked decisions, open questions, requirement-to-story traceability and change control         |
| [08-codex-handoff.md](docs/08-codex-handoff.md)                                 | Repository setup, working agreements, implementation order and initial Codex prompt            |
| [09-glossary.md](docs/09-glossary.md)                                           | Product, meteorological and engineering vocabulary                                             |
| [10-scene-asset-manifest.md](docs/10-scene-asset-manifest.md)                   | Production environmental layers, variants, formats, budgets and integration rules              |
| [assets/](assets/)                                                              | Approved and historical visual references                                                      |

A compiled review copy is provided as `Atmos_Master_Blueprint.docx`. The Markdown files remain authoritative because they are version-controlled and easier for Codex to consume.

## Authority and conflict resolution

1. A decision in the document that **owns** that topic takes precedence.
2. `07-decision-log-traceability.md` records approved changes and superseded decisions.
3. Concept images communicate direction, not literal pixel-perfect requirements.
4. No feature is considered committed until it appears in the product requirements and backlog.
5. No meteorological interpretation may be fabricated to match a visual concept.

## Documentation maintenance

Every pull request that changes behavior must update the applicable source-of-truth document in the same change. Material changes require a decision-log entry with date, rationale, impact and approver.
