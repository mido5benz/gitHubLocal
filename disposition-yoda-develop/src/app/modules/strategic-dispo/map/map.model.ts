export interface LassoHandlerOptions {
  polygon?: L.PolylineOptions;
  intersect?: boolean;
}

export interface LassoHandlerFinishedEventData {
  latLngs: L.LatLng[];
  layers: L.GeoJSON[];
}

export type LassoControlOptions = LassoHandlerOptions & L.ControlOptions;
