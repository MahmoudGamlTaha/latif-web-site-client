import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import Swal from 'sweetalert2';
import { catchError } from 'rxjs/operators';

export class HttpErrorInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMsg = '';
          if (error.error instanceof ErrorEvent) {
            console.log('error: ', error);
            console.log('this is client side error');
            Swal.fire({
              title:error.error.message,
              showConfirmButton: false,
              timer:2500
            })
            errorMsg = `Error: ${error.error.message}`;
          }
          else {
            console.log('error: ', error);
            console.log('this is server side error');
            errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
            Swal.fire({
              title:error.error.message,
              showConfirmButton: false,
              timer:2500
            })
          }
          console.log(errorMsg);
          return throwError(errorMsg);
        })
      )
  }
}