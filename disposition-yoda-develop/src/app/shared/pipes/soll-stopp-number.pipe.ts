import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'sollStoppNumber'
})
export class SollStoppNumberPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if (!value) {
      return '?';
    }
    return value;
  }

}
