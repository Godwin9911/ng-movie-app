import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { Router } from '@angular/router';
import { FavouritesService } from '../favourites.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styles: []
})
export class FavouritesComponent implements OnInit {
  errorMessage: string;

  get movies() {
    return this.favouritesService.favourites;
  }

  constructor(private movieService: MovieService,
              private router: Router,
              private favouritesService: FavouritesService,
              private toastr: ToastrService) { }

  ngOnInit() {
    // get favourites from backend
    /* this.movieService.getFavourites()
      .then(data => {
          this.movies = data;
          console.log(data);
      })
      .catch(err => {
        this.errorMessage = err.message;
        console.log(err);
      });
    */
  }

  removeFromFavourites(movieId) {
    if (this.favouritesService.removeFromFavourites(movieId)) {
      return this.toastr.success('Removed Movie from favourites');
    }
  }

  movieDetail(id) {
    this.router.navigate(['moviedetail', id]);
  }

}
