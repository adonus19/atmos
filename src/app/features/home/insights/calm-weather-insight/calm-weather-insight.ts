import { Component, computed, inject } from '@angular/core';
import { SelectedTime } from '../../../../core/state/selected-time';
import { deriveCalmInsight } from './calm-insight';

@Component({
  selector: 'app-calm-weather-insight',
  templateUrl: './calm-weather-insight.html',
  styleUrl: './calm-weather-insight.scss',
})
export class CalmWeatherInsight {
  private readonly selectedTime = inject(SelectedTime);
  protected readonly insight = computed(() => {
    const current = this.selectedTime.selectedSnapshot();
    if (!current) return undefined;
    const start = this.selectedTime.selectedIndex() + 1;
    return deriveCalmInsight(current, this.selectedTime.timeline().slice(start, start + 4));
  });
}
