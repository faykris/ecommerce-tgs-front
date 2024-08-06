import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-register-employee',
  templateUrl: './register-employee.component.html',
  styleUrls: ['./register-employee.component.scss']
})
export class RegisterEmployeeComponent {
  form: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    phone: new FormControl(null),
  });
  
  constructor(
    private employeeService: EmployeesService,
    private activeModal: NgbActiveModal
  ) {}

  isNullSelected() {
    return this.form.get('elaboration')?.value === null;
  }

  hasError(controlName: string, errorName: string): boolean | undefined {
    const control = this.form.get(controlName);
    return control?.hasError(errorName) && (control.dirty || control.touched);
  }

  onCancel() {
    this.activeModal.close(false);
  }

  async onSubmit() {
    console.log(this.form.controls)
    if (this.form.valid) {
      await this.employeeService.insertEmployee(this.form.value).subscribe({
        next: (response) => {
          console.log('Datos enviados!', response);
          this.activeModal.close(response);
        },
        error: (error) => console.error('Error al enviar datos', error)
      });
    }

  }
}
