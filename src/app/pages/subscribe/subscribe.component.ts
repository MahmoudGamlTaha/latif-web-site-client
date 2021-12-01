import { Component, Injector, OnInit } from '@angular/core';

import { AppBaseComponent } from '../../shared/components/app-base/app-base.component';
import { SubscribeService } from '../../shared/services/subscrive.service';
import { TranslateService } from '@ngx-translate/core';
import { UserAdsService } from '../../shared/services/product.service';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent extends AppBaseComponent implements OnInit {
  pageSize=10;
  page=0;
  currency: any = this.productService.Currency;
  subscriptionArr = []
  constructor(
    injector: Injector,
    private SubscribeService:SubscribeService,
    public TranslateService:TranslateService,
    private productService: UserAdsService
  ) { 
    super(injector)
  }

  ngOnInit(): void {
    this.getSub()
  }

  getSub(){
    const getSub = this.SubscribeService.subscriptionTypes(String(this.page), '').subscribe(res =>{
      console.log('res: ', res);
     this.subscriptionArr = res.response.data;
    })
    this.unsubscribe.push(getSub)
  }
}
