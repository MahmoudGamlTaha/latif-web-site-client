import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { UserAdsService } from '../../../../services/product.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-input-element',
  templateUrl: './input-element.component.html',
  styleUrls: ['./input-element.component.scss']
})
export class InputElementComponent implements OnInit {
  @Input() control: FormControl;
  @Input() label:number;
  @Input() required:boolean;
  @Input() inputType:string;
  @Input() Name:string;
  @Input() multiple:boolean;
  @Input() adsTypes:string;
  @Input() form:FormGroup;
  


  constructor(
    private UserAdsService:UserAdsService,
    private SharedService:SharedService
  ) { 

  }

  ngOnInit(): void {
   
   
   
  }
  
  files: File[] = [];
  formData = new FormData();
  uploadedLinks = []
  onSelect(event) {

    this.files.push(...event.addedFiles);
    let observables = [];
    for (var i = 0; i < this.files.length; i++) {
      this.formData = new FormData();
      this.formData.append("file", this.files[i]);
      observables.push(this.UserAdsService.upload(this.formData,this.adsTypes));
    }
   
    const forkJoinSub = forkJoin(observables)
      .subscribe((dataArray: any) => {
        for (let index = 0; index < dataArray.length; index++) {
         
         this.uploadedLinks.push(dataArray[index]['response']['data'][0])
         this.SharedService.sendFiles.next(this.uploadedLinks)

        }
      });

  }
  
  onRemove(event) {
    
    this.files.splice(this.files.indexOf(event), 1);
  }
}
