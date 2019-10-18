import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { MovieService } from './movie.service';

@Injectable({ providedIn: 'root' })
export class MoviedetailResolver implements Resolve<any> {

  constructor(private movieService: MovieService) {}

  resolve(route: ActivatedRouteSnapshot): Promise<any> {
    const id = route.paramMap.get('id');
    return this.movieService.getmovie(id)
        .then(data => {
          return data;
        })
        .catch(err => {
            return err;
        });
  }
}
