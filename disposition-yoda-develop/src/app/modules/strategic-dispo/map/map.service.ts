import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { strategicDispoConfig } from '../strategic-dispo.config';
import { RasterService } from '@app/core/services/raster/raster.service';
import { StrategicTourService } from '@app/core/services/strategic-tour/strategic-tour.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  showTourControl: BehaviorSubject<boolean> = new BehaviorSubject(false);
  showPalletControl: BehaviorSubject<boolean> = new BehaviorSubject(false);

  private loading = false;

  constructor(
    private rasterService: RasterService,
    private tourService: StrategicTourService) { }

  public getLoading(): boolean {
    return this.loading;
  }

  public setLoadingTrue(): void {
    this.loading = true;
  }

  public setLoadingFalse(): void {
    this.loading = false;
  }


  public getGridRaster(bounds: L.LatLngBounds, zoom: number, layer: string): any {
    if (zoom < strategicDispoConfig.map.grid.minZoom) {
      // return empty geojson if zoom level is too small
      return {
        type: 'FeatureCollection',
        features: []
      };
    }

    let startLat: number;
    let startLng: number;

    const size_lon = strategicDispoConfig.map.grid.size_lon;
    const size_lat = strategicDispoConfig.map.grid.size_lat;
    const center = strategicDispoConfig.map.grid.center;

    // current position
    const currentLat = bounds.getSouthWest().lat;
    const currentLng = bounds.getSouthWest().lng;

    // calculate needed tiles
    const neededTilesLng = Math.round((bounds.getSouthEast().lng - bounds.getSouthWest().lng) / size_lon) + 4;
    const neededTilesLat = Math.round((bounds.getNorthEast().lat - bounds.getSouthEast().lat) / size_lat) + 2;

    // calculate the latitude starting position for the grid raster (bottom/top from center)
    if (currentLat < center.lat) {
      startLat = center.lat - (size_lat * Math.round((center.lat - currentLat) / size_lat)) - size_lat;
    } else {
      startLat = center.lat + (size_lat * Math.round((currentLat - center.lat) / size_lat)) - size_lat;
    }

    // calculate the longtitude starting position for the grid raster (left/right from center)
    if (currentLng < center.lng) {
      startLng = center.lng - (size_lon * Math.round((center.lng - currentLng) / size_lon)) - size_lon;
    } else {
      startLng = center.lng + (size_lon * Math.round((currentLng - center.lng) / size_lon)) - size_lon;
    }

    return this.generateGridRaster(neededTilesLng, neededTilesLat, new L.LatLng(startLat, startLng), layer);
  }

  private generateGridRaster(
    cols: number = 1,
    rows: number = 1,
    start: L.LatLng = new L.LatLng(strategicDispoConfig.map.center.lat, strategicDispoConfig.map.center.lng),
    layer: string,
    size_lat: number = strategicDispoConfig.map.grid.size_lat,
    size_lon: number = strategicDispoConfig.map.grid.size_lon): any {

    const currentPosition = new L.LatLng(start.lat, start.lng);
    const grid: any = {
      type: 'FeatureCollection',
      features: []
    };

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const qubePolygon = [];
        const raster = this.rasterService.getRasterByCoordinate(currentPosition, layer);

        if (raster) {
          qubePolygon.push([
            currentPosition.lng.toFixed(6),
            currentPosition.lat.toFixed(6)
          ]);

          qubePolygon.push([
            (currentPosition.lng + size_lon).toFixed(6),
            currentPosition.lat.toFixed(6)
          ]);

          qubePolygon.push([
            (currentPosition.lng + size_lon).toFixed(6),
            (currentPosition.lat + size_lat).toFixed(6)
          ]);

          qubePolygon.push([
            currentPosition.lng.toFixed(6),
            (currentPosition.lat + size_lat).toFixed(6)
          ]);

          qubePolygon.push([
            currentPosition.lng.toFixed(6),
            currentPosition.lat.toFixed(6)
          ]);

          const position: Position[][] = [
            qubePolygon
          ];

          const polygon: any = {
            type: 'Polygon',
            coordinates: position
          };

          const tour = this.tourService.getTourByRaster(raster, layer);

          const feature: any = {
            type: 'Feature',
            properties: {
              selected: tour && this.tourService.getSelectedTour() && this.tourService.getSelectedTour() === tour ? true : false,
              position: new L.LatLng(parseFloat(currentPosition.lat.toFixed(6)), parseFloat(currentPosition.lng.toFixed(6))),
              tour,
              raster
            },
            geometry: polygon
          };

          grid.features.push(feature);
        }
        currentPosition.lng += size_lon;
      }
      currentPosition.lng = start.lng;
      currentPosition.lat += size_lat;
    }

    return grid;
  }
}

