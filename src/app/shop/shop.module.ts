import { BrandsComponent } from './collection/widgets/brands/brands.component';
import { BundleProductComponent } from './product/bundle-product/bundle-product.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CollectionInfinitescrollComponent } from './collection/collection-infinitescroll/collection-infinitescroll.component';
import { CollectionLeftSidebarComponent } from './collection/collection-left-sidebar/collection-left-sidebar.component';
import { CollectionNoSidebarComponent } from './collection/collection-no-sidebar/collection-no-sidebar.component';
import { CollectionRightSidebarComponent } from './collection/collection-right-sidebar/collection-right-sidebar.component';
import { ColorsComponent } from './collection/widgets/colors/colors.component';
import { CommonModule } from '@angular/common';
import { CompareComponent } from './compare/compare.component';
import { CountdownComponent } from './product/widgets/countdown/countdown.component';
import { FourImageComponent } from './product/four-image/four-image.component';
import { ImageOutsideComponent } from './product/image-outside/image-outside.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { Ng5SliderModule } from 'ng5-slider';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPayPalModule } from 'ngx-paypal';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PriceComponent } from './collection/widgets/price/price.component';
import { ProductLeftSidebarComponent } from './product/sidebar/product-left-sidebar/product-left-sidebar.component';
import { ProductNoSidebarComponent } from './product/sidebar/product-no-sidebar/product-no-sidebar.component';
import { ProductRightSidebarComponent } from './product/sidebar/product-right-sidebar/product-right-sidebar.component';
import { RelatedProductComponent } from './product/widgets/related-product/related-product.component';
import { ServicesComponent } from './product/widgets/services/services.component';
import { SharedModule } from '../shared/shared.module';
import { ShopRoutingModule } from './shop-routing.module';
import { SizeComponent } from './collection/widgets/size/size.component';
import { SocialComponent } from './product/widgets/social/social.component';
import { StockInventoryComponent } from './product/widgets/stock-inventory/stock-inventory.component';
import { SuccessComponent } from './checkout/success/success.component';
import { ThreeColumnComponent } from './product/three-column/three-column.component';
import { WishlistComponent } from './wishlist/wishlist.component';

// Product Details Components








// Product Details Widgest Components






// Collection Components





// Collection Widgets













@NgModule({
  declarations: [
    ProductLeftSidebarComponent, 
    ProductRightSidebarComponent,
    ProductNoSidebarComponent,
    ThreeColumnComponent,
    FourImageComponent,
    BundleProductComponent,
    ImageOutsideComponent,
    ServicesComponent,
    CountdownComponent,
    SocialComponent,
    StockInventoryComponent,
    RelatedProductComponent,
    CollectionLeftSidebarComponent,
    CollectionRightSidebarComponent,
    CollectionNoSidebarComponent,
    CollectionInfinitescrollComponent,
    BrandsComponent,
    ColorsComponent,
    SizeComponent,
    PriceComponent,
    CartComponent,
    WishlistComponent,
    CompareComponent,
    CheckoutComponent,
    SuccessComponent
  ],
  imports: [
    CommonModule,
    NgxPayPalModule,
    Ng5SliderModule,
    InfiniteScrollModule,
    SharedModule,
    ShopRoutingModule,
    PerfectScrollbarModule,
    NgSelectModule
  ]
})
export class ShopModule { }
