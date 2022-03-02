import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { SignInPage } from './guards/pages/sign-in/sign-in.page';
import { SignUpPage } from './guards/pages/sign-up/sign-up.page';

@NgModule({
  declarations: [AuthComponent, SignUpPage, SignInPage],
  imports: [
    MatSelectModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    CommonModule,
    MatIconModule,
  ],
})
export class AuthDomainModule {}
