import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OptionsService {

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
  ) { }

  getAllOptions() {
    return this.http
      .get<any>(`${this.apiUrl}/option/all`);
  }

}
