import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'vehicleType',
})
export class VehicleTypePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    switch (value) {
      case '1':
        return 'PKW';
      case '2':
        return 'Sattel';
      case '3':
        return 'Bus';
      default:
        return 'Kein Filter gesetzt';
    }
  }
}
