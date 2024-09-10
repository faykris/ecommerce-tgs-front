import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { OrdersService } from "../../../services/orders.service";

@Component({
  selector: 'app-confirm-shipping',
  templateUrl: './confirm-shipping.component.html',
  styleUrls: ['./confirm-shipping.component.scss']
})
export class ConfirmShippingComponent {
  @Input() userId: number | null = null;
  @Input() products: any[] = [];
  @Input() promoOrderDate: Date | null = null;
  @Input() promoOrderDiscount: Number = 0;
  @Input() promoUserDate: Date | null = null;
  @Input() promoUserDiscount: Number = 0;
  form: FormGroup = new FormGroup({
    description: new FormControl(null, [Validators.required]),
  });
  total: number = 0;
  totalWithDiscount: number = 0;
  isLoadingShipping = false;
  fallbackImageUrl = 'assets/images/box-2-64.png';

  constructor(
    private ordersService: OrdersService,
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.getTotalPrice();
  }

  onCancel(): void {
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

  onSubmit(): void {
    this.isLoadingShipping = true;
    this.ordersService.insertOrder(
      {
        userId: this.userId,
        productIds: this.products.map(p => p.id),
        description: this.form.value.description,
        quantity: this.products.length,
        discount: +this.promoUserDiscount + +this.promoOrderDiscount,
        total: this.totalWithDiscount
      }
    ).subscribe({
        next: () => {
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

  getTotalPrice(): void {
    let totalPrice = 0;
    let totalDiscount = +this.promoUserDiscount + +this.promoOrderDiscount;

    this.products.map(p => totalPrice += p.price);

    this.total = totalPrice;

    totalPrice -= (totalPrice * totalDiscount) / 100;

    this.totalWithDiscount = totalPrice;
  }
}
