import { isAtmosphericSnapshot } from '../validation/atmospheric-snapshot.validator';
import { scenarioFixtures } from './scenario-fixtures';

describe('ATM-101 scenario fixtures', () => {
  it('provides a 25-hour primary timeline spanning calm, transition, and storm development', () => {
    const primary = scenarioFixtures.primaryTimeline;

    expect(primary.snapshots).toHaveLength(25);
    expect(new Set(primary.snapshots.map((snapshot) => snapshot.interpretation.state))).toEqual(
      new Set(['Calm and slowly drying', 'Moisture increasing', 'Storms developing']),
    );
  });

  it('uses deterministic hourly timestamps in the York, South Carolina time zone', () => {
    const snapshots = scenarioFixtures.primaryTimeline.snapshots;

    expect(snapshots[0]?.validAt).toBe('2026-07-15T06:00:00-04:00');
    expect(snapshots.at(-1)?.validAt).toBe('2026-07-16T06:00:00-04:00');
    expect(
      snapshots.every((snapshot, index) => {
        if (index === 0) return true;
        return (
          Date.parse(snapshot.validAt) - Date.parse(snapshots[index - 1]!.validAt) === 3_600_000
        );
      }),
    ).toBe(true);
    expect(snapshots.every((snapshot) => snapshot.location.timeZone === 'America/New_York')).toBe(
      true,
    );
  });

  it('provides separately labeled calm-night, stale, and partial-data fixtures', () => {
    expect(scenarioFixtures.calmNight.status).toBe('fresh');
    expect(scenarioFixtures.stale.status).toBe('stale');
    expect(scenarioFixtures.partialData.status).toBe('partial');
    expect(scenarioFixtures.calmNight.id).not.toBe(scenarioFixtures.primaryTimeline.id);
  });

  it('includes official-alert presentation and simulated sensor-divergence scenarios', () => {
    expect(scenarioFixtures.officialAlert.expectations).toContain('official-alert-priority');
    expect(scenarioFixtures.sensorDivergence.expectations).toContain('local-official-comparison');
    expect(scenarioFixtures.officialAlert.snapshots[0]?.interpretation.severity).toBe('hazardous');
    expect(
      scenarioFixtures.sensorDivergence.snapshots[0]?.provenance.some(
        (source) => source.kind === 'sensor',
      ),
    ).toBe(true);
  });

  it('provides valid surface and pressure-level data with synthetic provenance', () => {
    const fixtures = Object.values(scenarioFixtures);
    const snapshots = fixtures.flatMap((fixture) => fixture.snapshots);

    expect(snapshots.every(isAtmosphericSnapshot)).toBe(true);
    expect(snapshots.every((snapshot) => snapshot.layers.length > 0)).toBe(true);
    expect(
      snapshots.every((snapshot) =>
        snapshot.provenance.every((source) => source.provider === 'Atmos synthetic fixture'),
      ),
    ).toBe(true);
  });

  it('stores interpretation expectations for later rule-engine tests', () => {
    expect(scenarioFixtures.primaryTimeline.expectations).toEqual([
      'calm-drying',
      'moisture-increase',
      'storm-development',
    ]);
    expect(scenarioFixtures.calmNight.expectations).toContain('fog-risk');
    expect(scenarioFixtures.stale.expectations).toContain('stale-confidence-reduction');
    expect(scenarioFixtures.partialData.expectations).toContain('partial-data-disclosure');
  });
});
