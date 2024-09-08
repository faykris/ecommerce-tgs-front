import {Component, Input} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
  @Input() inventories: any[] = [];
  form: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [Validators.required, Validators.min(50)]),
    imageUrl: new FormControl(null),
    category: new FormControl(null, [Validators.required]),
    inventoryId: new FormControl(null, [Validators.required]),
    quantity: new FormControl(null, [Validators.required, Validators.min(1)]),
  });
  isLoadingSave = false;

  constructor(
    private productsService: ProductsService,
    private activeModal: NgbActiveModal
  ) {}

  isNullSelected(formControlName: string) {
    return this.form.get(formControlName)?.value === null;
  }

  hasError(controlName: string, errorName: string): boolean | undefined {
    const control = this.form.get(controlName);
    return control?.hasError(errorName) && (control.dirty || control.touched);
  }

  onCancel() {
    this.activeModal.close(false);
  }

  onSubmit() {
    this.isLoadingSave = true;
    if (this.form.valid) {
      this.productsService.insertProducts(this.form.value).subscribe({
        next: (response) => {
          this.isLoadingSave = false;
          this.activeModal.close(response);
        },
        error: (error) => {
          this.isLoadingSave = false;
          console.error('Error al enviar datos', error);
          if (error.status === 401) {
            this.activeModal.close(error);
          }
        }
      });
    }
  }
}
