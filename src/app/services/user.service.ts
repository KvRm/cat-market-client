import { isPlatformBrowser } from '@angular/common'
// eslint-disable-next-line ts/consistent-type-imports
import { HttpClient } from '@angular/common/http'
import { Inject, Injectable, PLATFORM_ID } from '@angular/core'
import { environment } from '../../enviroments/enviroment'
import { getHeaders } from '../utils/headers'

export interface User {
  id: number
  password: string
  firstName: string
  secondName: string
  lastName: string
  email: string
  phone: string
  sex: number
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user?: User

  constructor(private http: HttpClient) {}

  fetchUser() {
    return this.http.post(`${environment.apiUrl}/user/current`, {}, { headers: getHeaders(), withCredentials: true })
  }

  updateUser(payload: object) {
    return this.http.post(`${environment.apiUrl}/user/update`, payload, { headers: getHeaders(), withCredentials: true })
  }
}
