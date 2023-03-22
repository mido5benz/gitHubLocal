import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowLegendModalComponent } from './show-legend-modal.component';

describe('ShowLegendModalComponent', () => {
  let component: ShowLegendModalComponent;
  let fixture: ComponentFixture<ShowLegendModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowLegendModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowLegendModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
