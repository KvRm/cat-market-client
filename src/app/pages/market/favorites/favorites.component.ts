import type { OnInit } from '@angular/core'
import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import { MarketCatalogueCardComponent } from '../../../components/market/catalogue-card/catalogue-card.component'
// eslint-disable-next-line ts/consistent-type-imports
import { FavoritesService } from '../../../services/favorites.service'
// eslint-disable-next-line ts/consistent-type-imports
import { Product, ProductsService } from '../../../services/products.service'

@Component({
  selector: 'favorites-page',
  standalone: true,
  imports: [MarketCatalogueCardComponent, RouterLink],
  templateUrl: './favorites.component.html',
})
export class FavoritesPageComponent implements OnInit {
  constructor(
    private favoritesService: FavoritesService,
    private productsService: ProductsService,
  ) {}

  products: Product[] = []

  ngOnInit(): void {
    this.productsService.getProducts({}).subscribe((v) => {
      this.products = v as Product[]
    })
  }

  getProductById(id: number) {
    return this.products.find(p => p.id === id)
  }

  get favoriteProductIds() {
    return this.favoritesService.favoriteIds
  }
}
