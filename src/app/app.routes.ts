import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    title: 'Atmos — Home',
    loadComponent: () => import('./features/home/home-page/home-page').then((m) => m.HomePage),
  },
  {
    path: 'layers',
    title: 'Atmos — Layers',
    loadComponent: () =>
      import('./features/layers/layers-page/layers-page').then((m) => m.LayersPage),
  },
  {
    path: 'flow',
    title: 'Atmos — Flow',
    loadComponent: () => import('./features/flow/flow-page/flow-page').then((m) => m.FlowPage),
  },
  {
    path: 'sensors',
    title: 'Atmos — Sensors',
    loadComponent: () =>
      import('./features/sensors/sensors-page/sensors-page').then((m) => m.SensorsPage),
  },
  {
    path: 'more',
    title: 'Atmos — More',
    loadComponent: () => import('./features/more/more-page/more-page').then((m) => m.MorePage),
  },
  { path: '**', redirectTo: 'home' },
];
