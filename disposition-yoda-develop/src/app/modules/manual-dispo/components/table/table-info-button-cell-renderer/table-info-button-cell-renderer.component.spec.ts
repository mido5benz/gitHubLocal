import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableInfoButtonCellRendererComponent } from './table-info-button-cell-renderer.component';

describe('TableInfoButtonCellRendererComponent', () => {
  let component: TableInfoButtonCellRendererComponent;
  let fixture: ComponentFixture<TableInfoButtonCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableInfoButtonCellRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableInfoButtonCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
