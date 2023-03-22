import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OnTourDashboardViewComponent} from './on-tour-dashboard-view.component';
import {provideMockStore} from '@ngrx/store/testing';

describe('OnTourDashboardViewComponent', () => {
  let component: OnTourDashboardViewComponent;
  let fixture: ComponentFixture<OnTourDashboardViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OnTourDashboardViewComponent],
      providers: [provideMockStore({})]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnTourDashboardViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
