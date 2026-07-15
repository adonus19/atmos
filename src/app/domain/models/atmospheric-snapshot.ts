export const ATMOS_SCHEMA_VERSION = 1 as const;

export type DataKind =
  'observation' | 'forecast' | 'model' | 'sensor' | 'derived' | 'interpretation';

export interface DataProvenance {
  readonly kind: DataKind;
  readonly provider: string;
  readonly validAt: string;
  readonly retrievedAt: string;
  readonly observedAt?: string;
  readonly issuedAt?: string;
  readonly modelRun?: string;
  readonly confidence?: number;
}

export interface AtmosLocation {
  readonly id: string;
  readonly name: string;
  readonly latitude: number;
  readonly longitude: number;
  readonly elevationMeters?: number;
  readonly timeZone: string;
}

export interface WindVector {
  readonly speedMps: number;
  readonly directionDegrees: number;
  readonly gustMps?: number;
}

export interface SurfaceConditions {
  readonly temperatureC: number;
  readonly apparentTemperatureC?: number;
  readonly dewPointC: number;
  readonly relativeHumidityPercent: number;
  readonly seaLevelPressureHpa?: number;
  readonly surfacePressureHpa?: number;
  readonly visibilityMeters?: number;
  readonly wind: WindVector;
  readonly precipitationRateMmHr?: number;
}

export interface AtmosphericLayer {
  readonly pressureHpa: number;
  readonly geopotentialHeightMeters?: number;
  readonly temperatureC?: number;
  readonly dewPointC?: number;
  readonly relativeHumidityPercent?: number;
  readonly cloudCoverPercent?: number;
  readonly verticalVelocity?: number;
  readonly wind?: WindVector;
}

export interface AtmosphericInterpretation {
  readonly state: string;
  readonly explanation: string;
  readonly confidence: number;
  readonly severity: 'informational' | 'notable' | 'hazardous';
  readonly driverIds: readonly string[];
}

export interface AtmosphericSnapshot {
  readonly schemaVersion: typeof ATMOS_SCHEMA_VERSION;
  readonly location: AtmosLocation;
  readonly validAt: string;
  readonly surface: SurfaceConditions;
  readonly layers: readonly AtmosphericLayer[];
  readonly interpretation: AtmosphericInterpretation;
  readonly provenance: readonly DataProvenance[];
}
