import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';
import { UserAdsService } from '../../../../services/product.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-select-elemnt-url',
  templateUrl: './select-elemnt-url.component.html',
  styleUrls: ['./select-elemnt-url.component.scss']
})
export class SelectElemntUrlComponent implements OnInit {
  listUrlArr = []
  @Input() control: FormControl;
  @Input() label: string;
  @Input() required: boolean;
  @Input() multiple: boolean;
  @Input() Name: string;
  @Input() url: string;
  @Input() form:FormGroup;

  
  loading = false

  constructor(
    private UserAdsService: UserAdsService,
    public TranslateService:TranslateService 

  ) { }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.loading = true
    this.UserAdsService.getDataByUrl(this.url).pipe(
      take(1) //useful if you need the data once and don't want to manually cancel the subscription again
    ).subscribe(
      (res: any) => {

        res.response.data.forEach(element => {
          this.listUrlArr.push(element.category)
        });
        this.listUrlArr =  this.listUrlArr.map( ({id,name,nameAr}) => ({code:id,name,nameAr}))
        this.loading = false
        
      })
  }


}
