import { Component, OnInit, Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { UserAdsService } from "../../services/product.service";
import { UserAds } from "../../classes/UserAds";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookiesData } from '../../services/cookies/CookiesData.service';
import { Router } from '@angular/router';
import { CreateAdsComponent } from './create-ads/create-ads.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  language
  public products: UserAds[] = [];
  public search: boolean = false;
  
  public languages = [{ 
    name: 'English',
    code: 'en',
    flag: './assets/images/icon/226-united-states.svg',
  }, {
    name: 'العربية',
    code: 'ar',
    flag: './assets/images/icon/008-saudi-arabia.svg',
  }];

  public currencies = [{
    name: 'Euro',
    currency: 'EUR',
    price: 0.90 // price of euro
  },{
    name: 'Pound',
    currency: 'GBP',
    price: 0.78 // price of euro
  }, {
    name: 'SAR',
    currency: 'SAR',
    price: 1 // price of usd
  }]

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private translate: TranslateService,
    public productService: UserAdsService,
    private modalService: NgbModal,
    private cookie: CookiesData,
    private router:Router
    ) {
    this.productService.cartItems.subscribe(response => this.products = response);
  }

  ngOnInit(): void {
    this.languages.forEach((language:any) => {
      if (language.code === this.translate.currentLang ) {
        this.language = language;
      }
    });
  }

  searchToggle(){
    this.search = !this.search;
  }

  changeLanguage(lang){
    if (isPlatformBrowser(this.platformId)) {
      this.translate.use(lang.code)
      localStorage.setItem('lang',lang.code);
      this.language = lang
      if(lang.code === 'ar'){
        document.body.classList.remove('ltr')
        document.body.classList.add('rtl')
      }else if(lang.code === 'en'){
        document.body.classList.remove('rtl')
        document.body.classList.add('ltr')
      }
    }
    window.location.reload()
  }

  get getTotal(): Observable<number> {
    return this.productService.cartTotalAmount();
  }

  removeItem(product: any) {
    this.productService.removeCartItem(product);
  }

  changeCurrency(currency: any) {
    this.productService.Currency = currency
  }

  onAddAds(){
    if(this.cookie.checkUserProfile()){
      this.modalService.open(CreateAdsComponent, { centered: true,size:'lg' })
     
    }else{
      this.router.navigate(['/pages/login'])
    }
  }

}
