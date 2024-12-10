import { Routes } from '@angular/router';
import { LoginTemplateComponent } from './authentication';
import { HomepageComponent } from './home';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginTemplateComponent,
    loadChildren: () =>
      import('./authentication/login/components/login.routes').then(
        (mod) => mod.loginRoutes
      ),
  },
  {
    path: 'homepage',
    component: HomepageComponent,
  },
];
