import { Component, HostListener } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import {
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent,
} from '@angular/material/sidenav';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import {
  HttpUtilService,
  MessageService,
  MessageType,
  User
} from './shared';
import { ErrorMessages } from './shared/messages';
import { SidebarComponent } from './home/components/homepage/sidebar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbar,
    MatToolbarRow,
    MatIcon,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    SidebarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Banco';
  public static readonly USER_KEY: string = 'user';
  private _user: User = new User();
  private _opened: boolean = false;

  constructor(
    private httpUtils: HttpUtilService,
    private router: Router,
    private messageService: MessageService
  ) {
    if (localStorage.getItem(AppComponent.USER_KEY) !== null) {
      let user: User = User.fromObject(
        JSON.parse(localStorage.getItem(AppComponent.USER_KEY)!)
      );
      this.router.events
        .pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
        .subscribe({
          next: (event: { id: Number; url: any; urlAfterRedirects: any }) => {
            if (event.id === 1 && event.url === event.urlAfterRedirects) {
              try {
                if (user.auth) {
                  this.httpUtils.user = user;
                  this._user = user;
                  this.httpUtils.authenticated =
                    user.username !== null && user.username !== undefined;
                  this.delete();
                }
              } catch (e) {
                this.messageService.snackMessage(
                  ErrorMessages.tryAgain,
                  MessageType.ERROR
                );
                this.httpUtils.exit();
              }
            }
          },
        });
    }
  }

  delete() {
    localStorage.removeItem(AppComponent.USER_KEY);
  }

  exit(): void {
    this.httpUtils.exit();
  }

  authenticated(): boolean {
    return this.httpUtils.authenticated;
  }

  public get opened(): boolean {
    return this._opened;
  }

  public set opened(value: boolean) {
    this._opened = value;
  }

  public get user() {
    return this._user;
  }

  @HostListener('window:beforeunload', ['$event']) unloadHandler(event: Event) {
    this.processUserData();
  }

  processUserData() {
    if (this.httpUtils.getAuth() !== undefined) {
      let user: string = JSON.stringify(this.httpUtils.user);
      localStorage.setItem(AppComponent.USER_KEY, user);
    }
  }

  @HostListener('contextmenu', ['$event']) handleVisibilityChange(
    event: Event
  ) {
    this.processHiddenDocument();
  }

  processHiddenDocument() {
    let user: string = JSON.stringify(this.httpUtils.user);
    localStorage.setItem(AppComponent.USER_KEY, user);
    this.startCountDown(60);
  }

  startCountDown(seconds: number) {
    let counter = seconds;

    const interval = setInterval(() => {
      counter--;

      if (counter < 0) {
        clearInterval(interval);
        this.delete();
      }
    }, 1000);
  }
}
