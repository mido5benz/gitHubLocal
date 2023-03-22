import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RulePickupModalComponent } from './rule-pickup-modal.component';

describe('RulePickupModalComponent', () => {
  let component: RulePickupModalComponent;
  let fixture: ComponentFixture<RulePickupModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RulePickupModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RulePickupModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
