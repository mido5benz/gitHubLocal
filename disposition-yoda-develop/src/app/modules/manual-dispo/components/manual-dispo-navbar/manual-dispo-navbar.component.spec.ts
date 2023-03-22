import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ManualDispoNavbarComponent} from './manual-dispo-navbar.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {provideMockStore} from '@ngrx/store/testing';

describe('ManualDispoNavbarComponent', () => {
  let component: ManualDispoNavbarComponent;
  let fixture: ComponentFixture<ManualDispoNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManualDispoNavbarComponent],
      providers: [provideMockStore({})],
      imports: [RouterTestingModule, HttpClientTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualDispoNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
