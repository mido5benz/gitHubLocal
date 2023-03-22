import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RecipientDeliveryPeriodComponent} from './recipient-delivery-period.component';
import {MockStore, provideMockStore} from '@ngrx/store/testing';

describe('RecipientDeliveryPeriodComponent', () => {
  let component: RecipientDeliveryPeriodComponent;
  let fixture: ComponentFixture<RecipientDeliveryPeriodComponent>;
  let store: MockStore;
  const initialState = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipientDeliveryPeriodComponent],
      providers: [provideMockStore({initialState})]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipientDeliveryPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
