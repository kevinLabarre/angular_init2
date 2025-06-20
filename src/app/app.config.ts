import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localFr from '@angular/common/locales/fr';
import { sessionInterceptor } from './interceptor/session.interceptor';

registerLocaleData(localFr)

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),

    // Pour utiliser HttpClient
    // withFetch() -> utilisé quand on active le SSR
    provideHttpClient(withFetch(), withInterceptors([sessionInterceptor])),

    { provide: LOCALE_ID, useValue: 'fr' }
  ]
};
