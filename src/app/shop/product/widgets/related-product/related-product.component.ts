import { Component, OnInit, Input } from '@angular/core';
import { response } from 'express';
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
    this.productService.getProducts().subscribe((response:any) =>{ 
      let items = response.response.data; 
      this.products = items.filter(item => item.type == this.type)
    });
  }

  ngOnInit(): void {
  }

}
