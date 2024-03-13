import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = "https://dev-ki4m738sn0d5oj9.api.raw-labs.com/api";

  constructor(private http: HttpClient) { }
  getProducts(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/products`);
  }
}
