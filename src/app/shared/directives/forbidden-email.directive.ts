import { AbstractControl, ValidatorFn } from '@angular/forms';

export function forbiddenEmailValidator(forbiddenEmail: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const forbidden = forbiddenEmail === control.value;
    return forbidden ? { forbiddenEmail: { value: control.value } } : null;
  };
}
