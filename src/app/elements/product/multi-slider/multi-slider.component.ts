import { Component, OnInit } from '@angular/core';
import { ProductOneSlider } from '../../../shared/data/slider';
import { UserAds } from '../../../shared/classes/UserAds';
import { UserAdsService } from '../../../shared/services/product.service';

@Component({
  selector: 'app-multi-slider',
  templateUrl: './multi-slider.component.html',
  styleUrls: ['./multi-slider.component.scss']
})
export class MultiSliderComponent implements OnInit {

  public products: UserAds[] = [];

  public ProductSliderOneConfig: any = ProductOneSlider;

  constructor(public productService: UserAdsService) { 
    this.productService.getProducts().subscribe(response => 
      this.products = response.filter(item => item.type == 'bags')
    );
  }

  ngOnInit(): void {
  }

}
