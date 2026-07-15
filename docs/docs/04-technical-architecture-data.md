# Atmos Technical Architecture and Data Strategy

## 1. Architecture goals

- provider-independent domain model
- deterministic interpretation
- synchronized time state
- progressive visual enhancement
- compact mobile payloads
- explicit provenance
- testable calculations
- ability to add direct model processing later without rewriting features

## 2. Recommended stack

### Frontend

- Angular standalone application
- strict TypeScript
- Angular Signals for local/shared UI state
- RxJS for API streams, polling, orchestration and cancellation
- PWA/service worker
- IndexedDB for snapshots, settings and offline cache
- feature-based routing

Use the current supported Angular release at project creation; document the exact version in the repository after scaffolding rather than hard-coding a potentially stale version here.

### Graphics

- CSS: layout, surfaces, gradients and basic layered depth
- SVG: charts, profiles, timeline, icons and analytical overlays
- Canvas: wind particles, rain, fog and dense field effects
- MapLibre GL JS: Flow basemap and geographic layers
- Three.js/WebGL scene graph: deferred until profiling proves CSS/SVG/Canvas insufficient

### Backend

Initial recommendation:

- Firebase Hosting for the PWA
- Cloud Run service for normalized Atmos API
- Firestore for user settings and sensor metadata when accounts are introduced
- Cloud Storage only for processed model assets or retained event media

The API layer owns provider normalization, caching, timestamp alignment, interpretation inputs and later GRIB2/model processing.

## 3. Data sources and usage

### National Weather Service API

Use for United States official alerts, forecasts and observations. The API exposes forecasts, alerts and observations and resolves forecast endpoints from latitude/longitude. Official documentation: https://www.weather.gov/documentation/services-web-api

### Open-Meteo

Use during prototype/early MVP for surface forecasts and pressure-level variables such as temperature, relative humidity/dew point, cloud cover, wind, vertical velocity and geopotential height. Pressure levels do not have fixed altitudes. Licensing, attribution and rate limits must be reviewed before production/commercial use. Official documentation: https://open-meteo.com/en/docs

### NOAA HRRR / NOMADS

Potential advanced source for high-resolution regional fields. HRRR is a NOAA real-time, approximately 3 km, hourly updated convection-allowing model. NOMADS provides operational model distribution and GRIB filtering. GRIB2 must be processed server-side. Official references: https://rapidrefresh.noaa.gov/hrrr/ and https://nomads.ncep.noaa.gov/

### MapLibre GL JS

Open-source TypeScript/WebGL map renderer for interactive geographic views. It does not itself supply weather data. Official documentation: https://www.maplibre.org/maplibre-gl-js/docs/

## 4. Data rollout

### Phase A — deterministic mock data

Checked-in fixtures for calm, transitional, storm-development, night, stale and partial-data scenarios.

### Phase B — early live MVP

NWS official data plus a model/forecast adapter, normalized behind the Atmos API. Simulated local sensor adapter.

### Phase C — advanced model processing

Server-side HRRR retrieval, field extraction, geographic subsetting, compact tile/snapshot generation and historical retention.

## 5. Domain model

```ts
export type DataKind =
  'observation' | 'forecast' | 'model' | 'sensor' | 'derived' | 'interpretation';

export interface DataProvenance {
  kind: DataKind;
  provider: string;
  validAt: string;
  retrievedAt: string;
  observedAt?: string;
  issuedAt?: string;
  modelRun?: string;
  confidence?: number;
}

export interface AtmosLocation {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  elevationMeters?: number;
  timeZone: string;
}

export interface WindVector {
  speedMps: number;
  directionDegrees: number;
  gustMps?: number;
}

export interface SurfaceConditions {
  temperatureC: number;
  apparentTemperatureC?: number;
  dewPointC: number;
  relativeHumidityPercent: number;
  seaLevelPressureHpa?: number;
  surfacePressureHpa?: number;
  visibilityMeters?: number;
  wind: WindVector;
  precipitationRateMmHr?: number;
}

export interface AtmosphericLayer {
  pressureHpa: number;
  geopotentialHeightMeters?: number;
  temperatureC?: number;
  dewPointC?: number;
  relativeHumidityPercent?: number;
  cloudCoverPercent?: number;
  verticalVelocity?: number;
  wind?: WindVector;
}

export interface AtmosphericInterpretation {
  state: string;
  explanation: string;
  confidence: number;
  severity: 'informational' | 'notable' | 'hazardous';
  driverIds: string[];
}

export interface AtmosphericSnapshot {
  location: AtmosLocation;
  validAt: string;
  surface: SurfaceConditions;
  layers: AtmosphericLayer[];
  interpretation: AtmosphericInterpretation;
  provenance: DataProvenance[];
}
```

Provider response types live only inside adapters. UI components consume domain types.

## 6. State architecture

Primary shared state:

- selected location
- timeline/snapshots
- selected timestamp/index
- selected atmospheric layer
- unit preferences
- motion/quality settings
- sensor inventory
- freshness/provenance summary

The selected timestamp is one source of truth. Components derive their displayed state from it.

## 7. Interpretation engine

Initial engine uses prioritized deterministic rules.

```ts
export interface InterpretationRule {
  id: string;
  priority: number;
  matches(context: AtmosphericContext): boolean;
  createResult(context: AtmosphericContext): AtmosphericInterpretation;
}
```

Inputs may include pressure tendency, dew-point tendency, temperature/dew-point spread, wind shift, cloud trend, precipitation probability, CAPE, vertical motion, official alerts and data confidence.

Rules require tests at threshold boundaries. The engine must be able to return “insufficient confidence” rather than forcing a strong statement.

## 8. Suggested repository structure

```text
src/app/
  core/
    api/
    cache/
    location/
    settings/
    state/
  domain/
    calculations/
    interpretation/
    models/
    providers/
  shared/
    charts/
    controls/
    icons/
    provenance/
  features/
    home/
      scene/
      timeline/
      interpretation/
      trends/
      insights/
    layers/
      explore/
      analysis/
      profiles/
    flow/
      map/
      overlays/
      particles/
    sensors/
      devices/
      comparison/
```

## 9. API boundary

Suggested endpoints:

- `GET /v1/locations/resolve?lat=&lon=`
- `GET /v1/atmosphere/timeline?locationId=&start=&hours=`
- `GET /v1/atmosphere/profile?locationId=&validAt=`
- `GET /v1/flow/manifest?bbox=&validAt=&layer=`
- `GET /v1/alerts?locationId=`
- `GET /v1/sensors`
- `POST /v1/sensors/readings` later

Responses include cache metadata, provenance and schema version.

## 10. Security and privacy

- exact location stored only with explicit user consent
- allow approximate location and manual city selection
- minimize retained location history
- protect provider credentials server-side
- validate sensor ingestion payloads
- apply authentication before accepting real device writes
- document third-party data and telemetry

## 11. Caching

- current observations: short TTL appropriate to provider cadence
- hourly forecasts: cache by model run / issue time
- alerts: short TTL with conditional requests where supported
- pressure profiles: cache by location grid and valid time
- client IndexedDB keeps last successful timeline and selected settings
- stale content remains visible with explicit age

## 12. Architecture decisions deferred

- exact Angular state library beyond Signals/RxJS
- precise chart library versus custom SVG
- authentication timing
- Cloud Run language/runtime
- HRRR decoding library and tile format
- long-term event-history database
