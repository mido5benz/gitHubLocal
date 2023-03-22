/* SystemJS module definition */
declare let module: NodeModule;

interface NodeModule {
  id: string;
}

import * as L from 'leaflet';

declare module 'leaflet' {
  export class GeometryUtil {
    static computeAngle(a: L.Point, b: L.Point): number;

    static closest(map: L.Map, layer: any, latlng: L.LatLng, vertices?: boolean): L.LatLng;

    static closestLayer(map: L.Map, layers: L.Layer[], latlng: L.LatLng): L.Layer;

    static distance(map: L.Map, latlngA: L.LatLng, latlngB: L.LatLng): number;
  }
}

