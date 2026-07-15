# Atmos Product Requirements Document

## 1. Product definition

Atmos is a **personal atmospheric observatory** that explains what the atmosphere is doing, why it is changing, what is likely to happen next and how the user's immediate environment differs from nearby official observations.

Atmos is not primarily a forecast app. Conventional weather apps emphasize temperature, icons and precipitation percentages. Atmos emphasizes atmospheric state, causation, evolution, vertical structure, regional movement and local comparison.

### Product promise

Within several seconds, the user should be able to answer:

1. What is the atmosphere doing now?
2. What factors are driving that state?
3. When will the next meaningful transition occur?
4. How confident is that interpretation?
5. Is the user's immediate environment behaving differently from nearby official data?

## 2. Product pillars

- **Interpretive:** translate measurements and model output into understandable relationships.
- **Visual:** use motion, depth and environmental effects to communicate change.
- **Local:** compare forecasts, official observations and optional personal sensors.
- **Exploratory:** allow movement through time, altitude and geography.
- **Scientifically honest:** distinguish observations, forecasts, models, derived values and interpretations.
- **Useful in ordinary weather:** remain engaging during calm, dry and uneventful conditions.
- **Progressively disclosed:** serve casual users first while preserving technical depth.

## 3. Personas

### Weather-curious homeowner

Wants plain-language explanations, reliable timing, outdoor planning insights and personal-local context without needing formal meteorological training.

### Weather enthusiast

Wants pressure-level data, profile charts, provenance, model timing, confidence indicators and a deeper explanation of atmospheric structure.

Atmos serves both through **Explore** and **Analysis** modes rather than separate products.

## 4. MVP scope

### Home — Atmospheric Situation

The Home screen is the primary daily experience and must include:

- location and freshness state
- current atmospheric interpretation
- current surface conditions with temperature secondary to the atmospheric state
- data-driven 2.5D environmental scene
- interactive timeline spanning recent observations and approximately 24 forecast hours
- significant transition markers such as sunrise, sunset, wind shift, precipitation onset or risk peak
- compact pressure, dew point, wind and event-risk trends
- one primary interpreted insight
- regional-flow summary
- local-versus-official comparison when a sensor exists
- official severe-weather alert treatment
- loading, stale, offline, partial-data and reduced-motion states

### Layers — Vertical Atmosphere

- atmospheric column from surface through upper levels
- Explore and Analysis modes
- altitude or pressure-level selection
- temperature, moisture, dew point or relative humidity by level
- wind speed and direction by level
- cloud layers and cloud-base information where supported
- freezing level
- basic instability indicators such as CAPE when available
- plain-language explanation of the selected layer
- visible data provenance and validity time

### Flow — Regional Movement

- regional interactive map
- animated surface-wind field
- pressure and moisture overlays
- precipitation overlay
- location marker and selected-point values
- synchronized time control
- layer selector
- graceful fallback when a data field is unavailable

### Sensors

- simulated sensor devices in the MVP
- sensor naming and location labels
- temperature, humidity, dew point and pressure where supported
- last-reading time, connectivity and battery status
- comparison with nearby official observations
- adapter contract that can later support ESP32 hardware

### Settings / More

- saved locations
- unit system
- reduced motion and animation intensity
- visual-quality level
- accessibility preferences
- data-source transparency
- alert preferences
- cache/storage controls
- attribution and privacy information

## 5. Deferred roadmap

The following are important but explicitly deferred until the MVP core is reliable:

- event journal and event replay
- historical atmospheric analogs
- multi-model comparison
- radar-based arrival estimates
- lightning visualization
- full 3D globe or volumetric cloud engine
- physical sensor hardware
- community sensor sharing
- climate analysis
- generative-AI forecasting
- wearable applications
- non-official custom severe-weather alerts

## 6. Feature behavior principles

### Atmospheric interpretation

Interpretations are deterministic and testable in the first release. Each interpretation contains:

- state headline
- short explanation
- contributing drivers
- confidence level
- validity time
- source/provenance detail

Atmos must never create an independent warning that could be confused with an official alert.

### Time exploration

Time is the central interaction. Changing selected time updates the scene, interpretation, metrics, charts and insight as one synchronized state. No component may display data from a different timestamp without labeling that difference.

### Personal locality

Atmos remains fully useful without hardware. A local sensor enhances the product but is not required. Differences should be highlighted only when meaningful and should never imply that one sensor represents an entire neighborhood.

## 7. Non-functional requirements

- mobile-first PWA
- strict accessibility baseline targeting WCAG 2.2 AA
- reduced-motion support from the beginning
- usable stale/offline experience
- provider-independent domain models
- compact data payloads
- battery-conscious animation
- progressive enhancement for high-performance devices
- transparent data age and origin
- no fabricated values or unsupported precision

## 8. Success measures

MVP success is demonstrated when:

- users can correctly describe the atmospheric state and next transition after brief use
- the timeline feels like moving the atmosphere through time rather than browsing forecast cards
- calm-weather use remains informative and visually engaging
- Home and Layers work at acceptable frame rates on target mobile hardware
- data freshness, source and confidence are understandable
- the same domain snapshot can drive multiple visual modes without provider-specific UI logic

## 9. Out of scope behaviors

- diagnosing personal health effects from weather
- replacing official alerts or emergency guidance
- promising hyperlocal accuracy unsupported by sensor density
- showing model-derived imagery as a literal view of the sky
- exposing raw GRIB model files to the browser
