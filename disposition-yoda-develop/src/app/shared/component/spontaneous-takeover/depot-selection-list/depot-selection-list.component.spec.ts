import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepotSelectionListComponent } from './depot-selection-list.component';

describe('DepotSelectionListComponent', () => {
  let component: DepotSelectionListComponent;
  let fixture: ComponentFixture<DepotSelectionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepotSelectionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepotSelectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
