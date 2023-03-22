import { Component, OnInit } from '@angular/core';
import {DialogConfig} from '@modules/dialog/models/dialog-config.model';
import {DialogCloseResultType} from '@shared/enums/dialog-close-result.enum';
import {DialogRef} from '@modules/dialog/dialog-ref';

@Component({
  selector: 'app-delete-rule-pickup-modal',
  templateUrl: './delete-rule-pickup-modal.component.html',
  styleUrls: ['./delete-rule-pickup-modal.component.scss']
})
export class DeleteRulePickupModalComponent implements OnInit {

  public ladestelle: any;

  constructor(private dialogConfig: DialogConfig, private dialogRef: DialogRef,) {
    this.ladestelle = this.dialogConfig.data.ladestelle_adresse;
  }

  ngOnInit(): void {
  }

  closeCancel() {
    this.dialogRef.close({
      result: DialogCloseResultType.CLOSECANCEL,
    });
  }

  closeOk() {
    this.dialogRef.close({
      result: DialogCloseResultType.CLOSEOK,
    });
  }

}
