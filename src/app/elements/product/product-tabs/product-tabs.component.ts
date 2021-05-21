import { Component, OnInit } from '@angular/core';
import { UserAds } from '../../../shared/classes/UserAds';
import { UserAdsService } from '../../../shared/services/product.service';

@Component({
  selector: 'app-product-tabs',
  templateUrl: './product-tabs.component.html',
  styleUrls: ['./product-tabs.component.scss']
})
export class ProductTabsComponent implements OnInit {

  public products: UserAds[] = [];

  constructor(public productService: UserAdsService) { 
    this.productService.getProducts().subscribe(response => this.products = response);
  }

  ngOnInit(): void {
  }

}
