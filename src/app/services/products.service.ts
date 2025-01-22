// eslint-disable-next-line ts/consistent-type-imports
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from '../../enviroments/enviroment'

export interface Product {
  id: number
  name: string
  categoryId: number
  imageUrl: string
}

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProducts(params: object) {
    return this.http.post(`${environment.apiUrl}/products/all`, params, { withCredentials: true })
  }
}
