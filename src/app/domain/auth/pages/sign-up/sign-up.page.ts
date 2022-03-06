import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { CustomValidators } from 'src/app/widgets/show-validation-error/validators/custom-validators';

@Component({
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpPage implements OnInit {
  singUpGroup: FormGroup;
  fileName: string;
  submit = false;

  readonly START_DATE = new Date('01/01/2010');

  constructor(
    private readonly firebase: FirebaseService,
    private readonly router: Router,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.createSingUpGroup();
  }

  registerUser() {
    if (this.singUpGroup.invalid) return;

    this.submit = true;

    const { name, email, password, birthday, file } = this.singUpGroup
      .value as {
      name: string;
      email: string;
      password: string;
      birthday: Date;
      file: File;
    };

    this.firebase.registerUser(email, password, name, file).subscribe(() => {
      this.router.navigate(['/']);
      this.singUpGroup.reset();
      this.submit = false;
    });
  }

  createSingUpGroup() {
    this.singUpGroup = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl(null, [
        Validators.required,
        CustomValidators.email,
      ]),
      password: new FormControl(null, [
        Validators.minLength(8),
        Validators.required,
      ]),
      confirmPassword: new FormControl(null, [
        Validators.minLength(8),
        Validators.required,
        CustomValidators.matchValues('password'),
      ]),
      birthday: new FormControl(null, [Validators.required]),
      file: new FormControl(null, Validators.required),
    });
  }

  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const files: FileList = target.files as FileList;

    if (files && files.length) {
      const file = files[0];
      this.fileName = file.name;
      this.singUpGroup.patchValue({
        file: file,
      });
      this.changeDetector.markForCheck();
    }
  }

  availableDatesFn = (date: Date | null): boolean => {
    const minimumYear = this.START_DATE.getFullYear();
    const currentYear = date?.getFullYear() ?? 0;
    return currentYear <= minimumYear;
  };
}
