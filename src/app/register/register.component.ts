import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model = { username: '', password: '' };
  @Output() cancelRegister = new EventEmitter();

  constructor(
    private authService: AuthService,
    private alertifyService: AlertifyService
  ) {}

  ngOnInit() {}
  register() {
    this.authService.register(this.model).subscribe(
      () => {
        this.alertifyService.success('Register successful');
      },
      error => {
        return throwError(this.alertifyService.error(error));
      }
    );
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
