import { Component, input } from '@angular/core';
import { CloudCategory } from '../scene-presentation';

@Component({
  selector: 'app-cloud-bands',
  templateUrl: './cloud-bands.html',
  styleUrl: './cloud-bands.scss',
})
export class CloudBands {
  readonly category = input<CloudCategory>('clear');
}
