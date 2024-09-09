import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {UsersService} from "../services/users.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  showMenu = false;

  constructor(
    private router: Router,
    private userService: UsersService
  ) {
  }

  setShowMenu() {
    this.showMenu = !this.showMenu;
  }

  goToProducts() {
    this.router.navigate(['/home']);
  }

  goToOrders() {
    this.router.navigate(['/orders']);
  }

  goToUsers() {
    this.router.navigate(['/users']);
  }

  goToReports() {
    this.router.navigate(['/reports']);
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
