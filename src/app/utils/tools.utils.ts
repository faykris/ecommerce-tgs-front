import { FormGroup } from '@angular/forms';

const months = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
]

export const isNullSelected = (form: FormGroup, formControlName: string): boolean => {
  return form.get(formControlName)?.value === null;
}

export const getStringMonth = (index: number): string => {
  return months[index];
}
