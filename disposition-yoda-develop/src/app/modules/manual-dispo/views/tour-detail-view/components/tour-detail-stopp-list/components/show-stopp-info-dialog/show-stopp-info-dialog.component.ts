import {Component, OnInit} from '@angular/core';
import {DialogConfig} from '@modules/dialog/models/dialog-config.model';
import {Consignment} from '@shared/models';

@Component({
  selector: 'app-show-stopp-info-dialog',
  templateUrl: './show-stopp-info-dialog.component.html',
  styleUrls: ['./show-stopp-info-dialog.component.scss']
})
export class ShowStoppInfoDialogComponent implements OnInit {

  public distinctValues: Consignment[];
  public distinctDataToShow: Consignment[];

  constructor(public dialogConfig: DialogConfig) {
  }

  ngOnInit(): void {
    this.distinctValues = this.dialogConfig.data.stoppInfo.sendungen
    this.distinctDataToShow  = this.distinctValues.filter((thing, index, self) =>
      index === self.findIndex((t) => (
        t.versender_name === thing.versender_name
      ))
    )
  }
}
