/* eslint-disable @typescript-eslint/no-unused-vars */

import {inject, TestBed} from '@angular/core/testing';
import {GeoJsonService} from '../geoJson.service';

describe('Service: GeoJson', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeoJsonService]
    });
  });

  it('should ...', inject([GeoJsonService], (service: GeoJsonService) => {
    expect(service).toBeTruthy();
  }));
});
