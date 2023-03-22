import {inject, TestBed} from '@angular/core/testing';
import {MarkerService} from './marker.service';
import {TourType} from '@shared/enums/tour_stopp.enums';

describe('Service: Marker', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MarkerService]
    });
  });

  it('should be an instance', inject([MarkerService], (service: MarkerService) => {
    expect(service).toBeTruthy();
  }));

  describe('getDisplayValue', () => {
    it('should return nicht gesetzt when value is undefined', inject([MarkerService], (service: MarkerService) => {
      const value = undefined;
      const displayValue = service.getDisplayValue(value);
      expect(displayValue).toBe('nicht gesetzt');
    }));

    it('should return nicht gesetzt when value is null', inject([MarkerService], (service: MarkerService) => {
      const value = null;
      const displayValue = service.getDisplayValue(value);
      expect(displayValue).toBe('nicht gesetzt');
    }));

    it('should return the value', inject([MarkerService], (service: MarkerService) => {
      const value = 'Testvalue';
      const displayValue = service.getDisplayValue(value);
      expect(displayValue).toBe('Testvalue');
    }));
  });

  describe('getClassNameForRasterEbenenId', () => {
    it('should return pallet classname when tour type is sattel (ID: 1)', inject([MarkerService], (service: MarkerService) => {
      const sattelEbene = TourType.SATTEL;
      const displayValue = service.getTourTypeIconClass(sattelEbene);
      expect(displayValue).toBe('fas fa-pallet');
    }));

    it('should return truck classname when tour type is lkw (ID: 2)', inject([MarkerService], (service: MarkerService) => {
      const sattelEbene = TourType.LKW;
      const displayValue = service.getTourTypeIconClass(sattelEbene);
      expect(displayValue).toBe('fa fa-truck');
    }));

    it('should return shipping-fast classname when tour type is express (ID: 3)', inject([MarkerService], (service: MarkerService) => {
      const sattelEbene = TourType.EXPRESS;
      const displayValue = service.getTourTypeIconClass(sattelEbene);
      expect(displayValue).toBe('fas fa-shipping-fast');
    }));

    it('should return cubes classname when tour type is normal (ID: 4)', inject([MarkerService], (service: MarkerService) => {
      const sattelEbene = TourType.NORMAL;
      const displayValue = service.getTourTypeIconClass(sattelEbene);
      expect(displayValue).toBe('fa fa-cubes');
    }));

    it('should return strips-s classname when tour type is samstag (ID: 5)', inject([MarkerService], (service: MarkerService) => {
      const sattelEbene = TourType.SAMSTAG;
      const displayValue = service.getTourTypeIconClass(sattelEbene);
      expect(displayValue).toBe('fab fa-stripe-s');
    }));

    it('should return question mark classname when the sattel id is unkown', inject([MarkerService], (service: MarkerService) => {
      const displayValue = service.getTourTypeIconClass(-1);
      expect(displayValue).toBe('fas fa-question');
    }));
  });

  describe('getIconForRasterEbene', () => {
    it('should return pallet icon when tour type is sattel (ID: 1)', inject([MarkerService], (service: MarkerService) => {
      const sattelEbene = TourType.SATTEL;
      const displayValue = service.getIconForRasterEbene(sattelEbene);
      expect(displayValue).toBe('<i class="fas fa-pallet"></i>');
    }));

    it('should return truck icon when tour type is lkw (ID: 2)', inject([MarkerService], (service: MarkerService) => {
      const sattelEbene = TourType.LKW;
      const displayValue = service.getIconForRasterEbene(sattelEbene);
      expect(displayValue).toBe('<i class="fa fa-truck"></i>');
    }));

    it('should return shipping-fast icon when tour type is express (ID: 3)', inject([MarkerService], (service: MarkerService) => {
      const sattelEbene = TourType.EXPRESS;
      const displayValue = service.getIconForRasterEbene(sattelEbene);
      expect(displayValue).toBe('<i class="fas fa-shipping-fast"></i>');
    }));

    it('should return cubes icon when tour type is normal (ID: 4)', inject([MarkerService], (service: MarkerService) => {
      const sattelEbene = TourType.NORMAL;
      const displayValue = service.getIconForRasterEbene(sattelEbene);
      expect(displayValue).toBe('<i class="fa fa-cubes"></i>');
    }));

    it('should return strips-s icon when tour type is samstag (ID: 5)', inject([MarkerService], (service: MarkerService) => {
      const sattelEbene = TourType.SAMSTAG;
      const displayValue = service.getIconForRasterEbene(sattelEbene);
      expect(displayValue).toBe('<i class="fab fa-stripe-s"></i>');
    }));

    it('should return question mark icon when the sattel id is unkown', inject([MarkerService], (service: MarkerService) => {
      const displayValue = service.getIconForRasterEbene(-1);
      expect(displayValue).toBe('<i class="fas fa-question"></i>');
    }));
  });
});
