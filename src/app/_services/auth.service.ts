import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:5000/api/auth/';
  userToken: any;
  decodedToken: any;
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private http: Http) {}
  login(model: any) {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http
      .post(this.baseUrl + 'login', model, { headers: headers })
      .pipe(
        map((response: any) => {
          const user = response.json();
          if (user) {
            localStorage.setItem('token', user.tokenString);
            this.decodedToken = this.jwtHelper.decodeToken(user.tokenString);
            this.userToken = user.tokenString;
            console.log(this.decodedToken);
          }
        })
        // ,
        // catchError(this.handleError)
      );
  }

  register(model: any) {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http
      .post(this.baseUrl + 'register', model, {
        headers: headers
      })
      .pipe(catchError(this.handleError));
  }

  // checked for token
  loggedIn() {
    return tokenNotExpired('token');
  }

  private handleError(error: any) {
    const applicationError = error.headers.get('Application-Error');
    if (applicationError) {
      return throwError(applicationError);
    }
    const serverError = error.json();
    let modelStateError = '';
    if (serverError) {
      for (const key in serverError) {
        if (serverError[key]) {
          modelStateError += serverError[key] + '\n';
        }
      }
    }
    return throwError(modelStateError || 'Server error');
  }
}
