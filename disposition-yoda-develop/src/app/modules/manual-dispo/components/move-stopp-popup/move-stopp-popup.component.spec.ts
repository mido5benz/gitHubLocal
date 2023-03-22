import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MoveStoppPopupComponent } from './move-stopp-popup.component';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {DialogConfig} from '@modules/dialog/models/dialog-config.model';
import {DialogRef} from '@modules/dialog/dialog-ref';

describe('MoveStoppPopupComponent', () => {
  let store: MockStore;
  const initialState = {};
  let component: MoveStoppPopupComponent;
  let fixture: ComponentFixture<MoveStoppPopupComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MoveStoppPopupComponent ],
      providers: [provideMockStore({initialState}), DialogConfig, DialogRef]
    })
    .compileComponents();

    store = TestBed.inject(MockStore);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveStoppPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
