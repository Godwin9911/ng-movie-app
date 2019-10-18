import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { User, UserError } from '../user';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

function passwordMatcher( c: AbstractControl): { [key: string]: boolean } | null {
  const passwordControl = c.get('password');
  const confirmControl = c.get('confirmPassword');

  if (passwordControl.pristine || confirmControl.pristine) {
    return null;
  }

  if (passwordControl.value === confirmControl.value ) {
    return null;
  }
  // tslint:disable-next-line: object-literal-key-quotes
  return { 'match': true };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage: string;
  user = new User();

  constructor(private fb: FormBuilder,
              private authservice: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(3)]],
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      passwordGroup: this.fb.group({
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
      }, { validator: passwordMatcher})
    });
  }

  save() {
    const { firstname, lastname, email, passwordGroup: { password } } = this.registerForm.value;
    this.authservice.register({ firstname, lastname, email, password })
      .subscribe({
        next: (data: User) => {
          if (data) {
            this.router.navigate(['/login']);
          }
        },
        error: (err: UserError)  => this.errorMessage = `${err.message}`
      });
  }

}
