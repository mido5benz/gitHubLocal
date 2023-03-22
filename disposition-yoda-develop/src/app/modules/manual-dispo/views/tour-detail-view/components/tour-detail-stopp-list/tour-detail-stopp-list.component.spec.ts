import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TourDetailStoppListComponent} from './tour-detail-stopp-list.component';
import {provideMockStore} from '@ngrx/store/testing';

describe('TourDetailStoppListComponent', () => {
  let component: TourDetailStoppListComponent;
  let fixture: ComponentFixture<TourDetailStoppListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TourDetailStoppListComponent],
      providers: [provideMockStore({})]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TourDetailStoppListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
