import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild,
    Router,
    RouterStateSnapshot
} from '@angular/router';

import { CookiesData } from './cookies/CookiesData.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AppRouteGuard implements CanActivate, CanActivateChild {

    constructor(
        private _router: Router,
        private cookie:CookiesData
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

   
        if (!this.cookie.getToken()) {
            return true;
        }else{
            this._router.navigate([''])
            return false;
        }       
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }

  
 
}
