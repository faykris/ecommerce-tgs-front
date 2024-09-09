import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UpdateProductInfoComponent } from './modals/update-product-info/update-product-info.component';
import { AddProductComponent } from './modals/add-product/add-product.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmDefectivesComponent } from './modals/confirm-defectives/confirm-defectives.component';
import { ConfirmShippingComponent } from './modals/confirm-shipping/confirm-shipping.component';
import { LoginComponent } from './login/login.component';
import { TokenInterceptor } from './services/token.interceptor';
import { RegisterUserComponent } from './modals/register-user/register-user.component';
import { AddInventoryComponent } from './modals/add-inventory/add-inventory.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ReportsComponent } from './reports/reports.component';
import { UsersComponent } from './users/users.component';
import { OrdersComponent } from './orders/orders.component';

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
