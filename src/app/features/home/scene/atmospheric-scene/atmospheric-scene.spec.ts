import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectedTime } from '../../../../core/state/selected-time';
import { scenarioFixtures } from '../../../../domain/fixtures/scenario-fixtures';
import { AtmosphericScene } from './atmospheric-scene';

describe('AtmosphericScene', () => {
  let fixture: ComponentFixture<AtmosphericScene>;
  let selectedTime: SelectedTime;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [AtmosphericScene] }).compileComponents();
    selectedTime = TestBed.inject(SelectedTime);
    selectedTime.setTimeline(scenarioFixtures.primaryTimeline.snapshots);
    fixture = TestBed.createComponent(AtmosphericScene);
    await fixture.whenStable();
  });

  it('renders an accessible CSS fallback from the selected snapshot', () => {
    const scene = fixture.nativeElement.querySelector('[role="img"]') as HTMLElement;
    expect(scene.getAttribute('aria-label')).toContain('Calm and slowly drying');
    expect(scene.querySelector('canvas')).toBeNull();
  });

  it('updates clouds, precipitation, wind, and summary with selected time', async () => {
    selectedTime.selectIndex(24);
    await fixture.whenStable();
    const scene = fixture.nativeElement.querySelector('[role="img"]') as HTMLElement;
    expect(scene.getAttribute('aria-label')).toContain('heavy precipitation');
    expect(scene.querySelector('.heavy')).toBeTruthy();
    expect(scene.querySelectorAll('app-wind-field span')).toHaveLength(18);
  });

  it('honors the low visual-quality particle cap', async () => {
    fixture.componentRef.setInput('quality', 'low');
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelectorAll('app-wind-field span')).toHaveLength(5);
  });
});
