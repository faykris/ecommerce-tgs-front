import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UpdateProductInfoComponent } from './components/modals/update-product-info/update-product-info.component';
import { AddProductComponent } from './components/modals/add-product/add-product.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmDefectivesComponent } from './components/modals/confirm-defectives/confirm-defectives.component';
import { ConfirmShippingComponent } from './components/modals/confirm-shipping/confirm-shipping.component';
import { LoginComponent } from './components/login/login.component';
import { TokenInterceptor } from './services/token.interceptor';
import { RegisterUserComponent } from './components/modals/register-user/register-user.component';
import { AddInventoryComponent } from './components/modals/add-inventory/add-inventory.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ReportsComponent } from './components/reports/reports.component';
import { UsersComponent } from './components/users/users.component';
import { OrdersComponent } from './components/orders/orders.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UpdateProductInfoComponent,
    AddProductComponent,
    ConfirmDefectivesComponent,
    ConfirmShippingComponent,
    LoginComponent,
    RegisterUserComponent,
    AddInventoryComponent,
    NavbarComponent,
    ReportsComponent,
    UsersComponent,
    OrdersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
