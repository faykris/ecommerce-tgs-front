import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateProductInfoComponent } from '../modals/update-product-info/update-product-info.component';
import { AddProductComponent } from '../modals/add-product/add-product.component';
import { ProductsService } from '../services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private productsService: ProductsService,
    private snackBar: MatSnackBar
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
    this.isSomeoneSelected = this.selectedIds.length > 0;
  }

  addProduct() {
    const addInfoModal = this.modalService.open(AddProductComponent, {
      size: 'md',
      centered: true,
    });

    addInfoModal.result.then((result: any)=> {
      if (result) {
        this.loadProducts();
        this.openSnackBar(`Se agregaron ${result?.length} nuevos productos`, 'Cerrar');
      }
    }) 
  }

  updateProductInfo(product: any) {
    const updateInfoModal = this.modalService.open(UpdateProductInfoComponent, {
      size: 'md', //TAMAÑO DEL MODAL
      centered: true, //CENTRAMOS EL MODAL
    });

    updateInfoModal.componentInstance.product = product;

    updateInfoModal.result.then((result: any)=> {
      if (result) {
        this.loadProducts();
        this.openSnackBar(`Se ha actualizado el producto`, 'Cerrar');
      }
    }) 
    //updateInfoModal.result.then((identification) => {

    //}
  }
  openSnackBar(message: string, action: string ) {
    this.snackBar.open(message, action, {
      duration: 3000, 
    });
  }

  
  
}
