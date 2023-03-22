import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
  Type
} from '@angular/core';
import { DialogComponent } from '../components/dialog/dialog.component';
import { DialogConfig } from '../models/dialog-config.model';
import { ConfirmationDialogComponent } from './../components/confirmation-dialog/confirmation-dialog.component';
import { DialogInjector } from './../dialog-injector';
import { DialogRef } from './../dialog-ref';
import { DialogModule } from './../dialog.module';
import { DialogModalType } from './../models/dialog-config.model';

@Injectable({
  providedIn: DialogModule,
})
export class DialogService {
  private dialogComponentRef: ComponentRef<DialogComponent>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) { }

  private appendDialogComponentToBody(config: DialogConfig): DialogRef {
    const map = new WeakMap();
    map.set(DialogConfig, config);

    const dialogRef = new DialogRef();
    map.set(DialogRef, dialogRef);

    const sub = dialogRef.afterClosed.subscribe(() => {
      this.removeDialogComponentFromBody();
      sub.unsubscribe();
    });

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      DialogComponent
    );
    const componentRef = componentFactory.create(
      new DialogInjector(this.injector, map)
    );
    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    this.dialogComponentRef = componentRef;

    this.dialogComponentRef.instance.onClose.subscribe(() => {
      this.removeDialogComponentFromBody();
    });

    return dialogRef;
  }

  private removeDialogComponentFromBody(): void {
    this.appRef.detachView(this.dialogComponentRef.hostView);
    this.dialogComponentRef.destroy();
  }

  public open(config: DialogConfig, componentType?: Type<any>): DialogRef {
    const dialogRef = this.appendDialogComponentToBody(config);
    this.dialogComponentRef.instance.childComponentType = componentType;

    return dialogRef;
  }

  public close(): void {
    this.removeDialogComponentFromBody();
  }

  public openConfirmationDialog(content: string, title?: string): DialogRef {
    const dialogTitle = title ? title : 'Fortfahren?';

    const config: DialogConfig = {
      data: { content },
      width: 400,
      height: 150,
      showTitle: true,
      title: dialogTitle,
      modalType: DialogModalType.MODAL,
      closeOnOutsideClicked: false
    };

    const dialogRef = this.appendDialogComponentToBody(config);
    this.dialogComponentRef.instance.childComponentType = ConfirmationDialogComponent;

    return dialogRef;
  }
}
