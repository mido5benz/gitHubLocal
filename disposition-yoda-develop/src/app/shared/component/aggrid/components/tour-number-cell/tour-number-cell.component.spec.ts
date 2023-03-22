import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TourNumberCellComponent} from './tour-number-cell.component';

describe('TourNumberCellComponent', () => {
  let component: TourNumberCellComponent;
  let fixture: ComponentFixture<TourNumberCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TourNumberCellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TourNumberCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
