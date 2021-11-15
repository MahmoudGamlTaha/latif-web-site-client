import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { AppBaseComponent } from '../../app-base/app-base.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { UserAdsService } from '../../../services/product.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-create-ads',
  templateUrl: './create-ads.component.html',
  styleUrls: ['./create-ads.component.scss']
})
export class CreateAdsComponent extends AppBaseComponent implements OnInit, OnDestroy {
  loading = false;
  onSave = false;
  adsTypes = []
  constructor(
    injector: Injector,
    public modal: NgbActiveModal,
    public TranslateService: TranslateService,
    private UserAdsService: UserAdsService,
    private fb: FormBuilder
  ) {
    super(injector)
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
    });


    this.loading = true;
    const getSub = this.UserAdsService.listAdsType().subscribe(res => {
      this.adsTypes = res.response.data
      this.loading = false
    }, error => {
      this.loading = false
    })
    this.unsubscribe.push(getSub)
  }

  myForm: FormGroup;
  formMap = []
  typeID
  onChangeType(e) {
    this.typeID = e?.id
    const getCreateFormSub = this.UserAdsService.getCreateForm(e?.code, undefined).subscribe(res => {
        this.formMap = res.response.data.form
    })
    this.unsubscribe.push(getCreateFormSub)


  }

  onSubmit(model) {
    console.log(model);
  }

}
