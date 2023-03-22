import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LockTourComponent} from './lock-tour.component';
import {DialogService} from '@modules/dialog/services/dialog.service';

describe('LockTourComponent', () => {
  let component: LockTourComponent;
  let fixture: ComponentFixture<LockTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LockTourComponent],
      providers: [DialogService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LockTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
