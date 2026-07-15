import { Component } from '@angular/core';
import { TimeScrubber } from '../timeline/time-scrubber/time-scrubber';

@Component({
  selector: 'app-home-page',
  imports: [TimeScrubber],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {}
