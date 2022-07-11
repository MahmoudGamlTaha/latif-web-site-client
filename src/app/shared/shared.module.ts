import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { APIInterceptor } from './interceptors/http-interceptor';
import { AgeVerificationComponent } from './components/modal/age-verification/age-verification.component';
import { AppBaseComponent } from './components/app-base/app-base.component';
import { BarRatingModule } from "ngx-bar-rating";
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CartModalComponent } from './components/modal/cart-modal/cart-modal.component';
import { CartVariationComponent } from './components/modal/cart-variation/cart-variation.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CheckboxElementComponent } from './components/create-ads/elemnts/checkbox-element/checkbox-element.component';
import { CommonModule } from '@angular/common';
import { CreateAdsComponent } from './components/create-ads/create-ads.component';
import { DiscountPipe } from './pipes/discount.pipe';
import { FooterFourComponent } from './footer/footer-four/footer-four.component';
import { FooterOneComponent } from './footer/footer-one/footer-one.component';
import { LatifFooterComponent } from './footer/latif-footer/latif-footer.component';
import { FooterTwoComponent } from './footer/footer-two/footer-two.component';
import { GridComponent } from '../shop/collection/widgets/grid/grid.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderFourComponent } from './header/header-four/header-four.component';
import { HeaderOneComponent } from './header/header-one/header-one.component';
import { HeaderThreeComponent } from './header/header-three/header-three.component';
import { HeaderTwoComponent } from './header/header-two/header-two.component';
import { InputElementComponent } from './components/create-ads/elemnts/input-element/input-element.component';
import { LayoutBoxComponent } from './components/layout-box/layout-box.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { LeftMenuComponent } from './components/left-menu/left-menu.component';
import { MenuComponent } from './components/menu/menu.component';
import { NewsletterComponent } from './components/modal/newsletter/newsletter.component';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { PaginationComponent } from '../shop/collection/widgets/pagination/pagination.component';
import { ProductBoxFiveComponent } from './components/product/product-box-five/product-box-five.component';
import { ProductBoxFourComponent } from './components/product/product-box-four/product-box-four.component';
import { ProductBoxOneComponent } from './components/product/product-box-one/product-box-one.component';
import { ProductBoxThreeComponent } from './components/product/product-box-three/product-box-three.component';
import { ProductBoxTwoComponent } from './components/product/product-box-two/product-box-two.component';
import { ProductBoxVerticalComponent } from './components/product/product-box-vertical/product-box-vertical.component';
import { ProductBoxVerticalSliderComponent } from './components/product/product-box-vertical-slider/product-box-vertical-slider.component';
import { QuickViewComponent } from './components/modal/quick-view/quick-view.component';
import { RouterModule } from '@angular/router';
import { SelectElemnetMultipleComponent } from './components/create-ads/elemnts/select-elemnet-multiple/select-elemnet-multiple.component';
import { SelectElemntComponent } from './components/create-ads/elemnts/select-elemnt/select-elemnt.component';
import { SelectElemntUrlComponent } from './components/create-ads/elemnts/select-elemnt-url/select-elemnt-url.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SizeModalComponent } from './components/modal/size-modal/size-modal.component';
import { SkeletonProductBoxComponent } from './components/skeleton/skeleton-product-box/skeleton-product-box.component';
import { TapToTopComponent } from './components/tap-to-top/tap-to-top.component';
import { TranslateModule } from '@ngx-translate/core';
import { TypeRadioComponent } from './components/create-ads/elemnts/type-radio/type-radio.component';
import { VideoModalComponent } from './components/modal/video-modal/video-modal.component';

// Header and Footer Components
// Components
// Modals Components
// Skeleton Loader Components
// Layout Box
// Tap To Top
// Pipes
@NgModule({
  declarations: [
    HeaderOneComponent,
    FooterOneComponent,
    HeaderTwoComponent,
    FooterTwoComponent,
    HeaderThreeComponent,
    LatifFooterComponent,
    HeaderFourComponent,
    FooterFourComponent,
    LeftMenuComponent,
    MenuComponent,
    SettingsComponent,
    BreadcrumbComponent,
    CategoriesComponent,
    ProductBoxOneComponent,
    ProductBoxTwoComponent,
    ProductBoxThreeComponent,
    ProductBoxFourComponent,
    ProductBoxFiveComponent,
    ProductBoxVerticalComponent,
    ProductBoxVerticalSliderComponent,
    NewsletterComponent,
    QuickViewComponent,
    CartModalComponent,
    CartVariationComponent,
    VideoModalComponent,
    SizeModalComponent,
    AgeVerificationComponent,
    SkeletonProductBoxComponent,
    LayoutBoxComponent,
    TapToTopComponent,
    DiscountPipe,
    AppBaseComponent,
    GridComponent,
    PaginationComponent,
    CreateAdsComponent,
    TypeRadioComponent,
    InputElementComponent,
    CheckboxElementComponent,
    SelectElemntComponent,
    SelectElemntUrlComponent,
    SelectElemnetMultipleComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    CarouselModule,
    BarRatingModule,
    LazyLoadImageModule.forRoot({
      // preset: scrollPreset // <-- tell LazyLoadImage that you want to use scrollPreset
    }),
    NgxSkeletonLoaderModule,
    TranslateModule,
    NgSelectModule,
    ReactiveFormsModule,
    NgxDropzoneModule

  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    CarouselModule,
    BarRatingModule,
    LazyLoadImageModule,
    NgxSkeletonLoaderModule,
    TranslateModule,
    HeaderOneComponent,
    FooterOneComponent,
    HeaderTwoComponent,
    FooterTwoComponent,
    HeaderThreeComponent,
    LatifFooterComponent,
    HeaderFourComponent,
    FooterFourComponent,
    BreadcrumbComponent,
    CategoriesComponent,
    ProductBoxOneComponent,
    ProductBoxTwoComponent,
    ProductBoxThreeComponent,
    ProductBoxFourComponent,
    ProductBoxFiveComponent,
    ProductBoxVerticalComponent,
    ProductBoxVerticalSliderComponent,
    NewsletterComponent,
    QuickViewComponent,
    CartModalComponent,
    CartVariationComponent,
    VideoModalComponent,
    SizeModalComponent,
    AgeVerificationComponent,
    SkeletonProductBoxComponent,
    LayoutBoxComponent,
    TapToTopComponent,
    DiscountPipe,
    AppBaseComponent,
    GridComponent,
    PaginationComponent,
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass: APIInterceptor,
      multi   : true,
    }
  ]
})
export class SharedModule { }
