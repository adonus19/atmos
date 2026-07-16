import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectedTime } from '../../../../core/state/selected-time';
import { scenarioFixtures } from '../../../../domain/fixtures/scenario-fixtures';
import { CalmWeatherInsight } from './calm-weather-insight';

describe('CalmWeatherInsight', () => {
  let fixture: ComponentFixture<CalmWeatherInsight>;
  let selectedTime: SelectedTime;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [CalmWeatherInsight] }).compileComponents();
    selectedTime = TestBed.inject(SelectedTime);
    selectedTime.setTimeline(scenarioFixtures.primaryTimeline.snapshots);
    fixture = TestBed.createComponent(CalmWeatherInsight);
    await fixture.whenStable();
  });

  it('shows a useful evidence-backed calm insight without hazard treatment', () => {
    expect(fixture.nativeElement.textContent).toContain('A drier window is developing');
    expect(fixture.nativeElement.textContent).toContain('Synthetic scenario');
    expect(fixture.nativeElement.querySelector('.hazard')).toBeNull();
  });

  it('hides the calm insight as the timeline enters notable weather', async () => {
    selectedTime.selectIndex(12);
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('aside')).toBeNull();
  });
});
