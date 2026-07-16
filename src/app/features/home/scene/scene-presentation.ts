import { AtmosphericSnapshot } from '../../../domain/models/atmospheric-snapshot';

export type SceneQuality = 'high' | 'medium' | 'low';
export type SolarPhase = 'dawn' | 'day' | 'dusk' | 'night';
export type CloudCategory = 'clear' | 'scattered' | 'broken' | 'overcast';
export type PrecipitationCategory = 'off' | 'light' | 'moderate' | 'heavy';
export type SceneActivity = 'calm' | 'transition' | 'active';

export interface ScenePresentation {
  readonly solarPhase: SolarPhase;
  readonly cloudCategory: CloudCategory;
  readonly hazeOpacity: number;
  readonly windParticleCount: number;
  readonly windSpeedMps: number;
  readonly windDirectionDegrees: number;
  readonly precipitationCategory: PrecipitationCategory;
  readonly activity: SceneActivity;
  readonly summary: string;
}

export function deriveScenePresentation(
  snapshot: AtmosphericSnapshot,
  quality: SceneQuality,
): ScenePresentation {
  const localHour = Number(snapshot.validAt.slice(11, 13));
  const solarPhase: SolarPhase =
    localHour === 6
      ? 'dawn'
      : localHour >= 7 && localHour < 19
        ? 'day'
        : localHour === 19
          ? 'dusk'
          : 'night';
  const coverValues = snapshot.layers
    .map((layer) => layer.cloudCoverPercent)
    .filter((cover): cover is number => cover !== undefined);
  const averageCover = coverValues.length
    ? coverValues.reduce((total, cover) => total + cover, 0) / coverValues.length
    : 0;
  const cloudCategory: CloudCategory =
    averageCover < 15
      ? 'clear'
      : averageCover < 45
        ? 'scattered'
        : averageCover < 75
          ? 'broken'
          : 'overcast';
  const visibilityHaze = snapshot.surface.visibilityMeters
    ? 1 - Math.min(snapshot.surface.visibilityMeters / 16_000, 1)
    : 0;
  const humidityHaze = Math.max(snapshot.surface.relativeHumidityPercent - 65, 0) / 100;
  const hazeOpacity = Math.min(0.72, Math.max(visibilityHaze, humidityHaze));
  const precipitationRate = snapshot.surface.precipitationRateMmHr ?? 0;
  const precipitationCategory: PrecipitationCategory =
    precipitationRate <= 0
      ? 'off'
      : precipitationRate < 2.5
        ? 'light'
        : precipitationRate < 7.5
          ? 'moderate'
          : 'heavy';
  const windParticleCount = quality === 'high' ? 18 : quality === 'medium' ? 10 : 5;
  const activity: SceneActivity =
    precipitationCategory === 'moderate' || precipitationCategory === 'heavy'
      ? 'active'
      : precipitationCategory === 'light' || snapshot.surface.wind.speedMps >= 4
        ? 'transition'
        : 'calm';

  return {
    solarPhase,
    cloudCategory,
    hazeOpacity,
    windParticleCount,
    windSpeedMps: snapshot.surface.wind.speedMps,
    windDirectionDegrees: snapshot.surface.wind.directionDegrees,
    precipitationCategory,
    activity,
    summary: `${snapshot.interpretation.state}. ${cloudCategory} cloud coverage, ${precipitationCategory} precipitation, wind ${Math.round(snapshot.surface.wind.speedMps)} meters per second from ${Math.round(snapshot.surface.wind.directionDegrees)} degrees.`,
  };
}
