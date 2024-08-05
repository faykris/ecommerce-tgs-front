import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UpdateProductInfoComponent } from './modals/update-product-info/update-product-info.component';
import { AddProductComponent } from './modals/add-product/add-product.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmDefectivesComponent } from './modals/confirm-defectives/confirm-defectives.component';
import { ConfirmShippingComponent } from './modals/confirm-shipping/confirm-shipping.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UpdateProductInfoComponent,
    AddProductComponent,
    ConfirmDefectivesComponent,
    ConfirmShippingComponent
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
