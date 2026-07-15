export function celsiusToFahrenheit(celsius: number): number {
  return (celsius * 9) / 5 + 32;
}

export function metersPerSecondToMilesPerHour(metersPerSecond: number): number {
  return metersPerSecond * 2.236_936_292_1;
}

export function hectopascalsToInchesMercury(hectopascals: number): number {
  return hectopascals * 0.029_529_983_071_4;
}
