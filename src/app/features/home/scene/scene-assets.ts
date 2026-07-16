import { ScenePresentation, SceneQuality, SolarPhase } from './scene-presentation';

const ASSET_ROOT = '/assets/scenes/home';

export interface ResponsiveSceneAsset {
  readonly avif: string;
  readonly webp: string;
}

export interface CloudSceneAsset extends ResponsiveSceneAsset {
  readonly id:
    'high-cirrus' | 'middle-altocumulus' | 'low-scattered-cumulus' | 'low-developing-overcast';
  readonly opacity: number;
  readonly driftRatio: number;
}

export interface SceneAssets {
  readonly environment: ResponsiveSceneAsset;
  readonly clouds: readonly CloudSceneAsset[];
  readonly fog: ResponsiveSceneAsset;
  readonly fogOpacity: number;
  readonly cityLights: ResponsiveSceneAsset;
  readonly cityLightsOpacity: number;
  readonly foreground: ResponsiveSceneAsset;
}

function asset(directory: string, name: string): ResponsiveSceneAsset {
  return {
    avif: `${ASSET_ROOT}/${directory}/${name}.avif`,
    webp: `${ASSET_ROOT}/${directory}/${name}.webp`,
  };
}

function environmentName(scene: ScenePresentation): string {
  if (scene.activity === 'active') {
    return 'active-overcast';
  }

  const names: Record<SolarPhase, string> = {
    dawn: 'calm-dawn',
    day: 'calm-dawn',
    dusk: 'calm-dusk',
    night: 'calm-night',
  };
  return names[scene.solarPhase];
}

function cloud(id: CloudSceneAsset['id'], opacity: number, driftRatio: number): CloudSceneAsset {
  return { id, ...asset('clouds', id), opacity, driftRatio };
}

function cloudStack(scene: ScenePresentation, quality: SceneQuality): readonly CloudSceneAsset[] {
  const cirrus = cloud('high-cirrus', 0.24, 0.35);
  const middle = cloud('middle-altocumulus', 0.38, 0.62);
  const scattered = cloud('low-scattered-cumulus', 0.56, 1);
  const overcast = cloud('low-developing-overcast', 0.74, 0.78);

  if (quality === 'low') {
    return [
      scene.cloudCategory === 'overcast'
        ? overcast
        : scene.cloudCategory === 'broken'
          ? middle
          : scene.cloudCategory === 'scattered'
            ? scattered
            : cirrus,
    ];
  }

  if (scene.cloudCategory === 'clear') {
    return quality === 'high' ? [cirrus] : [];
  }
  if (scene.cloudCategory === 'scattered') {
    return quality === 'high' ? [cirrus, scattered] : [scattered];
  }
  if (scene.cloudCategory === 'broken') {
    return quality === 'high' ? [cirrus, middle, scattered] : [middle, scattered];
  }
  return quality === 'high' ? [middle, overcast] : [overcast];
}

export function deriveSceneAssets(scene: ScenePresentation, quality: SceneQuality): SceneAssets {
  const cityLightsOpacity =
    scene.solarPhase === 'night' ? 0.68 : scene.solarPhase === 'dusk' ? 0.3 : 0;
  const qualityFogRatio = quality === 'high' ? 0.7 : quality === 'medium' ? 0.5 : 0.35;

  return {
    environment: asset('environment', environmentName(scene)),
    clouds: cloudStack(scene, quality),
    fog: asset('fog', 'valley-fog'),
    fogOpacity: Math.min(0.6, scene.hazeOpacity * qualityFogRatio),
    cityLights: {
      avif: `${ASSET_ROOT}/masks/city-lights.webp`,
      webp: `${ASSET_ROOT}/masks/city-lights.webp`,
    },
    cityLightsOpacity,
    foreground: asset('foreground', 'tree-line'),
  };
}
