import { AuthService, LoginRequest } from '../../../shared/services/auth.service';
import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';

import { AppBaseComponent } from '../../../shared/components/app-base/app-base.component';
import { BasicResponse } from '../../../shared/models/reponse.model';
import { CookiesData } from 'src/app/shared/services/cookies/CookiesData.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends AppBaseComponent implements OnInit, OnDestroy {

  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.Egypt, CountryISO.UnitedStates];

  loginSub: Subscription
  profileSub: Subscription
  constructor(
    injector: Injector,
    private _authService: AuthService,
    private router: Router,
    private cookie: CookiesData) {
    super(injector);
  }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm) {
    if (f.invalid) {
      return;
    }
    
    const value = f.value;

    let loginRequest: LoginRequest = { mobile: value.mobile?.number, password: value.password, token:'fpPvb_Lr9wH6DtowUzhjtT:APA91bEGtwRx40u91P5YEhDL2IvU-2X0gIcHsUKMg2_oz2jPCnLSOTNBps4iGot8DDQg3jjknYMY9PI_pAHuoR_6eAR1bgEX0ZQI_Oop-B_DDnQVwEGAaGfMCbzQBy2gKgod5vUj8QEl' }

    const loginSub = this._authService.login(loginRequest).subscribe((res: any) => {
      if (res) {
        this.cookie.setToken(res.Authorization);
        const profileSub = this._authService.profile().subscribe((result: any) => {
          this.cookie.setUserProfile(JSON.stringify(result.response.data))
          window.location.reload()
        })
        this.unsubscribe.push(profileSub)
      }
    })
    this.unsubscribe.push(loginSub)
  }


}
