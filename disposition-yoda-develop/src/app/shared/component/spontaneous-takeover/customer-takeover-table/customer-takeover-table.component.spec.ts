import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTakeoverTableComponent } from './customer-takeover-table.component';

describe('CustomerTakeoverTableComponent', () => {
  let component: CustomerTakeoverTableComponent;
  let fixture: ComponentFixture<CustomerTakeoverTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerTakeoverTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerTakeoverTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
