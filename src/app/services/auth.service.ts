// eslint-disable-next-line ts/consistent-type-imports
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from '../../enviroments/enviroment'
import { getHeaders } from '../utils/headers'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  registerLogin = ''

  constructor(private http: HttpClient) {}

  register(payload: object) {
    return this.http.post(`${environment.apiUrl}/auth/register`, payload, { withCredentials: true })
  }

  login(payload: object) {
    return this.http.post(`${environment.apiUrl}/auth/login`, payload, { withCredentials: true })
  }

  refresh() {
    return this.http.post(`${environment.apiUrl}/auth/refresh`, {}, { withCredentials: true })
  }
}
