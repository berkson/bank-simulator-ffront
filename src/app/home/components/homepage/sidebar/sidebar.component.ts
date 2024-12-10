import { Component, Input } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import {
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
} from '@angular/material/expansion';
import { MatList, MatListItem } from '@angular/material/list';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Auths, HttpUtilService, User } from '../../../../shared';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatList,
    MatListItem,
    MatDivider,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatProgressSpinner,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  @Input('user') user: User;
  authorities: string[];
  private _panelOpenState: boolean = false;
  private _opened: boolean = false;
  isDownloading: boolean;

  constructor(private httpUtil: HttpUtilService) {
    this.authorities = [];
    this.user = new User();
    this.isDownloading = false;
  }

  public get panelOpenState(): boolean {
    return this._panelOpenState;
  }

  public set panelOpenState(value: boolean) {
    this._panelOpenState = value;
  }

  public get opened(): boolean {
    return this._opened;
  }

  public set opened(value: boolean) {
    this._opened = value;
  }

  fillAuthorities(auth: string) {
    if (!this.authorities.includes(auth)) {
      this.authorities.push(auth);
    }
  }

  isAdmin(): boolean {
    for (let role of this.httpUtil.getUserRoles()) {
      this.fillAuthorities(role.authority!);
      if (role.authority === Auths.ADMIN) {
        return true;
      }
    }
    return false;
  }
}
