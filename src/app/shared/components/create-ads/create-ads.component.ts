import { AfterViewChecked, ChangeDetectorRef, Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { AppBaseComponent } from '../app-base/app-base.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from '../../services/shared.service';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { UserAdsService } from '../../services/product.service';

@Component({
  selector: 'app-create-ads',
  templateUrl: './create-ads.component.html',
  styleUrls: ['./create-ads.component.scss']
})
export class CreateAdsComponent extends AppBaseComponent implements OnInit, OnDestroy,AfterViewChecked {
  loading = false;
  onSave = false;
  adsTypes = []

  
  myForm: FormGroup;
  formMap = []
  images;
  constructor(
    injector: Injector,
    public modal: NgbActiveModal,
    public TranslateService: TranslateService,
    private UserAdsService: UserAdsService,
    private fb: FormBuilder,
    private cdr:ChangeDetectorRef,
    private SharedService:SharedService
  ) {
    super(injector)
  }

  ngAfterViewChecked(): void {
    this.cdr.detectChanges()
  }
  ngOnInit(): void {
    this.myForm = this.fb.group({
      adsType:  [''],
      category:  [''],
      selling_type: [''],
      name:[''],
      short_description:[''],
      description:[''],
      price:[''],
      image:[''],
      breed:[''],
      stock:[''],
      weaned:[''],
      neutering:[''],
      vaccinationCertificate:[''],
      training:[''],
      passport:[''],
      playWithKids:[''],
      diseasesDisabilities:[''],
      diseasesDisabilitiesDesc:[''],
      food:[''],
      images:[''],
      Longitude:[''],
      latitude:[''],
      barkingProblem:[''],
      city:[''],
      allow_at_home:[''],
      driver_method:[''],

      
    });


    this.loading = true;
    const getSub = this.UserAdsService.listAdsType().subscribe(res => {
      this.adsTypes = res.response.data
      this.loading = false
    }, error => {
      this.loading = false
    })
    this.unsubscribe.push(getSub)


    this.SharedService.sendFiles.subscribe(res =>{
      this.images = res
    })
  }

  onChangeType(e) {
    
    const getCreateFormSub = this.UserAdsService.getCreateForm(e?.code, undefined).subscribe(res => {
        this.formMap = res.response.data.form
    })
    this.unsubscribe.push(getCreateFormSub)
  }


  onSubmit() {
    this.onSave = true
    var arr = [];
    let value = {...this.myForm.value}

    delete value['adsType']; 
    Object.keys(value).forEach(k => (!value[k] && value[k] !== undefined) && delete value[k]);
    for (let key in value) {   
      if( this.myForm.value !== "") {
        arr.push(Object.assign( {id: key,value: Array.isArray(value[key])? value[key].toString() : value[key]}));
      }
    }

    arr.push({id:'images',value:this.images})
    
    let body :any= {
      external:true,
      type: this.myForm.value.adsType,
      userAds: arr
    }
    const createAdsSub =  this.UserAdsService.createAds(body).subscribe(res =>{
     this.onSave = false;
     this.modal.close()
     window.location.reload();
     Swal.fire({
      title:res.message,
      showConfirmButton: false,
      timer:2500
    })
    })
    this.unsubscribe.push(createAdsSub)
  }

}
