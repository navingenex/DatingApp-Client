import { throwError } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import { AuthService } from './../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
declare let alertify: any;

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model = { username: '', password: '' };
  constructor(
    public authService: AuthService,
    private alertifyService: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(data => {
      this.alertifyService.success('loggedin successfully');
    },
    error => {
      throwError(
        this.alertifyService.error('Failed to login!')
      );
    },
    () => {
        this.router.navigate(['/members']);
    });
}
  logout() {
    this.authService.userToken = null;
    localStorage.removeItem('token');
    this.alertifyService.message('logged out');
    this.router.navigate(['/home']);
  }
  loggedIn() {
    return this.authService.loggedIn();
  }
}
