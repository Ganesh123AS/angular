import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartItemList: any = [];
  public productList = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<any[]>('your_api_endpoint_here');
  }

  // Implement other methods like addToCart, removeCartItem, etc. as per your requirements
}
