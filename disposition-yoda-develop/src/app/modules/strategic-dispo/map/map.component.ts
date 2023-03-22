import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  EventEmitter,
  Injector, OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {locations} from '@app/shared/data/liste-standorte.data';
import {Dienste, Location, Wochentag} from '@models/index';
import {Store} from '@ngrx/store';
import {Feature} from 'geojson';
import * as L from 'leaflet';
import 'leaflet-easybutton';
import 'leaflet-lasso';
import 'leaflet-xserver';
import {forkJoin, Subscription} from 'rxjs';
import {FilterControlComponent} from '@shared/component';
import {Raster, RasterDetails} from '@models/strategic-dispo/raster.model';
import {StrategicTour} from '@models/strategic-dispo/strategic-tour.model';
import {SiteService, StammdatenService} from '@app/core/services';
import {strategicDispoConfig} from '../strategic-dispo.config';
import {LassoControlOptions} from './map.model';
import {MapService} from './map.service';
import {TourControlComponent} from './tour-control/tour-control.component';
import {StrategicTourService} from '@app/core/services/strategic-tour/strategic-tour.service';
import {MapService as CoreMapService} from '@app/core/services/map/map.service';
import {PlanungenService} from '@app/core/services/planungen/planungen.service';
import {RasterService} from '@app/core/services/raster/raster.service';
import {getTourTableState} from '@store/ui/selectors/strategic-dispo/strategic-dispo.selectors';
import {PalletService} from '@app/core/services/pallet/pallet.service';
import {Pallet} from '@models/strategic-dispo/pallet.model';
import {PalletControlComponent} from './pallet-control/pallet-control.component';
import {OverviewControlComponent} from './overview-control/overview-control.component';
import {ActiveLayerFacade} from '@store/strategic-dispo/facades/activate-layer.facade';
import {TooltipComponent} from './tooltip/tooltip.component';
import {xServerHost} from '@app/app.component';

@Component({
  selector: 'app-strategic-dispo-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnDestroy {
  @Output() rasterChanged = new EventEmitter();
  @Output() filter = new EventEmitter();

  private filterComponent: ComponentRef<FilterControlComponent>;

  private popup;
  private xServerUrl: string;
  private map: L.Map;
  private gridLayer: L.Layer;
  private lasso: any;
  private lassoDeselect: any;
  private overviewControlComponent: ComponentRef<OverviewControlComponent>;
  private tooltipComponent: ComponentRef<TooltipComponent>;
  private tourControlComponent: ComponentRef<TourControlComponent>;
  private palletControlComponent: ComponentRef<PalletControlComponent>;
  private heatmapFillOpacity = 0.3;
  private wochentagFilter: Wochentag = null;
  private dienstFilter: Dienste[] = [];
  private alleDienstFilter: Dienste[] = [];
  public showOverlay = false;
  public showOverlayPlanung = false;
  public sitesLayer: any;
  private currentRasterId = 0;
  private currentRaster = 0;

  private selectedLasso = 0;

  private standort: Location = null;

  private tourControl: any;
  private palletControl: any;
  private overviewControl: any;

  private currentLayer: string;
  private tourGrenze = [];

  private subscription: Subscription = new Subscription();

  constructor(
    private siteService: SiteService,
    private store: Store,
    private mapService: MapService,
    private coreMapService: CoreMapService,
    private stammdatenService: StammdatenService,
    private tourService: StrategicTourService,
    private planService: PlanungenService,
    private rasterService: RasterService,
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    private palletService: PalletService,
    private activeLayerFacade: ActiveLayerFacade
  ) {
    this.xServerUrl = `${xServerHost}/services/rest/XMap/tile/{z}/{x}/{y}?storedProfile={profile}`;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.initMap();
    this.initMapEventHandling();
    this.initLasso();
    this.initLassoDeselect();
    this.initButtons();
    this.rasterService.getRasterStandort();
    this.palletService.currentEmpfaenger?.subscribe((pallet: Pallet) => {
      this.currentRasterId = pallet.georaster_id;
      this.map.flyTo(new L.LatLng(pallet.geo_x, pallet.geo_y));
    });
    this.palletService.getGrosspostenLkw();
    this.palletService.getGrosspostenSattel();
    forkJoin([
      this.stammdatenService.getDienste(),
      this.tourService.getTours(),
      this.rasterService.getRastersSattel(),
      this.rasterService.getRastersLkw(),
      this.rasterService.getRastersExpress(),
      this.rasterService.getRastersRegel(),
      this.rasterService.getRastersSamstag(),
    ]).subscribe((result: any) => {
      this.dienstFilter = result[0].filter((dienst: Dienste) => dienst.diensttyp_id !== 246 && dienst.diensttyp_id !== 247);
      this.alleDienstFilter = result[0].filter((dienst: Dienste) => dienst.diensttyp_id !== 246 && dienst.diensttyp_id !== 247);
      this.dienstFilter.push({diensttyp_id: 999, code: 'GEFAHRGUT', anzeige_kuerzel: 'KL7', bezeichnung: 'Klasse 7'});
      this.alleDienstFilter.push({diensttyp_id: 999, code: 'GEFAHRGUT', anzeige_kuerzel: 'KL7', bezeichnung: 'Klasse 7'});
      this.drawGridRaster();
      this.initFilterControl();
      this.initTourControl();
      this.initPalletControl();
      this.showTourPalletControl('sattel');
    });
    this.subscription.add(this.siteService.fetchLocations().subscribe((result: Location[]) => {
      const sites = this.coreMapService.createSites(result);
      if (this.sitesLayer) {
        this.map.removeLayer(this.sitesLayer);
      }

      this.sitesLayer = L.geoJSON(sites, {
        pointToLayer: (feature: Feature, latlng: L.LatLng) => {
          const markerIcon = L.icon({
            iconUrl: 'assets/img/marker-icon.png',
            iconSize: [25, 41],
          });

          const siteMarker = new L.Marker(latlng, {icon: markerIcon});
          siteMarker.bindTooltip(`Standort ${feature.properties.site.name}`);
          return siteMarker;
        },
      });

      this.sitesLayer.addTo(this.map);
      this.sitesLayer.bringToBack();
    }));

    this.subscription.add(this.activeLayerFacade.activeLayer$.subscribe((layer: string) => {
      this.tourService.setSelectedTour(undefined);
      this.tourService.selectTourControl.next(0);
      this.currentLayer = layer;
      this.showTourPalletControl(layer);
      this.changeGridRaster();
    }));

    // Listen to tour table collapse changes and notify the map that the container size has changes
    this.subscription.add(
      this.store
        .select(getTourTableState)
        .subscribe((tableCollapsed: boolean) => {
          this.revalidateMapSize();
        })
    );
  }

  private revalidateMapSize(): void {
    setTimeout(() => {
      this.map.invalidateSize(true);
    }, 500);
  }

  private ausLieferFeatureHandler(feature, layer): void {
    layer.on({
      mouseover: (event: L.LeafletMouseEvent) => {
        if (feature.properties) {
          if (this.tourService.getSelectedTour()) {
            if (this.tourService.getSelectedTour().tournr !== feature.properties.id) {
              layer.setStyle({
                fillColor: 'grey',
              });
            } else {
              layer.setStyle({
                fillColor: 'blue',
              });
            }
          } else {
            layer.setStyle({
              fillColor: 'grey',
            });
          }
        }
      },
      mouseout: (event: L.LeafletMouseEvent) => {
        if (feature.properties) {
          if (this.tourService.getSelectedTour()) {
            if (this.tourService.getSelectedTour().tournr !== feature.properties.id) {
              layer.setStyle({
                fillColor: '#f27e00',
              });
            } else {
              layer.setStyle({
                fillColor: 'red',
              });
            }
          } else {
            layer.setStyle({
              fillColor: '#f27e00',
            });
          }
        }
      }
    });
  }

  private initMap(): void {
    this.standort = locations.find(
      (s: Location) => s.relnr.toString() === localStorage.getItem('userDepot')
    );

    this.map = L.map('map', {
      center: [this.standort.lat, this.standort.lon],
      zoom: strategicDispoConfig.map.zoom,
    });

    this.subscription.add(
      this.coreMapService.getAusliefergrenze().subscribe((result: any) => {
        const poly: any = {
          type: 'Feature',
          geometry: {
            type: 'MultiPolygon',
            coordinates: [
              [
                [
                  [
                    -51.744331,
                    64.843693
                  ],
                  [
                    58.745400,
                    71.449753
                  ],
                  [
                    48.367438,
                    19.140916
                  ],
                  [
                    -30.177143,
                    17.866978
                  ],
                  [
                    -51.744331,
                    64.843693
                  ]
                ], result.features[0].geometry.coordinates[0]
              ]
            ]
          }
        };

        const auslieferGrenzeLayer = L.geoJSON(poly, {
          style: {
            weight: 2,
            color: 'black',
            opacity: 0,
            fillOpacity: 0.5,
          },
          onEachFeature: this.ausLieferFeatureHandler.bind(this),
        });
        auslieferGrenzeLayer.addTo(this.map);
      })
    );


    // prettier-ignore
    // PTV background layer
    // @ts-ignore
    L.tileLayer.xserver(this.xServerUrl, {
      profile: 'silkysand',
      maxZoom: 18,
      minZoom: 5,
      pane: 'tilePane'
    }).addTo(this.map);
  }

  public openTooltip(feature: Feature, layer: L.GeoJSON, currentLayer: string): void {
    this.tooltipComponent = this.resolver
      .resolveComponentFactory(TooltipComponent)
      .create(this.injector);
    this.tooltipComponent.instance.feature = feature;
    this.tooltipComponent.instance.layer = layer;
    if (feature.properties.tour) {
      this.tooltipComponent.instance.tourNr = this.convertTourNr(feature.properties.tour.tournr);
    }
    this.tooltipComponent.instance.currentLayer = currentLayer;
    this.tooltipComponent.instance.rasterId = feature.properties.raster.id;
    this.tooltipComponent.changeDetectorRef.detectChanges();
    // stop events
    this.stopEvents(this.tooltipComponent.location.nativeElement);

    const position = new L.LatLng(
      feature.properties.position.lat + strategicDispoConfig.map.grid.size_lat,
      feature.properties.position.lng + strategicDispoConfig.map.grid.size_lon / 2,
    );

    this.popup = L.popup({
      closeOnClick: false,
      autoPan: false,
      minWidth: 125
    })
      .setLatLng(position)
      .setContent(this.tooltipComponent.location.nativeElement)
      .openOn(this.map);

  }

  public closePopups(): void {
    this.popup = null;
    this.map.closePopup();
  }


  private featureHandler(feature: Feature, layer: L.GeoJSON): void {
    // click event handler

    // layer.bindTooltip(this.mapService.tooltipHandler(feature, layer, this.currentLayer));
    layer.on({
      mouseover: (event: L.LeafletMouseEvent) => {
        if (this.popup) {
          this.closePopups();
          this.openTooltip(feature, layer, this.currentLayer);
        } else {
          this.openTooltip(feature, layer, this.currentLayer);
        }
        // this.openTooltip(feature, layer, this.currentLayer);
        if (this.tourService.getSelectedTour()) {
          // apply hover style
          layer.bringToFront();
          layer.setStyle({
            color: strategicDispoConfig.map.grid.styles.color.hover,
          });
        }
      },
      mouseout: (event: L.LeafletMouseEvent) => {
        this.closePopups();
        if (this.tourService.getSelectedTour()) {
          // remove hover style
          if (feature.properties.selected) {
            layer.bringToFront();
            layer.setStyle({
              color: strategicDispoConfig.map.grid.styles.color.selected,
            });
          } else if (feature.properties.tour) {
            // layer.bringToFront();
            layer.setStyle({
              color: strategicDispoConfig.map.grid.styles.color.assigned,
            });
          } else {
            layer.bringToBack();
            layer.setStyle({
              color: strategicDispoConfig.map.grid.styles.color.border,
            });
          }
        }
      },
      click: (event: L.LeafletMouseEvent) => {
        if (this.planService.getActivePlanName()) {
          if (this.tourService.getSelectedTour()) {
            const raster: Raster = this.rasterService.getRasterByCoordinate(
              feature.properties.position,
              this.currentLayer
            );

            const tour = this.tourService.getSelectedTour();

            if (!feature.properties.tour) {
              // add unassigned raster to tour
              feature.properties.selected = true;
              feature.properties.tour = tour;
              feature.properties.raster = raster;
              this.tourService.addRasterToLayer(
                tour.tour_id,
                raster,
                this.currentLayer
              );
              this.rasterChanged.emit();
              layer.bringToFront();
              layer.setStyle({
                color: strategicDispoConfig.map.grid.styles.color.selected,
              });
            } else if (feature.properties.tour === tour) {
              // remove raster from tour
              feature.properties.selected = false;
              feature.properties.tour = null;
              feature.properties.raster = null;
              this.tourService.removeRasterFromLayer(
                tour.tour_id,
                raster.id,
                this.currentLayer
              );
              this.rasterChanged.emit();
              layer.bringToBack();
              layer.setStyle({
                color: strategicDispoConfig.map.grid.styles.color.border,
              });
            } else {
              // assign raster to other tour
              this.tourService.removeRasterFromLayer(
                feature.properties.tour.tour_id,
                raster.id,
                this.currentLayer
              );
              this.tourService.addRasterToLayer(
                tour.tour_id,
                raster,
                this.currentLayer
              );
              this.rasterChanged.emit();
              feature.properties.selected = true;
              feature.properties.tour = tour;
              feature.properties.raster = raster;
              layer.bringToFront();
              layer.setStyle({
                color: strategicDispoConfig.map.grid.styles.color.selected,
              });
            }

            this.currentRaster = 0;

            this.onPopup();

            this.updateCalculation();
            this.planService.setBearbeitung();
          } else {
            this.showSelectTourFirstInfo();
          }
        } else {
          this.showSelectPlanungFirstInfo();
        }
      },
    });
  }

  private featureStyle(feature: Feature): L.PathOptions {
    // default style
    const style: L.PathOptions = {
      color: strategicDispoConfig.map.grid.styles.color.border,
      weight: 1,
      fillOpacity: this.heatmapFillOpacity, // .25
    };

    // change border color if already assigned
    if (feature.properties.tour) {
      style.color = strategicDispoConfig.map.grid.styles.color.assigned;
    }

    // change border color if selected
    if (feature.properties.selected) {
      style.color = strategicDispoConfig.map.grid.styles.color.selected;
    }

    // change border when nextRastered
    if (
      feature.properties.raster.id === this.currentRasterId &&
      !feature.properties.selected &&
      !feature.properties.tour
    ) {
      style.color = strategicDispoConfig.map.grid.styles.color.currentRaster;
    }

    const raster: Raster = feature.properties.raster;

    const wochentag = this.wochentagFilter
      ? this.wochentagFilter.wochentag_id
      : null;
    const isDienstFilterSelected =
      this.dienstFilter.length !== this.alleDienstFilter.length;
    let amount = 0;

    // change fill color (heatmap)
    if (isDienstFilterSelected) {
      this.dienstFilter.forEach((dienst: Dienste) => {
        if (wochentag) {
          amount += raster.details[wochentag]
            ? raster.details[wochentag][dienst.code.toLowerCase()]
            : 0;
        } else {
          Object.values(raster.details).forEach(
            (details: RasterDetails) =>
              (amount += details[dienst.code.toLowerCase()])
          );
        }
      });
      amount = Math.ceil(amount);
    } else {
      if (wochentag) {
        amount += raster.details[wochentag]
          ? raster.details[wochentag].gesamtmenge
          : 0;
      } else {
        Object.values(raster.details).forEach(
          (details: RasterDetails) => (amount += details.gesamtmenge || 0)
        );
      }
    }

    strategicDispoConfig.map.grid.styles.heatMap.forEach((colorDef) => {
      if (colorDef.max && amount >= colorDef.min && amount <= colorDef.max) {
        style.fillColor = colorDef.color;
      } else if (amount >= colorDef.min) {
        style.fillColor = colorDef.color;
      }
    });

    if (!style.fillColor) {
      style.fillColor = 'rgba(0, 0, 0, 0)';
    }

    return style;
  }

  private initMapEventHandling(): void {
    this.map.on({
      moveend: (event: L.LeafletEvent) => {
        // redraw raster grid when map view changes
        this.drawGridRaster();
      },
    });
  }

  public drawGridRaster(): void {
    const zoom: number = this.map.getZoom();
    const bounds: L.LatLngBounds = this.map.getBounds();

    // generate grid raster
    const gridRaster = this.mapService.getGridRaster(
      bounds,
      zoom,
      this.currentLayer
    );

    // remove existing grid raster layer
    if (this.gridLayer) {
      this.map.removeLayer(this.gridLayer);
    }

    // add new grid raster layer
    this.gridLayer = L.geoJSON(gridRaster, {
      onEachFeature: this.featureHandler.bind(this),
      style: this.featureStyle.bind(this),
    }).addTo(this.map);

    // bring selected tiles to front
    // @ts-ignore
    this.gridLayer.eachLayer((layer: L.geoJSON) => {
      if (layer.feature.properties.tour) {
        layer.bringToFront();
      }
    });
    if (this.tourGrenze) {
      this.tourGrenze.forEach((result: any) => {
        this.map.removeLayer(result);
      });
      this.tourGrenze = [];
    }
    if (this.map.getZoom() < 12) {
      this.drawTourFence();
    }
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  drawTourFence(): void {
    const tourPositionArray = [];
    this.subscription.add(
      this.tourService.getTours().subscribe((result: StrategicTour[]) => {
        result.forEach((tour: StrategicTour) => {
          let rasterLayer = [];
          switch (this.currentLayer) {
            case 'sattel': {
              rasterLayer = tour.raster_sattel;
              break;
            }
            case 'lkw': {
              rasterLayer = tour.raster_lkw;
              break;
            }
            case 'express': {
              rasterLayer = tour.raster_express;
              break;
            }
            case 'regel': {
              rasterLayer = tour.raster_regel;
              break;
            }
            case 'samstag': {
              rasterLayer = tour.raster_samstag;
              break;
            }
          }
          if (rasterLayer?.length > 0) {
            const positionArray = [];
            rasterLayer.forEach((raster: any) => {
              positionArray.push({
                x: raster.latStart,
                y: raster.lngStart
              });
            });
            tourPositionArray.push({
              bezeichnung: tour.tournr,
              punkt: positionArray
            });
          }
        });
      })
    );
    if (tourPositionArray.length > 0) {
      this.subscription.add(
        this.coreMapService.getAusliefergrenzeTour(tourPositionArray).subscribe((result: any) => {
          result.forEach(element => {
            const tourGrenze = L.geoJSON(JSON.parse(element), {
              style: {
                weight: 1,
                color: 'black',
                opacity: 1,
                fillOpacity: 0.2,
                fillColor: '#f27e00'
              },
              onEachFeature: this.ausLieferFeatureHandler.bind(this),
            });
            if (
              this.tourService.getSelectedTour() &&
              this.tourService.getSelectedTour().tournr === JSON.parse(element).features[0].properties.id
            ) {
              tourGrenze.setStyle({
                fillColor: 'red'
              });
            }
            const tournr = JSON.parse(element).features[0].properties.id;
            tourGrenze.bindTooltip(this.convertTourNr(tournr), {className: 'h3'});
            this.tourGrenze.push(tourGrenze.addTo(this.map));
            this.tourGrenze.forEach((layer: any) => {
              layer.bringToBack();
            });
          });
        })
      );
    }
  }

  private filterStandortmarker(event: any): any {
    return event.layers.filter(
      (layer: any) => layer.feature.properties !== undefined && layer.feature.properties?.raster
    );
  }


  private initLasso(): void {
    const lassoOptions: LassoControlOptions = {
      intersect: true,
    };

    // @ts-ignore
    this.lasso = L.lasso(this.map, lassoOptions);

    // @ts-ignore
    this.map.on('lasso.finished', (event: LassoHandlerFinishedEventData) => {
      const selectedRaster = this.filterStandortmarker(event);

      if (this.selectedLasso === 1) {
        if (this.planService.getActivePlanName()) {
          if (this.tourService.getSelectedTour()) {
            const rasterList = [];
            const coordinate = {
              lng: null,
              lat: null,
            };
            const tour = this.tourService.getSelectedTour();
            selectedRaster.forEach((layer) => {
              const raster = layer.feature.properties.raster;
              if (layer.feature.properties.tour) {
                this.tourService.removeRasterFromLayer(
                  layer.feature.properties.tour.tour_id,
                  raster.id,
                  this.currentLayer
                );
              }
              this.tourService.addRasterToLayer(
                tour.tour_id,
                raster,
                this.currentLayer
              );
              layer.feature.properties.selected = true;
              layer.feature.properties.tour = this.tourService.getSelectedTour();
              layer.setStyle({
                color: strategicDispoConfig.map.grid.styles.color.selected,
              });
              layer.bringToFront();
              rasterList.push(raster);
            });

            // calculate boundaries
            rasterList.forEach((r: Raster) => {
              if (!coordinate.lat || r.latStart > coordinate.lat) {
                coordinate.lng = r.lngStart;
                coordinate.lat = r.latStart;
              }
            });

            if (selectedRaster.length > 0) {
              this.onPopup();

              this.updateCalculation();
              this.planService.setBearbeitung();
              this.currentRaster = 0;
            }
          } else {
            this.showSelectTourFirstInfo();
          }
        } else {
          this.showSelectPlanungFirstInfo();
        }
      }
    });
  }

  private initLassoDeselect(): void {
    const lassoOptions: LassoControlOptions = {
      intersect: true,
    };

    // @ts-ignore
    this.lassoDeselect = L.lasso(this.map, lassoOptions);

    // @ts-ignore
    this.map.on('lasso.finished', (event: LassoHandlerFinishedEventData) => {
      const selectedRaster = this.filterStandortmarker(event);

      if (this.selectedLasso === 0) {
        if (this.planService.getActivePlanName()) {
          if (this.tourService.getSelectedTour()) {
            const rasterList = [];
            const coordinate = {
              lng: null,
              lat: null,
            };
            const tour = this.tourService.getSelectedTour();
            selectedRaster.forEach((layer) => {
              const raster = layer.feature.properties.raster as Raster;
              this.tourService.removeRasterFromLayer(
                tour.tour_id,
                raster.id,
                this.currentLayer
              );
              layer.feature.properties.selected = true;
              layer.feature.properties.tour = this.tourService.getSelectedTour();
              layer.setStyle({
                color: strategicDispoConfig.map.grid.styles.color.selected,
              });
              layer.bringToFront();
              rasterList.push(raster);
            });

            // calculate boundaries
            rasterList.forEach((r: Raster) => {
              if (!coordinate.lat || r.latStart > coordinate.lat) {
                coordinate.lng = r.lngStart;
                coordinate.lat = r.latStart;
              }
            });

            this.onPopup();

            if (selectedRaster.length > 0) {
              this.updateCalculation();
            }
          } else {
            this.showSelectTourFirstInfo();
          }
        } else {
          this.showSelectPlanungFirstInfo();
        }
      }
    });
  }

  private initButtons(): void {
    // @ts-ignore
    L.easyButton(
      '<i class="fa fa-home" aria-hidden="true" title="trans-o-flex Standort"></i>',
      () => {
        const standortPosition = L.latLng(this.standort.lat, this.standort.lon);
        this.map.flyTo(standortPosition);
      }
    ).addTo(this.map);
    L.easyButton(
      '<img src="assets/img/lasso_plus.png" title="Lasso +" width="100%">',
      (btn, map) => {
        this.selectedLasso = 1;
        this.lasso.enable();
      }
    ).addTo(this.map);
    L.easyButton(
      '<img src="assets/img/lasso_minus.png" title="Lasso -" width="100%">',
      (btn, map) => {
        this.selectedLasso = 0;
        this.lassoDeselect.enable();
      }
    ).addTo(this.map);
    L.easyButton(
      '<i class="fas fa-forward" aria-hidden="true" title="Nächstes unverplantes Raster"></i>',
      (btn, map) => {
        this.nextRaster();
      }
    ).addTo(this.map);
    L.easyButton(
      '<i class="fas fa-filter" aria-hidden="true" title="Filter"></i>',
      (btn, map) => {
        this.collapseFilter();
      }
    ).addTo(this.map);
  }

  collapseFilter(): void {
    this.filterComponent.instance.collapse();
  }

  private initFilterControl(): void {
    const filterComponent = this.resolver
      .resolveComponentFactory(FilterControlComponent)
      .create(this.injector);
    filterComponent.instance.fahrzeugtypChanged.subscribe((filterCriteria) =>
      this.filter.emit(filterCriteria)
    );
    filterComponent.instance.wochentagChanged.subscribe(
      (wochentag: Wochentag) => {
        this.wochentagFilter = wochentag;
        this.drawGridRaster();
      }
    );
    filterComponent.instance.diensteChanged.subscribe((dienste: Dienste[]) => {
      this.dienstFilter = dienste;
      this.drawGridRaster();
    });
    filterComponent.changeDetectorRef.detectChanges();

    // @ts-ignore
    const control = L.control({position: 'bottomleft'});
    control.onAdd = (map: L.Map) => filterComponent.location.nativeElement;
    control.addTo(this.map);

    // stop events
    this.stopEvents(filterComponent.location.nativeElement);

    this.filterComponent = filterComponent;
  }

  public initTourControl(): void {
    if (this.tourControl) {
      this.map.removeControl(this.tourControl);
    }
    this.tourControlComponent = this.resolver
      .resolveComponentFactory(TourControlComponent)
      .create(this.injector);
    this.tourControlComponent.changeDetectorRef.detectChanges();

    // stop events
    this.stopEvents(this.tourControlComponent.location.nativeElement);

    // @ts-ignore
    this.tourControl = L.control({position: 'topright'});
    this.tourControl.onAdd = (map: L.Map) =>
      this.tourControlComponent.location.nativeElement;

    this.subscription.add(
      this.activeLayerFacade.activeLayer$.subscribe((layer: string) => {
        if (layer === 'express' || layer === 'regel' || layer === 'samstag') {
          this.tourControl.addTo(this.map);
        }
      })
    );
  }

  public initPalletControl(): void {
    if (this.palletControl) {
      this.map.removeControl(this.palletControl);
    }
    this.palletControlComponent = this.resolver
      .resolveComponentFactory(PalletControlComponent)
      .create(this.injector);
    this.palletControlComponent.changeDetectorRef.detectChanges();

    // stop events
    this.stopEvents(this.palletControlComponent.location.nativeElement);

    // @ts-ignore
    this.palletControl = L.control({position: 'topright'});
    this.palletControl.onAdd = (map: L.Map) =>
      this.palletControlComponent.location.nativeElement;

    this.subscription.add(
      this.activeLayerFacade.activeLayer$.subscribe((layer: string) => {
        if (layer === 'lkw' || layer === 'sattel') {
          this.palletControl.addTo(this.map);
        }
      })
    );
  }

  private showTourPalletControl(currentLayer: string): void {
    if (!this.map || !this.tourControl || !this.palletControl) {
      return;
    }
    this.currentRaster = 0;
    if (currentLayer === 'sattel' || currentLayer === 'lkw') {
      this.map.removeControl(this.tourControl);
      this.palletControl.addTo(this.map);
    }
    if (
      currentLayer === 'express' ||
      currentLayer === 'regel' ||
      currentLayer === 'samstag'
    ) {
      this.map.removeControl(this.palletControl);
      this.tourControl.addTo(this.map);
    }
  }

  private changeGridRaster(): void {
    if (!this.map) {
      return;
    }
    this.closeOverview();
    this.drawGridRaster();
  }

  private showSelectTourFirstInfo(): void {
    this.showOverlay = true;
    setTimeout(() => (this.showOverlay = false), 4000);
  }

  private showSelectPlanungFirstInfo(): void {
    this.showOverlayPlanung = true;
    setTimeout(() => (this.showOverlayPlanung = false), 4000);
  }

  public onPopup(): void {
    const selectedTour = this.tourService.getSelectedTour();

    if (selectedTour) {
      if (
        !selectedTour.raster_total ||
        selectedTour.raster_total.length === 0
      ) {
        this.closeOverview();
        this.drawGridRaster();
      } else {
        this.openOverviewControl(selectedTour);
        this.drawGridRaster();
      }
    }
  }

  public openOverviewControl(tour: StrategicTour): void {
    this.overviewControlComponent = this.resolver
      .resolveComponentFactory(OverviewControlComponent)
      .create(this.injector);
    this.overviewControlComponent.instance.tour = tour;
    this.overviewControlComponent.changeDetectorRef.detectChanges();

    if (this.overviewControl) {
      this.map.removeControl(this.overviewControl);
    }

    // stop events
    this.stopEvents(this.overviewControlComponent.location.nativeElement);

    // @ts-ignore
    this.overviewControl = L.control({position: 'bottomright'});
    this.overviewControl.onAdd = (map: L.Map) =>
      this.overviewControlComponent.location.nativeElement;
    this.overviewControl.addTo(this.map);
  }

  public closeOverview(): void {
    if (this.overviewControl) {
      this.map.removeControl(this.overviewControl);
    }
  }

  private stopEvents(componentEl: HTMLElement): void {
    L.DomEvent.addListener(componentEl, 'click', (event) => {
      L.DomEvent.stopPropagation(event);
      L.DomEvent.disableClickPropagation(componentEl);
    });
    L.DomEvent.addListener(componentEl, 'dblclick', (event) =>
      L.DomEvent.stopPropagation(event)
    );
    L.DomEvent.addListener(componentEl, 'mouseout', (event) =>
      L.DomEvent.stopPropagation(event)
    );
    L.DomEvent.addListener(componentEl, 'mousemove', (event) =>
      L.DomEvent.stopPropagation(event)
    );
    L.DomEvent.addListener(componentEl, 'contextmenu', (event) =>
      L.DomEvent.stopPropagation(event)
    );
    L.DomEvent.addListener(componentEl, 'mouseup', (event) =>
      L.DomEvent.stopPropagation(event)
    );
    L.DomEvent.addListener(componentEl, 'mousedown', (event) =>
      L.DomEvent.stopPropagation(event)
    );
    L.DomEvent.addListener(componentEl, 'mousewheel', (event) =>
      L.DomEvent.stopPropagation(event)
    );
    L.DomEvent.addListener(componentEl, 'wheel', (event) =>
      L.DomEvent.stopPropagation(event)
    );
  }

  private updateCalculation(): void {
    // update utilization popup
    if (this.overviewControlComponent) {
      this.overviewControlComponent.changeDetectorRef.detectChanges();
    }

    // update tour control list
    if (this.tourControlComponent) {
      this.tourControlComponent.changeDetectorRef.detectChanges();
    }

    // update table row
    this.rasterChanged.emit();
  }

  private convertTourNr(tourNr: string): string {
    let convertedTourNr = tourNr;

    if (convertedTourNr) {
      convertedTourNr =
        convertedTourNr.slice(0, 1) + '-' + convertedTourNr.slice(1);
    }

    return convertedTourNr;
  }

  private nextRaster(): void {
    let alleRasterWochentage = [];
    const alleRaster = [];
    const relevanteTours = [];
    let alleTours;
    const verplanteRaster = [];
    const unverplanteRaster = [];
    this.subscription.add(
      this.tourService.getTours().subscribe((result: any) => {
        alleTours = result;
      })
    );
    if (this.currentLayer === 'sattel') {
      this.rasterService
        .getRastersSattel()
        .subscribe((result: any) => (alleRasterWochentage = result));
      alleTours.forEach((tour: any) => {
        if (tour.raster_sattel) {
          tour.raster_sattel.forEach((raster: any) => {
            verplanteRaster.push(raster.id);
          });
        }
      });
    }

    if (this.currentLayer === 'lkw') {
      this.subscription.add(
        this.rasterService
          .getRastersLkw()
          .subscribe((result: any) => (alleRasterWochentage = result))
      );
      alleTours.forEach((tour: any) => {
        if (tour.raster_lkw) {
          tour.raster_lkw.forEach((raster: any) => {
            verplanteRaster.push(raster.id);
          });
        }
      });
    }

    if (this.currentLayer === 'express') {
      this.subscription.add(
        this.rasterService
          .getRastersExpress()
          .subscribe((result: any) => (alleRasterWochentage = result))
      );
      alleTours.forEach((tour: any) => {
        if (tour.raster_express) {
          tour.raster_express.forEach((raster: any) => {
            verplanteRaster.push(raster.id);
          });
        }
      });
    }

    if (this.currentLayer === 'regel') {
      this.subscription.add(
        this.rasterService
          .getRastersRegel()
          .subscribe((result: any) => (alleRasterWochentage = result))
      );
      alleTours.forEach((tour: any) => {
        if (tour.raster_regel) {
          tour.raster_regel.forEach((raster: any) => {
            verplanteRaster.push(raster.id);
          });
        }
      });
    }

    if (this.currentLayer === 'samstag') {
      this.subscription.add(
        this.rasterService
          .getRastersSamstag()
          .subscribe((result: any) => (alleRasterWochentage = result)));
      alleTours.forEach((tour: any) => {
        if (tour.raster_samstag) {
          tour.raster_samstag.forEach((raster: any) => {
            verplanteRaster.push(raster.id);
          });
        }
      });
    }

    alleRasterWochentage.forEach((object: any) => {
      if (!alleRaster.includes(object.georaster_id)) {
        alleRaster.push({
          id: object.georaster_id,
          geo_x: object.geo_x_bottom_left,
          geo_y: object.geo_y_bottom_left,
        });
      }
    });

    alleRaster.forEach((raster: any) => {
      if (!verplanteRaster.includes(raster.id)) {
        unverplanteRaster.push(raster);
      }
    });

    let nextRaster = unverplanteRaster[this.currentRaster];

    if (nextRaster === undefined) {
      this.currentRaster = 0;
      nextRaster = unverplanteRaster[0];
    }

    this.currentRasterId = nextRaster.id;
    this.map.panTo(new L.LatLng(nextRaster.geo_x, nextRaster.geo_y));

    if (this.currentRaster + 1 >= unverplanteRaster.length) {
      this.currentRaster = 0;
    } else {
      this.currentRaster++;
    }
  }
}
