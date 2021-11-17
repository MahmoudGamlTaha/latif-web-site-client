import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-select-elemnet-multiple',
  templateUrl: './select-elemnet-multiple.component.html',
  styleUrls: ['./select-elemnet-multiple.component.scss']
})
export class SelectElemnetMultipleComponent implements OnInit {
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
