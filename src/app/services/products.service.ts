// eslint-disable-next-line ts/consistent-type-imports
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from '../../enviroments/enviroment'

export interface Product {
  id: number
  name: string
  category_id: number
  image_url: string
  price: number
}

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProducts(params: Record<string, string | number | number[]>) {
    return this.http.get(`${environment.apiUrl}/products/all`, { params, withCredentials: true })
  }
}
