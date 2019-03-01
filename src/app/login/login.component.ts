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
    private authenticationService: AuthenticationService
    ) { 

    //TODO: if the user is logged in, redirect to index page

  }

  onSubmit () { 
    this.authenticationService.login(this.user.name, this.user.password)
      .subscribe(
        data => {
          //TODO: handle JWT token from response
          if (data['success']) {
            return this.router.navigate([ '/' ]);
          }
        },
        err => {
          if (err.status === 401) {
            this.loginSuccess = false;
            return;
          }

          console.error(err);
        }
      );
  }
}
