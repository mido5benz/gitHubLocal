import { Component, OnInit } from '@angular/core';
import {faPencilAlt} from '@fortawesome/free-solid-svg-icons';
import {ICellRendererParams} from 'ag-grid-community';
import {DialogModalType} from '@modules/dialog/models/dialog-config.model';
import {DialogCloseResult} from '@models/dialog/dialog.models';
import {DialogCloseResultType} from '@shared/enums/dialog-close-result.enum';
import {DialogService} from '@modules/dialog/services/dialog.service';
import {RulePickupModalComponent} from '@shared/component/spontaneous-takeover/rule-pickup-modal/rule-pickup-modal.component';
import {RulePickupService} from '@app/core/services/spontaneous-takeovers/rule-pickup.service';

@Component({
  selector: 'app-edit-rule-pickup-button-cell-renderer',
  templateUrl: './edit-rule-pickup-button-cell-renderer.component.html',
  styleUrls: ['./edit-rule-pickup-button-cell-renderer.component.scss']
})
export class EditRulePickupButtonCellRendererComponent implements OnInit {

  public params: any;
  public faPencilAlt = faPencilAlt;

  constructor(private dialogService: DialogService, private rulePickupService: RulePickupService ) { }

  ngOnInit(): void {
  }

  refresh(params: any): boolean {
    return false;
  }

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  showModal() {
    const dialogRef = this.dialogService.open({
      modalType: DialogModalType.MODAL,
      width: 800,
      closeOnOutsideClicked: false,
      showTitle: true,
      title: 'Regelabholung',
      data: this.params.data

    }, RulePickupModalComponent);

    dialogRef.afterClosed.subscribe((dialogCloseEvent: DialogCloseResult) => {
      if (dialogCloseEvent.result === DialogCloseResultType.CLOSEOK) {
        this.rulePickupService.createdRegelabholung(true);
      }
    });
  }

}
