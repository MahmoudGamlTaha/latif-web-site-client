import { Component, OnInit, Input } from '@angular/core';
import { NewProductSlider } from '../../../data/slider';
import { UserAds } from '../../../classes/UserAds';
import { UserAdsService } from '../../../services/product.service';

@Component({
  selector: 'app-product-box-vertical-slider',
  templateUrl: './product-box-vertical-slider.component.html',
  styleUrls: ['./product-box-vertical-slider.component.scss']
})
export class ProductBoxVerticalSliderComponent implements OnInit {

  @Input() title: string = 'New Product'; // Default
  @Input() type: string = 'PETS'; // Default Fashion

  public products : any[] = [];

  public NewProductSliderConfig: any = NewProductSlider;

  constructor(public productService: UserAdsService) { 
    this.productService.getProducts().subscribe((rawData:any) => {
      this.products = rawData.response.data.filter(item =>{ return item.type == this.type});
    });
  }

  ngOnInit(): void {
  }

}
