import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipperAddressModalComponent } from './shipper-address-modal.component';

describe('ShipperAddressModalComponent', () => {
  let component: ShipperAddressModalComponent;
  let fixture: ComponentFixture<ShipperAddressModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipperAddressModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipperAddressModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
