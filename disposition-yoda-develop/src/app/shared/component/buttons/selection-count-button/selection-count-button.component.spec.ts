import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionCountButtonComponent } from './selection-count-button.component';

describe('SelectionCountButtonComponent', () => {
  let component: SelectionCountButtonComponent;
  let fixture: ComponentFixture<SelectionCountButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectionCountButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionCountButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
