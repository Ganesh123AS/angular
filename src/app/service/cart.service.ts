import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartItemList: any = [];
  public productList = new BehaviorSubject<any>([]);

  constructor() { }
  getProducts(){
    return this.productList.asObservable();
  }
  setProducts(product: any){
    this.cartItemList.push(...product);
    this.productList.next(product);
  }
  addToCart(product: any){
    const findSameProduct = this.cartItemList.findIndex((item: any) => item?.id === product?.id)
    // console.log("product", findSameProduct)
    if(findSameProduct !== -1) {
      this.cartItemList[findSameProduct].quantity++;
      this.cartItemList[findSameProduct].total = this.cartItemList[findSameProduct].quantity * product.price
    } else{
      const newcartItemList = {...product, quantity: 1, total: product.price}
      this.cartItemList.push(newcartItemList);
    }
    // this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getTotalAmount();
  }
  getTotalAmount() : number{
    let totalAmount = 0;
    this.cartItemList.map((amt: any) => {
      totalAmount += amt.total;
    })
    return totalAmount;
  }
  removeCartItem(productToRemove: any){
    const removeCart = this.cartItemList.findIndex(item => item?.id === productToRemove.id);
    if(removeCart !== -1){
      this.cartItemList.splice(removeCart, 1);
      this.productList.next(this.cartItemList);
    }
  }
  removeAllCartItems() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
  }
}
