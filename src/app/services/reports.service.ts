import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
  ) { }

  exportAvailableProducts() {
    const headers = new HttpHeaders({
      'Accept': 'application/octet-stream'
    });

    return this.http.get(`${this.apiUrl}/report/products`, {
      headers: headers,
      responseType: 'blob'
    });
  }
}
