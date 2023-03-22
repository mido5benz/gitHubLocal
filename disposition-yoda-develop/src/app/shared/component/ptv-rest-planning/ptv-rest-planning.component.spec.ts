import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PtvRestPlanningComponent } from './ptv-rest-planning.component';

describe('PtvRestPlanningComponent', () => {
  let component: PtvRestPlanningComponent;
  let fixture: ComponentFixture<PtvRestPlanningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PtvRestPlanningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PtvRestPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
