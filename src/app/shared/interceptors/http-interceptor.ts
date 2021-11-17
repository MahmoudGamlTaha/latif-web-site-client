import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { CookiesData } from '../services/cookies/CookiesData.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class APIInterceptor implements HttpInterceptor {
    constructor(private cookie:CookiesData){}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let header = {}
        if(request.url.includes('194.163.180.99:8070')){
        }else{
            header['Content-Type'] = 'application/json; charset=utf-8';
        }
        header['Accept'] = '*/*';
        if (this.cookie.checkToken()) {
            header['Authorization'] = `${this.cookie.getToken()}`;
        }
        request = request.clone({
            setHeaders: header,
        });
        return next.handle(request);
    }
}
