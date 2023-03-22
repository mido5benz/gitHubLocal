import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveUnassignedStoppsPopupComponent } from './move-unassigned-stopps-popup.component';
import {provideMockStore} from '@ngrx/store/testing';

describe('MoveUnassignedStoppsPopupComponent', () => {
  let component: MoveUnassignedStoppsPopupComponent;
  let fixture: ComponentFixture<MoveUnassignedStoppsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoveUnassignedStoppsPopupComponent ],
      providers: [provideMockStore({})]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveUnassignedStoppsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
