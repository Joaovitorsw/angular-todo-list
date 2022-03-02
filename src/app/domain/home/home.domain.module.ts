import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { HomeRoutingModule } from './home-routing.module';
import { HomePage } from './pages/home/home.page';

@NgModule({
  declarations: [HomePage],
  imports: [
    MatSelectModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    CommonModule,
    MatIconModule,
  ],
})
export class HomeDomainModule {}
