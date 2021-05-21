import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAdsService } from "../../shared/services/product.service";
import { UserAds } from "../../shared/classes/UserAds";

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  public products: UserAds[] = [];

  constructor(private router: Router, 
    public productService: UserAdsService) {
    this.productService.wishlistItems.subscribe(response => this.products = response);
  }

  ngOnInit(): void {
  }

  async addToCart(product: any) {
    const status = await this.productService.addToCart(product);
    if(status) {
      this.router.navigate(['/shop/cart']);
      this.removeItem(product);
    }
  }

  removeItem(product: any) {
    this.productService.removeWishlistItem(product);
  }

}
