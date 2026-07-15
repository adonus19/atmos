import { DestroyRef, Injectable, computed, inject, signal } from '@angular/core';
import { AtmosphericSnapshot } from '../../domain/models/atmospheric-snapshot';

@Injectable({ providedIn: 'root' })
export class SelectedTime {
  private readonly destroyRef = inject(DestroyRef);
  private readonly timelineState = signal<readonly AtmosphericSnapshot[]>([]);
  private readonly selectedIndexState = signal(0);
  private readonly playingState = signal(false);
  private readonly reducedMotionState = signal(false);
  private playbackTimer: ReturnType<typeof setInterval> | undefined;

  readonly timeline = this.timelineState.asReadonly();
  readonly selectedIndex = this.selectedIndexState.asReadonly();
  readonly playing = this.playingState.asReadonly();
  readonly reducedMotion = this.reducedMotionState.asReadonly();
  readonly selectedSnapshot = computed(() => this.timelineState()[this.selectedIndexState()]);

  constructor() {
    this.destroyRef.onDestroy(() => this.stopPlayback());
  }

  setTimeline(snapshots: readonly AtmosphericSnapshot[], initialIndex = 0): void {
    this.timelineState.set(snapshots);
    this.selectIndex(initialIndex);
  }

  selectIndex(index: number): void {
    const maximum = Math.max(this.timelineState().length - 1, 0);
    this.selectedIndexState.set(Math.min(Math.max(Math.round(index), 0), maximum));
  }

  selectNow(now: Date = new Date()): void {
    const timeline = this.timelineState();
    if (timeline.length === 0) return;

    const target = now.getTime();
    const closestIndex = timeline.reduce((closest, snapshot, index) => {
      const closestDistance = Math.abs(Date.parse(timeline[closest]!.validAt) - target);
      const candidateDistance = Math.abs(Date.parse(snapshot.validAt) - target);
      return candidateDistance < closestDistance ? index : closest;
    }, 0);
    this.selectIndex(closestIndex);
  }

  setReducedMotion(reduced: boolean): void {
    this.reducedMotionState.set(reduced);
    if (reduced) this.stopPlayback();
  }

  togglePlayback(): void {
    if (this.playingState()) {
      this.stopPlayback();
      return;
    }
    if (this.reducedMotionState() || this.timelineState().length < 2) return;

    this.playingState.set(true);
    this.playbackTimer = setInterval(() => {
      const nextIndex = this.selectedIndexState() + 1;
      if (nextIndex >= this.timelineState().length) {
        this.stopPlayback();
        return;
      }
      this.selectedIndexState.set(nextIndex);
    }, 1_500);
  }

  stopPlayback(): void {
    if (this.playbackTimer !== undefined) clearInterval(this.playbackTimer);
    this.playbackTimer = undefined;
    this.playingState.set(false);
  }
}
