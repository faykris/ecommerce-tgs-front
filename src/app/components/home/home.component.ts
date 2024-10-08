import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { UpdateProductInfoComponent } from '../modals/update-product-info/update-product-info.component';
import { ProductsService } from '../../services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDefectivesComponent } from '../modals/confirm-defectives/confirm-defectives.component';
import { ConfirmShippingComponent } from '../modals/confirm-shipping/confirm-shipping.component';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { InventoriesService} from "../../services/inventories.service";
import { AddInventoryComponent } from "../modals/add-inventory/add-inventory.component";
import { getStringMonth, isNullSelected } from "../../utils/tools.utils";
import { OptionsService } from "../../services/options.service";
import { User } from "../../models/user.model";
import {Product} from "../../models/product.model";
import {Inventory} from "../../models/inventory.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  protected readonly isNullSelected = isNullSelected;
  protected readonly getStringMonth = getStringMonth;
  form: FormGroup = new FormGroup({
    filter: new FormControl(1),
    inventory: new FormControl(null),
    category: new FormControl(null),
    status: new FormControl(null),
  });
  user!: User;
  products: Product[] = [];
  inventories: Inventory[] = [];
  options: any[] = [];
  selectedProducts: Product[] = [];
  isSomeoneSelected = false;
  isLoadingProducts = true;
  fallbackImageUrl = 'assets/images/box-2-64.png';
  promoOrderDate: Date | null = null;
  promoOrderDiscount: number | null = null;
  promoUserDate: Date | null = null;
  promoUserDiscount: number | null = null;

  constructor(
    private modalService: NgbModal,
    private productsService: ProductsService,
    private inventoriesService: InventoriesService,
    private usersService: UsersService,
    private snackBar: MatSnackBar,
    private userService: UsersService,
    private optionsService: OptionsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadOptions()
    this.loadUser();
    this.loadInventories();
    this.loadProducts();
  }

  loadOptions(): void {
    this.optionsService.getAllOptions().subscribe({
      next: (data) => {
        this.options = data;
        this.isExistOrdersPromo();
      },
      error: (error) => {
        console.error('Error al enviar datos', error);
        if (error.status === 401) {
          this.logout();
        }
      }
    });
  }

  loadUser(): void {
    const email = this.usersService.getUserInfo();
    if (email) {
      this.usersService.getUser(email).subscribe({
        next: (data) => {
          this.user = data;
          console.log('user:', this.user);
          this.isLoadingProducts = false;
        },
        error: (error) => {
          this.isLoadingProducts = false;
          console.error('Error al enviar datos', error);
          if (error.status === 401) {
            this.logout();
          }
        }
      })
    }
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

  loadProducts() {
    this.productsService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        console.log('products:', this.products);
        this.isLoadingProducts = false;
      },
      error: (error) => {
        this.isLoadingProducts = false;
        console.error('Error al enviar datos', error);
        if (error.status === 401) {
          this.logout();
        }
      }
    });
  }

  loadInventories() {
    this.inventoriesService.getAllInventories().subscribe({
      next: (data) => {
        this.inventories = data;
      },
      error: (error) => {
        this.isLoadingProducts = false;
        console.error('Error al enviar datos', error);
        if (error.status === 401) {
          this.logout();
        }
      }
    })
  }

  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = this.fallbackImageUrl;
  }

  selectProduct(product: any): void {
    if (product.status !== 1) {
      return;
    }
    if (this.selectedProducts.filter(p => p.id === product.id).length > 0) {
      this.selectedProducts = this.selectedProducts.filter(p => p.id !== product.id);
    } else {
      this.selectedProducts.push(product);
    }
    this.isSomeoneSelected = this.selectedProducts.length > 0;
  }

  markAsDefectives() {
    const confirmDefectivesModal = this.modalService.open(ConfirmDefectivesComponent, {
      size: 'md',
      centered: true,
    });
    confirmDefectivesModal.componentInstance.products = this.selectedProducts;

    confirmDefectivesModal.result.then((result: any)=> {
      if (result) {
        if (result?.status === 401) {
          this.logout();
        }
        this.resetFilterToAll();
        this.loadProducts();
        this.openSnackBar(`Se marcaron como defectuosos ${result?.length} productos`, 'Cerrar');
        this.selectedProducts = [];
        this.isSomeoneSelected = false;
      }
    });
  }

  markAsShipped() {
    const confirmShippingModal = this.modalService.open(ConfirmShippingComponent, {
      size: 'xl',
      centered: true,
    });

    confirmShippingModal.componentInstance.products = this.selectedProducts;
    confirmShippingModal.componentInstance.userId = this.user.id;
    confirmShippingModal.componentInstance.promoOrderDate = this.promoOrderDate;
    confirmShippingModal.componentInstance.promoOrderDiscount = this.promoOrderDiscount;
    confirmShippingModal.componentInstance.promoUserDate = this.promoUserDate;
    confirmShippingModal.componentInstance.promoUserDiscount = this.promoUserDiscount;

    confirmShippingModal.result.then((result: any)=> {
      if (result) {
        if (result?.status === 401) {
          this.logout();
        }
        this.loadProducts();
        this.openSnackBar(`Se marcaron como enviados ${result?.length} productos`, 'Cerrar');
        this.selectedProducts = [];
        this.isSomeoneSelected = false;
      }
    });
  }

  addInventory() {
    const addInventoryModal = this.modalService.open(AddInventoryComponent, {
      size: 'md',
      centered: true,
    });

    addInventoryModal.componentInstance.userId = this.user.id;

    addInventoryModal.result.then((result: any)=> {
      if (result) {
        if (result?.status === 401) {
          this.logout();
        }
        this.loadInventories();
        this.openSnackBar(`Se agregó un nuevo inventario`, 'Cerrar');
      }
    });
  }

  addProduct() {
    console.log(this.promoOrderDate);
    console.log(this.promoOrderDiscount);

    const addProductModal = this.modalService.open(UpdateProductInfoComponent, {
      size: 'md',
      centered: true,
    });

    addProductModal.componentInstance.inventories = this.inventories;

    addProductModal.result.then((result: any)=> {
      if (result) {
        if (result?.status === 401) {
          this.logout();
        }
        this.resetFilterToAll();
        this.loadProducts();
        this.openSnackBar(`Se agregaron ${result?.length} nuevos productos`, 'Cerrar');
      }
    });
  }

  updateProductInfo(product: any): void {
    if (product.status !== 1) {
      return;
    }

    const updateInfoModal = this.modalService.open(UpdateProductInfoComponent, {
      size: 'md',
      centered: true,
    });

    updateInfoModal.componentInstance.product = product;
    updateInfoModal.componentInstance.inventories = this.inventories;

    updateInfoModal.result.then((result: any)=> {
      if (result) {
        if (result?.status === 401) {
          this.logout();
        }
        this.resetFilterToAll();
        this.loadProducts();
        this.openSnackBar(`Se ha actualizado productos`, 'Cerrar');
      }
    });
  }

  resetFilterToAll() {
    this.form.controls['filter'].setValue(1)
    this.form.controls['category'].reset();
    this.form.controls['status'].reset();
    this.form.controls['inventory'].reset();
  }

  openSnackBar(message: string, action: string ) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  isSelectedProduct(id: number) {
    return this.selectedProducts.filter(product => product.id === id).length > 0;
  }

  onFilterChange(event: any) {
    const selectedValue = Number(event.target.value.split(': ')[1]);
    if (selectedValue === 1) {
      this.isLoadingProducts = true;
      this.form.controls['category'].reset();
      this.form.controls['status'].reset();
      this.form.controls['inventory'].reset();
      this.loadProducts();
    }
  }

  onOptionChange(event: any, filter: string): void {
    this.isLoadingProducts = true;
    let selectedValue = event.target.value;

    switch (filter) {
      case 'category':
        this.productsService.getProductsByCategory(selectedValue).subscribe({
          next: (result: any) => {
            if (result) {
              this.form.controls['status'].reset();
              this.form.controls['inventory'].reset();
              this.products = result;
              this.isLoadingProducts = false;
            }
          },
          error: (error: any) => {
            this.isLoadingProducts = false;
            console.log('Error al cargar por categoria:', error);
          }
        });
        break;
      case 'status':
        this.productsService.getProductsByStatus(selectedValue).subscribe({
          next: (result: any) => {
            if (result) {
              this.form.controls['category'].reset();
              this.form.controls['inventory'].reset();
              this.products = result;
              this.isLoadingProducts = false;
            }
          },
          error: (error: any) => {
            this.isLoadingProducts = false;
            console.log('Error al cargar por categoria:', error);
          }
        });
        break;
      case 'inventory':
        this.productsService.getProductsByInventory(selectedValue).subscribe({
          next: (result: any) => {
            if (result) {
              this.form.controls['category'].reset();
              this.form.controls['status'].reset();
              this.products = result;
              this.isLoadingProducts = false;
            }
          },
          error: (error: any) => {
            this.isLoadingProducts = false;
            console.log('Error al cargar por categoria:', error);
          }
        });
        break;
      default:
        this.isLoadingProducts = false;
        break;
    }
  }

  isExistOrdersPromo() {
    if (this.options[0]?.timeValue &&
      new Date(this.options[0]?.timeValue) > new Date()) {
      this.promoOrderDate = new Date(this.options[0]?.timeValue);
      this.promoOrderDiscount = this.options[0]?.integerValue;
      console.log(this.promoOrderDate)
      return true;
    }
    return false;
  }
}
