import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent {
  form: FormGroup = new FormGroup({
    firstname: new FormControl(null, [Validators.required]),
    lastname: new FormControl(null, [Validators.required]),
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    phone: new FormControl(null),
  });
  isLoadingRegister = false;

  constructor(
    private userService: UsersService,
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

  onSubmit() {
    this.isLoadingRegister = true;
    if (this.form.valid) {
      this.userService.addUser(this.form.value).subscribe({
        next: (response) => {
          this.isLoadingRegister = false;
          this.activeModal.close(response);
        },
        error: (error) => {
          this.isLoadingRegister = false;
          console.error('Error al enviar datos', error)
        }
      });
    }

  }
}
