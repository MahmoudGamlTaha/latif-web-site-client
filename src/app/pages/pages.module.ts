import { AboutUsComponent } from './about-us/about-us.component';
import { BlogDetailsComponent } from './blog/blog-details/blog-details.component';
import { BlogLeftSidebarComponent } from './blog/blog-left-sidebar/blog-left-sidebar.component';
import { BlogNoSidebarComponent } from './blog/blog-no-sidebar/blog-no-sidebar.component';
import { BlogRightSidebarComponent } from './blog/blog-right-sidebar/blog-right-sidebar.component';
import { CartComponent } from './account/cart/cart.component';
import { CheckoutComponent } from './account/checkout/checkout.component';
import { CollectionComponent } from './collection/collection.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { CommonModule } from '@angular/common';
import { CompareOneComponent } from './compare/compare-one/compare-one.component';
import { CompareTwoComponent } from './compare/compare-two/compare-two.component';
import { ContactComponent } from './account/contact/contact.component';
import { DashboardComponent } from './account/dashboard/dashboard.component';
import { ErrorComponent } from './error/error.component';
import { FaqComponent } from './faq/faq.component';
import { ForgetPasswordComponent } from './account/forget-password/forget-password.component';
import { FormsModule } from '@angular/forms';
import { GalleryModule } from '@ks89/angular-modal-gallery';
import { GridFourComponent } from './portfolio/grid-four/grid-four.component';
import { GridThreeComponent } from './portfolio/grid-three/grid-three.component';
import { GridTwoComponent } from './portfolio/grid-two/grid-two.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { LoginComponent } from './account/login/login.component';
import { LookbookComponent } from './lookbook/lookbook.component';
import { MasonryFullWidthComponent } from './portfolio/masonry-full-width/masonry-full-width.component';
import { MasonryGridFourComponent } from './portfolio/masonry-grid-four/masonry-grid-four.component';
import { MasonryGridThreeComponent } from './portfolio/masonry-grid-three/masonry-grid-three.component';
import { MasonryGridTwoComponent } from './portfolio/masonry-grid-two/masonry-grid-two.component';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { PagesRoutingModule } from './pages-routing.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ProfileComponent } from './account/profile/profile.component';
import { RegisterComponent } from './account/register/register.component';
import { ReviewComponent } from './review/review.component';
import { SearchComponent } from './search/search.component';
import { SharedModule } from '../shared/shared.module';
import { TypographyComponent } from './typography/typography.component';
import { WishlistComponent } from './account/wishlist/wishlist.component';

// Pages Components
// Blog Components
// Portfolio Components
@NgModule({
  declarations: [
    WishlistComponent,
    CartComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    ForgetPasswordComponent,
    ProfileComponent,
    ContactComponent,
    CheckoutComponent,
    AboutUsComponent,
    SearchComponent,
    TypographyComponent,
    ReviewComponent,
    OrderSuccessComponent,
    CompareOneComponent,
    CompareTwoComponent,
    CollectionComponent,
    LookbookComponent,
    ErrorComponent,
    ComingSoonComponent,
    FaqComponent,
    BlogLeftSidebarComponent,
    BlogRightSidebarComponent,
    BlogNoSidebarComponent,
    BlogDetailsComponent,
    GridTwoComponent,
    GridThreeComponent,
    GridFourComponent,
    MasonryGridTwoComponent,
    MasonryGridThreeComponent,
    MasonryGridFourComponent,
    MasonryFullWidthComponent,
    
  ],
  imports: [
    CommonModule,
    GalleryModule.forRoot(),
    SharedModule,
    PagesRoutingModule,
    NgSelectModule,
    FormsModule,
    NgxIntlTelInputModule,
    NgbModule,
    InfiniteScrollModule,
    PerfectScrollbarModule
  ]
})
export class PagesModule { }
