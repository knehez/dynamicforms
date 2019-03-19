import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import errorCodes from 'src/utils/error.codes';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpInterceptorService implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        'Authorization': `Bearer ${this.authenticationService.getToken()}`
      }
    });

    return next.handle(req).pipe(
      catchError(err => {
        if (err.status === 401 && err.error.errcode === errorCodes.invalidAccessToken) {
          this.authenticationService.logout();
          this.router.navigate(['/login']);
        }

        return throwError(err);
      })
    );
  }
}
