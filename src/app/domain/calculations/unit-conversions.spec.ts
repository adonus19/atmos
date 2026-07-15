import {
  celsiusToFahrenheit,
  hectopascalsToInchesMercury,
  metersPerSecondToMilesPerHour,
} from './unit-conversions';

describe('unit conversions', () => {
  it('converts Celsius to Fahrenheit at reference points', () => {
    expect(celsiusToFahrenheit(0)).toBe(32);
    expect(celsiusToFahrenheit(100)).toBe(212);
    expect(celsiusToFahrenheit(-40)).toBe(-40);
  });

  it('converts wind speed from meters per second to miles per hour', () => {
    expect(metersPerSecondToMilesPerHour(10)).toBeCloseTo(22.3694, 4);
  });

  it('converts pressure from hectopascals to inches of mercury', () => {
    expect(hectopascalsToInchesMercury(1013.25)).toBeCloseTo(29.92, 2);
  });
});
