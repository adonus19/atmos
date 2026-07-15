import { Component, computed, inject } from '@angular/core';
import { SelectedTime } from '../../../../core/state/selected-time';

interface ConditionMetric {
  readonly label: string;
  readonly value: string;
  readonly secondary?: boolean;
}

@Component({
  selector: 'app-atmospheric-conditions',
  templateUrl: './atmospheric-conditions.html',
  styleUrl: './atmospheric-conditions.scss',
})
export class AtmosphericConditions {
  private readonly selectedTime = inject(SelectedTime);
  protected readonly snapshot = this.selectedTime.selectedSnapshot;
  protected readonly metrics = computed<readonly ConditionMetric[]>(() => {
    const surface = this.snapshot()?.surface;
    if (!surface) return [];
    const metrics: ConditionMetric[] = [
      { label: 'Dew point', value: `${Math.round(surface.dewPointC)}°C` },
      { label: 'Humidity', value: `${Math.round(surface.relativeHumidityPercent)}%` },
      {
        label: 'Wind',
        value: `${Math.round(surface.wind.speedMps)} m/s from ${Math.round(surface.wind.directionDegrees)}°`,
      },
    ];
    if (surface.seaLevelPressureHpa !== undefined) {
      metrics.push({ label: 'Pressure', value: `${Math.round(surface.seaLevelPressureHpa)} hPa` });
    }
    if (surface.precipitationRateMmHr !== undefined) {
      metrics.push({
        label: 'Precipitation',
        value: `${surface.precipitationRateMmHr.toFixed(1)} mm/h`,
      });
    }
    metrics.push({
      label: 'Temperature',
      value: `${Math.round(surface.temperatureC)}°C`,
      secondary: true,
    });
    return metrics;
  });
}
