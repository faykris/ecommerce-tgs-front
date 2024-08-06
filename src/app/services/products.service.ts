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
      .get<any>(`${this.apiUrl}/Product`);
  }

  getProductsByName(name?: string) {
    return this.http
      .get<any>(`${this.apiUrl}/Product/search?name=${name}`);
  }

  insertProducts(data: any) {
    return this.http
      .post(`${this.apiUrl}/Product`, data);
  }

  updateInfoProduct(id: number, data: any) {
    return this.http
      .put(`${this.apiUrl}/Product/info/${id}`, data);
  }

  markDefectivesProducts(data: any) {
    return this.http
      .put(`${this.apiUrl}/Product/defectives`, data);
  }

  markShippedProducts(data: any) {
    return this.http
      .put(`${this.apiUrl}/Product/shipping`, data);
  }
}
