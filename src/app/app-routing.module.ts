import { NgModule } from '@angular/core';
import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['auth']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    ...canActivate(redirectLoggedInToHome),
    loadChildren: async () =>
      (await import('./domain/auth/auth.domain.module')).AuthDomainModule,
  },
  {
    path: 'home',
    ...canActivate(redirectUnauthorizedToLogin),
    loadChildren: async () =>
      (await import('./domain/home/home.domain.module')).HomeDomainModule,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
