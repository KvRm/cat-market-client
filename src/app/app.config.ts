import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http'
import { type ApplicationConfig, importProvidersFrom } from '@angular/core'

import { provideClientHydration } from '@angular/platform-browser'
import { provideRouter } from '@angular/router'
import { routes } from './app.routes'
import { noopInterceptorProvider } from './plugins/auth-interceptor'

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideClientHydration(),
    importProvidersFrom(HttpClientModule),
    noopInterceptorProvider,
  ],
}
