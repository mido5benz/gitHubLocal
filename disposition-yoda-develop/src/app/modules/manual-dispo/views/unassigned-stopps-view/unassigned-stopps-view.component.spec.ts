/* eslint-disable @typescript-eslint/no-unused-vars */
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {UnassignedStoppsViewComponent} from './unassigned-stopps-view.component';
import {provideMockStore} from '@ngrx/store/testing';
import {DialogService} from '@modules/dialog/services/dialog.service';

describe('ProcessUnassignedStoppsPageComponent', () => {
  let component: UnassignedStoppsViewComponent;
  let fixture: ComponentFixture<UnassignedStoppsViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UnassignedStoppsViewComponent],
      providers: [provideMockStore({}), DialogService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnassignedStoppsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
