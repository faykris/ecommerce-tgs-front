import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {OrdersService} from "../../services/orders.service";
import {UsersService} from "../../services/users.service";

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

  onFilterChange(event: Event): void {
    // TODO --- implement later ----
    // const selectedValue = Number(event.target.value.split(': ')[1]);
  }

  loadOrders(): void {
    this.orderService.getAllOrders().subscribe({
      next: (data) => {
        this.orders = data;
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
