import { Component, inject } from '@angular/core';
import { SelectedTime } from '../../../core/state/selected-time';
import { scenarioFixtures } from '../../../domain/fixtures/scenario-fixtures';
import { AtmosphericScene } from '../scene/atmospheric-scene/atmospheric-scene';
import { AtmosphericInterpretation } from '../interpretation/atmospheric-interpretation/atmospheric-interpretation';
import { AtmosphericConditions } from '../conditions/atmospheric-conditions/atmospheric-conditions';
import { TimeScrubber } from '../timeline/time-scrubber/time-scrubber';

@Component({
  selector: 'app-home-page',
  imports: [AtmosphericScene, AtmosphericInterpretation, AtmosphericConditions, TimeScrubber],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  private readonly selectedTime = inject(SelectedTime);

  constructor() {
    this.selectedTime.setTimeline(scenarioFixtures.primaryTimeline.snapshots);
  }
}
