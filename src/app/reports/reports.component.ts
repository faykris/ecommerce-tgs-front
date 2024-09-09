import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import { Router } from '@angular/router';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {OrdersService} from "../services/orders.service";
import {UsersService} from "../services/users.service";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {
  form: FormGroup = new FormGroup({
    filter: new FormControl(1),
    inventory: new FormControl(null),
    category: new FormControl(null),
    status: new FormControl(null),
  });
  orders: any[] = [];
  isLoadingOrders = true;

  constructor(
    private modalService: NgbModal,
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
