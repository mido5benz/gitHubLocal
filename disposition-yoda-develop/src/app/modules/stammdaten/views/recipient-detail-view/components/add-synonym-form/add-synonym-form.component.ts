import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {DialogRef} from '@modules/dialog/dialog-ref';
import {DialogCloseResultType} from '@shared/enums/dialog-close-result.enum';
import {DialogConfig} from '@modules/dialog/models/dialog-config.model';

@Component({
  selector: 'app-add-synonym-form',
  templateUrl: './add-synonym-form.component.html',
  styleUrls: ['./add-synonym-form.component.scss']
})
export class AddSynonymFormComponent implements OnInit {

  public synonyms = [];
  public selectedSynonym;
  public showInputFeld: boolean;
  public neueZielName: string = null;
  public formValid: boolean = false;

  constructor(private dialogRef: DialogRef, private dialogConfig: DialogConfig, private cdr: ChangeDetectorRef) {
    this.synonyms = this.dialogConfig.data;
  }

  ngOnInit(): void {
  }

  okCancel(): void {
    this.dialogRef.close({
      result: DialogCloseResultType.CLOSECANCEL
    });
  }

  okSave(): void {
    this.dialogRef.close({
      result: DialogCloseResultType.CLOSEOK,
      data: this.neueZielName
    });
  }

  getSelectedSynonym(event: any) {
    // Soll Inputfeld angezeigt werden?
    if (event === 'newName') {
      this.showInputFeld = true;
      this.cdr.detectChanges();
    }

    // Wenn ein Eintrag im Dropdown ausgewählt wird, soll Inputfeld ausgeblendet werden
    this.synonyms.map((dropdownSynonyms) => {
      if (event.ziel_name_id === dropdownSynonyms.ziel_name_id) {
        this.showInputFeld = false;
      }
    });

    if (event?.target?.value) {
      this.neueZielName = event.target.value;
    } else {
      this.neueZielName = event.name123;
    }

    this.neueZielName !== null && this.neueZielName !== undefined ? this.formValid = true : this.formValid = false;
  }

  isInputValid(event) {
    event.target.value ? this.formValid = true : this.formValid = false;
  }
}
