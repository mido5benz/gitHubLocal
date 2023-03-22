import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TourDetailsHeaderComponent} from './tour-details-header.component';
import {TourNumberPipe} from '@shared/pipes';

describe('TourDetailsHeaderComponent', () => {
  let component: TourDetailsHeaderComponent;
  let fixture: ComponentFixture<TourDetailsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TourDetailsHeaderComponent, TourNumberPipe]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TourDetailsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
