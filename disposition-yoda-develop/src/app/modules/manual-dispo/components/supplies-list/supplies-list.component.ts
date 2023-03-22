import {ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Consignment, DispoStopp, Tour} from '@models/index';
import {locatedText} from '@shared/aggrid-localization';
import {ConsignmentFacade} from '@store/manual-dispo/consignments/facades/consignment.facade';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {TourService} from '@app/core/services';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-supplies-list',
  templateUrl: './supplies-list.component.html',
  styleUrls: ['./supplies-list.component.scss']
})
export class SuppliesListComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  @Input() sendungen: Consignment[] = [];

  @Output() moveDeliveryClicked = new EventEmitter<any>();
  @Output() deliveryDoubleClicked = new EventEmitter<any>();
  @Output() rowSelectionChanged = new EventEmitter<any>();

  @Input() tourDetails: Tour;
  @Input() dispoStopp: DispoStopp;

  public gridApi;
  public gridColumnApi;
  public gridOptions;

  public columnDefs;
  public defaultColDef;
  public rowData: any;
  public localText;
  public sendungsId: number;

  constructor(private cdr: ChangeDetectorRef, private consignmentFacade: ConsignmentFacade, private router: Router, private route: ActivatedRoute, private tourService: TourService) {
    this.gridOptions = {
      columnDefs: this.columnDefs,
      accentedSort: true
    }

    this.defaultColDef = {
      flex: 1,
      sortable: true,
      resizable: true,
      filter: true,
      floatingFilter: true,
    };

    this.localText = locatedText;

    this.columnDefs = [
      {
        field: 'auftragart',
        headerName: 'A',
        headerTooltip: 'Auftragart',
        maxWidth: 70
      },
      {
        field: 'versender_name',
        headerName: 'Versender',
      },
      {
        field: 'versender_bcvsnr',
        headerName: 'BCV',
        headerTooltip: 'Barcodeversender',
      },
      {
        field: 'name1',
        headerName: 'Name 1',
      },
      {
        field: 'name2',
        headerName: 'Name 2',
      },
      {
        field: 'name3',
        headerName: 'Name 3',
      },
      {
        field: 'ist_dispo_colli',
        headerName: 'I-COL',
      },
      {
        field: 'soll_dispo_colli',
        headerName: 'S-COL',
      },
      {
        field: 'ist_dispo_paletten',
        headerName: 'I-PAL',
      },
      {
        field: 'soll_dispo_paletten',
        headerName: 'S-PAL',
      },
      {
        field: 'ist_gewicht',
        headerName: 'I-KG',
      },
      {
        field: 'soll_gewicht',
        headerName: 'S-KG',
      },
      {
        field: 'amb_colli',
        headerName: 'AMB-C',
      },
      {
        field: 'amb_paletten',
        headerName: 'AMB-P',
      },
      {
        field: 'gefahrgut',
        headerName: 'GG-Kl.',
        headerTooltip: 'Gefahrgutklasse',
      },
      {
        field: 'gg_punkte',
        headerName: 'GG-P.',
        headerTooltip: 'Gefahrgutpunkte',
        valueFormatter: params => params.data?.gg_punkte.toFixed(2)
      },
      {
        field: 'dienste',
        headerName: 'Dienste',
      },
      {
        field: 'sendungsNr',
        headerName: 'SDGNR',
        headerTooltip: 'Sendungsnr',
      },
    ];
  }

  ngOnInit(): void {

  }

  onGridReady(params): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.subscription.add(this.consignmentFacade.loading$.subscribe((isLoading: boolean) => {
      if (isLoading) {
        this.gridApi.showLoadingOverlay();
      } else {
        this.gridApi.hideOverlay();
      }
    }));
  }

  onRowDoubleClicked($event): void {
    let navigationExtras: NavigationExtras = {
      relativeTo: this.route,
      queryParams: {
        tour_id: this.tourDetails.tour.tour_id,
        dispostopp_id: this.dispoStopp.dispostopp_id,
        tournr: this.tourDetails.tour.tournr,
        soll_stopp: this.dispoStopp.soll_stopp,
        empfaenger: this.getVersenderName(this.dispoStopp),
        sendungsId: $event.data.sendung_id
      }
    };
    this.router.navigate(['sendungsdetail'], navigationExtras);
  }

  onRowClicked($event): void {
    this.rowSelectionChanged.emit(this.gridApi.getSelectedRows());
  }

  public reset(): void {
    this.gridApi.deselectAll();
    // this.cdr.detectChanges();
  }

  public getVersenderName(dispoStopp: any): string {
    const name1 = dispoStopp.ziel_name?.name1 === null ? '' : dispoStopp.ziel_name?.name1;
    const name2 = dispoStopp.ziel_name?.name2 === null ? '' : dispoStopp.ziel_name?.name2;
    const name3 = dispoStopp.ziel_name?.name3 === null ? '' : dispoStopp.ziel_name?.name3;

    return `${name1}  ${name2}  ${name3}`;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.cdr.detach();
  }
}
