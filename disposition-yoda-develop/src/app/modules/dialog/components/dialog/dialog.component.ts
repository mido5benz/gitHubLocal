import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  OnDestroy,
  Type,
  ViewChild
} from '@angular/core';
import {Subject} from 'rxjs';
import {InsertionDirective} from '../../directives/insertion.directive';
import {DialogConfig} from '../../models/dialog-config.model';
import {DialogRef} from './../../dialog-ref';
import {DialogCloseResultType} from '@shared/enums/dialog-close-result.enum';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements AfterViewInit, OnDestroy {
  private readonly onClose$ = new Subject<any>();

  public componentRef: ComponentRef<any>;
  public childComponentType: Type<any>;

  public onClose = this.onClose$.asObservable();

  @ViewChild(InsertionDirective) insertionPoint: InsertionDirective;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private cd: ChangeDetectorRef,
    private dialogRef: DialogRef,
    public dialogConfig: DialogConfig) {
  }

  ngAfterViewInit(): void {
    this.loadChildComponent(this.childComponentType);
    this.cd.detectChanges();
  }

  ngOnDestroy(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
    this.cd.detach();
  }

  onOverlayClicked(evt: MouseEvent): void {
    if (this.dialogConfig.closeOnOutsideClicked) {
      this.dialogRef.close({
        result: DialogCloseResultType.CLOSECANCEL
      });
    }
  }

  onDialogClicked(evt: MouseEvent): void {
    evt.stopPropagation();
  }

  closeDialog(): void {
    this.dialogRef.close({
      result: DialogCloseResultType.CLOSECANCEL
    });
  }

  loadChildComponent(componentType: Type<any>): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);

    const viewContainerRef = this.insertionPoint.viewContainerRef;
    viewContainerRef.clear();

    this.componentRef = viewContainerRef.createComponent(componentFactory);
  }
}
