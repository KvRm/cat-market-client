import { HttpHeaders } from '@angular/common/http'

export function getHeaders() {
  return new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  })
}
