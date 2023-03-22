import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { StoppItemComponent } from './stopp-item.component';

describe('StoppItemComponent', () => {
  let component: StoppItemComponent;
  let fixture: ComponentFixture<StoppItemComponent>;
  let store: MockStore;
  const initialState = {  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [provideMockStore({ initialState })],
      declarations: [StoppItemComponent]
    })
      .compileComponents();

    store = TestBed.inject(MockStore);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoppItemComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.stopp = {
      dispostopp_id: 1,
      soll_stopp: 1,
      nachladebereich: '1',
    };
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
