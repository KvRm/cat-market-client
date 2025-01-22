import { isPlatformBrowser } from '@angular/common'
import { Inject, Injectable, PLATFORM_ID } from '@angular/core'
import { localStorageKeys } from '../constants/storage'

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  favoriteIds: number[]

  constructor(
    @Inject(PLATFORM_ID) platformId: object,
  ) {
    if (!isPlatformBrowser(platformId)) {
      this.favoriteIds = []
      return
    }

    this.favoriteIds = JSON.parse(localStorage.getItem(localStorageKeys.favorites) || '[]')
  }

  add(id: number) {
    if (this.favoriteIds.includes(id))
      return
    this.favoriteIds.push(id)
    this.syncWithStorage()
  }

  remove(id: number) {
    if (!this.favoriteIds.includes(id))
      return
    this.favoriteIds = this.favoriteIds.filter(v => v !== id)
    this.syncWithStorage()
  }

  toggle(id: number) {
    if (this.favoriteIds.includes(id))
      this.remove(id)
    else this.add(id)
  }

  syncWithStorage() {
    localStorage.setItem(localStorageKeys.favorites, JSON.stringify(this.favoriteIds))
  }
}
