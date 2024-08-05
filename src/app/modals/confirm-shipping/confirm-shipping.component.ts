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
  
  constructor(
    private productsService: ProductsService,
    private activeModal: NgbActiveModal
  ) {}


  onCancel() {
    this.activeModal.close(false);
  }

  onSubmit() {
    this.productsService.markShippedProducts({ productIdList: this.productIdList })
      .subscribe({
        next: (response) => {
          console.log('Productos enviados!', response);
          this.activeModal.close(this.productIdList);
        },
        error: (error) => console.error('Error al enviar datos', error)
      });
  }
}
