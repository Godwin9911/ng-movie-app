import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieRoutingModule } from './movie-routing.module';
import { UpcomingComponent } from './upcoming/upcoming.component';
import { LatestComponent } from './latest/latest.component';
import { MovieComponent } from './movie.component';
import { HttpClientModule } from '@angular/common/http';
import { RatingComponent } from '../common/rating/rating.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RatingPipe } from '../common/rating/rating.pipe';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { ImgPipe } from '../common/img.pipe';
import { TopratedComponent } from './toprated/toprated.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RatingComponent,
    UpcomingComponent,
    LatestComponent,
    MovieComponent,
    RatingPipe,
    ImgPipe,
    MovieDetailComponent,
    TopratedComponent,
    FavouritesComponent,
    SearchComponent
  ],
  imports: [
    NgbModule,
    CommonModule,
    MovieRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() // ToastrModule added
  ],
  exports: [
    RatingComponent
  ]
})
export class MovieModule { }
