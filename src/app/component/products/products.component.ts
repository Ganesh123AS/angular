
import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public productsList: any;
  @Input() indicators = true;
  selectedIndex = 1;

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

  addToCart(item: any) {
    this.cartService.addToCart(item);
  }
  nextItem() {
    if (this.selectedIndex < this.productsList.length - 1) {
      this.selectedIndex++;
    }
  }
  prevItem() {
    if (this.selectedIndex > 0) {
      this.selectedIndex--;
    }
  }
}
