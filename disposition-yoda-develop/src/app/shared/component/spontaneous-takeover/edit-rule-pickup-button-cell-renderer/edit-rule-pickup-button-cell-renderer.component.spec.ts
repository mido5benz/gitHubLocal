import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRulePickupButtonCellRendererComponent } from './edit-rule-pickup-button-cell-renderer.component';

describe('EditRulePickupButtonCellRendererComponent', () => {
  let component: EditRulePickupButtonCellRendererComponent;
  let fixture: ComponentFixture<EditRulePickupButtonCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRulePickupButtonCellRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRulePickupButtonCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
