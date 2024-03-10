import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideClientHydration(),
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(HttpClientXsrfModule.withOptions({
        cookieName: 'blabla',
        headerName: 'blou',
    })),
    provideHttpClient(withFetch()), provideAnimations()]
};
