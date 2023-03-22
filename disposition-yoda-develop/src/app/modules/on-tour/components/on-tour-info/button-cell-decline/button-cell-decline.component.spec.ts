import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonCellDeclineComponent } from './button-cell-decline.component';

describe('ButtonCellDeclineComponent', () => {
  let component: ButtonCellDeclineComponent;
  let fixture: ComponentFixture<ButtonCellDeclineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonCellDeclineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonCellDeclineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
