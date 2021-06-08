import { Component, OnInit } from '@angular/core';
import { UserAds } from '../../classes/UserAds';
import { UserAdsService } from '../../services/product.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  public products: UserAds[] = [];
  public collapse: boolean = true;

  constructor(public productService: UserAdsService) { 
    this.productService.getProducts().subscribe((items:any) => this.products = items.response.data);
  }

  ngOnInit(): void {
  }

  get filterbyCategory() {
    const category = [...new Set(this.products.map(product => product.type))]
    return category
  }

}
