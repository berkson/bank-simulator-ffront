import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { Auths } from '..';
import { environment as env } from '../../../environments/environment';
import { AppComponent } from '../../app.component';
import { Credential } from '../../authentication';
import { Role, User } from '../models';

@Injectable({
  providedIn: 'root',
})
export class HttpUtilService {
  private _authenticated: boolean;
  private _user: User = new User();

  constructor(private httpClient: HttpClient, private router: Router) {
    this._authenticated = false;
  }

  public get authenticated(): boolean {
    return this._authenticated;
  }
  public set authenticated(value: boolean) {
    this._authenticated = value;
  }

  public get user(): User {
    return this._user;
  }
  public set user(value: User) {
    this._user = value;
  }

  public getUserRoles(): Array<Role> {
    return this._user.roles != undefined ? this._user.roles : new Array<Role>();
  }

  public getAuth(): string | undefined {
    return this._user.auth;
  }

  isAdmin(): boolean {
    return this.getUserRoles().some((auth) => auth.authority === Auths.ADMIN);
  }

  exit() {
    this.httpClient
      .post(env.baseHOff + '/webapp/logout', {
        headers: this.getHeaders(),
        withCredentials: true,
      })
      .pipe(
        finalize(() => {
          this._authenticated = false;
          this._user = new User();
          this.router.navigate(['']);
          if (localStorage.getItem(AppComponent.USER_KEY) !== null) {
            localStorage.removeItem(AppComponent.USER_KEY);
          }
        })
      )
      .subscribe();
  }

  getHeaders(credential?: Credential): HttpHeaders {
    let headers: HttpHeaders = new HttpHeaders();

    if (credential) {
      let authString: string = credential.username + ':' + credential?.password;
      let auth = `Basic ${window.btoa(authString)}`;
      headers = new HttpHeaders({ Authorization: auth });
    } else {
      headers = this._user.auth
        ? headers
            .append('Authorization', this._user.auth)
            .append('content-type', 'application/json')
        : headers;
    }
    return headers;
  }

  verifyRefresh() {
    if (localStorage.getItem(AppComponent.USER_KEY) !== null) {
      this._user = User.fromObject(
        JSON.parse(localStorage.getItem(AppComponent.USER_KEY)!)
      );
    }
  }
}
