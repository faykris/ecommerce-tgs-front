import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
  ) { }

  getAllOrders() {
    return this.http
      .get<any>(`${this.apiUrl}/order/all`);
  }

  insertOrder(data: any) {
    return this.http
      .post(`${this.apiUrl}/order`, data);
  }

}
