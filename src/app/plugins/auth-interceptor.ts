import type {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http'
import type { Provider } from '@angular/core'

// Injection token for the Http Interceptors multi-provider
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { type Observable, tap } from 'rxjs'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler):
  Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap({
        error: (error) => {
          if ((error as HttpErrorResponse).status === 401) {
            localStorage.removeItem('accessToken')
          }
        },
      }),
    )
  }
}

export const noopInterceptorProvider: Provider
  = { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
