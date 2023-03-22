import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TourInfoContainerDetailTableComponent} from '../../tour-info-container-detail-table/tour-info-container-detail-table.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('TourInfoContainerDetailTableComponent', () => {
  let component: TourInfoContainerDetailTableComponent;
  let fixture: ComponentFixture<TourInfoContainerDetailTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TourInfoContainerDetailTableComponent],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TourInfoContainerDetailTableComponent);
    component = fixture.componentInstance;
    component.tour = {
      tour_id: 1,
      tournr: '1a'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
