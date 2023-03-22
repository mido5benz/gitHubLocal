import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DialogRef } from './../../dialog-ref';
import { DialogComponent } from './dialog.component';
import {DialogConfig} from '@modules/dialog/models/dialog-config.model';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [DialogRef, DialogConfig],
      declarations: [DialogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
