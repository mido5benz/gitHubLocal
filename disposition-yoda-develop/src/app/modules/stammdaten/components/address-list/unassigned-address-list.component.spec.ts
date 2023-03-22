import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnassignedAddressListComponent } from './unassigned-address-list.component';
import {provideMockStore} from '@ngrx/store/testing';

describe('AddressListComponent', () => {
  let component: UnassignedAddressListComponent;
  let fixture: ComponentFixture<UnassignedAddressListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnassignedAddressListComponent ],
      providers: [provideMockStore({})]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnassignedAddressListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
