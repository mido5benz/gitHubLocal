/* eslint-disable @typescript-eslint/no-unused-vars */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { StammdatenService } from '@app/core/services/stammdaten/stammdaten.service';
import { provideMockStore } from '@ngrx/store/testing';
import { FilterInputControlComponent } from './filter-input-control.component';

describe('FilterInputControlComponent', () => {
  let component: FilterInputControlComponent;
  let fixture: ComponentFixture<FilterInputControlComponent>;
  const initialState = {};

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FilterInputControlComponent],
      providers: [provideMockStore({ initialState }), StammdatenService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterInputControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
