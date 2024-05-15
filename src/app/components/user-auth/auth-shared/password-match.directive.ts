import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordMatchValidators: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  /**
   * # Nous accedons au password defini dans le registerFormGroup
   * # Pareil pour confirmPassword
   * */
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (!password || !confirmPassword) {
    return null;
  }
  return password.value === confirmPassword.value
    ? null
    : {
        passwordMissMatch: true,
      };
};
