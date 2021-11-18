import { AuthService, LoginRequest } from '../../../shared/services/auth.service';
import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';

import { AppBaseComponent } from '../../../shared/components/app-base/app-base.component';
import { BasicResponse } from '../../../shared/models/reponse.model';
import { CookiesData } from 'src/app/shared/services/cookies/CookiesData.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from './../../../shared/services/shared.service';
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

  firebaseToken;
  constructor(
    injector: Injector,
    private _authService: AuthService,
    private router: Router,
    private cookie: CookiesData,
    private SharedService: SharedService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.SharedService.sendFireBaseTokenToLogin.subscribe(res => {
      this.firebaseToken = res
    })

  }

  onSubmit(f: NgForm) {
    if (f.invalid) {
      return;
    }

    const value = f.value;

    let loginRequest: LoginRequest = { mobile: value.mobile?.number, password: value.password, token: this.firebaseToken }

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
