import { Component, OnInit } from '@angular/core';
import { ProductSlider } from '../../../shared/data/slider';
import { UserAds } from '../../../shared/classes/UserAds';
import { UserAdsService } from '../../../shared/services/product.service';

@Component({
  selector: 'app-product-slider',
  templateUrl: './product-slider.component.html',
  styleUrls: ['./product-slider.component.scss']
})
export class ProductSliderComponent implements OnInit {

  public products: UserAds[] = [];

  public ProductSliderConfig: any = ProductSlider;
  
  constructor(public productService: UserAdsService) { 
    this.productService.getProducts().subscribe(response => this.products = response);
  }

  ngOnInit(): void {
  }

}
