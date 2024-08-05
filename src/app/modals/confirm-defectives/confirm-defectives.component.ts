import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-confirm-defectives',
  templateUrl: './confirm-defectives.component.html',
  styleUrls: ['./confirm-defectives.component.scss']
})
export class ConfirmDefectivesComponent {
  @Input() productIdList: number[] = [];
  
  constructor(
    private productsService: ProductsService,
    private activeModal: NgbActiveModal
  ) {}


  onCancel() {
    this.activeModal.close(false);
  }

  onSubmit() {
    this.productsService.markDefectivesProducts({ productIdList: this.productIdList })
      .subscribe({
        next: (response) => {
          console.log('Productos marcados como defectuosos!', response);
          this.activeModal.close(this.productIdList);
        },
        error: (error) => console.error('Error al enviar datos', error)
      });
  }
}
