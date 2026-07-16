import { scenarioFixtures } from '../../../../domain/fixtures/scenario-fixtures';
import { deriveCalmInsight } from './calm-insight';

describe('deriveCalmInsight', () => {
  const snapshots = scenarioFixtures.primaryTimeline.snapshots;

  it('identifies a meaningful drying trend during calm weather', () => {
    const insight = deriveCalmInsight(snapshots[0]!, snapshots.slice(1, 5));
    expect(insight?.title).toBe('A drier window is developing');
    expect(insight?.evidence).toContain('1°C over the next 4 hours');
  });

  it('does not invent a calm insight during notable weather or without a future window', () => {
    expect(deriveCalmInsight(snapshots[12]!, snapshots.slice(13, 17))).toBeUndefined();
    expect(deriveCalmInsight(snapshots[0]!, [])).toBeUndefined();
  });

  it('describes a steady window when drying is not meaningful', () => {
    const insight = deriveCalmInsight(snapshots[5]!, [snapshots[6]!]);
    expect(insight?.title).toBe('A steady atmospheric window');
    expect(insight?.evidence).toContain('Pressure changes');
  });
});
