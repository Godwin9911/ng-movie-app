import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { Router } from '@angular/router';
import { FavouritesService } from '../favourites.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-latest',
  templateUrl: './latest.component.html',
  styles: []
})
export class LatestComponent implements OnInit {
  movies: any;
  errorMessage: string;

  constructor(private movieService: MovieService,
              private router: Router,
              private favouritesService: FavouritesService,
              private toastr: ToastrService) { }

  ngOnInit() {
    // console.log(sessionStorage.getItem('favourites'));
    this.movieService.nowPlaying()
      .then(data => {
          this.movies = data;
          // console.log(data);
      })
      .catch(err => {
        this.errorMessage = `Error retrieving now playing movies Refresh your browser and try again`;
        // console.log(err);
      });
  }

  addToFavourites(movie) {
    if (this.favouritesService.addToFavourites(movie)) {
      return this.toastr.success('Added to Favourites');
    }
    return this.toastr.info('Movie already added favourites');
  }

  movieDetail(id) {
    this.router.navigate(['moviedetail', id]);
  }

}
