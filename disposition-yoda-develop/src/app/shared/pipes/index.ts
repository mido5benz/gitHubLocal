import {MinuteSecondsPipe} from './minute-seconds.pipe';
import {SollStoppNumberPipe} from './soll-stopp-number.pipe';
import {TourNumberPipe} from './tour-number.pipe';
import {VehicleTypePipe} from './vehicleType/vehicleType.pipe';
import {ObjectPropertiesPipe} from './properties/object-properties.pipe';
import {GermanWeekdaysPipe} from '@shared/pipes/germanWeekdays/german-weekdays.pipe';
import {YesnoPipe} from '@shared/pipes/yesno/yesno.pipe';
import {ServiceFormatterPipe} from '@shared/pipes/service/service-formatter.pipe';
import {WeekdaynumberPipe} from '@shared/pipes/weekdaynumber.pipe';

export * from './minute-seconds.pipe';
export * from './soll-stopp-number.pipe';
export * from './tour-number.pipe';
export * from './vehicleType/vehicleType.pipe';
export * from './vehicleType/vehicleType.pipe';
export * from './properties/object-properties.pipe';
export * from './germanWeekdays/german-weekdays.pipe';
export * from './yesno/yesno.pipe';
export * from './service/service-formatter.pipe';
export * from './weekdaynumber.pipe';

export const pipes: any[] = [
  MinuteSecondsPipe,
  SollStoppNumberPipe,
  TourNumberPipe,
  VehicleTypePipe,
  ObjectPropertiesPipe,
  GermanWeekdaysPipe,
  YesnoPipe,
  ServiceFormatterPipe,
  WeekdaynumberPipe
];
