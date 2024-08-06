import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmployeesService } from '../services/employees.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterEmployeeComponent } from '../modals/register-employee/register-employee.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });

  constructor(
    private employeeService: EmployeesService,
    private router: Router,
    private modalService: NgbModal,
    private snackBar: MatSnackBar
  ) { }

  hasError(controlName: string, errorName: string): boolean | undefined {
    const control = this.form.get(controlName);
    return control?.hasError(errorName) && (control.dirty || control.touched);
  }

  register(): void {
    const registerModal = this.modalService.open(RegisterEmployeeComponent, {
      size: 'md',
      centered: true,
    });

    registerModal.result.then((result: any)=> {
      if (result) {
        this.openSnackBar(`Te has registrado satisfactoriamente`, 'Cerrar');
      }
    });
  }

  openSnackBar(message: string, action: string ) {
    this.snackBar.open(message, action, {
      duration: 3000, 
    });
  }

  login(): void {
    this.employeeService.login(this.form.get('email')?.value, this.form.get('password')?.value).subscribe({
      next: () => this.router.navigate(['/home']),
      error: err => alert('Login failed')
    });
  }
}
