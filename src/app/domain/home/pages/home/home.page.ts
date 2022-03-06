import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Auth, User } from '@angular/fire/auth';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ClimaticLocationService } from 'src/app/services/climatic-location/climatic-location.service';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { TaskDialogComponent } from '../../components/dialogs/task-dialog/task-dialog.component';

export interface TodoTask {
  id: string;
  time: string;
  title: string;
  isDone: boolean;
  description: string;
  category: Category;
}

export interface Category {
  icon: string;
  color: string;
}
@Component({
  selector: 'px-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements OnInit {
  constructor(
    private readonly firebase: FirebaseService,
    private readonly auth: Auth,
    private readonly router: Router,
    private readonly matDialog: MatDialog,
    public readonly climaticLocationService: ClimaticLocationService
  ) {}
  tasks$: Observable<TodoTask[]> = of([
    {
      id: '1',
      time: '10:00am',
      title: 'Task 1',
      description: 'Description 1',
      isDone: false,
      category: {
        icon: 'home',
        color: '#4CAF50',
      },
    },
    {
      id: '2',
      time: '11:00am',
      title: 'Task 2',
      description: 'Description 2',
      isDone: false,

      category: {
        icon: 'work',
        color: '#00bcd4',
      },
    },
    {
      id: '3',
      time: '12:00pm',
      title: 'Task 3',
      isDone: true,

      description: 'Description 3',
      category: {
        icon: 'school',
        color: '#ffc107',
      },
    },
  ]);

  readonly user = this.auth.currentUser as User;

  ngOnInit(): void {}

  logoff() {
    this.firebase.logoff().subscribe(() => {
      this.router.navigate(['/auth']);
    });
  }

  openTaskDialog() {
    this.matDialog.open(TaskDialogComponent);
  }
}
