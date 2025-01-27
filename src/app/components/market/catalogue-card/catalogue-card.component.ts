import type { Product } from '../../../services/products.service'
import { isPlatformBrowser } from '@angular/common'
import { Component, Inject, Input, PLATFORM_ID } from '@angular/core'
import { RouterLink } from '@angular/router'
import { environment } from '../../../../enviroments/enviroment'
// eslint-disable-next-line ts/consistent-type-imports
import { CartsService } from '../../../services/carts.service'
// eslint-disable-next-line ts/consistent-type-imports
import { FavoritesService } from '../../../services/favorites.service'
import { SpriteIconComponent } from '../../sprite-icon/sprite-icon.component'

@Component({
  selector: 'market-catalogue-card',
  standalone: true,
  imports: [SpriteIconComponent, RouterLink],
  templateUrl: './catalogue-card.component.html',
})
export class MarketCatalogueCardComponent {
  @Input({ required: true }) product!: Product

  constructor(
    private favoritesService: FavoritesService,
    private cartService: CartsService,
    @Inject(PLATFORM_ID) platformId: object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId)
  }

  isBrowser = false

  get addCartBtnLink() {
    if (!this.isBrowser)
      return '/'
    return localStorage.getItem('accessToken') ? undefined : '/auth/login'
  }

  get favoriteButtonIcon() {
    return this.favoritesService.favoriteIds.includes(this.product.id) ? 'like-filled' : 'like'
  }

  get favoritesIconClass() {
    const base = 'p-1 hover:bg-slate-950'
    return this.favoritesService.favoriteIds.includes(this.product.id)
      ? `${base} text-red-500 hover:text-red-500`
      : `${base} hover:text-white`
  }

  get isInCart() {
    return this.cartService.cart?.products.some(p => p.id === this.product.id)
  }

  get cartCount() {
    return this.cartService.cart?.products.find(p => p.id === this.product.id)?.count || 0
  }

  addToCart(count: number) {
    if (!localStorage.getItem('accessToken'))
      return
    this.cartService.addToProduct({ product_id: this.product.id, count }).subscribe(() => this.cartService.getCurrent())
  }

  getProductImageUrl(url: string) {
    return `${environment.apiUrl}${url}`
  }

  toggleFavorite(id: number) {
    this.favoritesService.toggle(id)
  }
}
