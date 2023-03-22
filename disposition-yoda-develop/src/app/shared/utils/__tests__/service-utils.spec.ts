import {ServiceType} from '@shared/utils/serviceType';
import {getServiceTypeFromServiceName} from '@shared/utils/service.util';

describe('service utils', () => {
  describe('getServiceTypeFromServiceName', () => {
    const services = [
      ['+8', ServiceType.PLUS8],
      ['+9', ServiceType.PLUS9],
      ['+10', ServiceType.PLUS10],
      ['+12', ServiceType.PLUS12],
      ['Ambient', ServiceType.AMBIENT],
      ['Abenddienst', ServiceType.ABENDDIENST],
      ['ThermoMed / Temperaturüberwacht', ServiceType.THERMOMED],
      ['Gefahrgut, schwach radioaktiv', ServiceType.GEFAHRGUTSCHWACH],
      ['Gefahrgut, stark radioaktiv', ServiceType.GEFAHRGUTSTARK],
      ['dummy', ServiceType.UNKNOWN],
      ['', ServiceType.UNKNOWN],
      ['123', ServiceType.UNKNOWN],
    ];

    it('Extract +8 ServiceType from string representation', () => {
      const serviceTypeFromString = getServiceTypeFromServiceName('+8');
      expect(serviceTypeFromString).toBe(ServiceType.PLUS8);
    });

    it('Extract +9 ServiceType from string representation', () => {
      const serviceTypeFromString = getServiceTypeFromServiceName('+9');
      expect(serviceTypeFromString).toBe(ServiceType.PLUS9);
    });

    it('Extract +10 ServiceType from string representation', () => {
      const serviceTypeFromString = getServiceTypeFromServiceName('+10');
      expect(serviceTypeFromString).toBe(ServiceType.PLUS10);
    });

    it('Extract +12 ServiceType from string representation', () => {
      const serviceTypeFromString = getServiceTypeFromServiceName('+12');
      expect(serviceTypeFromString).toBe(ServiceType.PLUS12);
    });

    it('Extract Abenddienst ServiceType from string representation', () => {
      const serviceTypeFromString = getServiceTypeFromServiceName('Abenddienst');
      expect(serviceTypeFromString).toBe(ServiceType.ABENDDIENST);
    });

    it('Extract ThermoMed / Temperaturüberwacht ServiceType from string representation', () => {
      const serviceTypeFromString = getServiceTypeFromServiceName('ThermoMed / Temperaturüberwacht');
      expect(serviceTypeFromString).toBe(ServiceType.THERMOMED);
    });

    it('Extract Gefahrgut, schwach radioaktiv ServiceType from string representation', () => {
      const serviceTypeFromString = getServiceTypeFromServiceName('Gefahrgut, schwach radioaktiv');
      expect(serviceTypeFromString).toBe(ServiceType.GEFAHRGUTSCHWACH);
    });

    it('Extract Gefahrgut, stark radioaktiv ServiceType from string representation', () => {
      const serviceTypeFromString = getServiceTypeFromServiceName('Gefahrgut, stark radioaktiv');
      expect(serviceTypeFromString).toBe(ServiceType.GEFAHRGUTSTARK);
    });

    it('Extract Unknown ServiceType from empty string representation', () => {
      const serviceTypeFromString = getServiceTypeFromServiceName('');
      expect(serviceTypeFromString).toBe(ServiceType.UNKNOWN);
    });

    it('Extract Unkown ServiceType from string representation', () => {
      const serviceTypeFromString = getServiceTypeFromServiceName('123');
      expect(serviceTypeFromString).toBe(ServiceType.UNKNOWN);
    });
  });
});
