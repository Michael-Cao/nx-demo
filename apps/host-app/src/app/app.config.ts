import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { TitleService } from './services/title.service';
import { HeaderRefService } from './header/header-dynamic-ref.service';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: TitleService, useValue: new TitleService(), multi: false },
    { provide: HeaderRefService, useValue: new HeaderRefService(), multi: false },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
  ],
};
