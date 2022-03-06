import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnInit,
} from '@angular/core';
import { TodoTask } from '../../pages/home/home.page';

@Component({
  selector: 'tl-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent implements OnInit {
  @HostBinding('class.done') get isDone(): boolean {
    return this.task.isDone;
  }
  @Input() task: TodoTask;

  constructor() {}

  ngOnInit(): void {}
}
