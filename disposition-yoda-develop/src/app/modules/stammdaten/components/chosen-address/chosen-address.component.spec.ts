import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ChosenAddressComponent} from './chosen-address.component';
import {provideMockStore} from '@ngrx/store/testing';

describe('ChosenAddressComponent', () => {
  let component: ChosenAddressComponent;
  let fixture: ComponentFixture<ChosenAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChosenAddressComponent],
      providers: [provideMockStore({})]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChosenAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
