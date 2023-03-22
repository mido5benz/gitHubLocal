import {Depot} from '@models/user/user.model';

export const getDepotNumberFromUrl = (url: string): string => {
  const regex = /\d+/g;
  const matches = url.match(regex);

  if (!matches) {
    return '';
  }

  return matches[0];
};

export const hasCurrentDepotRights = (depots: Depot[], currentDepotNumberFromUrl: string): boolean =>
  depots.findIndex((depot: Depot) => depot.depotnr === currentDepotNumberFromUrl) > -1;

