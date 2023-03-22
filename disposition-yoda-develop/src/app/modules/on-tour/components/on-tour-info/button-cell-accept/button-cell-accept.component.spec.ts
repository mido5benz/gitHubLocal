import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonCellAcceptComponent } from './button-cell-accept.component';

describe('ButtonCellAcceptComponent', () => {
  let component: ButtonCellAcceptComponent;
  let fixture: ComponentFixture<ButtonCellAcceptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonCellAcceptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonCellAcceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
