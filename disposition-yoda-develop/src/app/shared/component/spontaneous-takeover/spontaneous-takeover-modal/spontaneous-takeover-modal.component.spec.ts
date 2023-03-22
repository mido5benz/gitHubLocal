import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpontaneousTakeoverModalComponent } from './spontaneous-takeover-modal.component';

describe('SpontaneousTakeoversComponent', () => {
  let component: SpontaneousTakeoverModalComponent;
  let fixture: ComponentFixture<SpontaneousTakeoverModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpontaneousTakeoverModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpontaneousTakeoverModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
