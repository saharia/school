import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()

export class TokenInterceptorService implements HttpInterceptor {
    constructor(private authService: AuthenticationService) {}

    intercept(req, next) {
      let headers =  {};
      if(this.authService.getToken()) {
        headers['Authorization'] = `${this.authService.getToken()}`
      }
        let tokenizedReq = req.clone({
            setHeaders: headers
        });

        return next.handle(tokenizedReq).pipe(
          catchError((error: HttpErrorResponse) => {

            let errorMessage = '';

            console.log(error);
            
            if(error.error.message) {
              errorMessage = `${error.error.message}`;
            } else if (error.error instanceof ErrorEvent) {
   
              // client-side error
   
              errorMessage = `Error: ${error.error.message}`;
   
            } else {
   
              // server-side error
   
              errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
   
            }
   
            window.alert(errorMessage);
   
            return throwError(errorMessage);
   
          })
        );
    }
}