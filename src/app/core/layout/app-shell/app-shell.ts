import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BottomNavigation } from '../bottom-navigation/bottom-navigation';
import { TopContextBar } from '../top-context-bar/top-context-bar';

@Component({
  selector: 'app-app-shell',
  imports: [RouterOutlet, TopContextBar, BottomNavigation],
  templateUrl: './app-shell.html',
  styleUrl: './app-shell.scss',
})
export class AppShell {}
