import { Component, OnInit, OnChanges } from '@angular/core';
import { AuthService } from './user/auth.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ng-movie-app';

  get isLoggedIn(): boolean {
    return this.authservice.isLoggedIn;
  }

  get firstname(): string {
    if (this.authservice.currentUser) {
      return this.authservice.currentUser.firstname;
    }
    return '';
  }

  constructor(private authservice: AuthService,
              private router: Router,
              private titleService: Title) {}

  ngOnInit() {
    this.titleService.setTitle('Ng-Movie-App');

    /*this.authservice.checkAuthenticationStatus().subscribe({
      complete: () => this.router.navigateByUrl('/movies')
    });*/
  }

  logOut(): void {
    this.authservice.logout().subscribe(() => {
      this.router.navigateByUrl('/login');
    });
  }
}
