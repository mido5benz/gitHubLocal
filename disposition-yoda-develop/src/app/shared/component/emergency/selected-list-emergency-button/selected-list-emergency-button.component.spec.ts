import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SelectedListEmergencyButtonComponent} from './selected-list-emergency-button.component';
import {provideMockStore} from '@ngrx/store/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('SelectedListEmergencyButtonComponent', () => {
  let component: SelectedListEmergencyButtonComponent;
  let fixture: ComponentFixture<SelectedListEmergencyButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectedListEmergencyButtonComponent],
      providers: [provideMockStore({})],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedListEmergencyButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
