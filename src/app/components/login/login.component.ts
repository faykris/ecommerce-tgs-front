import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterUserComponent } from '../modals/register-user/register-user.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });
  isError = false;
  isLoadingLogin = false;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private modalService: NgbModal,
    private snackBar: MatSnackBar
  ) { }

  hasError(controlName: string, errorName: string): boolean | undefined {
    const control = this.form.get(controlName);
    return control?.hasError(errorName) && (control.dirty || control.touched);
  }

  register(): void {
    const registerModal = this.modalService.open(RegisterUserComponent, {
      size: 'md',
      centered: true,
    });

    registerModal.result.then((result: any) => {
      if (result) {
        this.openSnackBar(`Te has registrado satisfactoriamente`, 'Cerrar');
      }
    });
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  login(): void {
    this.isLoadingLogin = true;
    this.isError = false;
    this.usersService.login(
      this.form.get('username')?.value,
      this.form.get('password')?.value
    ).subscribe({
      next: () => {
        this.isLoadingLogin = false;
        this.router.navigate(['/home'])
      },
      error: err => {
        console.error('Login failed', err);
        this.isLoadingLogin = false;
        this.isError = true;
      }
    });
  }
}
