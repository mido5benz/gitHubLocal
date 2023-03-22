import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryPeriodTableComponent } from './delivery-period-table.component';

describe('DeliveryPeriodTableComponent', () => {
  let component: DeliveryPeriodTableComponent;
  let fixture: ComponentFixture<DeliveryPeriodTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryPeriodTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryPeriodTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
