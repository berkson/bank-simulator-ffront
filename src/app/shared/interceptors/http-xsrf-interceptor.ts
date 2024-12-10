import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpXsrfTokenExtractor,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { XSRF_HEADER_NAME } from './http-xsrf-cookie-extractor';

@Injectable({
  providedIn: 'root',
})
export class HttpXsrfInterceptor implements HttpInterceptor {
  constructor(
    private readonly tokenService: HttpXsrfTokenExtractor,
    @Inject(XSRF_HEADER_NAME) private readonly headerName: string
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const lcUrl = req.url.toLowerCase();
    // Skip both non-mutating requests and absolute URLs.
    // Non-mutating requests don't require a token, and absolute URLs require special handling
    // anyway as the cookie set
    // on our origin is not the same as the token expected by another origin.
    if (
      req.method === 'GET' ||
      req.method === 'HEAD' ||
      lcUrl.startsWith('http://') ||
      lcUrl.startsWith('https://')
    ) {
      return next.handle(req);
    }
    const token = this.tokenService.getToken();

    // Be careful not to overwrite an existing header of the same name.
    if (token !== null && !req.headers.has(this.headerName)) {
      req = req.clone({ headers: req.headers.set(this.headerName, token) });
    }
    return next.handle(req);
  }
}
