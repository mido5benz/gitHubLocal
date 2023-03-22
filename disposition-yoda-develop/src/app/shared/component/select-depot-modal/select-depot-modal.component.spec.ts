import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectDepotModalComponent } from './select-depot-modal.component';

describe('SelectDepotModalComponent', () => {
  let component: SelectDepotModalComponent;
  let fixture: ComponentFixture<SelectDepotModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectDepotModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectDepotModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
