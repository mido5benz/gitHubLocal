import {Component, OnInit, OnDestroy} from '@angular/core';
import {DialogConfig} from '@modules/dialog/models/dialog-config.model';
import {DialogRef} from '@modules/dialog/dialog-ref';
import {DialogCloseResultType} from '@shared/enums/dialog-close-result.enum';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {StammdatenService} from '@app/core/services';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-merge-recipients-dialog',
  templateUrl: './merge-recipients-dialog.component.html',
  styleUrls: ['./merge-recipients-dialog.component.scss']
})
export class MergeRecipientsDialogComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  public geoposition_id: number;
  public restriktionen = [];

  constructor(
    public dialogConfig: DialogConfig,
    private dialogRef: DialogRef,
    private stammdatenService: StammdatenService,
  ) {

      for (let i = 0; i < this.dialogConfig.data.recipientsToMerge.length; i++) {
        this.subscription.add(this.stammdatenService.getZieleDetail(this.dialogConfig.data.recipientsToMerge[i].geoposition_id).subscribe((restriktionen) => {

          let filteredRestriktion = restriktionen.filter((restriktion) => restriktion?.name1 === this.dialogConfig.data?.recipientsToMerge[i]?.name1);

          filteredRestriktion.map((restriktion) => {
            this.restriktionen.push(restriktion);
          });
        }));
      }
  }

  ngOnInit(): void {
  }

  closeCancel(): void {
    this.dialogRef.close({
      result: DialogCloseResultType.CLOSECANCEL
    });
  }

  closeOk(): void {
    this.dialogRef.close({
      result: DialogCloseResultType.CLOSEOK
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.dialogConfig.data.recipientsToMerge, event.previousIndex, event.currentIndex);
  }

  getZielname(params: any) {
    const name1: string = params.name1 !== null ? params.name1 : '';
    const name2: string = params.name2 !== null ? params.name2 : '';
    const name3: string = params.name3 !== null ? params.name3 : '';

    return `${name1} ${name2} ${name3}`;
  }

  getEmails(data) {
    return data.email.join(', ');
  }

  public getFahrzeugTyp(data) {
    let fahrzeugTyp: string;
    if (data.fahrzeugklasse_id === 1) {
      fahrzeugTyp = 'BUS';
    } else if (data.fahrzeugklasse_id === 2) {
      fahrzeugTyp = 'LKW';
    } else if (data.fahrzeugklasse_id === 3) {
      fahrzeugTyp = 'SATTEL';
    }

    return fahrzeugTyp;
  }

  public getIstAvisTyp(data) {

    switch (data.sendungavistyp_id) {
      case 1:
        return 'PFIZER';
      case 2:
        return 'ROCHE';
      case 3:
        return 'PA_SOLL';
      case 4:
        return 'PA_IST';
      case 5:
        return 'PA_IST_DETAIL';
      case 6:
        return 'NVE';
      case 7:
        return 'PA_IST_EXT';
      case 8:
        return 'PA_IST_DETAIL_EXT';
      case 22:
        return 'COMPUTACENTER';
    }
  }

  showCheckboxValue(data) {
    let soll_avis, dezimal, leer, samstag;

    soll_avis = data.soll_avis ? 'SOLL-AVIS' : '';
    dezimal = data.avis_dezimal_komma ? 'DEZIMAL' : '';
    leer = data.avis_ohne_volumen ? 'LEER' : '';
    samstag = data.avis_samstag ? 'SAMSTAG' : '';


    return `${soll_avis} ${dezimal} ${leer} ${samstag}`;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

