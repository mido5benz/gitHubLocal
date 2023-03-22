import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRulePickupModalComponent } from './delete-rule-pickup-modal.component';

describe('DeleteRulePickupModalComponent', () => {
  let component: DeleteRulePickupModalComponent;
  let fixture: ComponentFixture<DeleteRulePickupModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteRulePickupModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteRulePickupModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
