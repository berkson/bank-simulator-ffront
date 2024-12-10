import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  provideRouter,
  withComponentInputBinding,
  withRouterConfig,
} from '@angular/router';

import {
  HTTP_INTERCEPTORS,
  HttpXsrfTokenExtractor,
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import {
  ErrorStateMatcher,
  MAT_DATE_LOCALE,
  ShowOnDirtyErrorStateMatcher,
} from '@angular/material/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import 'moment/locale/pt';
import { CookieService } from 'ngx-cookie-service';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { routes } from './app.routes';
import {
  HttpXsrfCookieExtractor,
  HttpXsrfInterceptor,
  PtBrMatPaginatorIntl,
  XSRF_COOKIE_NAME,
  XSRF_HEADER_NAME,
  XhrInterceptor,
} from './shared';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withComponentInputBinding(),
      withRouterConfig({
        onSameUrlNavigation: 'reload',
      })
    ),
    provideAnimations(),
    CookieService,
    provideEnvironmentNgxMask(),
    provideHttpClient(
      withInterceptorsFromDi(),
      withInterceptors([XhrInterceptor])
    ),
    provideMomentDateAdapter(undefined, { strict: true }),

    { provide: HttpXsrfTokenExtractor, useClass: HttpXsrfCookieExtractor },
    { provide: HTTP_INTERCEPTORS, useClass: HttpXsrfInterceptor, multi: true },
    { provide: XSRF_COOKIE_NAME, useValue: 'XSRF-TOKEN' },
    { provide: XSRF_HEADER_NAME, useValue: 'X-XSRF-TOKEN' },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: MatPaginatorIntl, useClass: PtBrMatPaginatorIntl },
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
  ],
};
