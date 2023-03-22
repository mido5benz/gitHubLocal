import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipperAddressButtonCellRendererComponent } from './shipper-address-button-cell-renderer.component';

describe('ShipperAddressButtonCellRendererComponent', () => {
  let component: ShipperAddressButtonCellRendererComponent;
  let fixture: ComponentFixture<ShipperAddressButtonCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipperAddressButtonCellRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipperAddressButtonCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
