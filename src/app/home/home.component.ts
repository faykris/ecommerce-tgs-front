import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateProductInfoComponent } from '../modals/update-product-info/update-product-info.component';
import { AddProductComponent } from '../modals/add-product/add-product.component';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  products: any[] = [];
  selectedIds: Number[] = [];
  isSomeoneSelected = false;

  constructor(
    private modalService: NgbModal,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productsService.getAllProducts().subscribe((data: any[]) => {
      this.products = data;
      console.log('Productos:', this.products);
    });
  }

  selectProduct(product: any): void {
    if (product.status !== 1) {
      return;
    }
    if (this.selectedIds.filter(id => id === product.id).length > 0) {
      this.selectedIds = this.selectedIds.filter(id => id !== product.id);
    } else {
      this.selectedIds.push(product.id);
    }
    this.isSomeoneSelected = this.selectedIds.length > 0 ? true : false;
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
