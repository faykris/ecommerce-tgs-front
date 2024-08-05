import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-update-product-info',
  templateUrl: './update-product-info.component.html',
  styleUrls: ['./update-product-info.component.scss']
})
export class UpdateProductInfoComponent {
  @Input() product: any;
  form: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [Validators.required, Validators.min(50)]),
    elaboration: new FormControl(null, [Validators.required]),
    imageUrl: new FormControl(null),
  });

  constructor(
    private productsService: ProductsService,
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit() :void {
    this.fillForm();
  }

  fillForm() {
    this.form.get('name')?.setValue(this.product?.name);
    this.form.get('price')?.setValue(this.product?.price);
    this.form.get('elaboration')?.setValue(this.product?.elaboration);
    this.form.get('imageUrl')?.setValue(this.product?.imageUrl);
  }

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
      await this.productsService.updateInfoProduct(this.product?.id, this.form.value).subscribe({
        next: (response) => {
          console.log('Datos actualizados!', response)
          this.activeModal.close(response);
        },
        error: (error) => console.error('Error al actualizar datos', error)
      });
    }
  }
}
