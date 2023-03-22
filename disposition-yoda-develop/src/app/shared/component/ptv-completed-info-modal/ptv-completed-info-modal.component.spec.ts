import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PtvCompletedInfoModalComponent } from './ptv-completed-info-modal.component';

describe('CompletedInfoModalComponent', () => {
  let component: PtvCompletedInfoModalComponent;
  let fixture: ComponentFixture<PtvCompletedInfoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PtvCompletedInfoModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PtvCompletedInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
