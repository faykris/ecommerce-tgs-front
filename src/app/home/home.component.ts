import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateProductInfoComponent } from '../modals/update-product-info/update-product-info.component';
import { AddProductComponent } from '../modals/add-product/add-product.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(
    private modalService: NgbModal,
  ) {
  }

  ngOnInit(): void {
    
  }

  addProduct() {
    const addInfoModal = this.modalService.open(AddProductComponent, {
      size: 'md',
      centered: true,
    });
  }

  updateProductInfo() {
    const updateInfoModal = this.modalService.open(UpdateProductInfoComponent, {
      size: 'md', //TAMAÑO DEL MODAL
      centered: true, //CENTRAMOS EL MODAL
    });
  }

  // SEARCH.result.then((identification) => {

  // }
  
}
