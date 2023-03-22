export class Planungen {
  constructor(
    public rastertourenplan_id: number = null,
    public name: string = null,
    public beschreibung: string = null,
    public samstag: boolean = false
  ) { }
}

export class Planung {
  constructor(
    public raster_touren_plan: RasterTourenPlan = null,
    public layer_raster_rahmentour_workflow: RasterRahmenTour[] = [],
  ) { }
}

export class RasterTourenPlan {
  constructor(
    public beschreibung: string = null,
    public name: string = null,
    public rastertourenplan_id: number = null,
    public samstag: boolean = false
  ) {}
}

export class RasterRahmenTour {
  constructor(
    public layer_id: number = null,
    public layer_code: string = null,
    public raster_rahmentour_work: RasterRahmenTourWork[] = [],
  ) {}
}

export class RasterRahmenTourWork {
  constructor(
    public raster_rahmentour_work_id: number = null,
    public rastertourenplan_id: number = null,
    public georaster_id: number = null,
    public tour_id: number = null,
    public raster_ebene_id: number = null,
  ) {}
}

export interface DispoAktivieren {
  standard: number ;
  montag: number;
  dienstag: number;
  mittwoch: number;
  donnerstag: number;
  freitag: number;
  samstag: number;
}
