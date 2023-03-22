import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {locations} from '@app/shared/data/liste-standorte.data';
import {fetchLocationsStart} from '@store/manual-dispo/locations/actions/fetch-locations.actions';
import {applyMapFilter} from '@store/manual-dispo/map/actions/map-filter.actions';
import {DispoStopp, Location, MapConfig} from '@models/index';
import {FeatureCollection} from 'geojson';
import {BsModalService} from 'ngx-bootstrap/modal';
import {combineLatest, Observable, of} from 'rxjs';
import {MapService} from '@app/core/services/map/map.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {RescheduleFacade} from '@store/manual-dispo/reschedule/facades/reschedule.facade';
import {TourlistFacade} from '@store/manual-dispo/tour/facades/tourlist.facade';
import {ReloadLineFacade} from '@store/manual-dispo/tour/facades/reload-line.facade';
import {SelectedTourFacade} from '@store/manual-dispo/tour/facades/selected-tour.facade';
import {TageabschlussModalComponent} from '@modules/manual-dispo/components';
import {DailyClosingFacade} from '@store/manual-dispo/daily-closing/facades/daily-closing.facade';
import {AddressFacade} from '@store/stammdaten/facades/address.facade';
import {StoppsFacade} from '@store/manual-dispo/stopps/facades/stopps.facade';
import {switchMap} from 'rxjs/operators';
import {
  fetchUnassignedAddressesCountRequest,
} from '@store/stammdaten/actions/fetch-unassigned-addresses.actions';
import {LocationsFacade} from '@store/manual-dispo/locations/facades/locations.facade';
import {MapFilterFacade} from '@store/manual-dispo/map/facades/map-filter.facade';
import {ManualDispoUiFacade} from '@store/ui/facades/manual-dispo/manual-dispo-ui.facade';
import {SelectedStoppFacade} from '@store/manual-dispo/stopps/facades/selected-stopp.facade';
import {xServerHost} from '@app/app.component';

@Component({
  selector: 'app-manual-dispo-map-view',
  templateUrl: './manual-dispo-map.component.html',
  styleUrls: ['./manual-dispo-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManualDispoMapComponent implements OnInit {
  public unassignedStopps$: Observable<DispoStopp[]>;
  public assignedStopps$: Observable<{ [tourid: string]: DispoStopp[] }>;
  public showLoading: boolean;
  public tagesAbschlussDone$: Observable<boolean>;
  public tourFilters$: Observable<any>;
  public serviceFilters$: Observable<any>;
  public vehicleType$: Observable<string>;
  public semitrailer$: Observable<boolean>;
  public truck$: Observable<boolean>;
  public unassignedStopCount$: Observable<number>;
  public unassignedAddressesCount$: Observable<number>;
  public mapFilterCollapsed$: Observable<boolean>;
  public siteMarkers: FeatureCollection<any, { [name: string]: any }>;
  public sidebarCollapsed$: Observable<boolean>;

  // Selected Tour
  public stoppListLoading$: Observable<boolean>;
  public reloadLineIndex$: Observable<number>;
  public reloadLineEditable$: Observable<boolean>;
  public tourNr$: Observable<string>;
  public tourId$: Observable<number>;
  public tourFrozen$: Observable<boolean>;
  public selectedTourStopps$: Observable<DispoStopp[]>;
  public selectedTourStoppsWithReload$: Observable<DispoStopp[]>;
  public selectedTourLoading$: Observable<boolean>;

  public selectedStopp$: Observable<DispoStopp>;
  public tableCollapsed = false;

  public showOverlay = false;

  public mapConfig: MapConfig = {
    xServerConfig: {
      xServerUrl: `${xServerHost}/services/rest/XMap/tile/{z}/{x}/{y}?storedProfile={profile}`,
      profile: 'silkysand',
      maxZoom: 18,
      minZoom: 5,
      pane: 'tilePane',
    },
    zoom: 13
  };

  constructor(
    private selectedStoppFacade: SelectedStoppFacade,
    private uiFacade: ManualDispoUiFacade,
    private locationsFacade: LocationsFacade,
    private mapFilterFacade: MapFilterFacade,
    private stoppsFacade: StoppsFacade,
    private spinner: NgxSpinnerService,
    private mapService: MapService,
    private umdispoFacade: RescheduleFacade,
    private tourListFacade: TourlistFacade,
    private reloadLineFacade: ReloadLineFacade,
    private selectedTourFacade: SelectedTourFacade,
    private modalService: BsModalService,
    private tagesabschlussFacade: DailyClosingFacade,
    private addressFacade: AddressFacade,
    private cdr: ChangeDetectorRef
  ) {

    this.mapConfig.standort = locations.find(
      (s: Location) => s.relnr.toString() === localStorage.getItem('userDepot')
    );

    this.addressFacade.dispatch(fetchUnassignedAddressesCountRequest());
    this.locationsFacade.dispatch(fetchLocationsStart());
    this.tagesabschlussFacade.checkDailyClosing();

    this.unassignedStopps$ = this.stoppsFacade.unassignedStopps$;

    this.assignedStopps$ = combineLatest([
      this.stoppsFacade.assignedStopps$,
      this.selectedTourFacade.tourId$
    ]).pipe(
      switchMap(([stopps, selectedTourId]) => {
        const stoppsToDraw = {...stopps};
        delete stoppsToDraw[selectedTourId];
        return of(stoppsToDraw);
      }));
  }

  ngOnInit(): void {

    this.showOberlayManualDispo();
    this.pruefeObTagesdispoAktivierungLaeuft();

    // Wenn keine Stopps mehr in der Tour vorhanden sind
    this.selectedTourFacade.stopps$.subscribe((dispostopp) => {
      if (dispostopp === undefined) {
        this.closeSidebar();
      }
    });

    this.tourFilters$ = this.mapFilterFacade.tourFilter$;
    this.serviceFilters$ = this.mapFilterFacade.serviceFilter$;
    this.vehicleType$ = this.mapFilterFacade.vehicleTypeFilter$;
    this.semitrailer$ = this.mapFilterFacade.semiTrailerFilter$;
    this.truck$ = this.mapFilterFacade.truckFilter$;

    this.unassignedStopCount$ = this.stoppsFacade.unassignedStoppsCount$;
    this.unassignedAddressesCount$ = this.addressFacade.unassignedAddressesCount$;
    this.mapFilterCollapsed$ = this.uiFacade.mapFilterCollapsed$;

    // Selected tour
    this.tourNr$ = this.selectedTourFacade.tourNr$;
    this.tourId$ = this.selectedTourFacade.tourId$;
    this.stoppListLoading$ = this.selectedTourFacade.loading$;
    this.tourFrozen$ = this.selectedTourFacade.frozen$;
    this.selectedTourStopps$ = this.selectedTourFacade.stopps$;
    this.selectedTourStoppsWithReload$ = this.selectedTourFacade.stoppsWithReload$;
    this.selectedTourLoading$ = this.selectedTourFacade.loading$;
    this.reloadLineIndex$ = this.selectedTourFacade.reloadLineIndex$;
    this.reloadLineEditable$ = this.selectedTourFacade.reloadEditable$;

    this.selectedStopp$ = this.selectedStoppFacade.selectedStopp$;
    this.tagesAbschlussDone$ = this.tagesabschlussFacade.done$;

    this.uiFacade.tableCollapsed$.subscribe((tableCollapsed: boolean) => {
      this.tableCollapsed = tableCollapsed;
    });

    this.createSites();
    this.sidebarCollapsed$ = this.uiFacade.tourDetailsCollapsed$;

  }

  // TODO: Manuelle Dispo sperren, bis maschinelle Dispo abgeschlossen ist
  public showOberlayManualDispo(): void {
    this.mapService.checkIfMaschDispoStartedObserv.subscribe((isMaschinelleDispoTriggered) => {
      if (isMaschinelleDispoTriggered) {

        // Direkt die Anzeige sperren --> wegen Tagesdispo
        this.showOverlay = true;
        this.cdr.detectChanges();

          let loadingInterval = setInterval(() => {
            this.mapService.isMaschinelleDispoLoading().subscribe((checkIsLoading) => {
              if (!checkIsLoading) {
                this.showOverlay = false;
                this.mapService.isMaschinelleDispoStarted(false);
                clearInterval(loadingInterval);
                this.cdr.detectChanges();
              } else {
                this.showOverlay = true;
                this.cdr.detectChanges();
              }
            });
          }, 1000);
      }
    });
  }

  // TODO: Wenn ein weiterer User während Aktivierung der Tagesdispo in die Manuelle Dispo navigiert, soll die Anzeige gesprerrt werden
  //       bis die Aktivierung abgeschlossen ist. Sonst Inkonsistente Datenzustand
  pruefeObTagesdispoAktivierungLaeuft() {
    let loadingInterval = setInterval(() => {
      this.mapService.isMaschinelleDispoLoading().subscribe((checkIsLoading) => {
        if(checkIsLoading) {
          this.showOverlay = true;
          this.cdr.detectChanges();
        } else {
          this.showOverlay = false;
          clearInterval(loadingInterval);
          this.cdr.detectChanges();
        }
      })
    }, 1000)
  }


  public toggleFilterComponent(): void {
    this.uiFacade.toggleMapFilter();
  }

  public toggleSidebar(): void {
    this.uiFacade.toggleSidebar();
  }

  public closeSidebar(): void {
    this.uiFacade.closeSidebar();
  }

  public openMapFilter(): void {
    this.toggleFilterComponent();
  }

  public applyMapFilter(event): void {
    this.mapFilterFacade.dispatch(
      applyMapFilter({
        tourFilter: {
          tours: event.toursFilter,
          services: event.servicesFilter,
          vehicleType: event.vehicleType,
          semiTrailer: event.semitrailer,
          truck: event.truck,
          combine: event.combine
        },
      })
    );
    this.toggleFilterComponent();
  }

  public showDailyClosingDialog(): void {
    this.modalService.show(TageabschlussModalComponent);
  }

  private createSites(): void {
    this.locationsFacade.locations$.subscribe((sites: Location[]) => {
      this.siteMarkers = this.mapService.createSites(sites);
    });
  }

}
