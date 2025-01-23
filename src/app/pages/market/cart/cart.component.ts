import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import { MarketCatalogueCardComponent } from '../../../components/market/catalogue-card/catalogue-card.component'
// eslint-disable-next-line ts/consistent-type-imports
import { CartsService } from '../../../services/carts.service'

@Component({
  selector: 'cart-page',
  standalone: true,
  imports: [RouterLink, MarketCatalogueCardComponent],
  templateUrl: './cart.component.html',
})
export class CartPageComponent {
  constructor(private cartService: CartsService) {}

  get cart() {
    return this.cartService.cart
  }

  get sum() {
    return this.cart?.products.reduce((cur, { count, price }) => cur += count * price, 0) || 0
  }

  clearCart() {
    this.cartService.clear().subscribe(() => {
      this.cartService.getCurrent()
    })
  }
}
