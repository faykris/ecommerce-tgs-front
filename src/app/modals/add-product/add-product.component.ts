import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
  form: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [Validators.required, Validators.min(50)]),
    elaboration: new FormControl(null, [Validators.required]),
    imageUrl: new FormControl(null),
    quantity: new FormControl(null, [Validators.required, Validators.min(1)]),
  });
  
  constructor(
    private productsService: ProductsService,
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
      await this.productsService.insertProducts(this.form.value).subscribe({
        next: (response) => {
          console.log('Datos enviados!', response)
          this.activeModal.close(response);
        },
        error: (error) => console.error('Error al enviar datos', error)
      });
    }

  }
}
