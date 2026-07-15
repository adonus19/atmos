import {
  ATMOS_SCHEMA_VERSION,
  AtmosphericSnapshot,
  DataKind,
} from '../models/atmospheric-snapshot';

const DATA_KINDS = new Set<DataKind>([
  'observation',
  'forecast',
  'model',
  'sensor',
  'derived',
  'interpretation',
]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

function isIsoDate(value: unknown): value is string {
  return typeof value === 'string' && !Number.isNaN(Date.parse(value));
}

export function isAtmosphericSnapshot(value: unknown): value is AtmosphericSnapshot {
  if (!isRecord(value) || value['schemaVersion'] !== ATMOS_SCHEMA_VERSION) return false;

  const location = value['location'];
  const surface = value['surface'];
  const interpretation = value['interpretation'];
  const provenance = value['provenance'];

  return (
    isRecord(location) &&
    typeof location['id'] === 'string' &&
    typeof location['name'] === 'string' &&
    isFiniteNumber(location['latitude']) &&
    isFiniteNumber(location['longitude']) &&
    typeof location['timeZone'] === 'string' &&
    isIsoDate(value['validAt']) &&
    isRecord(surface) &&
    isFiniteNumber(surface['temperatureC']) &&
    isFiniteNumber(surface['dewPointC']) &&
    isFiniteNumber(surface['relativeHumidityPercent']) &&
    isRecord(surface['wind']) &&
    isFiniteNumber(surface['wind']['speedMps']) &&
    isFiniteNumber(surface['wind']['directionDegrees']) &&
    Array.isArray(value['layers']) &&
    value['layers'].every((layer) => isRecord(layer) && isFiniteNumber(layer['pressureHpa'])) &&
    isRecord(interpretation) &&
    typeof interpretation['state'] === 'string' &&
    typeof interpretation['explanation'] === 'string' &&
    isFiniteNumber(interpretation['confidence']) &&
    ['informational', 'notable', 'hazardous'].includes(String(interpretation['severity'])) &&
    Array.isArray(interpretation['driverIds']) &&
    interpretation['driverIds'].every((driverId) => typeof driverId === 'string') &&
    Array.isArray(provenance) &&
    provenance.every(
      (item) =>
        isRecord(item) &&
        DATA_KINDS.has(item['kind'] as DataKind) &&
        typeof item['provider'] === 'string' &&
        isIsoDate(item['validAt']) &&
        isIsoDate(item['retrievedAt']),
    )
  );
}

export function parseAtmosphericSnapshot(value: unknown): AtmosphericSnapshot {
  if (!isAtmosphericSnapshot(value)) {
    throw new Error('Fixture does not match Atmos atmospheric snapshot schema version 1.');
  }
  return value;
}
