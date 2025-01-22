import type { OnInit } from '@angular/core'
import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
// eslint-disable-next-line ts/consistent-type-imports
import { ActivatedRoute, Router, RouterModule } from '@angular/router'
// eslint-disable-next-line ts/consistent-type-imports
import { CategoriesService, Category } from '../../../services/categories.service'
// eslint-disable-next-line ts/consistent-type-imports
import { Product, ProductsService } from '../../../services/products.service'
import { debounce } from '../../../utils/debounce'
import { MarketCatalogueCardComponent } from '../catalogue-card/catalogue-card.component'

@Component({
  selector: 'market-catalogue',
  standalone: true,
  imports: [MarketCatalogueCardComponent, RouterModule, FormsModule],
  templateUrl: './catalogue.component.html',
})
export class MarketCatalogueComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
  ) {}

  categories: Category[] = []
  products: Product[] = []
  search = ''

  ngOnInit(): void {
    // eslint-disable-next-line dot-notation
    this.search = this.route.snapshot.queryParams['search'] || ''
    this.categoriesService.getCategories().subscribe((v) => {
      this.categories = v as Category[]
    })

    this.route.queryParams.subscribe((v) => {
      const categories: number[] = []
      const query = Object.fromEntries(Object.entries(v).filter(([key]) => {
        if (!key.includes('category-'))
          return true

        categories.push(Number(key.split('category-')[1]))
        return false
      }))

      this.getProducts({ ...query, categories })
    })
  }

  getProducts(params: object) {
    this.productsService.getProducts(params).subscribe((v) => {
      this.products = v as Product[]
    })
  }

  checkIsCategorySelected(id: number) {
    return this.route.snapshot.queryParams[`category-${id}`]
  }

  getRouteQueryByCategory(id: number) {
    if (!this.checkIsCategorySelected(id))
      return { ...this.route.snapshot.queryParams, [`category-${id}`]: '1' }
    return { ...this.route.snapshot.queryParams, [`category-${id}`]: undefined }
  }

  getLinkClass(id: number) {
    const base = 'block cursor-pointer w-full py-2 px-2 border-[1px] border-white hover:border-slate-950 text-center md:text-left'
    return this.checkIsCategorySelected(id)
      ? `${base} bg-slate-950 text-white`
      : `${base} hover:bg-slate-950 hover:text-white`
  }

  debouncedChangeInputValue = debounce((ev: string) => {
    this.search = ev
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { ...this.route.snapshot.queryParams, search: ev || undefined },
      queryParamsHandling: 'merge',
    })
  })

  handleSearchInput(ev: string) {
    this.debouncedChangeInputValue(ev)
  }
}
