// eslint-disable-next-line ts/consistent-type-imports
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from '../../enviroments/enviroment'

export interface Category {
  id: number
  name: string
}

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.post(`${environment.apiUrl}/categories/all`, {}, { withCredentials: true })
  }
}
