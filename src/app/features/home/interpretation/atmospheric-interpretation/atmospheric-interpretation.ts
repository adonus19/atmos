import { Component, computed, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { SelectedTime } from '../../../../core/state/selected-time';

@Component({
  selector: 'app-atmospheric-interpretation',
  imports: [DecimalPipe],
  templateUrl: './atmospheric-interpretation.html',
  styleUrl: './atmospheric-interpretation.scss',
})
export class AtmosphericInterpretation {
  protected readonly selectedTime = inject(SelectedTime);
  protected readonly snapshot = this.selectedTime.selectedSnapshot;
  protected readonly confidenceLabel = computed(() => {
    const confidence = this.snapshot()?.interpretation.confidence;
    if (confidence === undefined) return 'Unavailable';
    if (confidence >= 0.85) return 'High confidence';
    if (confidence >= 0.6) return 'Moderate confidence';
    return 'Low confidence';
  });

  protected formatDriver(driverId: string): string {
    return driverId.replaceAll('-', ' ');
  }

  protected formatTime(timestamp: string): string {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      timeZone: 'America/New_York',
      timeZoneName: 'short',
    }).format(new Date(timestamp));
  }
}
