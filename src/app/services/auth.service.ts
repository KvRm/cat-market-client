// eslint-disable-next-line ts/consistent-type-imports
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from '../../enviroments/enviroment'

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
    const formData = new FormData()
    for (const key in payload) {
      formData.append(key, payload[key as keyof typeof payload])
    }
    return this.http.post(`${environment.apiUrl}/auth/login`, formData, { withCredentials: true })
  }
}
