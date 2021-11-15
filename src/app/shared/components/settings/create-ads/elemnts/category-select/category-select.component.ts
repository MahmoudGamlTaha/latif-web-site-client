import { Component, Input, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';
import { UserAdsService } from '../../../../../services/product.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-category-select',
  templateUrl: './category-select.component.html',
  styleUrls: ['./category-select.component.scss']
})
export class CategorySelectComponent implements OnInit {
  categoryArr = []

  @Input() control: FormControl;
  @Input() typeValue:number;
  @Input() label:number;
  @Input() required:boolean;

  loading = false
  constructor( private UserAdsService: UserAdsService) { }

  ngOnInit(): void {
    this.getCategoryData(this.typeValue)
  }

  getCategoryData(value) {
    this.loading = true
    this.UserAdsService.catByAdTypeNoParentGet(+value, undefined).pipe(
      take(1) //useful if you need the data once and don't want to manually cancel the subscription again
    ).subscribe(
        (res: any) => {

          res.response.data.forEach(element => {
            this.categoryArr.push(element.category)
          });
          this.loading = false
          console.log('this.categoryArr: ', this.categoryArr);
        })
  }
}
