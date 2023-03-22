export interface CurrentUser {
    app: string;
    depots: Depot[];
    roles: string[];
    user: string;
    total: number;
}

export interface User {
  app: string;
  depot: Depot;
  roles: string[];
  user: string;
  total: number;
}

export interface Depot {
    bezeichnung: string;
    code: string;
    depotnr: string;
    id: number;
}
