import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'serviceFormatter'
})
export class ServiceFormatterPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {

    switch (value) {
      case 'p8_sum':
        return '+8';
      case 'p9_sum':
        return '+9';
      case 'p10_sum':
        return '+10';
      case 'p12_sum':
        return '+12';
      case 'kl7_sum':
        return 'Gefahrgut';
      case 'amb_sum':
        return 'Ambient';
      case 'abend_sum':
        return 'Abend';
      default:
        return '';
    }
  }
}
