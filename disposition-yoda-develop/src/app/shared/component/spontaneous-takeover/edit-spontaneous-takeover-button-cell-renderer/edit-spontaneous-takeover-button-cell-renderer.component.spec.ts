import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSpontaneousTakeoverButtonCellRendererComponent } from './edit-spontaneous-takeover-button-cell-renderer.component';

describe('EditSpontaneousTakeoverButtonCellRendererComponent', () => {
  let component: EditSpontaneousTakeoverButtonCellRendererComponent;
  let fixture: ComponentFixture<EditSpontaneousTakeoverButtonCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSpontaneousTakeoverButtonCellRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSpontaneousTakeoverButtonCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
