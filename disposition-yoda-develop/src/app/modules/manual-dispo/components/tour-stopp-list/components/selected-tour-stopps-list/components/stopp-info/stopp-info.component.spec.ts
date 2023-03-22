import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StoppInfoComponent} from './stopp-info.component';
import {provideMockStore} from '@ngrx/store/testing';

describe('StoppInfoComponent', () => {
  let component: StoppInfoComponent;
  let fixture: ComponentFixture<StoppInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StoppInfoComponent],
      providers: [provideMockStore({})]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoppInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
