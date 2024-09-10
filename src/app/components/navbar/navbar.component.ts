import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {UsersService} from "../../services/users.service";

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

  setShowMenu(): void {
    this.showMenu = !this.showMenu;
  }

  goToProducts(): void {
    this.router.navigate(['/home']);
  }

  goToOrders(): void {
    this.router.navigate(['/orders']);
  }

  goToUsers(): void {
    this.router.navigate(['/users']);
  }

  goToReports(): void {
    this.router.navigate(['/reports']);
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
