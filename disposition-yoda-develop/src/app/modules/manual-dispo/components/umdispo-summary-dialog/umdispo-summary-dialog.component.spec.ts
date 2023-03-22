import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UmdispoSummaryDialogComponent} from './umdispo-summary-dialog.component';
import {provideMockStore} from '@ngrx/store/testing';

describe('UmdispoSummaryDialogComponent', () => {
  let component: UmdispoSummaryDialogComponent;
  let fixture: ComponentFixture<UmdispoSummaryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UmdispoSummaryDialogComponent],
      providers: [provideMockStore({})]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UmdispoSummaryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
