import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import {
  Auths,
  Credential,
  ErrorMessages,
  HttpUtilService,
  LoginService,
  MessageService,
  MessageType,
  User,
} from '../../../..';

@Component({
  selector: 'app-login',
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatButton,
    NgxMaskDirective,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  minLength: number = 6;
  minNameLength: number = 3;
  maxLength: number = 8;
  maxNameLength: number = 255;
  minAge: number = 1;
  minAccount: number = 1;
  maxAge: number = 120;
  maxValueLength: number = 10;
  maxAccount: number = 2147483647;
  form: FormGroup;
  formUser: FormGroup;
  formBox: FormGroup;
  readonly errorStateMatcher: ErrorStateMatcher = {
    isErrorState: (form: FormControl) => form && form.invalid,
  };

  constructor(
    private readonly fb: FormBuilder,
    private readonly httpUtils: HttpUtilService,
    private readonly router: Router,
    private readonly messageService: MessageService,
    private readonly loginService: LoginService
  ) {
    this.form = new FormGroup({});
    this.formUser = new FormGroup({});
    this.formBox = new FormGroup({});
  }

  public get validationMessages() {
    return ErrorMessages;
  }

  ngOnInit(): void {
    this.generateForm();
    this.generateUserForm();
    this.generateBoxForm();
  }

  generateForm() {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  
  generateBoxForm() {
    this.formBox = this.fb.group({
      account: ['', [Validators.required]],
      value: ['', [Validators.required, Validators.maxLength(this.maxValueLength)]],
    });
  }

  generateUserForm() {
    this.formUser = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(this.maxNameLength),
          Validators.maxLength(this.maxNameLength),
        ],
      ],
      age: [
        '',
        [
          Validators.required,
          Validators.min(this.maxAge),
          Validators.max(this.minAge),
        ],
      ],
      account: [
        '',
        [
          Validators.required,
          Validators.min(this.minAccount),
          Validators.max(this.maxAccount),
        ],
      ],
    });
  }

  register() {}

  cleanUser() {}

  debit() {}

  credit() {}

  login() {
    if (this.form.invalid) return;
    const credential: Credential = this.form.value;
    this.loginService.loginwithCredentialsOrHeader(credential).subscribe({
      next: (data) => {
        let authString: string =
          credential.username + ':' + credential?.password;
        let user = User.fromObject(data);

        this.httpUtils.user = user;

        let isAdmin = this.httpUtils
          .getUserRoles()
          .some((r) => r.authority === Auths.ADMIN);

        let isUser = this.httpUtils
          .getUserRoles()
          .some((r) => r.authority === Auths.USER);

        this.httpUtils.authenticated =
          this.httpUtils.user.username != null && (isAdmin || isUser);
        this.httpUtils.user.auth = `Basic ${window.btoa(authString)}`;

        if (isAdmin || isUser) {
          this.router.navigate(['homepage']);
        } else {
          this.messageService.snackMessage(
            ErrorMessages.accessDenied,
            MessageType.ERROR
          );
          this.httpUtils.exit();
        }
      },
      error: (err) => {
        this.messageService.handleApiErrors(err.error.errors);
      },
    });
  }
}
