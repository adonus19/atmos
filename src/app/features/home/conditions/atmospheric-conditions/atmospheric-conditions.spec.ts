import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectedTime } from '../../../../core/state/selected-time';
import { scenarioFixtures } from '../../../../domain/fixtures/scenario-fixtures';
import { AtmosphericConditions } from './atmospheric-conditions';

describe('AtmosphericConditions', () => {
  let fixture: ComponentFixture<AtmosphericConditions>;
  let selectedTime: SelectedTime;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [AtmosphericConditions] }).compileComponents();
    selectedTime = TestBed.inject(SelectedTime);
    selectedTime.setTimeline(scenarioFixtures.primaryTimeline.snapshots);
    fixture = TestBed.createComponent(AtmosphericConditions);
    await fixture.whenStable();
  });

  it('renders labeled, rounded conditions with temperature secondary', () => {
    const content = fixture.nativeElement.textContent as string;
    expect(content).toContain('Dew point');
    expect(content).toContain('15°C');
    expect(content).toContain('Pressure');
    expect(content).toContain('1018 hPa');
    expect(content).toContain('Temperature');
    expect(fixture.nativeElement.querySelector('.secondary dt')?.textContent).toContain(
      'Temperature',
    );
  });

  it('updates metrics from the same selected timestamp', async () => {
    selectedTime.selectIndex(18);
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent).toContain('1.2 mm/h');
    expect(fixture.nativeElement.textContent).toContain('6 m/s from 190°');
  });

  it('renders no metric placeholders when snapshot data is unavailable', async () => {
    selectedTime.setTimeline([]);
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('section')).toBeNull();
  });
});
