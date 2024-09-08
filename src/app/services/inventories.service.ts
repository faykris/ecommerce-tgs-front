import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class InventoriesService {

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
  ) { }

  getAllInventories() {
    return this.http
      .get<any>(`${this.apiUrl}/inventory/all`);
  }

  insertInventory(data: any) {
    return this.http
      .post(`${this.apiUrl}/inventory`, data);
  }
}
