import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAdsService } from "../../shared/services/product.service";
import { UserAds } from "../../shared/classes/UserAds";

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss']
})
export class CompareComponent implements OnInit {

  public products: UserAds[] = [];

  constructor(private router: Router, 
    public productService: UserAdsService) {
    this.productService.compareItems.subscribe(response => this.products = response);
  }

  ngOnInit(): void {
  }

  async addToCart(product: any) {
    const status = await this.productService.addToCart(product);
    if(status) {
      this.router.navigate(['/shop/cart']);
    }
  }

  removeItem(product: any) {
    this.productService.removeCompareItem(product);
  }

}
