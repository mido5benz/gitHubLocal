import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourInfoContainerDetailComponent } from './tour-info-container-detail.component';

describe('TourInfoContainerDetailComponent', () => {
  let component: TourInfoContainerDetailComponent;
  let fixture: ComponentFixture<TourInfoContainerDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TourInfoContainerDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TourInfoContainerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
