import { Component, computed, inject, input, signal } from '@angular/core';
import { SelectedTime } from '../../../../core/state/selected-time';
import { CloudBands } from '../cloud-bands/cloud-bands';
import { PrecipitationLayer } from '../precipitation-layer/precipitation-layer';
import { deriveSceneAssets } from '../scene-assets';
import { SceneQuality, deriveScenePresentation } from '../scene-presentation';
import { SkyLayer } from '../sky-layer/sky-layer';
import { WindField } from '../wind-field/wind-field';

@Component({
  selector: 'app-atmospheric-scene',
  imports: [SkyLayer, CloudBands, WindField, PrecipitationLayer],
  templateUrl: './atmospheric-scene.html',
  styleUrl: './atmospheric-scene.scss',
})
export class AtmosphericScene {
  private readonly selectedTime = inject(SelectedTime);
  readonly quality = input<SceneQuality>('high');
  protected readonly assetFallback = signal(false);
  protected readonly presentation = computed(() => {
    const snapshot = this.selectedTime.selectedSnapshot();
    return snapshot ? deriveScenePresentation(snapshot, this.quality()) : undefined;
  });
  protected readonly assets = computed(() => {
    const scene = this.presentation();
    return scene ? deriveSceneAssets(scene, this.quality()) : undefined;
  });

  protected markAssetUnavailable(): void {
    this.assetFallback.set(true);
  }
}
