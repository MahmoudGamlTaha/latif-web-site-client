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
          if (error.error instanceof ErrorEvent && error.error.message) {
            Swal.fire({
              title:error.error.message,
              showConfirmButton: false,
              timer:2500
            })
            errorMsg = `Error: ${error.error.message}`;
          }
          else {
            errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
            console.log('errorMsg: ', errorMsg);
          }
          
          return throwError(errorMsg);
        
        })
      )
  }
}