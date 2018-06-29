import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {AuthHttp} from 'angular2-jwt';

import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: Observable<User[]>;
  baseUrl = environment.apiUrl;

  constructor(private authHttp: AuthHttp) {}

  getUsers(): Observable<User[]> {
    return this.authHttp
    .get(this.baseUrl + 'users')
    .pipe(
      map(response => <User[]>response.json()),
      catchError(this.handleError));
  }

  getUser(id: number): Observable<User> {
   return this.authHttp.get(this.baseUrl + 'users/' + id)
    .pipe(
      map(response => <User>response.json()),
      catchError(this.handleError));
  }
  // private jwt() {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     const headers = new Headers();
  //     headers.append('Authorization', 'Bearer ' + token)
  //     headers.append('Content-type', 'application/json');
  //     return new RequestOptions({ headers: headers });
  //   }
  // }

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
