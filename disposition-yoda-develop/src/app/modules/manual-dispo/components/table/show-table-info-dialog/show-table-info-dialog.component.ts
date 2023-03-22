import {Component, OnInit} from '@angular/core';
import {DialogConfig} from '@modules/dialog/models/dialog-config.model';

@Component({
  selector: 'app-show-table-info-dialog',
  templateUrl: './show-table-info-dialog.component.html',
  styleUrls: ['./show-table-info-dialog.component.scss']
})
export class ShowTableInfoDialogComponent implements OnInit {

  public kennzeichen: string;
  public fahrzeugart: string;
  public ausweisnr: string;
  public fahrername: string;

  constructor(private dialogConfig: DialogConfig) {
  }

  ngOnInit(): void {
    const fahrerInfo = this.dialogConfig.data.fahrerInfo;

    this.kennzeichen = fahrerInfo.tour?.kennzeichen;
    this.fahrzeugart = this.setFahrzeugName(fahrerInfo.tour?.fahrzeugart_id);
    this.ausweisnr = fahrerInfo.tour?.ausweisnr;
    this.fahrername = this.getFahrerName(fahrerInfo?.tour);
  }

  setFahrzeugName(fahrzeugart_id) {
    switch (fahrzeugart_id) {
      case 2336:
        return 'PKW';
      case 2337:
        return 'Bus kleiner Radstand';
      case 2338:
        return 'Bus langer Radstand';
      case 2339:
        return 'Bus Kastenwagen';
      case 2340:
        return 'Bus Regalwagen';
      case 2341:
        return 'LKW 7.5 to';
      case 2342:
        return 'LKW 7.5 to mit Anhänger';
      case 2343:
        return 'LKW über 7.5 to';
      case 2344:
        return 'LKW über 7.5 to mit Anhänger';
      case 2345:
        return 'Sattelzug';
      default:
        return '-';
    }
  };

  public getFahrerName(tour: any): string {
    const name1 = tour.fahrername === null ? '' : tour.fahrername;
    const name2 = tour.fahrervorname === null ? '' : tour.fahrervorname;

    return `${name1}  ${name2}`;
  }

}
