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

  it('renders the selected environment with AVIF and WebP sources', () => {
    const environment = fixture.nativeElement.querySelector(
      '[data-layer="environment"]',
    ) as HTMLImageElement;
    const avif = fixture.nativeElement.querySelector(
      '[data-layer="environment-avif"]',
    ) as HTMLSourceElement;

    expect(environment.src).toContain('/assets/scenes/home/environment/calm-dawn.webp');
    expect(avif.srcset).toContain('/assets/scenes/home/environment/calm-dawn.avif');
  });

  it('switches to active environment assets with the selected snapshot', async () => {
    selectedTime.selectIndex(24);
    await fixture.whenStable();

    const environment = fixture.nativeElement.querySelector(
      '[data-layer="environment"]',
    ) as HTMLImageElement;
    expect(environment.src).toContain('active-overcast.webp');
  });

  it('reduces raster cloud layers at low visual quality', async () => {
    expect(fixture.nativeElement.querySelectorAll('[data-layer="cloud"]')).toHaveLength(2);

    fixture.componentRef.setInput('quality', 'low');
    await fixture.whenStable();

    expect(fixture.nativeElement.querySelectorAll('[data-layer="cloud"]')).toHaveLength(1);
  });

  it('keeps a usable CSS fallback when an image cannot load', async () => {
    const environment = fixture.nativeElement.querySelector(
      '[data-layer="environment"]',
    ) as HTMLImageElement;
    environment.dispatchEvent(new Event('error'));
    await fixture.whenStable();

    const scene = fixture.nativeElement.querySelector('[role="img"]') as HTMLElement;
    expect(scene.classList).toContain('asset-fallback');
    expect(scene.getAttribute('aria-label')).toContain('Calm and slowly drying');
  });
});
