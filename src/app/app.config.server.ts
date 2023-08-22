import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  mergeApplicationConfig,
  ApplicationConfig,
  importProvidersFrom,
} from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { AppRoutingModule } from './app-routing.module';
import { FilmsInterceptor } from './features/films-list/films.interceptor';

const appConfig = {
  providers: [
    importProvidersFrom(AppRoutingModule),
    { provide: HTTP_INTERCEPTORS, useClass: FilmsInterceptor, multi: true },
  ],
};

const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering()],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
