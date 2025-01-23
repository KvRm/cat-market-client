import type { Routes } from '@angular/router'
import { AuthGuard } from './plugins/auth-guard'

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
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.component').then(c => c.ProfilePageComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'cart',
    loadComponent: () => import('./pages/market/cart/cart.component').then(c => c.CartPageComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'auth/register',
    loadComponent: () => import('./pages/auth/register/register.component').then(c => c.AuthRegisterPageComponent),
  },
  {
    path: 'auth/login',
    loadComponent: () => import('./pages/auth/login/login.component').then(c => c.AuthLoginPageComponent),
  },
]
