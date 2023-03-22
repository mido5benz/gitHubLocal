import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BruchModalComponent } from './bruch-modal.component';

describe('BruchModalComponent', () => {
  let component: BruchModalComponent;
  let fixture: ComponentFixture<BruchModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BruchModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BruchModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
