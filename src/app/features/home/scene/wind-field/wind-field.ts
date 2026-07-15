import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-wind-field',
  templateUrl: './wind-field.html',
  styleUrl: './wind-field.scss',
})
export class WindField {
  readonly particleCount = input(5);
  readonly speedMps = input(0);
  readonly directionDegrees = input(0);
  protected readonly particles = computed(() =>
    Array.from({ length: this.particleCount() }, (_, index) => index),
  );
  protected readonly duration = computed(() => `${Math.max(1.6, 7 - this.speedMps() * 0.35)}s`);
}
