import { Inject, Injectable, InjectionToken, PLATFORM_ID } from '@angular/core';
import {
  DOCUMENT,
  ɵparseCookieValue as parseCookieValue,
} from '@angular/common';
import { HttpXsrfTokenExtractor } from '@angular/common/http';
export const XSRF_COOKIE_NAME = new InjectionToken<string>('XSRF-TOKEN');
export const XSRF_HEADER_NAME = new InjectionToken<string>('X-XSRF-TOKEN');

@Injectable({
  providedIn: 'root',
})
export class HttpXsrfCookieExtractor implements HttpXsrfTokenExtractor {
  private lastCookieString: string = '';
  private lastToken: string | null = null;

  /**
   * @internal for testing
   */
  parseCount: number = 0;

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    @Inject(PLATFORM_ID) private platform: string,
    @Inject(XSRF_COOKIE_NAME) private cookieName: string
  ) {}

  getToken(): string | null {
    if (this.platform === 'server') {
      return null;
    }
    const cookieString = this.doc.cookie || '';
    if (cookieString !== this.lastCookieString) {
      this.parseCount++;
      this.lastToken = parseCookieValue(cookieString, this.cookieName);
      this.lastCookieString = cookieString;
    }
    return this.lastToken;
  }
}
