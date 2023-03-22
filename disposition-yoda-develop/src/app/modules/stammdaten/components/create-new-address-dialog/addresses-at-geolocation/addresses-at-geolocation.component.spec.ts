import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddressesAtGeolocationComponent} from '@modules/stammdaten/components';
import {provideMockStore} from '@ngrx/store/testing';

describe('AddressesAtGeolocationComponent', () => {
  let component: AddressesAtGeolocationComponent;
  let fixture: ComponentFixture<AddressesAtGeolocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddressesAtGeolocationComponent],
      providers: [provideMockStore({})]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressesAtGeolocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
