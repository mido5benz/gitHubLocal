import {Location} from '../index';
import {XServerConfig} from '@shared/models';

export class MapConfig<D = any> {
  xServerConfig: XServerConfig;
  standort?: Location;
  zoom: number;
}
