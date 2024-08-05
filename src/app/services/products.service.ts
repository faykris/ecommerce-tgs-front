import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'http://localhost:5212/api';
  
  constructor(
    private http: HttpClient,
  ) { }

  getAllProducts() {
    return this.http
      .get<any>(`${this.apiUrl}/Product`);
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
