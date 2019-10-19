import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { MovieService } from '../movie.service';
import { Router } from '@angular/router';
import { FavouritesService } from '../favourites.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {
  searchString: string;
  movies: any;
  errorMessage: string;
  loading = false;

  constructor(private titleService: Title,
              private router: Router,
              private favouritesService: FavouritesService,
              private toastr: ToastrService,
              private movieService: MovieService) { }

  ngOnInit() {
    this.titleService.setTitle('Search Movies');
  }

  search(form: NgForm) {
    this.loading = !this.loading;
    this.movieService.search(this.searchString)
      .then(data => {
        this.movies = data;
        // console.log(data);
    })
    .catch(err => {
      this.errorMessage = `Ensure you have network connection or try refreshing the page`;
      // console.log(err);
    });
    return this.loading = !this.loading;
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
