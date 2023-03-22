import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourInfoHeaderComponent } from './tour-info-header.component';

describe('TourInfoHeaderComponent', () => {
  let component: TourInfoHeaderComponent;
  let fixture: ComponentFixture<TourInfoHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TourInfoHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TourInfoHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
