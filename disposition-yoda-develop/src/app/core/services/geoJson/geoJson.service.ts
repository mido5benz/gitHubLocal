import {Injectable} from '@angular/core';
import {FeatureCollection} from 'geojson';

@Injectable({
  providedIn: 'root',
})
export class GeoJsonService {
  constructor() { }

  createFeatureCollection(features: any): FeatureCollection {
    return {
      type: 'FeatureCollection',
      features,
    };
  }
}
