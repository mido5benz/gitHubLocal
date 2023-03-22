import {ComponentFixture, TestBed} from '@angular/core/testing';

import {IncorrectStoppsViewComponent} from '@modules/stammdaten/views';
import {provideMockStore} from '@ngrx/store/testing';
import {DialogService} from '@modules/dialog/services/dialog.service';

describe('IncorrectStoppsViewComponent', () => {
  let component: IncorrectStoppsViewComponent;
  let fixture: ComponentFixture<IncorrectStoppsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IncorrectStoppsViewComponent],
      providers: [provideMockStore({}), DialogService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncorrectStoppsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
