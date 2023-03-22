import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {TourFilterInputControlComponent} from '@shared/component';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {Store} from '@ngrx/store';
import {FormControl, FormsModule, NgControl, ReactiveFormsModule} from '@angular/forms';
import {TypeaheadModule} from 'ngx-bootstrap/typeahead';

describe('FilterInputControlComponent', () => {
  let component: TourFilterInputControlComponent;
  let fixture: ComponentFixture<TourFilterInputControlComponent>;

  let store: MockStore;
  const initialState = {};

  beforeEach(waitForAsync(() => {
    const NG_CONTROL_PROVIDER = {
      provide: NgControl,
      useClass: class extends NgControl {
        control = new FormControl();

        viewToModelUpdate() {
        }
      },
    };

    TestBed.configureTestingModule({
      declarations: [TourFilterInputControlComponent],
      imports: [ReactiveFormsModule, FormsModule, TypeaheadModule.forRoot()],
      providers: [provideMockStore({initialState})],
    })
      .overrideComponent(TourFilterInputControlComponent, {
        add: {providers: [NG_CONTROL_PROVIDER]},
      })
      .compileComponents();

    store = TestBed.get(Store);
    fixture = TestBed.createComponent(TourFilterInputControlComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
