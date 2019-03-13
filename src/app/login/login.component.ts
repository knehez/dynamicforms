import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginSuccess: Boolean = true;
  user = {
    name: '',
    password: ''
  };

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) {

    if (authenticationService.getToken() != null) {
      this.router.navigate(['/']);
    }
  }

  onSubmit () {
    this.authenticationService.login(this.user.name, this.user.password)
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch(err => {
        if (err.status === 401) {
          this.loginSuccess = false;
          return;
        }

        console.error(err);
      });
  }
}
