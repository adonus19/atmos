import { Component, computed, input } from '@angular/core';
import { PrecipitationCategory } from '../scene-presentation';

@Component({
  selector: 'app-precipitation-layer',
  templateUrl: './precipitation-layer.html',
  styleUrl: './precipitation-layer.scss',
})
export class PrecipitationLayer {
  readonly category = input<PrecipitationCategory>('off');
  protected readonly drops = computed(() => {
    const count = { off: 0, light: 6, moderate: 12, heavy: 20 }[this.category()];
    return Array.from({ length: count }, (_, index) => index);
  });
}
