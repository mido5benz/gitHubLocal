import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressListArchivedComponent } from './address-list-archived.component';

describe('AddressListArchivedComponent', () => {
  let component: AddressListArchivedComponent;
  let fixture: ComponentFixture<AddressListArchivedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressListArchivedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressListArchivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
