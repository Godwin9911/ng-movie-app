import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private url = 'api/movies';

  constructor(private http: HttpClient) { }

  getUpcoming(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.url}/upcoming`)
        .toPromise()
        .then(
          res => resolve(res),
          msg => reject(msg)
        );
    });
  }

  getmovie(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      // this.http.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${}&language=en-US`)
      this.http.get(`${this.url}/getmovie/${id}`)
      .toPromise()
        .then(
          res => resolve(res),
          msg => reject(msg)
        );
    });
  }

  /* getFavourites(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(`api/users/favourites`)
        .toPromise()
        .then(
          res => resolve(res),
          msg => reject(msg)
        );
    });
  } */

  nowPlaying(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.url}/nowplaying`)
        .toPromise()
        .then(
          res => resolve(res),
          msg => reject(msg)
        );
    });
  }

  topRated(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.url}/toprated`)
        .toPromise()
        .then(
          res => resolve(res),
          msg => reject(msg)
        );
    });
  }

  search(query: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.url}/search?q=${query}`)
        .toPromise()
        .then(
          res => resolve(res),
          msg => reject(msg)
        );
    });
  }
}
