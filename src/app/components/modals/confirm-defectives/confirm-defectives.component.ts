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
  isLoadingDefectives = false;

  constructor(
    private productsService: ProductsService,
    private activeModal: NgbActiveModal
  ) {}

  onCancel(): void {
    this.activeModal.close(false);
  }

  onSubmit(): void {
    this.isLoadingDefectives = true;
    this.productsService.markDefectivesProducts({ productIdList: this.productIdList })
      .subscribe({
        next: () => {
          this.isLoadingDefectives = false;
          this.activeModal.close(this.productIdList);
        },
        error: (error) => {
          this.isLoadingDefectives = false;
          console.error('Error al enviar datos', error);
          if (error.status === 401) {
            this.activeModal.close(error);
          }
        }
      });
  }
}
