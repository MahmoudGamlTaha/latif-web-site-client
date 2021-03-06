import { Component, OnInit, Input } from '@angular/core';
import { UserAds } from '../../../../shared/classes/UserAds';
import { UserAdsService } from '../../../../shared/services/product.service';

@Component({
  selector: 'app-related-product',
  templateUrl: './related-product.component.html',
  styleUrls: ['./related-product.component.scss']
})
export class RelatedProductComponent implements OnInit {
  
  @Input() type: string

  public products: UserAds[] = [];

  constructor(public productService: UserAdsService) { 
    this.productService.getProducts().subscribe(response => 
      this.products = response.filter(item => item.type == this.type)
    );
  }

  ngOnInit(): void {
  }

}
