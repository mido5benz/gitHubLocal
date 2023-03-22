import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DialogControlsComponent } from './components/dialog-controls/dialog-controls.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { InsertionDirective } from './directives/insertion.directive';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [DialogComponent, InsertionDirective, DialogControlsComponent, ConfirmationDialogComponent],
  imports: [
    CommonModule
  ],
  entryComponents: [DialogComponent],
})
export class DialogModule { }
