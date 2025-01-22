import { CommonModule, isPlatformBrowser } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'

import { Component, Inject, PLATFORM_ID } from '@angular/core'
import { RouterLink, RouterOutlet } from '@angular/router'
import { SpriteIconComponent } from './components/sprite-icon/sprite-icon.component'
import { SvgSpriteComponent } from './components/svg-sprite/svg-sprite.component'
// eslint-disable-next-line ts/consistent-type-imports
import { FavoritesService } from './services/favorites.service'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HttpClientModule, SvgSpriteComponent, SpriteIconComponent, RouterLink],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'cat-market'
  isBrowser = false

  constructor(
    private favoritesService: FavoritesService,
    @Inject(PLATFORM_ID) platformId: object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId)
  }

  get profileLink() {
    if (!this.isBrowser)
      return '/'
    return localStorage.getItem('accessToken') ? '/profile' : '/auth/login'
  }

  get cartLink() {
    if (!this.isBrowser)
      return '/'
    return localStorage.getItem('accessToken') ? '/cart' : '/auth/login'
  }

  get favoritesIcon() {
    return this.favoritesService.favoriteIds.length ? 'like-filled' : 'like'
  }

  get favoritesIconClass() {
    const base = 'flex justify-center p-2 hover:bg-white cursor-pointer'
    return this.favoritesService.favoriteIds.length
      ? `${base} text-red-500`
      : `${base} hover:text-slate-950`
  }

  get profileIcon() {
    return this.isBrowser && localStorage.getItem('accessToken') ? 'profile-filled' : 'profile'
  }

  get profileIconClass() {
    const base = 'flex justify-center p-2 hover:bg-white cursor-pointer'
    return this.isBrowser && localStorage.getItem('accessToken')
      ? `${base} text-blue-500`
      : `${base} hover:text-slate-950`
  }
}
