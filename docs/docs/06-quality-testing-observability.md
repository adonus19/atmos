# Atmos Quality, Testing and Observability Strategy

## 1. Quality goals

Atmos must be trustworthy, responsive and understandable. Visual beauty does not compensate for timestamp mismatch, misleading interpretation or inaccessible controls.

## 2. Test pyramid

### Unit tests

Highest coverage priority:

- unit conversions
- dew point and derived calculations
- pressure/altitude handling
- trend calculations
- interpretation rules and thresholds
- provenance/freshness logic
- time-zone behavior
- data normalization
- quality-tier selection

### Component tests

- scrubber interactions
- selected-time synchronization
- accessibility names/states
- alert priority
- chart data mapping
- partial-data rendering
- sensor comparison

### Integration tests

- provider response to normalized snapshot
- cache and stale behavior
- API fallback
- selected-time changes across scene, text and charts
- location resolution

### End-to-end tests

Critical journeys:

1. Open cached Home offline.
2. Scrub from calm morning to active evening.
3. Return to Now.
4. Open Layers and inspect selected altitude.
5. Switch Explore/Analysis without losing state.
6. View official alert.
7. Enable reduced motion.
8. Compare simulated sensor with official observation.

### Visual regression

Capture stable fixtures for:

- calm Home
- active transition Home
- severe alert Home
- night Home
- Layers Explore
- Layers Analysis
- stale/partial-data states

Concept images are not pixel-diff baselines. Coded approved states become baselines.

## 3. Performance budgets

Initial targets, subject to device testing:

- initial app shell JavaScript: keep as small as practical; set measured budget after Sprint 0
- Home interactive within 3 seconds on a representative mid-range mobile device on a warm connection
- steady scene target: 60 fps high tier, minimum acceptable 30 fps low tier
- no long task over 200 ms during normal scrub operation
- scrub response under 100 ms perceived latency
- automatic quality downgrade based on device capability and measured frame stability
- Canvas particle count capped and paused when page is backgrounded
- Flow/map code lazy-loaded

## 4. Accessibility gates

- automated axe checks on core routes
- manual VoiceOver and keyboard testing
- 200% text zoom without loss of content
- color contrast checks
- non-color chart differentiation
- reduced-motion validation
- 44 px touch targets
- accessible table/summary alternative for charts
- official alerts announced appropriately without repeated interruption

## 5. Scientific correctness gates

- all displayed values have units
- derived values identify derivation
- pressure level and altitude distinction preserved
- observation/forecast/model/sensor kinds labeled
- timestamps include location time zone
- no interpretation without minimum required inputs
- confidence decreases when data is stale or sources disagree
- official alerts remain verbatim or safely summarized with direct attribution

## 6. Resilience

### Error categories

- provider unavailable
- provider throttled
- malformed provider response
- location unsupported
- partial variable availability
- stale cache only
- offline
- sensor disconnected
- clock/time-zone mismatch

Each category has a user-facing state and telemetry code. Avoid generic “Something went wrong” when a useful cached state exists.

## 7. Observability

Track operational signals, not sensitive browsing history.

- API latency/error by provider adapter
- cache hit rate
- data freshness distributions
- normalization failures
- interpretation rule selected
- scene quality tier and frame-rate degradation
- client error rate
- offline usage
- feature interaction counts only after privacy review

Do not send exact location to analytics unless explicitly necessary and consented. Prefer coarse region or hashed location-grid identifiers.

## 8. Release gates

A release cannot ship when:

- official alert behavior is broken
- scene/text timestamps can diverge
- critical route lacks reduced-motion behavior
- provider failure causes fabricated placeholders
- mobile performance falls below low-tier threshold
- accessibility critical/serious issues remain
- documentation and decision log are stale

## 9. Browser/device matrix

Initial support:

- current and previous major Safari on iOS
- current and previous Chrome on Android
- current Chrome/Edge desktop
- current Firefox desktop where core features permit

Map/Canvas quality may vary, but data and navigation must remain functional.
