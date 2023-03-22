import {Component, OnInit} from '@angular/core';
import {DialogRef} from '../../dialog-ref';
import {DialogConfig} from '../../models/dialog-config.model';
import {DialogCloseResultType} from '@shared/enums/dialog-close-result.enum';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

  constructor(public dialogConfig: DialogConfig, private dialogRef: DialogRef) {
  }

  ngOnInit(): void {
  }

  closeOk(): void {
    this.dialogRef.close({
      result: DialogCloseResultType.CLOSEOK
    });
  }

  closeCancel(): void {
    this.dialogRef.close({
      result: DialogCloseResultType.CLOSECANCEL
    });
  }
}
