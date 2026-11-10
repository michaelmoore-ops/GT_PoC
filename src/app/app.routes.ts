import type { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'users',
    loadComponent: () => import('./users/users.page').then((m) => m.UsersPage),
  },
  {
    path: 'sales',
    loadComponent: () => import('./sales/sales.page').then((m) => m.SalesPage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
