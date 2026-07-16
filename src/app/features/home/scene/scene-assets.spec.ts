import { ScenePresentation } from './scene-presentation';
import { deriveSceneAssets } from './scene-assets';

describe('deriveSceneAssets', () => {
  const calmDawn: ScenePresentation = {
    solarPhase: 'dawn',
    cloudCategory: 'scattered',
    hazeOpacity: 0.28,
    windParticleCount: 18,
    windSpeedMps: 1.4,
    windDirectionDegrees: 215,
    precipitationCategory: 'off',
    activity: 'calm',
    summary: 'Calm dawn.',
  };

  it('selects a matched environment and restrained calm layers', () => {
    const assets = deriveSceneAssets(calmDawn, 'high');

    expect(assets.environment).toEqual({
      avif: '/assets/scenes/home/environment/calm-dawn.avif',
      webp: '/assets/scenes/home/environment/calm-dawn.webp',
    });
    expect(assets.clouds.map((cloud) => cloud.id)).toEqual([
      'high-cirrus',
      'low-scattered-cumulus',
    ]);
    expect(assets.cityLightsOpacity).toBe(0);
    expect(assets.fogOpacity).toBeCloseTo(0.2);
  });

  it('uses active terrain and developing cloud texture for active snapshots', () => {
    const assets = deriveSceneAssets(
      { ...calmDawn, activity: 'active', cloudCategory: 'overcast' },
      'high',
    );

    expect(assets.environment.webp).toContain('active-overcast');
    expect(assets.clouds.map((cloud) => cloud.id)).toContain('low-developing-overcast');
  });

  it('gates city lights to dusk and night', () => {
    expect(
      deriveSceneAssets({ ...calmDawn, solarPhase: 'dusk' }, 'high').cityLightsOpacity,
    ).toBeGreaterThan(0);
    expect(
      deriveSceneAssets({ ...calmDawn, solarPhase: 'night' }, 'high').cityLightsOpacity,
    ).toBeGreaterThan(
      deriveSceneAssets({ ...calmDawn, solarPhase: 'dusk' }, 'high').cityLightsOpacity,
    );
  });

  it('uses matched calm plates across every solar phase', () => {
    expect(deriveSceneAssets(calmDawn, 'high').environment.webp).toContain('calm-dawn.webp');
    expect(
      deriveSceneAssets({ ...calmDawn, solarPhase: 'day' }, 'high').environment.webp,
    ).toContain('calm-dawn.webp');
    expect(
      deriveSceneAssets({ ...calmDawn, solarPhase: 'dusk' }, 'high').environment.webp,
    ).toContain('calm-dusk.webp');
    expect(
      deriveSceneAssets({ ...calmDawn, solarPhase: 'night' }, 'high').environment.webp,
    ).toContain('calm-night.webp');
  });

  it('reduces texture layers for medium and low quality without removing the environment', () => {
    const broken = { ...calmDawn, cloudCategory: 'broken' } as const;

    expect(deriveSceneAssets(broken, 'high').clouds.length).toBeGreaterThan(
      deriveSceneAssets(broken, 'medium').clouds.length,
    );
    expect(deriveSceneAssets(broken, 'low').clouds).toHaveLength(1);
    expect(deriveSceneAssets(broken, 'low').environment).toEqual(
      deriveSceneAssets(broken, 'high').environment,
    );
  });
});
