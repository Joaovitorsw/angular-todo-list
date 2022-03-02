import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';

@Component({
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInPage {
  @ViewChild('passwordInput') input: ElementRef;
  showPassword: boolean;

  constructor(
    private readonly firebase: FirebaseService,
    private readonly router: Router
  ) {}

  signInWithGoogle() {
    this.firebase.signInWithGoogle().subscribe((result) => {
      this.router.navigate(['/home']);
    });
  }

  signInWithFacebook() {
    this.firebase.signInWithFacebook().subscribe((result) => {
      this.router.navigate(['/home']);
    });
  }

  updatePasswordVisibility() {
    this.showPassword = !this.showPassword;
    this.input.nativeElement.type = this.showPassword ? 'text' : 'password';
  }
}
