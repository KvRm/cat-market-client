import type { CanActivateFn } from '@angular/router'
import { inject } from '@angular/core'
import { Router } from '@angular/router'

export const AuthGuard: CanActivateFn = () => {
  const router = inject(Router)

  if (!localStorage.getItem('accessToken')) {
    router.navigate(['auth/login'])
    return false
  }
  return true
}
