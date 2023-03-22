import {ServiceType} from './serviceType';

export const getServiceNameFromServiceType = (serviceType: ServiceType): string => {
  switch (serviceType) {
    case ServiceType.UNKNOWN:
      return 'Unbekannt';
    case ServiceType.AMBIENT:
      return 'Ambient';
    case ServiceType.PLUS8:
      return '+8';
    case ServiceType.PLUS9:
      return '+9';
    case ServiceType.PLUS10:
      return '+10';
    case ServiceType.PLUS12:
      return '+12';
    case ServiceType.ABENDDIENST:
      return 'Abenddienst';
    case ServiceType.THERMOMED:
      return 'ThermoMed / Temperaturüberwacht';
    case ServiceType.GEFAHRGUTSCHWACH:
      return 'Gefahrgut, schwach radioaktiv';
    case ServiceType.GEFAHRGUTSTARK:
      return 'Gefahrgut, stark radioaktiv';
    default:
      return 'Unbekannt';
  }
};

export const getServiceTypeFromServiceName = (serviceName: string): number => {
  switch (serviceName) {
    case '+8':
    case 'p8Sum':
      return ServiceType.PLUS8;
    case '+9':
    case 'p9Sum':
      return ServiceType.PLUS9;
    case '+10':
    case 'p10Sum':
      return ServiceType.PLUS10;
    case '+12':
    case 'p12Sum':
      return ServiceType.PLUS12;
    case 'Ambient':
    case 'amb_sum':
      return ServiceType.AMBIENT;
    case 'Abenddienst':
    case 'abendSum':
      return ServiceType.ABENDDIENST;
    case 'ThermoMed / Temperaturüberwacht':
    case 'tmSum':
      return ServiceType.THERMOMED;
    // case 'Gefahrgut, schwach radioaktiv':
    // case 'kl7Sum':
    //   return ServiceType.GEFAHRGUTSCHWACH;
    // case 'Gefahrgut, stark radioaktiv':
    //   return ServiceType.GEFAHRGUTSTARK;
    case 'Radioaktiv':
      return ServiceType.GEFAHRGUTSCHWACH;
    default:
      return ServiceType.UNKNOWN;
  }
};

