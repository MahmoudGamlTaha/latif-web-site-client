import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAdsService } from "../../../services/product.service";
import { UserAds } from "../../../classes/UserAds";

@Component({
  selector: 'app-cart-variation',
  templateUrl: './cart-variation.component.html',
  styleUrls: ['./cart-variation.component.scss']
})
export class CartVariationComponent implements OnInit, OnDestroy {

  @Input() direction: string = 'right'; // Default Direction Right

  public products: UserAds[] = [];

  constructor(public productService: UserAdsService) {
    this.productService.cartItems.subscribe(response => this.products = response);
  }

  ngOnInit(): void {
    this.productService.OpenCart = false;
  }

  closeCart() {
    this.productService.OpenCart = false;
  }

  get getTotal(): Observable<number> {
    return this.productService.cartTotalAmount();
  }

  removeItem(product: any) {
    this.productService.removeCartItem(product);
  }

  ngOnDestroy(): void {
    this.closeCart();
  }

}
