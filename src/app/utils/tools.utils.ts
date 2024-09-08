import { FormGroup } from '@angular/forms';

export const isNullSelected = (form: FormGroup, formControlName: string): boolean => {
  return form.get(formControlName)?.value === null;
}
