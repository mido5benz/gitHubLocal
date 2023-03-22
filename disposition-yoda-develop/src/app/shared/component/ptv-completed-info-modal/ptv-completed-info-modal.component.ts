import { Component, OnInit } from '@angular/core';
import {DialogRef} from '@modules/dialog/dialog-ref';
import {DialogCloseResultType} from '@shared/enums/dialog-close-result.enum';

@Component({
  selector: 'app-completed-info-modal',
  templateUrl: './ptv-completed-info-modal.component.html',
  styleUrls: ['./ptv-completed-info-modal.component.scss']
})
export class PtvCompletedInfoModalComponent implements OnInit {

  constructor(private dialogRef: DialogRef) { }

  ngOnInit(): void {
  }

  closeOk() {
    this.dialogRef.close({
      result: DialogCloseResultType.CLOSEOK,
    });
  }

}
