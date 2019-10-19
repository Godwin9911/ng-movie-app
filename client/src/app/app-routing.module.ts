import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { UserModule } from './user/user.module';
import { MovieModule } from './movie/movie.module';
import { MovieComponent } from './movie/movie.component';


const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'movies', component: MovieComponent },
  { path: '', pathMatch: 'full', redirectTo: 'movies' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'}),
    UserModule,
    MovieModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
