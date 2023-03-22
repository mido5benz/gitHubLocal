import { Component } from '@angular/core';
import { StammdatenService } from '@app/core/services/stammdaten/stammdaten.service';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { StrategicTour, Table } from '@models/strategic-dispo/strategic-tour.model';
import { ExcelService } from '@app/core/services/excel/excel.service';
import { PlanungenService } from '@app/core/services/planungen/planungen.service';
import { StrategicTourService } from '@app/core/services/strategic-tour/strategic-tour.service';
import { Raster, RasterDetails } from '@models/strategic-dispo/raster.model';

@Component({
  selector: 'app-strategic-dispo-excel',
  templateUrl: './excel.component.html',
  styleUrls: ['./excel.component.scss'],
})
export class ExcelComponent {
  public rowData: StrategicTour[];
  public table: Table[] = [];

  constructor(
    private excelService: ExcelService,
    private planungenService: PlanungenService,
    private tourService: StrategicTourService,
    private stammdatenService: StammdatenService,
    private alertService: ToastrService
  ) { }

  excel($event: MouseEvent): void {
    if (this.planungenService.getActivePlanName() === undefined) {
      this.alertService.error('Zuerst eine Planung auswählen!');
    } else {
      forkJoin([
        this.stammdatenService.getFahrzeugtypen(),
        this.tourService.getTours(),
      ]).subscribe((result) => {
        const tours: StrategicTour[] = result[1];
        this.rowData = tours;
        this.rowData.sort((a: StrategicTour, b: StrategicTour) =>
          a.tournr < b.tournr ? -1 : 1
        );
      });
      this.rowData.forEach((row: StrategicTour) => {
        this.stammdatenService
          .getFahrzeugtypen()
          .subscribe((fzTypen: any) => {
            const fahrzeugTyp = fzTypen.find(
              (typ: any) => typ.fahrzeugart_id === row.fahrzeugart_id
            );
            const converted = fahrzeugTyp.fa_bezeichnung;
            this.table.push({
              tourNr: this.convertTourNr(row.tournr),
              frachtfuehrer: row.name_1,
              fahrzeugArt: converted,
              plus8: this.sum(row.raster_total, 'plus8'),
              plus9: this.sum(row.raster_total, 'plus9'),
              plus10: this.sum(row.raster_total, 'frueh'),
              plus12: this.sum(row.raster_total, 'vormittag'),
              abend: this.sum(row.raster_total, 'abend'),
              ambient: this.sum(row.raster_total, 'amb'),
              thermomed: this.sum(row.raster_total, 'kuehl_raum'),
              klasse7: this.sum(row.raster_total, 'gefahrgut'),
              stopps: this.sum(row.raster_total, 'anzahl_stopps'),
              sendungen: this.sum(row.raster_total, 'gesamtmenge'),
              colli: this.sum(row.raster_total, 'anzahl_col'),
              paletten: this.sum(row.raster_total, 'anzahl_pal'),
              gewicht: this.sum(row.raster_total, 'gesamtgewicht')
            });
          });
      });
      this.alertService.success('Download gestartet!');
      this.excelService.exportAsExcelFile(
        this.table,
        'stratDispo_excelExport_'
      );
      $event.preventDefault();
      $event.stopPropagation();
    }
  }

  private sum(rasters: Raster[], field: string): number {
    let sum = 0;

    if (rasters) {
      rasters.forEach((r: Raster) => {
        let zwischenSum = 0;
        let length = 0;
        Object.values(r.details).forEach((details: RasterDetails) => {
          zwischenSum += details[field];
          length++;
        });
        sum += zwischenSum / length;
      });
    }

    return Math.ceil(sum);
  }

  private convertTourNr(tourNr: string): string {
    let convertedTourNr = tourNr;

    if (convertedTourNr) {
      convertedTourNr =
        convertedTourNr.slice(0, 1) + '-' + convertedTourNr.slice(1);
    }

    return convertedTourNr;
  }
}
