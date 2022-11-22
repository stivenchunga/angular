import { Pipe, PipeTransform } from '@angular/core';
import { Projec } from '../interfaces/interfaces';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], args: any | ''): any {
    const resultPost = [];
    for (let post of value) {

      if (post.nombre) {
        if (post.nombre.toLowerCase().indexOf(args.toLowerCase()) > -1) {
          resultPost.push(post)

        }
      }

      if (post.ciudad) {
        if (post.ciudad.toLowerCase().indexOf(args.toLowerCase()) > -1) {
          resultPost.push(post)

        }

      }
    }

    return resultPost;
  }

}
