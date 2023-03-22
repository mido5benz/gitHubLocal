import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'tourNumber'
})
export class TourNumberPipe implements PipeTransform {

  transform(tournr: string, ...args: unknown[]): unknown {

    if (!tournr) {
      return '';
    }

    if (tournr.toLowerCase() === 'unverplant') {
      return tournr;
    }

    if (tournr === '0') {
      return 'Keine Tour gewählt';
    }
    return tournr ? tournr.slice(0, 1) + '-' + tournr.slice(1) : '';
  }
}
