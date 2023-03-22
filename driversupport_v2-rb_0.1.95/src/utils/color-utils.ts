import { Injectable } from "@angular/core";
@Injectable()
export class ColorUtil {

  getTemperatureColor(temp) {
    let color = '';
    if (temp > 20)
      color = 'red';
    else if (temp < 20 && temp > 16)
      color = 'gray';
    else if (temp < 16)
      color = 'yellow'
    return color
  }

  getCashColor(cash) {
    let color = '';
    if (cash > 0)
      color = 'red';
    else
      color = 'gray';

    return color
  }

  getRegistrationColor(registration) {
    let color = '';
    if (registration)
      color = 'gray';
    else
      color = 'red';

    return color
  }

  getPackageColor(count) {
    let color = '';
    if (count > 0)
      color = 'yellow';
    else
      color = 'gray';

    return color
  }

  getPhoneColor(support) {
    let color = '';

    if (support === 'rgb(218, 218, 218)' || support ===null)
      color = 'gray';
    else
      color = 'red';

    return color
  }

  getPhoneColorFahrer(support) {
    let color = '';

    if (support === 'rgb(218, 218, 218)')
      color = 'gray';
    else
      color = 'red';

    return color
  }
}
