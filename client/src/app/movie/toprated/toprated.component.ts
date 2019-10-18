import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { Router } from '@angular/router';
import { FavouritesService } from '../favourites.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-toprated',
  templateUrl: './toprated.component.html',
  styles: []
})
export class TopratedComponent implements OnInit {
  movies: any;
  errorMessage: string;

  constructor(private movieService: MovieService,
              private router: Router,
              private favouritesService: FavouritesService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.movieService.getUpcoming()
      .then(data => {
          this.movies = data;
          console.log(data);
      })
      .catch(err => {
        this.errorMessage = err.message;
        console.log(err);
      });
  }

  addToFavourites(movie) {
    if (this.favouritesService.addToFavourites(movie)) {
      return this.toastr.success('Added to Favourites');
    }
    return this.toastr.success('Movie already added favourites');
  }

  movieDetail(id) {
    this.router.navigate(['moviedetail', id]);
  }
}
