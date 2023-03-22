export interface MapTourFilter {
  tours: any;
  services: any;
  vehicleType: string;
  semiTrailer: boolean;
  truck: boolean;
  combine: boolean
}

export interface TourFilter {
  tours: string[];
}

export interface ServiceFilter {
  services: string[];
}

export interface VehicleTypeFilter {
  vehicleType: string;
}

export interface SemiTrailerFilter {
  semiTrailer: boolean;
}

export interface TruckFilter {
  truck: boolean;
}
