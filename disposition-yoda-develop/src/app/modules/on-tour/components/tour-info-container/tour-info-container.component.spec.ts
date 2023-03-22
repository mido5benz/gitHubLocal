import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TourInfoContainerComponent} from './tour-info-container.component';
import {provideMockStore} from '@ngrx/store/testing';
import {TourNumberPipe} from '@shared/pipes';

describe('TourInfoContainerComponent', () => {
  let component: TourInfoContainerComponent;
  let fixture: ComponentFixture<TourInfoContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TourInfoContainerComponent, TourNumberPipe],
      providers: [provideMockStore({})]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TourInfoContainerComponent);
    component = fixture.componentInstance;
    component.tourInfo = {
      tournr: "123",
      tour_id: 123,
      anfrage_nr: 0,
      anfrage_stoppplanung_id: 1,
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
