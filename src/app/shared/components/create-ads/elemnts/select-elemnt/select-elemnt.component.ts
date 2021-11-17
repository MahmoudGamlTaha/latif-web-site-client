import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';
import { UserAdsService } from '../../../../services/product.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-select-elemnt',
  templateUrl: './select-elemnt.component.html',
  styleUrls: ['./select-elemnt.component.scss']
})
export class SelectElemntComponent implements OnInit {
  @Input() control: FormControl;
  @Input() typeValue: number;
  @Input() label: string;
  @Input() required: boolean;
  @Input() listArr = []
  @Input() multiple: boolean;
  @Input() form:FormGroup;



  constructor(
    public TranslateService:TranslateService 
  ) { }

  ngOnInit(): void {
   
  }


}
