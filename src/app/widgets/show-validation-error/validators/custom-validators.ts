import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { eValidationErrorKeys } from '../validations';

export class CustomValidators {
  static email(control: AbstractControl) {
    const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i;
    const isValid = emailPattern.test(control.value);

    if (!isValid)
      return {
        [eValidationErrorKeys.EMAIL]: true,
      };

    return null;
  }

  public static matchValues(
    matchTo: string
  ): (control: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control.parent as FormGroup;
      const parentValue = formGroup?.controls[matchTo].value;
      const controlValueMatchParentValue = control.value === parentValue;

      if (!controlValueMatchParentValue)
        return {
          [eValidationErrorKeys.MATCHING]: true,
        };

      return null;
    };
  }
}
