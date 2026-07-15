import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { SelectedTime } from '../../../../core/state/selected-time';
import { TimeScrubber } from './time-scrubber';

describe('TimeScrubber', () => {
  let fixture: ComponentFixture<TimeScrubber>;
  let state: SelectedTime;

  beforeEach(async () => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn(() => ({ matches: false })),
    );
    await TestBed.configureTestingModule({ imports: [TimeScrubber] }).compileComponents();
    fixture = TestBed.createComponent(TimeScrubber);
    state = TestBed.inject(SelectedTime);
    await fixture.whenStable();
  });

  it('renders a native keyboard-operable hourly range with significant markers', () => {
    const range = fixture.nativeElement.querySelector('input[type="range"]') as HTMLInputElement;
    const markers = fixture.nativeElement.querySelectorAll('.markers li');

    expect(range.min).toBe('0');
    expect(range.max).toBe('24');
    expect(range.step).toBe('1');
    expect(markers).toHaveLength(4);
  });

  it('synchronizes selected time and screen-reader summary from range input', async () => {
    const range = fixture.nativeElement.querySelector('input[type="range"]') as HTMLInputElement;
    range.value = '18';
    range.dispatchEvent(new Event('input'));
    await fixture.whenStable();

    expect(state.selectedIndex()).toBe(18);
    expect(range.getAttribute('aria-valuetext')).toContain('Storms developing');
    expect(fixture.nativeElement.querySelector('[aria-live]')?.textContent).toContain(
      'Storms developing',
    );
  });

  it('offers Now and play/pause controls', async () => {
    const buttons = fixture.nativeElement.querySelectorAll('button');
    (buttons[1] as HTMLButtonElement).click();
    await fixture.whenStable();

    expect(state.playing()).toBe(true);
    expect((buttons[1] as HTMLButtonElement).getAttribute('aria-pressed')).toBe('true');
    expect((buttons[0] as HTMLButtonElement).textContent).toContain('Now');
    state.stopPlayback();
  });

  it('disables autoplay and explains why in reduced-motion mode', async () => {
    state.setReducedMotion(true);
    await fixture.whenStable();

    const play = fixture.nativeElement.querySelectorAll('button')[1] as HTMLButtonElement;
    expect(play.disabled).toBe(true);
    expect(fixture.nativeElement.querySelector('.motion-note')?.textContent).toContain(
      'reduced motion',
    );
  });
});
