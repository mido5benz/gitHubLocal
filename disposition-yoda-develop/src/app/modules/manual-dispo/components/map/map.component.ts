import {AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, Injector, Input, OnDestroy, OnInit} from '@angular/core';
import {MapConfig} from '@models/map/map-config.model';
import {DispoStopp, Tour} from '@models/tour/tour.model';
import {ActionsSubject} from '@ngrx/store';
import {Feature, LineString, MultiLineString} from 'geojson';
import * as L from 'leaflet';
import 'leaflet-clicktolerance';
import 'leaflet-easybutton';
import 'leaflet-geometryutil';
import 'leaflet-xserver';
import 'leaflet-lasso';
import 'leaflet-textpath';
import 'leaflet.markercluster';
import 'leaflet/dist/images/marker-icon-2x.png';
import 'leaflet/dist/images/marker-shadow.png';
import 'overlapping-marker-spiderfier-leaflet/dist/oms';
import {combineLatest, of, Subscription} from 'rxjs';
import {MarkerService, TourService} from '../../../../core/services';
import {SearchTourPopupComponent} from '@modules/manual-dispo/components/map/search-tour-popup/search-tour-popup.component';
import {RescheduleFacade} from '@store/manual-dispo/reschedule/facades/reschedule.facade';
import {stopEventPropagation} from '@shared/utils/map.utils';
import {HttpClient} from '@angular/common/http';
import {switchMap, withLatestFrom} from 'rxjs/operators';
import {SelectedStoppFacade} from '@store/manual-dispo/stopps/facades/selected-stopp.facade';
import {ofType} from '@ngrx/effects';
import * as SelectedStoppActions from '@store/manual-dispo/stopps/actions/selected-stopp.actions';
import {TourlistFacade} from '@store/manual-dispo/tour/facades/tourlist.facade';
import {LassoControlOptions} from 'leaflet-lasso';
import {manualDispoConfig} from '@modules/manual-dispo/config/manual-dispo.config';
import {SelectedTourFacade} from '@store/manual-dispo/tour/facades/selected-tour.facade';
import {ActivatedRoute} from '@angular/router';
import {ManualDispoUiFacade} from '@store/ui/facades/manual-dispo/manual-dispo-ui.facade';
import {TourInfoComponent} from '@shared/component';
import {ReloadLineFacade} from '@store/manual-dispo/tour/facades/reload-line.facade';
import {TourNumberPipe} from '@shared/pipes';
import {moveStoppRequest} from '@store/manual-dispo/stopps/actions/move-stopp.actions';
import {LassoSelectionMode} from '@shared/enums/lasso-mode.enum';
import {StoppsFacade} from '@store/manual-dispo/stopps/facades/stopps.facade';
import {createMarkerClusterIcon} from '@shared/utils/marker.utils';
import {stoppClicked} from '@store/manual-dispo/reschedule/actions/reschedule.actions';
import {ToastrService} from 'ngx-toastr';
import {MapService} from '@app/core/services/map/map.service';
import {fetchTourListRequest} from '@store/manual-dispo/tour/actions/fetch-tour-list.actions';

// eslint-disable-next-line @typescript-eslint/naming-convention
const {OverlappingMarkerSpiderfier} = (window as any);

@Component({
  selector: 'app-manual-dispo-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnDestroy, AfterViewInit {

  private subscription: Subscription = new Subscription();

  @Input() mapConfig: MapConfig;
  @Input() sitesMarkers: any;

  public showLoading: boolean;
  public showTourListLoading: boolean;
  public showOverlay = false;
  // public umdispoLoading: boolean;
  public loading: boolean;

  public checkLoadingUmdispo: boolean;

  private polyLineLayerPreReload: L.Polyline;

  private polyLineLayerPostReload: L.Polyline;
  private lassoMode: any;
  private sitesLayer: any;
  private stoppSelected$ = new Subscription();

  private oms: any;
  private map: L.Map;
  private unassignedStoppsLayerCluster: any;
  private assignedStoppsLayerCluster: any;
  private selectedTourStoppsLayer: L.LayerGroup;
  private unassignedStoppsLayer: L.Layer;
  private assignedStoppsLayer: L.Layer;

  private lasso: L.Lasso;
  public selectedStopps = [];

  public filterComponent;

  constructor(
    private alertService: ToastrService,
    private trNrPipe: TourNumberPipe,
    private cdr: ChangeDetectorRef,
    private reloadLineFacade: ReloadLineFacade,
    private actionsSubj: ActionsSubject,
    private activatedRoute: ActivatedRoute,
    private tourService: TourService,
    private httpClient: HttpClient,
    private markerService: MarkerService,
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    private rescheduleFacade: RescheduleFacade,
    private tourListFacade: TourlistFacade,
    private uiFacade: ManualDispoUiFacade,
    private selectedStoppFacade: SelectedStoppFacade,
    private selectedTourFacade: SelectedTourFacade,
    private stoppsFacade: StoppsFacade,
    private mapService: MapService
  ) {
    this.stoppSelected$ = actionsSubj.pipe(
      ofType(SelectedStoppActions.selectStopp),
      withLatestFrom(selectedStoppFacade.selectedStopp$)
    ).subscribe(([type, selectedStopp]) => {
      if (selectedStopp) {
        this.map.panTo(new L.LatLng(selectedStopp?.ziel_name?.geoposition?.geo_x, selectedStopp?.ziel_name?.geoposition?.geo_y));
        const selectedTourMarkersLayer: any = this.selectedTourStoppsLayer;

        selectedTourMarkersLayer.eachLayer((layer: L.Marker) => {
          const marker: any = layer;
          if (marker.options.stopp.dispostopp_id === selectedStopp.dispostopp_id) {
            const element = marker.getElement();
            element.classList.add('highlightedStopp');
            setTimeout(() => element.classList.remove('highlightedStopp'), 6000);
          }
        });
        this.map.invalidateSize();
      }
    });

    this.activatedRoute.queryParams.subscribe((params: any) => {
      if (params.tour) {
        const tour$ = this.tourListFacade.getTourByTourNr(params.tour);
        tour$.subscribe((tour: Tour) => {
            if (tour) {
              this.uiFacade.toggleSidebar();
            }
          }
        );
      }
    });
  }

  ngOnInit(): void {
    this.handleLoadingStates();
    this.initMap();
    this.initButtons();
    this.drawSites();
    this.initLasso();
    this.initTourInfoControl();

    this.subscription.add(this.selectedTourFacade.stopps$.pipe(
      withLatestFrom(this.selectedTourFacade.reloadLineIndex$, this.selectedTourFacade.tourNr$),
    ).subscribe(([stopps, reloadLine, tourNr]) => {
      if(tourNr !== '9999') {
        this.drawSelectedTour(stopps, reloadLine, tourNr);
      }
    }));

    combineLatest([
      this.uiFacade.tableCollapsed$,
      this.uiFacade.tourDetailsCollapsed$]
    ).subscribe(_ => this.revalidateMapSize());

    this.checkIfMaschinelleDispoActive();

    this.showLoadingForUmdispo();

  }

  checkIfMaschinelleDispoActive(): void {
    this.mapService.checkIfMaschDispoStartedObserv.subscribe((loadingStatus) => {
      if (loadingStatus) {
          let loadingInterval = setInterval(() => {
            this.subscription.add(this.mapService.isMaschinelleDispoLoading().subscribe((status) => {
              if (!status) {
                this.tourListFacade.dispatch(fetchTourListRequest());
                this.alertService.success('Tagesdispo wurde erfolgreich aktiviert')
                clearInterval(loadingInterval);
              }
            }));
          }, 1000);
      }
    });
  }

  showLoadingForUmdispo() {
    this.subscription.add(this.mapService.checkLoadingUmdispoObserv.subscribe((loading) => {
      if (loading) {
        this.checkLoadingUmdispo = true;
      } else {
        this.checkLoadingUmdispo = false;
      }
      this.cdr.detectChanges();
    }));
  }

  public sortStopps(stopps: DispoStopp[]): DispoStopp[] {
    return stopps.slice().sort((stop1: DispoStopp, stop2: DispoStopp) => stop1.soll_stopp < stop2.soll_stopp ? -1 : 1);
  }

  ngAfterViewInit(): void {
    this.subscription.add(this.stoppsFacade.unassignedStopps$.subscribe((unassignedStopps: DispoStopp[]) => {
      this.drawUnassignedStopps(unassignedStopps);
    }));

    combineLatest([
      this.stoppsFacade.assignedStopps$,
      this.selectedTourFacade.tourId$
    ]).pipe(
      switchMap(([stopps, selectedTourId]) => {
        const stoppsToDraw = {...stopps};
        delete stoppsToDraw[selectedTourId];
        return of(stoppsToDraw);
      })).subscribe((assignedStopps) => this.drawAssignedStopps(assignedStopps));
  }

  private initMap(): void {
    this.map = L.map('map');

    this.oms = new OverlappingMarkerSpiderfier(this.map);
    this.oms.addListener('click', (marker: any) => {
      const stopp = marker.options.stopp as DispoStopp;
      this.rescheduleFacade.dispatch(stoppClicked({stopps: [stopp]}));
    });

    this.map.setView(
      [this.mapConfig.standort.lat, this.mapConfig.standort.lon],
      this.mapConfig.zoom
    );

    // prettier-ignore
    // PTV background layer
    // @ts-ignore
    L.tileLayer.xserver(this.mapConfig.xServerConfig.xServerUrl, {
      profile: this.mapConfig.xServerConfig.profile,
      maxZoom: this.mapConfig.xServerConfig.maxZoom,
      minZoom: this.mapConfig.xServerConfig.minZoom,
      pane: this.mapConfig.xServerConfig.pane,
    }).addTo(this.map);
  }

  private drawSelectedTour(stopps: DispoStopp[], reloadLineIndex: number, tourNr: string): void {
    this.clearMap();
    if (reloadLineIndex) {
      this.drawTourWithReloadLine(stopps, reloadLineIndex, tourNr);
    } else {
      this.drawTourWithoutReloadLine(stopps, tourNr);
    }
    this.drawSelectedTourMarkers(stopps);
  }

  private clearMap(): void {
    if (this.selectedTourStoppsLayer) {
      this.map.removeLayer(this.selectedTourStoppsLayer);
    }

    if (this.polyLineLayerPreReload) {
      this.map.removeLayer(this.polyLineLayerPreReload);
    }

    if (this.polyLineLayerPostReload) {
      this.map.removeLayer(this.polyLineLayerPostReload);
    }
  }

  private drawSelectedTourMarkers(stopps: DispoStopp[]): any {
    this.selectedTourStoppsLayer = new L.LayerGroup();
    const markers = [];

    if (stopps !== undefined) {
      stopps.forEach((stopp: any) => {
        const geoPos = stopp?.ziel_name?.geoposition;
        if (geoPos) {
          const marker = this.markerService.createSelectedTourMarker(stopp, L.latLng(geoPos.geo_x, geoPos.geo_y));
          marker.on('contextmenu', (e: any) => this.openSearchTourPopUp(e, stopp));
          this.oms.addMarker(marker);
          markers.push(marker);
        }
      });
    }

    this.selectedTourStoppsLayer = L.layerGroup(markers);
    this.selectedTourStoppsLayer.addTo(this.map);
  }

  private drawTourWithReloadLine(stopps: DispoStopp[], reloadLineIndex: number, tourNr: string): void {
    const toursPreReload = stopps.slice(0, reloadLineIndex - 1);
    const toursPostReload = stopps.slice(reloadLineIndex - 2, stopps.length + 1);

    const preReloadWaypoints = this.createWaypointsForStopps(toursPreReload, {
      location: {
        coordinate: {
          x: this.mapConfig?.standort?.lon,
          y: this.mapConfig?.standort?.lat,
        }
      }
    });
    const postReloadWaypoints = this.createWaypointsForStopps(toursPostReload);

    this.tourService.calculateOptimalRoute(preReloadWaypoints).subscribe((coords: any) => {
      if (coords) {
        this.polyLineLayerPreReload = this.createTourPolyLine(coords);
        this.polyLineLayerPreReload.bindTooltip(`Tour ${this.trNrPipe.transform(tourNr)}`, {sticky: true});
        this.polyLineLayerPreReload.addTo(this.map);
      }
    });

    this.tourService.calculateOptimalRoute(postReloadWaypoints).subscribe((coords: any) => {
      if (coords) {
        const lineColor = manualDispoConfig.map.styles.selectedTour.colors.reloadLineColor;
        const dashArray = manualDispoConfig.map.styles.selectedTour.reloadLineDashArray;
        this.polyLineLayerPostReload = this.createTourPolyLine(coords, lineColor, dashArray);
        this.polyLineLayerPostReload.bindTooltip(`Tour ${this.trNrPipe.transform(tourNr)}`, {sticky: true});
        this.polyLineLayerPostReload.addTo(this.map);
        this.polyLineLayerPostReload.bringToFront();
      }
    });
  }

  private drawTourWithoutReloadLine(stopps: DispoStopp[], tourNr: string): void {
    const waypoints = this.createWaypoints(stopps);

    this.tourService.calculateOptimalRoute(waypoints).subscribe((coords) => {
      if (coords) {
        if (coords.polyline) {
          this.polyLineLayerPreReload = this.createTourPolyLine(coords);
          this.polyLineLayerPreReload.bindTooltip(`Tour ${this.trNrPipe.transform(tourNr)}`, {sticky: true});
          this.polyLineLayerPreReload.addTo(this.map);
        }
      }
    });
  }

  // eslint-disable-next-line max-len
  private createTourPolyLine(coords, color = manualDispoConfig.map.styles.selectedTour.colors.lineColor, dashArray = '0 0'): L.Polyline<LineString | MultiLineString, any> {
    const poly = coords.polyline;

    const polyline = [];
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < poly.length; ++i) {
      polyline.push(L.latLng(poly[i].y, poly[i].x));
    }

    return L.polyline(polyline, {
      color,
      dashArray,
      weight: manualDispoConfig.map.styles.selectedTour.weight,
    });
  }

  private createWaypoints(stopps: DispoStopp[]): any {
    const waypoints = [];

    if (this.mapConfig) {
      waypoints.push(
        {
          location: {
            coordinate: {
              x: this.mapConfig?.standort?.lon,
              y: this.mapConfig?.standort?.lat,
            }
          }
        }
      );
    }

    if (stopps !== undefined) {
      stopps.forEach((stopp: DispoStopp) => {
        if (stopp.ziel_name) {
          const waypoint = {
            location: {
              coordinate: {
                x: stopp.ziel_name.geoposition.geo_y,
                y: stopp.ziel_name.geoposition.geo_x,
              }
            }
          };
          waypoints.push(waypoint);
        }
      });
    }
    return waypoints;
  }

  private createWaypointsForStopps(dispoStopps: DispoStopp[], additionalWaypoint?: any): any {
    const waypoints = [];

    if (additionalWaypoint) {
      waypoints.push(additionalWaypoint);
    }

    dispoStopps.forEach((stopp: DispoStopp) => {
      if (stopp?.ziel_name) {
        const waypoint = {
          // $type: 'OnRoadWaypoint',
          location: {
            coordinate: {
              x: stopp?.ziel_name?.geoposition?.geo_y,
              y: stopp?.ziel_name?.geoposition?.geo_x,
            }
          }
        };
        waypoints.push(waypoint);
      }
    });

    return waypoints;
  }

  private drawAssignedStopps(stopps: { [tourid: string]: DispoStopp[] }): void {
    if (this.assignedStoppsLayer) {
      this.map.removeLayer(this.assignedStoppsLayer);
    }

    const markers = this.createAssignedStoppsMarkers(stopps);
    this.assignedStoppsLayer = L.layerGroup(markers);

    if (this.assignedStoppsLayerCluster) {
      this.map.removeLayer(this.assignedStoppsLayerCluster);
    }

    this.assignedStoppsLayerCluster = L.markerClusterGroup({
      spiderfyOnMaxZoom: false,
      disableClusteringAtZoom: 13,
      showCoverageOnHover: true,
      zoomToBoundsOnClick: true,
      removeOutsideVisibleBounds: true,
      animate: true,
      iconCreateFunction: (cluster) => L.divIcon({
        html:
          '<div class="assignedClusterIcon">' + cluster.getChildCount() + '</div>',
      }),
    });

    this.assignedStoppsLayerCluster.addLayer(this.assignedStoppsLayer);
    this.assignedStoppsLayerCluster.addTo(this.map);
  }

  private createAssignedStoppsMarkers(stoppsToDraw: { [p: string]: DispoStopp[] }): any[] {
    const markers = [];

    for (const [tourId, dispoStopps] of Object.entries(stoppsToDraw)) {
      dispoStopps.forEach((stopp: DispoStopp) => {
        const geoPos = stopp?.ziel_name?.geoposition;
        if (geoPos) {
          const marker = this.markerService.createAssignedMarkers(stopp, L.latLng(geoPos.geo_x, geoPos.geo_y));
          this.oms.addMarker(marker);
          marker.on('contextmenu', (e: any) => this.openSearchTourPopUp(e, stopp));
          markers.push(marker);
        }
      });
    }
    return markers;
  }

  private drawUnassignedStopps(stopps: DispoStopp[]): void {

    if (this.unassignedStoppsLayer) {
      this.map.removeLayer(this.unassignedStoppsLayer);
    }

    this.unassignedStoppsLayer = new L.LayerGroup();
    const markers = [];

    stopps.forEach((stopp) => {
      const geoPos = stopp?.ziel_name?.geoposition;
      if (geoPos) {
        const marker = this.markerService.createUnassignedMarkers(stopp, L.latLng(geoPos.geo_x, geoPos.geo_y));
        marker.on('contextmenu', (e: any) => this.openSearchTourPopUp(e, stopp));
        this.oms.addMarker(marker);
        markers.push(marker);
      }
    });

    this.unassignedStoppsLayer = L.layerGroup(markers);

    if (this.unassignedStoppsLayerCluster) {
      this.map.removeLayer(this.unassignedStoppsLayerCluster);
    }

    this.unassignedStoppsLayerCluster = L.markerClusterGroup({
      spiderfyOnMaxZoom: false,
      disableClusteringAtZoom: 13,
      showCoverageOnHover: true,
      zoomToBoundsOnClick: false,
      removeOutsideVisibleBounds: true,
      animate: true,
      iconCreateFunction: (cluster: L.MarkerCluster) => createMarkerClusterIcon(cluster),
    });

    this.unassignedStoppsLayerCluster.on('clusterclick', (e) => {
      const childMarkers = e.layer.getAllChildMarkers();

      const stoppsInCluster: DispoStopp[] = childMarkers.map((marker) => marker.options.stopp);
      this.rescheduleFacade.dispatch(stoppClicked({stopps: stoppsInCluster}));
    });

    this.unassignedStoppsLayerCluster.addLayer(this.unassignedStoppsLayer);
    this.unassignedStoppsLayerCluster.addTo(this.map);
  }

  private openSearchTourPopUp(event, stopp: any): void {
    const searchTourPopUpComponent = this.resolver
      .resolveComponentFactory(SearchTourPopupComponent)
      .create(this.injector);
    searchTourPopUpComponent.instance.stopps = [stopp];
    searchTourPopUpComponent.instance.moveStopp.subscribe((tourId: number) => {
        let stoppArray = [];
        stoppArray.push(stopp);
        this.rescheduleFacade.dispatch(moveStoppRequest({tourId, stopp: stoppArray}));

        this.closePopups();
      }
    );
    searchTourPopUpComponent.changeDetectorRef.detectChanges();

    // stop events
    stopEventPropagation(searchTourPopUpComponent.location.nativeElement);

    L.popup({
      closeOnClick: false,
    })
      .setLatLng(event.latlng)
      .setContent(searchTourPopUpComponent.location.nativeElement)
      .openOn(this.map);
  }

  private drawSites(): void {
    if (this.sitesLayer) {
      this.map.removeLayer(this.sitesLayer);
    }

    this.sitesLayer = L.geoJSON(this.sitesMarkers, {
      pointToLayer: (feature: Feature, latlng: L.LatLng) => {

        const markerIcon = L.icon({
          iconUrl: 'assets/img/marker-icon.png',
          iconSize: [25, 41]
        });

        const siteMarker = new L.Marker(latlng, {icon: markerIcon});
        siteMarker.bindTooltip(`Standort ${feature.properties.site.name}`);
        siteMarker.on('click', () => this.map.flyTo(latlng, 14));
        return siteMarker;
      }
    });

    this.sitesLayer.addTo(this.map);
  }

  private revalidateMapSize(): void {
    setTimeout(() => {
      this.map.invalidateSize(true);
    }, 500);
  }

  private panToSelectedTour(): void {
    if (this.selectedTourStoppsLayer.getLayers().length <= 0) {
      return;
    }

    const firstLayer: any = this.selectedTourStoppsLayer.getLayers()[0];
    if (firstLayer) {
      this.map.flyTo(firstLayer.getLatLng());
    }
  }

  private closePopups(): void {
    if (this.map) {
      this.map.closePopup();
    }
  }

  private initButtons(): void {
    L.easyButton(
      '<i class="fa fa-home" aria-hidden="true"></i>', () => {
        const standortPosition = L.latLng(this.mapConfig.standort.lat, this.mapConfig.standort.lon);
        this.map.panTo(standortPosition, {animate: true});
      },
      'Zum Standort springen'
    ).addTo(this.map);

    L.easyButton(
      '<i class="fa fa-crosshairs" aria-hidden="true"></i>\n', () => {
        this.panToSelectedTour();
      },
      'Zur aktuellen Tour springen'
    ).addTo(this.map);

    L.easyButton(
      '<img src="assets/img/lasso_plus.png" title="Lasso +" width="100%">',
      (btn, map) => {
        this.lassoMode = LassoSelectionMode.SELECT;
        this.lasso.enable();
      }
    ).addTo(this.map);
  }

  private initLasso(): void {
    const lassoOptions: LassoControlOptions = {
      intersect: true,
    };

    // @ts-ignore
    this.lasso = L.lasso(this.map, lassoOptions);

    // @ts-ignore
    this.map.on('lasso.finished', (event: any) => {

      let markers = this.getMarkersFromCluster(event.layers);

      this.getStoppsFromMarker(markers);

      let filteredStopps = this.selectedStopps.filter((stopps) => {
        return stopps !== undefined && stopps.tournr === '9999';
      });

      this.rescheduleFacade.dispatch(stoppClicked({stopps: filteredStopps}));
      this.selectedStopps = [];
    });
  }

  getMarkersFromCluster(event: any) {
    let lassoMarkers = [];

    for (let i = 0; i < event.length; i++) {
      let cluster = event[i];

      // Für einzelne Stopps
      if (cluster.options?.stopp && cluster.options?.stopp?.tournr === '9999') {
        lassoMarkers.push(cluster);
      }

      // Für Cluster mit zusätzlich einzelne Stopps
      if (cluster?._childClusters?.length > 0 && cluster?._markers?.length > 0) {
        lassoMarkers.push(cluster._markers);
      }

      if (cluster._childClusters?.length > 0) {
        cluster = cluster._childClusters;
        lassoMarkers.push(this.getMarkersFromCluster(cluster));

      } else {
        let clusterWith9999 = cluster._markers?.filter(markers => markers.options.stopp.tournr === '9999');
        if (clusterWith9999?.length > 0) {
          lassoMarkers.push(clusterWith9999);
        }
      }
    }
    return lassoMarkers;
  }

  getStoppsFromMarker(clusters) {
    let temp = [];

    for (let i = 0; i < clusters.length; i++) {
      let alleStopps = clusters[i];

      if (alleStopps.length > 0) {
        temp.push(this.getStoppsFromMarker(alleStopps));
      } else {
        // Stopps werden hier gepusht und mit dieser Array weiter gearbeitet (nicht mit der Rückgabe von der Methode)
        this.selectedStopps.push(alleStopps?.options?.stopp);
      }
    }
    return temp;
  }

  private initTourInfoControl(): void {
    this.filterComponent = this.resolver
      .resolveComponentFactory(TourInfoComponent)
      .create(this.injector);

    combineLatest([
      this.selectedTourFacade.tourNr$,
      this.selectedTourFacade.tourSums$,
      this.selectedTourFacade.duration$
    ]).subscribe(
      ([tourNr, tourSums, tourDuration]) => {
        if (tourNr !== undefined) {
          this.filterComponent.instance.tourNr = tourNr;
          this.filterComponent.instance.tourDuration = tourDuration;
          this.filterComponent.instance.colliCount = tourSums.colSum;
          this.filterComponent.instance.paletteCount = tourSums.palSum;
          this.filterComponent.instance.tourWeight = tourSums.gewichtSum;
        } else {
          this.filterComponent.instance.tourNr = '';
        }
        if (!this.filterComponent.changeDetectorRef['destroyed']) {
          this.filterComponent.changeDetectorRef.detectChanges();
        }
      }
    );

    // @ts-ignore
    const control = L.control({position: 'bottomright'});
    control.onAdd = (map: L.Map) => this.filterComponent.location.nativeElement;
    control.addTo(this.map);

    // stop events
    stopEventPropagation(this.filterComponent.location.nativeElement);
  }

  private handleLoadingStates(): void {
    this.subscription.add(this.tourListFacade.loading$.subscribe((loading) => {
      this.showTourListLoading = loading;
      if (!this.cdr['destroyed']) {
        this.cdr.detectChanges();
      }
    }));
    // this.rescheduleFacade.loading$.subscribe((loading) => {
    //   this.umdispoLoading = loading;
    //   if (!this.cdr['destroyed']) {
    //     this.cdr.detectChanges();
    //   }
    // });
  }

  ngOnDestroy(): void {
    this.stoppSelected$.unsubscribe();
    this.subscription.unsubscribe();
    this.filterComponent.destroy();
    this.cdr.detach();
  }
}
