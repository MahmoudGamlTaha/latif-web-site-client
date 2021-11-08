import { AuthService, RegisterUserRequest } from '../../../shared/services/auth.service';
import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';

import { AppBaseComponent } from '../../../shared/components/app-base/app-base.component';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends AppBaseComponent implements OnInit,OnDestroy {
  separateDialCode = false;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
	preferredCountries: CountryISO[] = [CountryISO.Egypt, CountryISO.UnitedStates];
  countries = []
  cities = []
  
  constructor(
    injector: Injector,
    private _authService:AuthService,
    private router: Router, 
    ) {
      super(injector);
     }

  ngOnInit(): void {
    const countriesSub = this._authService.countries().subscribe(res =>{
      this.countries = res.response.data
    })
    this.unsubscribe.push(countriesSub)
  }

  onChangeCountries(value){
    this.cities = []
    const citiesSub = this._authService.cities(value.id).subscribe(res =>{
     if(res) this.cities = res.response.data
    })
    this.unsubscribe.push(citiesSub)
  }

  onSubmit(f:NgForm){
    if (f.valid) {
      const value = f.value;
      let registerUserRequest:RegisterUserRequest ={
        address:value.address,
        city:value.city,
        country: value.country,
        device: 'web',
        email:value.email,
        latitude: '0',
        longitude: '0',
        name: value.name,
        password: value.password,
        passwordRepeat: value.confirmPassword,
        phone:value.phone?.number,
        state:value.state
      }
      const regSub = this._authService.registration(registerUserRequest).subscribe((res:any) =>{
        if(res)   this.router.navigate(['/page/login'])
      })
      this.unsubscribe.push(regSub)
    }
  }
}
