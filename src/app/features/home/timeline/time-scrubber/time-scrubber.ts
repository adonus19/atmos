import { Component, OnInit, computed, inject } from '@angular/core';
import { scenarioFixtures } from '../../../../domain/fixtures/scenario-fixtures';
import { SelectedTime } from '../../../../core/state/selected-time';

interface TimelineMarker {
  readonly index: number;
  readonly label: string;
  readonly kind: 'solar' | 'transition';
}

@Component({
  selector: 'app-time-scrubber',
  templateUrl: './time-scrubber.html',
  styleUrl: './time-scrubber.scss',
})
export class TimeScrubber implements OnInit {
  protected readonly selectedTime = inject(SelectedTime);
  protected readonly maximumIndex = computed(() =>
    Math.max(this.selectedTime.timeline().length - 1, 0),
  );
  protected readonly announcement = computed(() => {
    const snapshot = this.selectedTime.selectedSnapshot();
    if (!snapshot) return 'Atmospheric timeline unavailable.';
    return `${this.formatTimestamp(snapshot.validAt)}. ${snapshot.interpretation.state}. ${snapshot.interpretation.explanation}`;
  });
  protected readonly markers: readonly TimelineMarker[] = [
    { index: 1, label: 'Sunrise', kind: 'solar' },
    { index: 10, label: 'Wind shift', kind: 'transition' },
    { index: 14, label: 'Sunset', kind: 'solar' },
    { index: 18, label: 'Precipitation onset', kind: 'transition' },
  ];

  ngOnInit(): void {
    this.selectedTime.setTimeline(scenarioFixtures.primaryTimeline.snapshots);
    this.selectedTime.setReducedMotion(
      globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false,
    );
  }

  protected selectFromInput(event: Event): void {
    this.selectedTime.selectIndex(Number((event.target as HTMLInputElement).value));
  }

  protected formatTimestamp(timestamp: string): string {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      hour: 'numeric',
      minute: '2-digit',
      timeZone: 'America/New_York',
      timeZoneName: 'short',
    }).format(new Date(timestamp));
  }
}
