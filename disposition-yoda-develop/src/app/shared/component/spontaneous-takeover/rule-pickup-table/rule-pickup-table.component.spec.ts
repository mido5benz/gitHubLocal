import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RulePickupTableComponent } from './rule-pickup-table.component';

describe('RulePickupTableComponent', () => {
  let component: RulePickupTableComponent;
  let fixture: ComponentFixture<RulePickupTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RulePickupTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RulePickupTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
