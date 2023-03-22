import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'germanWeekdays'
})
export class GermanWeekdaysPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    switch (value) {
      case 'monday':
        return 'Montag';
      case 'tuesday':
        return 'Dienstag';
      case 'wednesday':
        return 'Mittwoch';
      case 'thursday':
        return 'Donnerstag';
      case 'friday':
        return 'Freitag';
      case 'saturday':
        return 'Samstag';
      case 'sunday':
        return 'Sonntag';
      default:
        console.log('Unknown day', value);
        return '';
    }

  }
}
