import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {ConfirmationDialogComponent} from './confirmation-dialog.component';
import {DialogConfig, DialogModalType} from '@modules/dialog/models/dialog-config.model';
import {DialogRef} from '@modules/dialog/dialog-ref';

describe('ConfirmationDialogComponent', () => {
  let component: ConfirmationDialogComponent;
  let fixture: ComponentFixture<ConfirmationDialogComponent>;

  const dummyConfig: DialogConfig = {
    modalType: DialogModalType.LEFT,
    data: {
      content: ''
    },
    closeOnOutsideClicked: true
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmationDialogComponent],
      providers: [
        {
          provide: DialogConfig, useValue: dummyConfig
        },
        DialogRef
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
