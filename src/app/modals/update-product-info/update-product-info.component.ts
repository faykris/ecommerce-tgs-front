import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductsService } from 'src/app/services/products.service';
import {isNullSelected} from "../../utils/tools.utils";

@Component({
  selector: 'app-update-product-info',
  templateUrl: './update-product-info.component.html',
  styleUrls: ['./update-product-info.component.scss']
})
export class UpdateProductInfoComponent {
  @Input() product: any;
  @Input() inventories: any[] = [];
  protected readonly isNullSelected = isNullSelected;
  form: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [Validators.required, Validators.min(50)]),
    imageUrl: new FormControl(null),
    category: new FormControl(null, [Validators.required]),
    inventoryId: new FormControl(null, [Validators.required]),
  });
  isLoadingUpdate = false;

  constructor(
    private productsService: ProductsService,
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit() :void {
    if (this.product) {
      this.fillForm();
    } else {
      this.form.setControl(
        'quantity', new FormControl(null, [Validators.required, Validators.min(1)]),
      );
    }
  }

  fillForm() {
    this.form.get('name')?.setValue(this.product?.name);
    this.form.get('description')?.setValue(this.product?.description);
    this.form.get('price')?.setValue(this.product?.price);
    this.form.get('imageUrl')?.setValue(this.product?.imageUrl);
    this.form.get('category')?.setValue(this.product?.category);
    this.form.get('inventoryId')?.setValue(this.product?.inventory.id);
  }

  hasError(controlName: string, errorName: string): boolean | undefined {
    const control = this.form.get(controlName);
    return control?.hasError(errorName) && (control.dirty || control.touched);
  }

  onCancel() {
    this.activeModal.close(false);
  }

  onSubmit() {
    this.isLoadingUpdate = true;
    if (this.form.valid) {
      if (this.product) {
        this.updateProducts();
      } else {
        this.insertProducts();
      }
    }
  }

  updateProducts() {
    this.productsService.updateInfoProduct(this.product?.productCode, this.form.value).subscribe({
      next: (response) => {
        this.isLoadingUpdate = false;
        this.activeModal.close(response);
      },
      error: (error) => {
        this.isLoadingUpdate = false;
        console.error('Error al actualizar datos', error);
        if (error.status === 401) {
          this.activeModal.close(error);
        }
      }
    });
  }

  insertProducts() {
    this.productsService.insertProducts(this.form.value).subscribe({
      next: (response) => {
        this.isLoadingUpdate = false;
        this.activeModal.close(response);
      },
      error: (error) => {
        this.isLoadingUpdate = false;
        console.error('Error al enviar datos', error);
        if (error.status === 401) {
          this.activeModal.close(error);
        }
      }
    });
  }


}
