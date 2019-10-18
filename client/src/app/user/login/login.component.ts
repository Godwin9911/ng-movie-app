import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { User, UserError } from '../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  errorMessage: string;

  constructor(private authservice: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  login(form: NgForm) {
    if (form.valid) {
      const { email, password } = form.value;
      this.authservice.login(email, password)
        .subscribe({
          next: (data: User) => {
            if (this.authservice.isLoggedIn) {
              this.router.navigate(['/movies']);
            }
          },
          error: (err: UserError)  => this.errorMessage = `${err.message}`
        });
    }
  }

}
