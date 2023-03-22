import { Component, Input, OnInit } from '@angular/core';
import {
  Anfrage,
  DetailAnsicht,
  StoppplanungTableData,
} from '@models/on-tour/aenderungswunsch.model';
import { ColDef, ColumnApi, GridApi, GridReadyEvent } from 'ag-grid-community';
import { OnTourService } from '@modules/on-tour/on-tour.service';
import { DispoStopp, DispoSum, Tour } from '@app/shared/models';
import { forkJoin } from 'rxjs';
import {AG_GRID_LOCALE_DE} from '@manual-dispo-components/stopp-list/locale.de';


@Component({
  selector: 'app-tour-info-container-detail-table',
  templateUrl: './tour-info-container-detail-table.component.html',
  styleUrls: ['./tour-info-container-detail-table.component.scss'],
})
export class TourInfoContainerDetailTableComponent implements OnInit {
  @Input() set selectedTour(tourInfo: Anfrage) {
    this.refreshTableData(tourInfo);
    this.tour = tourInfo;
  }
  public tour: Anfrage;
  public rowData: Anfrage;
  public istColumnDefs: ColDef[];
  public sollColumnDefs: ColDef[];
  public istGridApi: GridApi;
  public istGridColumnApi: ColumnApi;
  public sollGridApi: GridApi;
  public sollGridColumnApi: ColumnApi;
  public tourDetails: DetailAnsicht;
  public planTourdauerSoll: number;
  public planTourdauerIst: number;
  public showPlanTourdauer: boolean;
  public locale = AG_GRID_LOCALE_DE;
  public neueAnfrage: StoppplanungTableData[] = [];
  public letzterSnapshot: StoppplanungTableData[] = [];

  constructor(private onTourService: OnTourService) {}

  ngOnInit(): void {
    forkJoin([
      this.onTourService.fetchIstDetails(this.tour.tour_id),
      this.onTourService.fetchSollDetails(this.tour.tour_id)
    ]).subscribe(([letzterSnaphot, neueAnfrage]) => {
        // const tours = allTours.find((alleTouren: Tour) => alleTouren.tour.tour_id === this.tour.tour_id);
          letzterSnaphot.dispostopps.forEach((dispostopp) => {
            const sum = letzterSnaphot.dispostoppssum.find((dispoSum: DispoSum) => dispoSum.dispostopp_id === dispostopp.dispostopp_id);
            if (this.istGridApi) {
              const tableData = this.createTableDataObject(dispostopp, sum);
              this.letzterSnapshot.push(tableData);
              this.planTourdauerIst = letzterSnaphot.planTourdauer;
              this.istGridApi.setRowData(this.letzterSnapshot);
              this.showPlanTourdauer = true;
            }
          });
              neueAnfrage.dispostopps.forEach((dispostopp) => {
              const sum = neueAnfrage.dispostoppssum.find((dispoSum: DispoSum) => dispoSum.dispostopp_id === dispostopp.dispostopp_id);
              if(this.sollGridApi) {
                const tableData = this.createTableDataObject(dispostopp, sum);
                this.neueAnfrage.push(tableData);
                this.planTourdauerSoll = neueAnfrage.planTourdauer;
                this.sollGridApi.setRowData(this.neueAnfrage);
              }
            });
    });

    this.fetchTourDetails(this.tour.tour_id);

    this.istColumnDefs = [
      {
        field: 'soll_nr',
        headerName: 'Ist-Nr',
        width: 80,
        resizable: true
      },
      {
        field: 'empfaenger',
        headerName: 'Empfänger',
        width: 150,
        resizable: true
      },
      {
        field: 'strasse',
        headerName: 'Strasse',
        width: 172,
        resizable: true
      },
      {
        field: 'hausnr',
        headerName: 'Nr',
        width: 75,
        resizable: true
      },
      {
        field: 'plz',
        headerName: 'PLZ',
        width: 75,
        resizable: true
      },
      {
        field: 'ort',
        headerName: 'Ort',
        width: 150,
        resizable: true
      },
      {
        field: 'planAnkunft',
        headerName: 'Gepl. Ankunft',
        width: 100,
        resizable: true
      },
      {
        headerName: 'Dienste',
        valueGetter: this.showDienste,
        width: 150,
        resizable: true
      },
    ];
    this.sollColumnDefs = [
      {
        field: 'soll_nr',
        headerName: 'Soll-Nr',
        width: 80,
        resizable: true
      },
      {
        field: 'empfaenger',
        headerName: 'Empfänger',
        width: 150,
        resizable: true
      },
      {
        field: 'strasse',
        headerName: 'Strasse',
        width: 172,
        resizable: true
      },
      {
        field: 'hausnr',
        headerName: 'Nr',
        width: 75,
        resizable: true
      },
      {
        field: 'plz',
        headerName: 'PLZ',
        width: 75,
        resizable: true
      },
      {
        field: 'ort',
        headerName: 'Ort',
        width: 150,
        resizable: true
      },
      {
        field: 'planAnkunft',
        headerName: 'Gepl. Ankunft',
        width: 100,
        resizable: true
      },
      {
        headerName: 'Dienste',
        valueGetter: this.showDienste,
        width: 150,
        resizable: true
      },
    ];
  }

  createTableDataObject(dispostopp: DispoStopp, sum: DispoSum) {
    const name1 = dispostopp.ziel_name.name1 !== null ? dispostopp.ziel_name.name1: '';
    const name2 = dispostopp.ziel_name.name2 !== null ? dispostopp.ziel_name.name2: '';
    const name3 = dispostopp.ziel_name.name3 !== null ? dispostopp.ziel_name.name3: '';
    const fullName = name1 + ' ' + name2 + ' ' + name3;
    return {
      soll_nr: dispostopp.soll_stopp,
      empfaenger: fullName,
      strasse: dispostopp.ziel_name.geoposition.geoadresse.strasse,
      hausnr: dispostopp.ziel_name.geoposition.geoadresse.hausnr,
      plz: dispostopp.ziel_name.geoposition.geoadresse.plz,
      ort: dispostopp.ziel_name.geoposition.geoadresse.ort,
      planAnkunft: dispostopp.planAnkunft.slice(10, 16),
      dienste: {
        p8: sum?.p8_sum,
        p9: sum?.p9_sum,
        p10: sum?.p10_sum,
        p12: sum?.p12_sum,
        abend: sum?.abend_sum
      }
    };
  }

  showDienste(param: any) {
    const dienste = [];
    for (const [key, value] of Object.entries(param.data.dienste)) {
      if (value > 0 && key) {
        const caption = getDiensteCaption(key);
        dienste.push(caption);
      }
    }
    return dienste.join(', ');
  }

  fetchTourDetails(tourId: number) {
    this.onTourService.fetchDetails(tourId).subscribe((details) => {
      this.tourDetails = details;
    });
  }

  public onIstGridReady(params: GridReadyEvent): void {
    this.istGridApi = params.api;
    this.istGridColumnApi = params.columnApi;
  }

  public onSollGridReady(params: GridReadyEvent): void {
    this.sollGridApi = params.api;
    this.sollGridColumnApi = params.columnApi;
  }

  // eslint-disable-next-line
  refreshTableData(tour: Anfrage) {
    if (this.istGridApi && this.sollGridApi) {
      this.istGridApi.setRowData([tour]);
      this.sollGridApi.setRowData([tour]);
    }
  }

  timeConvert(seconds: number) {
    const min = seconds / 60;
    const hours = min / 60;
    const rhours = Math.floor(hours);
    const minutes = (hours - rhours) * 60;
    const rminutes = Math.round(minutes);
    return rhours + ' Stunden ' + rminutes + ' minuten.';
  }
}

function getDiensteCaption(key: any): string {
  switch (key) {
    case 'p8':
      return '+8';
    case 'p9':
      return '+9';
    case 'p10':
      return '+10';
    case 'p12':
      return '+12';
    case 'abend':
      return 'Abend';
    default:
      return 'Unbekannter Dienst';
  }
}
