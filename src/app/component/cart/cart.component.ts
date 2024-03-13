import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
public products: any[];
public getTotal: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res => {
      this.products = res;
      this.getTotal = this.cartService.getTotalAmount();
    })
  }
removeItem(item: any){
this.cartService.removeCartItem(item);
}
emptyCart() {
  this.cartService.removeAllCartItems();
}
}
