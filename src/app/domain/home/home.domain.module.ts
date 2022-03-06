import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { TaskDialogComponent } from './components/dialogs/task-dialog/task-dialog.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomePage } from './pages/home/home.page';
import { TaskComponent } from './components/task/task.component';

@NgModule({
  declarations: [HomePage, TaskDialogComponent, TaskComponent],
  imports: [
    MatSelectModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatListModule,
    HomeRoutingModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatDialogModule,
    MatCardModule,
    MatSidenavModule,
    MatButtonModule,
    MatInputModule,
    CommonModule,
    MatIconModule,
    MatButtonToggleModule,
  ],
})
export class HomeDomainModule {}
