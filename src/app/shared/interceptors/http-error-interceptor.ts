import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private cookieService: CookieService,
    private router: Router,
  ) { 
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMsg = '';
          if (error.error instanceof ErrorEvent && error.error.message) {
            if(error.error.message){
              Swal.fire({
                title:error.error.message,
                showConfirmButton: false,
                timer:2500
              })
             }
          }
          if(error.status == 401){
            this.cookieService.deleteAll();
            this.router.navigate(['/']).then(()=>{
              window.location.reload()
            });
          }
          return throwError(errorMsg);
        
        })
      )
  }
}