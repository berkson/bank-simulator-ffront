import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login-template',
  standalone: true,
  imports: [RouterOutlet, MatToolbar],
  templateUrl: './login-template.component.html',
  styleUrl: './login-template.component.scss',
})
export class LoginTemplateComponent {}
