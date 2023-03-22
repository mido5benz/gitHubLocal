export class Stammdaten {
  constructor(
    public dienste: Dienste[] = [],
    public fahrzeugtypen: Fahrzeugtypen[] = [],
    public wochentag: Wochentag[] = [],
    public expressdienste: DiensteExpress[] = []
  ) {}
}

export class Dienste {
  constructor(
    public diensttyp_id: number = null,
    public code: string = null,
    public anzeige_kuerzel: string = null,
    public bezeichnung: string = null,
    public checked?: boolean
  ) {}
}

export class DiensteExpress {
  constructor(
    public diensttyp_id: number = null,
    public code: string = null,
    public anzeige_kuerzel: string = null,
    public bezeichnung: string = null,
    public checked?: boolean
  ) {}
}

export class Fahrzeugtypen {
  constructor(
    public fahrzeugart_id: number = null,
    public fahrzeugklasse_id: number = null,
    public fahrzeugart_parameter_id: number = null,
    public fk_code: string = null,
    public fk_bezeichnung: string = null,
    public fa_code: string = null,
    public fa_bezeichnung: string = null,
    public nutzlast: number = null,
    public max_paletten: number = null,
    public max_colli: number = null,
    public stoppzeit_offset: number = null,
    public stoppzeit_collo: number = null,
    public stoppzeit_palette: number = null,
    public max_stoppzeit: number = null,
    public raster_stoppfahrtzeit: number = null
  ) {}
}

export class Wochentag {
  constructor(
    public wochentag_id: number = null,
    public name: string = null,
    public kurzname: string = null,
    public reihenfolge: number = null
  ) {}
}

export class DeliveryDay {
  value: string;
}
