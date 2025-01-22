import type { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/market/main/main.component').then(c => c.MainPageComponent),
  },
  {
    path: 'favorites',
    loadComponent: () => import('./pages/market/favorites/favorites.component').then(c => c.FavoritesPageComponent),
  },
  {
    path: 'auth/register',
    loadComponent: () => import('./pages/auth/register/register.component').then(c => c.AuthRegisterPageComponent),
  },
  {
    path: 'auth/login',
    loadComponent: () => import('./pages/auth/login/login.component').then(c => c.AuthLoginPageComponent),
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.component').then(c => c.ProfilePageComponent),
  },
]
