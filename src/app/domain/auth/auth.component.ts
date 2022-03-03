import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnInit,
} from '@angular/core';

@Component({
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
  }
  public screenWidth: number;

  ngOnInit() {
    this.screenWidth = window.innerWidth;
  }
}
