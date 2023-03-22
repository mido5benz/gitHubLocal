import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {MoveDeliveryPopupComponent} from './move-delivery-popup.component';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('MoveDeliveryPopupComponent', () => {
  let store: MockStore;
  const initialState = {};
  let component: MoveDeliveryPopupComponent;
  let fixture: ComponentFixture<MoveDeliveryPopupComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MoveDeliveryPopupComponent],
      imports: [HttpClientTestingModule],
      providers: [provideMockStore({initialState})]
    })
      .compileComponents();

    store = TestBed.inject(MockStore);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveDeliveryPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
