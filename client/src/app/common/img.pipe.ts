import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatImg'
})
export class ImgPipe implements PipeTransform {

  transform(value: any): any {
    const result = `http://image.tmdb.org/t/p/w185/${value}`
    return result;
  }

}
