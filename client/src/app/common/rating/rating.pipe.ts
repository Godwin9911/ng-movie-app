import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatRating'
})
export class RatingPipe implements PipeTransform {

  transform(value: any): any {
    const result = Math.floor(value / 2);
    return result;
  }

}
