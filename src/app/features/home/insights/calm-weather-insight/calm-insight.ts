import { AtmosphericSnapshot } from '../../../../domain/models/atmospheric-snapshot';

export interface CalmInsight {
  readonly title: string;
  readonly summary: string;
  readonly evidence: string;
}

export function deriveCalmInsight(
  current: AtmosphericSnapshot,
  future: readonly AtmosphericSnapshot[],
): CalmInsight | undefined {
  if (current.interpretation.severity !== 'informational' || future.length === 0) return undefined;

  const last = future.at(-1)!;
  const dewPointChange = last.surface.dewPointC - current.surface.dewPointC;
  const pressureChange =
    last.surface.seaLevelPressureHpa !== undefined &&
    current.surface.seaLevelPressureHpa !== undefined
      ? last.surface.seaLevelPressureHpa - current.surface.seaLevelPressureHpa
      : undefined;

  if (dewPointChange <= -0.5) {
    return {
      title: 'A drier window is developing',
      summary: 'Humidity should ease gradually while light flow keeps conditions comfortable.',
      evidence: `Dew point falls about ${Math.abs(Math.round(dewPointChange))}°C over the next ${future.length} hours.`,
    };
  }

  return {
    title: 'A steady atmospheric window',
    summary: 'No strong transition is apparent in the available synthetic timeline.',
    evidence:
      pressureChange === undefined
        ? 'Pressure tendency is unavailable.'
        : `Pressure changes about ${Math.abs(pressureChange).toFixed(1)} hPa over the next ${future.length} hours.`,
  };
}
