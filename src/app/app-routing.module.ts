import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './domain/auth/guards/auth.guard';
import { LoggedInGuard } from './domain/auth/guards/logged-in.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    canActivate: [LoggedInGuard],
    loadChildren: async () =>
      (await import('./domain/auth/auth.domain.module')).AuthDomainModule,
  },
  {
    path: 'home',
    canLoad: [AuthGuard],
    loadChildren: async () =>
      (await import('./domain/home/home.domain.module')).HomeDomainModule,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
