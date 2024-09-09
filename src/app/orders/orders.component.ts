import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {OrdersService} from "../services/orders.service";
import {UsersService} from "../services/users.service";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {
  form: FormGroup = new FormGroup({
    filter: new FormControl(1),
    inventory: new FormControl(null),
    category: new FormControl(null),
    status: new FormControl(null),
  });
  orders: any[] = [];
  products: any[] = [];
  isLoadingOrders = true;
  fallbackImageUrl = 'assets/images/box-2-64.png';

  constructor(
    private router: Router,
    private orderService: OrdersService,
    private userService: UsersService,
  ) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  onFilterChange(event: any) {
    const selectedValue = Number(event.target.value.split(': ')[1]);
  }

  loadOrders() {
    this.orderService.getAllOrders().subscribe({
      next: (data) => {
        //this.products = data?.map((a: any) => a.products).flat();
        this.orders = data;
        // this.orders.map(order => {
        //   order["products"] = this.products.filter((p: any) => p.order.id === order.id);
        // });
        console.log(this.orders)
        this.isLoadingOrders = false;
      },
      error: (error) => {
        this.isLoadingOrders = false;
        console.error('Error al enviar datos', error);
        if (error.status === 401) {
          this.logout();
        }
      }
    });
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
