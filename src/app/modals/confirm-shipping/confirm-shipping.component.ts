import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { OrdersService } from "../../services/orders.service";

@Component({
  selector: 'app-confirm-shipping',
  templateUrl: './confirm-shipping.component.html',
  styleUrls: ['./confirm-shipping.component.scss']
})
export class ConfirmShippingComponent {
  @Input() userId: number | null = null;
  @Input() products: any[] = [];
  form: FormGroup = new FormGroup({
    description: new FormControl(null, [Validators.required]),
  });
  isLoadingShipping = false;
  fallbackImageUrl = 'assets/images/box-2-64.png';

  constructor(
    private ordersService: OrdersService,
    private activeModal: NgbActiveModal
  ) {}

  onCancel() {
    this.activeModal.close(false);
  }

  hasError(controlName: string, errorName: string): boolean | undefined {
    const control = this.form.get(controlName);
    return control?.hasError(errorName) && (control.dirty || control.touched);
  }

  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = this.fallbackImageUrl;
  }

  onSubmit() {
    this.isLoadingShipping = true;
    this.ordersService.insertOrder(
      {
        userId: this.userId,
        productIds: this.products.map(p => p.id),
        description: this.form.value.description
      }
    ).subscribe({
        next: (response) => {
          this.isLoadingShipping = false;
          this.activeModal.close(this.products);
        },
        error: (error) => {
          this.isLoadingShipping = false;
          console.error('Error al enviar datos', error);
          if (error.status === 401) {
            this.activeModal.close(error);
          }
        }
      });
  }

  getTotalPrice(): number {
    let total = 0;
    this.products.map(p => total += p.price);
    return total;
  }
}
