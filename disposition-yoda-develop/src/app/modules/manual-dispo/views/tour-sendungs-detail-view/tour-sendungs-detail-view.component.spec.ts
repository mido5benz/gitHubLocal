import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourSendungsDetailViewComponent } from './tour-sendungs-detail-view.component';

describe('TourSendungsDetailViewComponent', () => {
  let component: TourSendungsDetailViewComponent;
  let fixture: ComponentFixture<TourSendungsDetailViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TourSendungsDetailViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TourSendungsDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
