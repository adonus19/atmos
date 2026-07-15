import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectedTime } from '../../../../core/state/selected-time';
import { scenarioFixtures } from '../../../../domain/fixtures/scenario-fixtures';
import { AtmosphericInterpretation } from './atmospheric-interpretation';

describe('AtmosphericInterpretation', () => {
  let fixture: ComponentFixture<AtmosphericInterpretation>;
  let selectedTime: SelectedTime;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtmosphericInterpretation],
    }).compileComponents();
    selectedTime = TestBed.inject(SelectedTime);
    selectedTime.setTimeline(scenarioFixtures.primaryTimeline.snapshots);
    fixture = TestBed.createComponent(AtmosphericInterpretation);
    await fixture.whenStable();
  });

  it('shows state, drivers, confidence, validity, and provenance from one snapshot', () => {
    const content = fixture.nativeElement.textContent as string;
    expect(content).toContain('Calm and slowly drying');
    expect(content).toContain('pressure rise');
    expect(content).toContain('High confidence · 92%');
    expect(content).toContain('Atmos synthetic fixture');
    expect(content).toContain('Valid Jul 15, 6:00 AM EDT');
  });

  it('updates interpretation and timestamp together with selected time', async () => {
    selectedTime.selectIndex(18);
    await fixture.whenStable();
    const content = fixture.nativeElement.textContent as string;
    expect(content).toContain('Storms developing');
    expect(content).toContain('Jul 16, 12:00 AM EDT');
    expect(content).toContain('Moderate confidence');
  });

  it('shows an insufficient-data state without fabricating content', async () => {
    selectedTime.setTimeline([]);
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent).toContain('Insufficient data');
    expect(
      fixture.nativeElement.querySelector('[data-cy="atmospheric-interpretation"]'),
    ).toBeNull();
  });
});
