import {Tour} from '@shared/models';
import {ServiceType} from '@shared/utils/serviceType';

export const getServiceAttributeFromServiceType = (serviceType: ServiceType): keyof Tour => {
  switch (serviceType) {
    case ServiceType.PLUS8:
      return 'p8Sum';
    case ServiceType.PLUS9:
      return 'p9Sum';
    case ServiceType.PLUS10:
      return 'p10Sum';
    case ServiceType.PLUS12:
      return 'p12Sum';
    case ServiceType.ABENDDIENST:
      return 'abendSum';
    case ServiceType.THERMOMED:
      return 'tmSum';
    case ServiceType.GEFAHRGUTSCHWACH:
      return 'kl7Sum';
    case ServiceType.GEFAHRGUTSTARK:
      return 'kl7Sum';
    case ServiceType.AMBIENT:
      return 'amb_sum';
    default:
      return null;
  }
};
