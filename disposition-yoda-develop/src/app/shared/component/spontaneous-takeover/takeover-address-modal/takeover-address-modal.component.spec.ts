import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeoverAddressComponent } from './takeover-address-modal.component';

describe('TakeoverAddressComponent', () => {
  let component: TakeoverAddressComponent;
  let fixture: ComponentFixture<TakeoverAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TakeoverAddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TakeoverAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
