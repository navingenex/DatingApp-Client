import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model = { username: '', password: '' };
  @Output() cancelRegister = new EventEmitter();

  constructor(private authService: AuthService) {}

  ngOnInit() {}
  register() {
    this.authService.register(this.model).subscribe(() => {
      console.log('Register successful');
    });
    console.log(this.model);
  }
  cancel() {
    this.cancelRegister.emit(false);
    console.log('cancelled');
  }
}
