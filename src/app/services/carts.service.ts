import type { Product } from './products.service'
import { isPlatformBrowser } from '@angular/common'
// eslint-disable-next-line ts/consistent-type-imports
import { HttpClient } from '@angular/common/http'
import { Inject, Injectable, PLATFORM_ID } from '@angular/core'

import { environment } from '../../enviroments/enviroment'
import { getHeaders } from '../utils/headers'

export interface Cart {
  id: number
  products: (Product & { count: number })[]
}

@Injectable({
  providedIn: 'root',
})
export class CartsService {
  constructor(
    private http: HttpClient,
      @Inject(PLATFORM_ID) platformId: object,
  ) {
    if (isPlatformBrowser(platformId) && localStorage.getItem('accessToken')) {
      this.getCurrent()
    }
  }

  cart: Cart | null = null

  getCurrent() {
    return this.http.post(`${environment.apiUrl}/carts/current`, {}, { headers: getHeaders(), withCredentials: true })
      .subscribe(
        v => this.cart = v as Cart || null,
        () => this.cart = null,
      )
  }

  addToProduct(payload: object) {
    return this.http.post(`${environment.apiUrl}/carts/add-product`, payload, { headers: getHeaders(), withCredentials: true })
  }

  clear() {
    return this.http.post(`${environment.apiUrl}/carts/clear`, {}, { headers: getHeaders(), withCredentials: true })
  }
}
