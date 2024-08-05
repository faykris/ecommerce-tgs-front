import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UpdateProductInfoComponent } from '../modals/update-product-info/update-product-info.component';
import { AddProductComponent } from '../modals/add-product/add-product.component';
import { ProductsService } from '../services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDefectivesComponent } from '../modals/confirm-defectives/confirm-defectives.component';
import { ConfirmShippingComponent } from '../modals/confirm-shipping/confirm-shipping.component';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  form: FormGroup = new FormGroup({
    searchInput: new FormControl(''),
  });
  products: any[] = [];
  productIdList: Number[] = [];
  isSomeoneSelected = false;

  constructor(
    private modalService: NgbModal,
    private productsService: ProductsService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.form.get('searchInput')!.valueChanges.pipe(
      debounceTime(300), // Espera 300ms después de la última entrada para emitir el valor
      distinctUntilChanged(), // Emitir sólo si el valor cambió
      switchMap((value: string) => this.productsService.getProductsByName(value)) // Intercambia el observable del input por el observable de la búsqueda
    ).subscribe(products => this.products = products);
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
    if (this.productIdList.filter(id => id === product.id).length > 0) {
      this.productIdList = this.productIdList.filter(id => id !== product.id);
    } else {
      this.productIdList.push(product.id);
    }
    this.isSomeoneSelected = this.productIdList.length > 0;
  }

  markAsDefectives() {
    const confirmDefectivesModal = this.modalService.open(ConfirmDefectivesComponent, {
      size: 'md',
      centered: true,
    });
    confirmDefectivesModal.componentInstance.productIdList = this.productIdList;

    confirmDefectivesModal.result.then((result: any)=> {
      if (result) {
        this.loadProducts();
        this.openSnackBar(`Se marcaron como defectuosos ${result?.length} productos`, 'Cerrar');
        this.productIdList = [];
        this.isSomeoneSelected = false;
      }
    });

  }

  markAsShipped() {
    const confirmShippingModal = this.modalService.open(ConfirmShippingComponent, {
      size: 'md',
      centered: true,
    });

    confirmShippingModal.componentInstance.productIdList = this.productIdList;

    confirmShippingModal.result.then((result: any)=> {
      if (result) {
        this.loadProducts();
        this.openSnackBar(`Se marcaron como enviados ${result?.length} productos`, 'Cerrar');
        this.productIdList = [];
        this.isSomeoneSelected = false;
      }
    });
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
      size: 'md', 
      centered: true,
    });

    updateInfoModal.componentInstance.product = product;

    updateInfoModal.result.then((result: any)=> {
      if (result) {
        this.loadProducts();
        this.openSnackBar(`Se ha actualizado el producto`, 'Cerrar');
      }
    });
  }

  openSnackBar(message: string, action: string ) {
    this.snackBar.open(message, action, {
      duration: 3000, 
    });
  }
 
}
