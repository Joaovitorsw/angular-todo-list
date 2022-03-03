import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { CustomValidators } from 'src/app/widgets/show-validation-error/validators/custom-validators';

@Component({
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInPage implements OnInit {
  @ViewChild('passwordInput') input: ElementRef;
  showPassword: boolean;
  singInGroup: FormGroup;
  constructor(
    private readonly firebase: FirebaseService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.createSingInGroup();
  }

  createSingInGroup() {
    this.singInGroup = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        CustomValidators.email,
      ]),
      password: new FormControl(null, [
        Validators.minLength(8),
        Validators.required,
      ]),
    });
  }
  singInWithEmailAndPassword() {
    if (this.singInGroup.invalid) return;
    const { email, password } = this.singInGroup.value as {
      email: string;
      password: string;
    };
    this.firebase.signInWithEmailAndPassword(email, password).subscribe(() => {
      this.router.navigate(['/home']);
    });
  }

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
