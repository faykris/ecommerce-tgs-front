import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-confirm-shipping',
  templateUrl: './confirm-shipping.component.html',
  styleUrls: ['./confirm-shipping.component.scss']
})
export class ConfirmShippingComponent {
  @Input() productIdList: number[] = [];
  isLoadingShipping = false;

  constructor(
    private productsService: ProductsService,
    private activeModal: NgbActiveModal
  ) {}


  onCancel() {
    this.activeModal.close(false);
  }

  onSubmit() {
    this.isLoadingShipping = true;
    this.productsService.markShippedProducts({ productIdList: this.productIdList })
      .subscribe({
        next: (response) => {
          this.isLoadingShipping = false;
          this.activeModal.close(this.productIdList);
        },
        error: (error) => {
          this.isLoadingShipping = false;
          console.error('Error al enviar datos', error);
        }
      });
  }
}
