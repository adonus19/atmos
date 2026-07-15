import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-bottom-navigation',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './bottom-navigation.html',
  styleUrl: './bottom-navigation.scss',
})
export class BottomNavigation {
  protected readonly destinations = [
    { path: '/home', label: 'Home', symbol: '⌂' },
    { path: '/layers', label: 'Layers', symbol: '≋' },
    { path: '/flow', label: 'Flow', symbol: '→' },
    { path: '/sensors', label: 'Sensors', symbol: '⌁' },
    { path: '/more', label: 'More', symbol: '•••' },
  ] as const;
}
