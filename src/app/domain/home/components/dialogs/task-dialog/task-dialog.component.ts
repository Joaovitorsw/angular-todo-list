import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'px-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskDialogComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
