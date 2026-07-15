import { Component, input } from '@angular/core';
import { SolarPhase } from '../scene-presentation';

@Component({
  selector: 'app-sky-layer',
  templateUrl: './sky-layer.html',
  styleUrl: './sky-layer.scss',
})
export class SkyLayer {
  readonly phase = input<SolarPhase>('day');
}
