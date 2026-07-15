import { scenarioFixtures } from '../../../domain/fixtures/scenario-fixtures';
import { deriveScenePresentation } from './scene-presentation';

describe('deriveScenePresentation', () => {
  const snapshots = scenarioFixtures.primaryTimeline.snapshots;

  it('maps selected time to solar lighting and cloud categories', () => {
    expect(deriveScenePresentation(snapshots[0]!, 'high').solarPhase).toBe('dawn');
    expect(deriveScenePresentation(snapshots[1]!, 'high').solarPhase).toBe('day');
    expect(deriveScenePresentation(snapshots[13]!, 'high').solarPhase).toBe('dusk');
    expect(deriveScenePresentation(snapshots[18]!, 'high').solarPhase).toBe('night');
    expect(deriveScenePresentation(snapshots[0]!, 'high').cloudCategory).toBe('scattered');
    expect(deriveScenePresentation(snapshots[20]!, 'high').cloudCategory).toBe('broken');
  });

  it('maps moisture, visibility, wind, and precipitation without inventing values', () => {
    const calm = deriveScenePresentation(snapshots[0]!, 'high');
    const storm = deriveScenePresentation(snapshots[24]!, 'high');
    expect(calm.hazeOpacity).toBeCloseTo(0.07);
    expect(storm.hazeOpacity).toBe(0.5);
    expect(calm.precipitationCategory).toBe('off');
    expect(storm.precipitationCategory).toBe('heavy');
    expect(storm.windDirectionDegrees).toBe(snapshots[24]!.surface.wind.directionDegrees);
  });

  it('caps visual density by quality tier', () => {
    expect(deriveScenePresentation(snapshots[0]!, 'high').windParticleCount).toBe(18);
    expect(deriveScenePresentation(snapshots[0]!, 'medium').windParticleCount).toBe(10);
    expect(deriveScenePresentation(snapshots[0]!, 'low').windParticleCount).toBe(5);
  });
});
