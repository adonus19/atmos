import { ATMOS_SCHEMA_VERSION } from '../models/atmospheric-snapshot';
import { isAtmosphericSnapshot, parseAtmosphericSnapshot } from './atmospheric-snapshot.validator';

const validFixture: unknown = {
  schemaVersion: ATMOS_SCHEMA_VERSION,
  location: {
    id: 'york-sc',
    name: 'York, SC',
    latitude: 34.9943,
    longitude: -81.242,
    timeZone: 'America/New_York',
  },
  validAt: '2026-07-15T16:00:00-04:00',
  surface: {
    temperatureC: 28,
    dewPointC: 18,
    relativeHumidityPercent: 54,
    wind: { speedMps: 3, directionDegrees: 315 },
  },
  layers: [{ pressureHpa: 850, temperatureC: 17 }],
  interpretation: {
    state: 'Stable and drying',
    explanation: 'Synthetic test state.',
    confidence: 0.9,
    severity: 'informational',
    driverIds: ['pressure-rise'],
  },
  provenance: [
    {
      kind: 'model',
      provider: 'Synthetic fixture',
      validAt: '2026-07-15T16:00:00-04:00',
      retrievedAt: '2026-07-15T12:00:00-04:00',
    },
  ],
};

describe('AtmosphericSnapshot validation', () => {
  it('accepts a valid provider-independent fixture', () => {
    expect(isAtmosphericSnapshot(validFixture)).toBe(true);
    expect(parseAtmosphericSnapshot(validFixture).location.name).toBe('York, SC');
  });

  it.each([
    null,
    {},
    { ...(validFixture as object), schemaVersion: 2 },
    { ...(validFixture as object), validAt: 'not-a-date' },
    { ...(validFixture as object), layers: [{ pressureHpa: '850' }] },
    { ...(validFixture as object), provenance: [{ kind: 'invented' }] },
  ])('rejects malformed input: %o', (value) => {
    expect(isAtmosphericSnapshot(value)).toBe(false);
  });

  it('throws a useful error when parsing an invalid fixture', () => {
    expect(() => parseAtmosphericSnapshot({})).toThrowError(/schema version 1/);
  });
});
