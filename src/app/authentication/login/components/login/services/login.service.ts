import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Credential, HttpUtilService } from '../../../../..';
import { environment as env } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public static readonly AUTH_PATH = env.baseApiUrl + 'user';

  constructor(
    private readonly httpClient: HttpClient,
    private readonly httpUtils: HttpUtilService
  ) {}

  loginwithCredentialsOrHeader(credential: Credential): Observable<any> {
    return this.httpClient.get(LoginService.AUTH_PATH, {
      headers: this.httpUtils.getHeaders(credential),
    });
  }
}
