import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
  ) { }

  getAllProducts() {
    return this.http
      .get<any>(`${this.apiUrl}/product/all`);
  }

  getProductsByCategory(value: string) {
    return this.http
      .get<any>(`${this.apiUrl}/product/category?value=${value}`);
  }

  getProductsByStatus(value: string) {
    return this.http
      .get<any>(`${this.apiUrl}/product/status?value=${value}`);
  }

  getProductsByInventory(value: string) {
    return this.http
      .get<any>(`${this.apiUrl}/product/inventory?value=${value}`);
  }

  insertProducts(data: any) {
    return this.http
      .post(`${this.apiUrl}/product`, data);
  }

  updateInfoProduct(productCode: string, data: any) {
    return this.http
      .put(`${this.apiUrl}/product/${productCode}`, data);
  }

  markDefectivesProducts(data: any) {
    return this.http
      .put(`${this.apiUrl}/product/defectives`, data);
  }

  markShippedProducts(data: any) {
    return this.http
      .put(`${this.apiUrl}/product/shipping`, data);
  }
}
