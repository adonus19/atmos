import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { scenarioFixtures } from '../../domain/fixtures/scenario-fixtures';
import { SelectedTime } from './selected-time';

describe('SelectedTime', () => {
  let state: SelectedTime;

  beforeEach(() => {
    vi.useFakeTimers();
    state = TestBed.inject(SelectedTime);
    state.setTimeline(scenarioFixtures.primaryTimeline.snapshots);
  });

  afterEach(() => {
    state.stopPlayback();
    vi.useRealTimers();
    TestBed.resetTestingModule();
  });

  it('keeps one selected snapshot synchronized to a clamped hourly index', () => {
    state.selectIndex(10.4);
    expect(state.selectedIndex()).toBe(10);
    expect(state.selectedSnapshot()?.validAt).toBe('2026-07-15T16:00:00-04:00');

    state.selectIndex(100);
    expect(state.selectedIndex()).toBe(24);
    state.selectIndex(-1);
    expect(state.selectedIndex()).toBe(0);
  });

  it('selects the snapshot closest to Now', () => {
    state.selectNow(new Date('2026-07-15T18:20:00-04:00'));
    expect(state.selectedIndex()).toBe(12);
  });

  it('plays forward hourly and stops at the end', () => {
    state.selectIndex(23);
    state.togglePlayback();
    expect(state.playing()).toBe(true);

    vi.advanceTimersByTime(1_500);
    expect(state.selectedIndex()).toBe(24);
    vi.advanceTimersByTime(1_500);
    expect(state.playing()).toBe(false);
  });

  it('disables playback when reduced motion is active', () => {
    state.setReducedMotion(true);
    state.togglePlayback();
    expect(state.playing()).toBe(false);
  });

  it('handles an empty timeline when selecting Now', () => {
    state.setTimeline([]);
    state.selectNow(new Date('2026-07-15T18:20:00-04:00'));
    expect(state.selectedSnapshot()).toBeUndefined();
  });
});
