import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Injector, OnInit, ViewChild } from '@angular/core';
import { ProductDetailsMainSlider, ProductDetailsThumbSlider } from '../../../../shared/data/slider';

import { AppBaseComponent } from '../../../../shared/components/app-base/app-base.component';
import { CookiesData } from '../../../../shared/services/cookies/CookiesData.service';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';
import { ProfileService } from '../../../../shared/services/profile.service';
import { SizeModalComponent } from "../../../../shared/components/modal/size-modal/size-modal.component";
import { TranslateService } from '@ngx-translate/core';
import { UserAds } from '../../../../shared/classes/UserAds';
import { UserAdsService } from '../../../../shared/services/product.service';

@Component({
  selector: 'app-product-no-sidebar',
  templateUrl: './product-no-sidebar.component.html',
  styleUrls: ['./product-no-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ProductNoSidebarComponent extends AppBaseComponent implements OnInit {

  public product: UserAds;
  public product_id: number;
  public counter: number = 1;
  public activeSlide: any = 0;
  public selectedSize: any;

  @ViewChild("sizeChart") SizeChart: SizeModalComponent;

  public ProductDetailsMainSliderConfig: any = ProductDetailsMainSlider;
  public ProductDetailsThumbConfig: any = ProductDetailsThumbSlider;
  public loading: boolean;

  showChat = false;
  chatMessagesData = []
  @ViewChild('chatPS') chatPS: PerfectScrollbarComponent
  reloadChat = true;
  chatRoom
  constructor(
    injector: Injector,
    private route: ActivatedRoute,
    private router: Router,
    public productService: UserAdsService,
    private ProfileService: ProfileService,
    private cdr: ChangeDetectorRef,
    private cookie: CookiesData,
    private modalService: NgbModal,
    public TranslateService:TranslateService,
  ) {
    super(injector)
    this.loading = true;
  }

 
  getProductById(id: number) {

   const  getAdsByIdSub =this.productService.getAdsById(id).subscribe((res: any) => {
      
      this.product = new UserAds();
      let retProduct = res.response.data;
      this.product.id = retProduct.id;
      this.product.city = retProduct.city;
      this.product.type = retProduct.type;
      this.product.name = retProduct.name;
      this.product.categoryName = retProduct.categoryName;
      if (retProduct.createdBy != null) {
        this.product.createdBy = retProduct.createdBy;
        this.product.createdBy.adsCount = retProduct.createdBy.adsCount ?? 0;
        this.product.createdBy.city = retProduct.createdBy.city;
        this.product.createdBy.firstName = retProduct.createdBy.firstName;
        this.product.createdBy.lastName = retProduct.createdBy.lastName == null ? "" : retProduct.createdBy.lastName;
        this.product.createdBy.id = retProduct.createdBy.id;
        this.product.createdBy.joinDate = retProduct.createdBy.registrationDate;
      }
      this.product.description = retProduct.description;
      this.product.extra = retProduct.extra;
      this.product.title = retProduct.name;
      this.product.images = retProduct.images.length == 0 ? [image => "assets/images/product/placeholder.jpg"] : retProduct.images;
      this.product.image = retProduct.image == null ? "assets/images/product/placeholder.jpg" : retProduct.image;
      this.product.categoryNameAr = retProduct.categoryNameAr;
      this.product.short_description = retProduct.short_description;
      this.product.price = retProduct.price;
      this.product.description = retProduct.description;
      this.product.CreatedDate = retProduct.created_at;
      this.loading = false;

      document.body.scrollTop = 0;


    });
    this.unsubscribe.push(getAdsByIdSub)

  }
  ngOnInit(): void {
    this.route.params.subscribe(res => {
      this.product_id = res.slug;
      if (this.product_id) this.getProductById(this.product_id);
    })


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
    this.counter++;
  }

  // Decrement
  decrement() {
    if (this.counter > 1) this.counter--;
  }

  // Add to cart
  async addToCart(product: any) {
    product.quantity = this.counter || 1;
    const status = await this.productService.addToCart(product);
    if (status)
      this.router.navigate(['/shop/cart']);
  }

  // Buy Now
  async buyNow(product: any) {
    product.quantity = this.counter || 1;
    const status = await this.productService.addToCart(product);
    if (status)
      this.router.navigate(['/shop/checkout']);
  }

  // Add to Wishlist
  addToWishlist(product: any) {
    this.productService.addToWishlist(product);
  }
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /*chat*/
  onOpenChat() {
    if(this.cookie.checkUserProfile()){
      const checkChatAdsSub = this.productService.checkChatAds(this.product_id).subscribe(res => {
        if (res.response.data) {
          this.chatRoom = res.response.data
          const nextPageByIdSub =  this.ProfileService.nextPageById(undefined, res.response.data).subscribe(res2 => {
            this.chatMessagesData = res2.response.data
            this.showChat = true;
            setTimeout(() => {
              this.chatPS.directiveRef.scrollToBottom()
            }, 100)
            this.cdr.detectChanges()
          })
          this.unsubscribe.push(nextPageByIdSub)
        }
      })
      this.unsubscribe.push(checkChatAdsSub)
    }else{
      this.router.navigate(['/pages/login'])
    }
  
   }
 
   onScrollEvent(e) {
     if(this.reloadChat){
       if (this.chatPS.directiveRef.position().y === 'start') {
         const nextPageByIdSub =   this.ProfileService.nextPageById(this.chatMessagesData[this.chatMessagesData.length - 1]['id'], this.chatMessagesData[this.chatMessagesData.length - 1]['room']).subscribe(res2 => {
           if(!res2.response.data.length) this.reloadChat = false
           this.chatMessagesData = [ ...this.chatMessagesData,...res2.response.data]
           
           setTimeout(() => {
             this.cdr.detectChanges()
           }, 100);
         })
         this.unsubscribe.push(nextPageByIdSub)
 
       }
     }
   }
   messageSave(f:NgForm){
       const body :any ={
         ad_item: this.product_id,
         device_id: 'web',
         device_model: 'web',
         message: f.value.message,
         room:   this.chatRoom ,
         sender: JSON.parse(this.cookie.getUserProfile())?.id || undefined,
       }
       const sndMsgSub = this.ProfileService.sndMsg(body).subscribe(res =>{
         body['senderId'] = JSON.parse(this.cookie.getUserProfile())?.id
         this.chatMessagesData.unshift(body)
         
         f.reset()
         setTimeout(() => {
           this.chatPS.directiveRef.scrollToBottom()
           this.cdr.detectChanges()
 
         }, 100)
       
       })
       this.unsubscribe.push(sndMsgSub)
    
   }
   /*report*/
  reports = []
  onSaveReport = false
  public loadingReport: boolean;
  onReport(content){
    if(this.cookie.checkUserProfile()){
      this.loadingReport = true
      this.modalService.open(content, { centered: true })
      const getSub = this.productService.reasons().subscribe(res =>{
        console.log('res: ', res);
        this.reports = [...res.response.data,
          {
            "id": 'other',
            "value": "Other",
            "valueAr": "اخرى",
        }]
        this.loadingReport = false
      })
      this.unsubscribe.push(getSub)
    }else{
      this.router.navigate(['/pages/login'])
    }
  }

  onMakeReport(f:NgForm,modal){
    this.onSaveReport = true
    const body :any= {
      adId: this.product_id,
      otherReason: f.value.otherReason || undefined,
      reason: String(f.value.report) !== "other" ? String(f.value.report)  : undefined,
      type:  "REPORT",
    }
   const makeReportSub = this.productService.makeReport(body).subscribe(res =>{
     this.onSaveReport = false
     modal.dismiss('Cross click')
    })
    this.unsubscribe.push(makeReportSub)
  }
}
