import {
  ATMOS_SCHEMA_VERSION,
  AtmosLocation,
  AtmosphericInterpretation,
  AtmosphericLayer,
  AtmosphericSnapshot,
  SurfaceConditions,
} from '../models/atmospheric-snapshot';

export type FixtureStatus = 'fresh' | 'stale' | 'partial';

export interface AtmosScenarioFixture {
  readonly id: string;
  readonly label: string;
  readonly description: string;
  readonly status: FixtureStatus;
  readonly snapshots: readonly AtmosphericSnapshot[];
  readonly expectations: readonly string[];
}

const YORK_LOCATION: AtmosLocation = {
  id: 'york-sc-demo',
  name: 'York, South Carolina',
  latitude: 34.9943,
  longitude: -81.242,
  elevationMeters: 232,
  timeZone: 'America/New_York',
};

const HOUR_MS = 3_600_000;
const YORK_SUMMER_OFFSET_MS = 4 * HOUR_MS;

function yorkTimestamp(instantMs: number): string {
  const localClock = new Date(instantMs - YORK_SUMMER_OFFSET_MS).toISOString().slice(0, 19);
  return `${localClock}-04:00`;
}

function interpretationForHour(hourIndex: number): AtmosphericInterpretation {
  if (hourIndex < 10) {
    return {
      state: 'Calm and slowly drying',
      explanation:
        'Synthetic high pressure supports light northwest flow and a gradual drying trend.',
      confidence: 0.92,
      severity: 'informational',
      driverIds: ['pressure-rise', 'dew-point-fall'],
    };
  }

  if (hourIndex < 18) {
    return {
      state: 'Moisture increasing',
      explanation:
        'Synthetic southerly flow increases low-level moisture ahead of an evening transition.',
      confidence: 0.82,
      severity: 'notable',
      driverIds: ['moisture-return', 'wind-shift'],
    };
  }

  return {
    state: 'Storms developing',
    explanation: 'Synthetic instability, deepening moisture, and lift support storm development.',
    confidence: 0.76,
    severity: 'notable',
    driverIds: ['instability-rise', 'vertical-motion', 'precipitation-onset'],
  };
}

function surfaceForHour(hourIndex: number): SurfaceConditions {
  const transitioning = hourIndex >= 10;
  const stormDevelopment = hourIndex >= 18;

  return {
    temperatureC: 20 + Math.min(hourIndex, 10) * 0.9 - Math.max(hourIndex - 18, 0) * 0.8,
    dewPointC: transitioning ? 13 + (hourIndex - 10) * 0.7 : 15 - hourIndex * 0.25,
    relativeHumidityPercent: transitioning
      ? Math.min(92, 55 + (hourIndex - 10) * 3)
      : 72 - hourIndex * 2,
    seaLevelPressureHpa: 1018.4 - hourIndex * 0.28,
    visibilityMeters: stormDevelopment ? 8_000 : 16_000,
    wind: {
      speedMps: transitioning ? 4.2 + (hourIndex - 10) * 0.18 : 2.2,
      directionDegrees: transitioning ? 190 : 315,
      gustMps: stormDevelopment ? 10.5 : undefined,
    },
    precipitationRateMmHr: stormDevelopment ? Math.min(8, (hourIndex - 17) * 1.2) : 0,
  };
}

function layersForHour(hourIndex: number, partial = false): readonly AtmosphericLayer[] {
  if (partial) return [{ pressureHpa: 850, geopotentialHeightMeters: 1_510 }];

  const moistening = Math.max(hourIndex - 10, 0) * 0.35;
  return [
    {
      pressureHpa: 1000,
      geopotentialHeightMeters: 130,
      temperatureC: 19 - hourIndex * 0.08,
      dewPointC: 13 + moistening,
      relativeHumidityPercent: Math.min(95, 62 + moistening * 2),
      cloudCoverPercent: Math.min(90, 12 + hourIndex * 2.5),
      wind: { speedMps: 3.2, directionDegrees: hourIndex < 10 ? 310 : 195 },
    },
    {
      pressureHpa: 850,
      geopotentialHeightMeters: 1_510,
      temperatureC: 15.5 - hourIndex * 0.06,
      dewPointC: 7 + moistening,
      relativeHumidityPercent: Math.min(92, 48 + moistening * 2.4),
      cloudCoverPercent: Math.min(95, 18 + hourIndex * 2.8),
      wind: { speedMps: 7.5, directionDegrees: hourIndex < 10 ? 300 : 210 },
    },
    {
      pressureHpa: 700,
      geopotentialHeightMeters: 3_110,
      temperatureC: 5.5,
      dewPointC: -2 + moistening * 0.4,
      relativeHumidityPercent: Math.min(80, 34 + moistening),
      cloudCoverPercent: Math.min(88, 22 + hourIndex * 2),
      verticalVelocity: hourIndex >= 18 ? -0.35 : -0.04,
      wind: { speedMps: 12, directionDegrees: 235 },
    },
  ];
}

interface SnapshotOptions {
  readonly hourIndex: number;
  readonly validAt: string;
  readonly interpretation?: AtmosphericInterpretation;
  readonly surface?: SurfaceConditions;
  readonly layers?: readonly AtmosphericLayer[];
  readonly retrievedAt?: string;
}

function createSnapshot(options: SnapshotOptions): AtmosphericSnapshot {
  return {
    schemaVersion: ATMOS_SCHEMA_VERSION,
    location: YORK_LOCATION,
    validAt: options.validAt,
    surface: options.surface ?? surfaceForHour(options.hourIndex),
    layers: options.layers ?? layersForHour(options.hourIndex),
    interpretation: options.interpretation ?? interpretationForHour(options.hourIndex),
    provenance: [
      {
        kind: 'model',
        provider: 'Atmos synthetic fixture',
        validAt: options.validAt,
        retrievedAt: options.retrievedAt ?? '2026-07-15T05:45:00-04:00',
        issuedAt: '2026-07-15T05:00:00-04:00',
        modelRun: 'synthetic-2026-07-15T05:00:00-04:00',
        confidence:
          options.interpretation?.confidence ?? interpretationForHour(options.hourIndex).confidence,
      },
    ],
  };
}

const primaryStart = Date.parse('2026-07-15T06:00:00-04:00');
const primarySnapshots = Array.from({ length: 25 }, (_, hourIndex) =>
  createSnapshot({ hourIndex, validAt: yorkTimestamp(primaryStart + hourIndex * HOUR_MS) }),
);

const calmNightInterpretation: AtmosphericInterpretation = {
  state: 'Calm night with fog risk',
  explanation:
    'Synthetic light wind and a narrowing temperature–dew point spread favor patchy fog.',
  confidence: 0.78,
  severity: 'notable',
  driverIds: ['light-wind', 'dew-point-spread'],
};

const staleInterpretation: AtmosphericInterpretation = {
  state: 'Latest atmosphere unavailable',
  explanation:
    'The synthetic cached snapshot is stale, so current interpretation confidence is reduced.',
  confidence: 0.34,
  severity: 'informational',
  driverIds: ['stale-data'],
};

const partialInterpretation: AtmosphericInterpretation = {
  state: 'Surface trend available',
  explanation: 'Synthetic upper-air fields are incomplete and must remain visibly qualified.',
  confidence: 0.51,
  severity: 'informational',
  driverIds: ['partial-profile'],
};

const alertInterpretation: AtmosphericInterpretation = {
  state: 'Official severe thunderstorm warning',
  explanation:
    'Synthetic presentation fixture only. Official issuer, area, validity, and safety wording take priority.',
  confidence: 1,
  severity: 'hazardous',
  driverIds: ['official-alert'],
};

const sensorInterpretation: AtmosphericInterpretation = {
  state: 'Backyard is warmer and drier',
  explanation:
    'A synthetic backyard sensor differs meaningfully from the nearby synthetic official context.',
  confidence: 0.84,
  severity: 'informational',
  driverIds: ['sensor-temperature-difference', 'sensor-humidity-difference'],
};

const sensorBaseSnapshot = createSnapshot({
  hourIndex: 9,
  validAt: '2026-07-15T15:00:00-04:00',
  interpretation: sensorInterpretation,
});

const sensorDivergenceSnapshot: AtmosphericSnapshot = {
  ...sensorBaseSnapshot,
  provenance: [
    ...sensorBaseSnapshot.provenance,
    {
      kind: 'sensor',
      provider: 'Atmos synthetic fixture',
      validAt: sensorBaseSnapshot.validAt,
      retrievedAt: '2026-07-15T15:00:30-04:00',
      observedAt: '2026-07-15T15:00:00-04:00',
      confidence: 0.84,
    },
  ],
};

export const scenarioFixtures: Readonly<Record<string, AtmosScenarioFixture>> & {
  readonly primaryTimeline: AtmosScenarioFixture;
  readonly calmNight: AtmosScenarioFixture;
  readonly stale: AtmosScenarioFixture;
  readonly partialData: AtmosScenarioFixture;
  readonly officialAlert: AtmosScenarioFixture;
  readonly sensorDivergence: AtmosScenarioFixture;
} = {
  primaryTimeline: {
    id: 'york-primary-transition',
    label: 'Calm day to evening storm development',
    description: 'Synthetic 25-hour York timeline for the defining Home time interaction.',
    status: 'fresh',
    snapshots: primarySnapshots,
    expectations: ['calm-drying', 'moisture-increase', 'storm-development'],
  },
  calmNight: {
    id: 'york-calm-night-fog-risk',
    label: 'Calm night with developing fog risk',
    description: 'Synthetic overnight cooling with light wind and a narrowing dew-point spread.',
    status: 'fresh',
    snapshots: [22, 23, 24].map((hourIndex) =>
      createSnapshot({
        hourIndex,
        validAt: yorkTimestamp(
          Date.parse('2026-07-16T00:00:00-04:00') + (hourIndex - 22) * HOUR_MS,
        ),
        interpretation: calmNightInterpretation,
      }),
    ),
    expectations: ['fog-risk', 'calm-night'],
  },
  stale: {
    id: 'york-stale-cache',
    label: 'Stale cached atmosphere',
    description: 'Synthetic cached data retained for an explicit stale/offline experience.',
    status: 'stale',
    snapshots: [
      createSnapshot({
        hourIndex: 8,
        validAt: '2026-07-15T14:00:00-04:00',
        retrievedAt: '2026-07-15T14:05:00-04:00',
        interpretation: staleInterpretation,
      }),
    ],
    expectations: ['stale-confidence-reduction', 'cached-data-disclosure'],
  },
  partialData: {
    id: 'york-partial-pressure-profile',
    label: 'Partial pressure-level data',
    description: 'Synthetic snapshot with a deliberately incomplete upper-air profile.',
    status: 'partial',
    snapshots: [
      createSnapshot({
        hourIndex: 12,
        validAt: '2026-07-15T18:00:00-04:00',
        layers: layersForHour(12, true),
        interpretation: partialInterpretation,
      }),
    ],
    expectations: ['partial-data-disclosure', 'unsupported-fields-hidden'],
  },
  officialAlert: {
    id: 'york-official-alert-presentation',
    label: 'Official severe-weather alert presentation',
    description:
      'Synthetic UI fixture for testing official warning priority; it is not an active warning.',
    status: 'fresh',
    snapshots: [
      createSnapshot({
        hourIndex: 20,
        validAt: '2026-07-16T02:00:00-04:00',
        interpretation: alertInterpretation,
      }),
    ],
    expectations: ['official-alert-priority', 'issuer-and-validity-visible'],
  },
  sensorDivergence: {
    id: 'york-backyard-sensor-divergence',
    label: 'Simulated backyard sensor divergence',
    description:
      'Synthetic local sensor context that differs from a nearby synthetic official observation.',
    status: 'fresh',
    snapshots: [sensorDivergenceSnapshot],
    expectations: ['local-official-comparison', 'sensor-scope-disclosure'],
  },
};
