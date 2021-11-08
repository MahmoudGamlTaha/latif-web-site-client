import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { CookiesData } from '../services/cookies/CookiesData.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class APIInterceptor implements HttpInterceptor {
    constructor(private cookie:CookiesData){}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        let header = {}
        if (this.cookie.checkToken()) {
            header['Accept'] = '*/*';
            header['Content-Type'] = 'application/json';
            header['Authorization'] = `${this.cookie.getToken()}`;
        }
        request = request.clone({
            setHeaders: header,
          
        });
        return next.handle(request);
    }
}
