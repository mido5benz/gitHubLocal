import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {Store} from '@ngrx/store';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {MapFilterComponent} from './map-filter.component';
import {FilterInputControlComponent, TourFilterInputControlComponent} from '@shared/component';
import {FormControl, FormsModule, NgControl, ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TypeaheadModule} from 'ngx-bootstrap/typeahead';

describe('MapFilterComponent', () => {
  let component: MapFilterComponent;
  let fixture: ComponentFixture<MapFilterComponent>;

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
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule, TypeaheadModule.forRoot()],
      declarations: [MapFilterComponent, TourFilterInputControlComponent, FilterInputControlComponent],
      providers: [provideMockStore({initialState})],
    })
      .overrideComponent(TourFilterInputControlComponent, {
        add: {providers: [NG_CONTROL_PROVIDER]},
      })
      .overrideComponent(FilterInputControlComponent, {
        add: {providers: [NG_CONTROL_PROVIDER]},
      })
      .compileComponents();

    store = TestBed.get(Store);
    fixture = TestBed.createComponent(MapFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {

    expect(component).toBeTruthy();
  });
});
