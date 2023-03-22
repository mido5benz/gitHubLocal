import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedTourStoppsListComponent } from './selected-tour-stopps-list.component';

describe('SelectedTourStoppsListComponent', () => {
  let component: SelectedTourStoppsListComponent;
  let fixture: ComponentFixture<SelectedTourStoppsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedTourStoppsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedTourStoppsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
