import {Component, Input} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {InventoriesService} from "../../../services/inventories.service";

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  styleUrls: ['./add-inventory.component.scss']
})
export class AddInventoryComponent {
  @Input() userId: number | null = null;
  form: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
  });
  isLoadingSave = false;

  constructor(
    private inventoriesService: InventoriesService,
    private activeModal: NgbActiveModal
  ) {}

  hasError(controlName: string, errorName: string): boolean | undefined {
    const control = this.form.get(controlName);
    return control?.hasError(errorName) && (control.dirty || control.touched);
  }

  onCancel(): void {
    this.activeModal.close(false);
  }

  onSubmit(): void {
    this.isLoadingSave = true;

    if (this.form.valid) {
      this.inventoriesService.insertInventory({
        userId: this.userId, name: this.form.value.name})
        .subscribe({
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
