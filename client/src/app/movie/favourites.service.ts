import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {
  favourites: any = [];

  constructor() {
    // if storage exist
    if (sessionStorage.getItem('favourites')  !== null ) {
      const retrievedFavourites = JSON.parse(sessionStorage.getItem('favourites'));
      this.favourites = retrievedFavourites;
    }
   }


   addToFavourites(movie: any): boolean {
      if (this.favourites.find(eachmovie => eachmovie.id === movie.id)) {
        return false;
      }
      this.favourites.push(movie);
      sessionStorage.setItem('favourites', JSON.stringify(this.favourites));
      return true;
   }

   removeFromFavourites(id: number): boolean {
    this.favourites = this.favourites.filter(movie => movie.id !== id);
    sessionStorage.setItem('favourites', JSON.stringify(this.favourites));
    return true;
   }
}
