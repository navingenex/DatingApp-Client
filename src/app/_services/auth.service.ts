import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:5000/api/auth/';
  userToken: any;

  constructor(private http: Http) {}
  login(model: any) {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post(this.baseUrl + 'login', model, { headers: headers }).pipe(
      map((response: Response) => {
        const user = response.json();
        if (user) {
          localStorage.setItem('token', user.tokenString);
          this.userToken = user.tokenString;
        }
      })
    );
  }

  register(model: any) {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post(this.baseUrl + 'register', model, { headers: headers });
  }
}
