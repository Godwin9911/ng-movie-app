import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieComponent } from './movie.component';
import { UpcomingComponent } from './upcoming/upcoming.component';
import { LatestComponent } from './latest/latest.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { TopratedComponent } from './toprated/toprated.component';
import { MoviedetailResolver } from './moviedetail-resolver.service';
import { FavouritesComponent } from './favourites/favourites.component';
import { SearchComponent } from './search/search.component';


const routes: Routes = [
  {
    path: 'movies',
    component: MovieComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'nowplaying' },
      { path: 'upcoming', component: UpcomingComponent },
      { path: 'nowplaying', component: LatestComponent },
      { path: 'toprated', component: TopratedComponent }
    ]
  },
  { path: 'moviedetail/:id', component: MovieDetailComponent, resolve: { moviedetail: MoviedetailResolver}},
  { path: 'favourites', component: FavouritesComponent },
  { path: 'search', component: SearchComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieRoutingModule { }
