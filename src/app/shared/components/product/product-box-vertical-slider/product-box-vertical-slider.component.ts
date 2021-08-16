import { Component, OnInit, Input } from '@angular/core';
import { NewProductSlider } from '../../../data/slider';
import { UserAds } from '../../../classes/UserAds';
import { UserAdsService } from '../../../services/product.service';
import { adsFilter } from 'src/app/shared/classes/adsFilter';

@Component({
  selector: 'app-product-box-vertical-slider',
  templateUrl: './product-box-vertical-slider.component.html',
  styleUrls: ['./product-box-vertical-slider.component.scss']
})
export class ProductBoxVerticalSliderComponent implements OnInit {

  @Input() title: string = 'New Product'; // Default
  @Input() type: string = 'PETS'; // Default Fashion
  loading:boolean;
  public products : any[] = [];

  public NewProductSliderConfig: any = NewProductSlider;

  constructor(public productService: UserAdsService) { 
    this.loading = true;
  }

  ngOnInit(): void {
    let filter:adsFilter = {}  ;
    filter.type = this.type;
    this.productService.getFilterAds(filter).subscribe((rawData:any) => {
      this.products = rawData.response.data;//.filter(item =>{ return item.type == this.type});
      console.log(this.products);
      this.loading = false;
    });
  }

}
