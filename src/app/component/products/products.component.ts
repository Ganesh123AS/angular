import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public productsList: any[];
  @Input() indicators = true;
  selectedIndex = 0;

  constructor(private api: ApiService, private cartService: CartService) { }

  ngOnInit(): void {
    this.api.getProducts().subscribe(
      (res: any[]) => {
        this.productsList = res;
        this.productsList.forEach((elem: any) => {
          Object.assign(elem, { quantity: 1, total: elem.price });
        });
      },
      (error) => {
        console.log("error", error);
      }
    );
  }

  get infiniteIndex(): number {
    if (this.productsList && this.productsList.length > 0) {
      const len = this.productsList.length;
      return (len + this.selectedIndex % len) % len;
    }
    return 0;
  }

  get selectedProduct(): any {
    if (this.productsList && this.productsList.length > 0) {
      return this.productsList[this.infiniteIndex];
    }
    return null;
  }

  addToCart(item: any) {
    this.cartService.addToCart(item);
  }

  nextItem() {
    this.selectedIndex = (this.selectedIndex + 1) % this.productsList.length;
  }

  prevItem() {
    this.selectedIndex = (this.selectedIndex - 1 + this.productsList.length) % this.productsList.length;
  }
}
