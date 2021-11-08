import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Images, UserAds } from '../../../../shared/classes/UserAds';
import { ProductDetailsMainSlider, ProductDetailsThumbSlider } from '../../../../shared/data/slider';

import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { SelectMultipleControlValueAccessor } from '@angular/forms';
import { SizeModalComponent } from "../../../../shared/components/modal/size-modal/size-modal.component";
import { UserAdsService } from '../../../../shared/services/product.service';
import { delay } from 'rxjs/operators';
import { disposeEmitNodes } from 'typescript';

@Component({
  selector: 'app-product-no-sidebar',
  templateUrl: './product-no-sidebar.component.html',
  styleUrls: ['./product-no-sidebar.component.scss']
})
export class ProductNoSidebarComponent implements OnInit {

  public product: UserAds;
  public product_id:number;
  public counter: number = 1;
  public activeSlide: any = 0;
  public selectedSize: any;
  
  @ViewChild("sizeChart") SizeChart: SizeModalComponent;

  public ProductDetailsMainSliderConfig: any = ProductDetailsMainSlider;
  public ProductDetailsThumbConfig: any = ProductDetailsThumbSlider;
  public loading:boolean;
  constructor(private route: ActivatedRoute, private router: Router,
    public productService: UserAdsService) { 
       this.loading = true;
    }
 getProductById(id:number){
  
  this.productService.getAdsById(id).subscribe((res:any) =>{
    this.product = new UserAds();
    let retProduct = res.response.data;
    this.product.id = retProduct.id;
    this.product.city = retProduct.city;
    this.product.type = retProduct.type;
    this.product.name = retProduct.name; 
    this.product.categoryName =  retProduct.categoryName;
    if(retProduct.createdBy != null){
    this.product.createdBy = retProduct.createdBy;
    this.product.createdBy.adsCount = retProduct.createdBy.adsCount??0;
    this.product.createdBy.city = retProduct.createdBy.city;
    this.product.createdBy.firstName = retProduct.createdBy.firstName;
    this.product.createdBy.lastName = retProduct.createdBy.lastName== null?"":retProduct.createdBy.lastName;
    this.product.createdBy.id = retProduct.createdBy.id;
    this.product.createdBy.joinDate = retProduct.createdBy.registrationDate;
    }
    this.product.description = retProduct.description;
    this.product.extra = retProduct.extra;
    this.product.title = retProduct.name;
    this.product.images= retProduct.images.length == 0?[image => "assets/images/product/placeholder.jpg"]:retProduct.images;
    this.product.image = retProduct.image==null?"assets/images/product/placeholder.jpg":retProduct.image;
    this.product.categoryNameAr = retProduct.categoryNameAr;
    this.product.short_description = retProduct.short_description;
    this.product.price = retProduct.price;
    this.product.description = retProduct.description;
    this.product.CreatedDate = retProduct.created_at;
    this.loading = false;
    
  });
}
  ngOnInit(): void {
    let params = this.route.snapshot.params; 
    if(!this.route.snapshot.params){
      return;
    }
    this.product_id = params.slug;
    this.getProductById(this.product_id);
  }

  // Get Product Color
  Color(variants) {
   /* const uniqColor = []
    for (let i = 0; i < Object.keys(variants).length; i++) {
      if (uniqColor.indexOf(variants[i].color) === -1 && variants[i].color) {
        uniqColor.push(variants[i].color)
      }
    }
    return uniqColor*/
  }

  // Get Product Size
  Size(variants) {
   const uniqSize = []
    for (let i = 0; i < Object.keys(variants).length; i++) {
      if (uniqSize.indexOf(variants[i].size) === -1 && variants[i].size) {
        uniqSize.push(variants[i].size)
      }
    }
    return uniqSize
  }

  selectSize(size) {
    this.selectedSize = size;
  }
  
  // Increament
  increment() {
    this.counter++ ;
  }

  // Decrement
  decrement() {
    if (this.counter > 1) this.counter-- ;
  }

  // Add to cart
  async addToCart(product: any) {
    product.quantity = this.counter || 1;
    const status = await this.productService.addToCart(product);
    if(status)
      this.router.navigate(['/shop/cart']);
  }

  // Buy Now
  async buyNow(product: any) {
    product.quantity = this.counter || 1;
    const status = await this.productService.addToCart(product);
    if(status)
      this.router.navigate(['/shop/checkout']);
  }

  // Add to Wishlist
  addToWishlist(product: any) {
    this.productService.addToWishlist(product);
  }
   delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
}
