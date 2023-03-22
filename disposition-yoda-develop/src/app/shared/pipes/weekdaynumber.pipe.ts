import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'weekdaynumber'
})
export class WeekdaynumberPipe implements PipeTransform {

  transform(weekDayNumber: unknown, ...args: unknown[]): unknown {
    switch (weekDayNumber) {
      case 1:
        return 'Montag';
      case 2:
        return 'Dienstag';
      case 3:
        return 'Mittwoch';
      case 4:
        return 'Donnerstag';
      case 5:
        return 'Freitag';
      case 6:
        return 'Samstag';
      case 7:
        return 'Sonntag';
    }
  }
}
