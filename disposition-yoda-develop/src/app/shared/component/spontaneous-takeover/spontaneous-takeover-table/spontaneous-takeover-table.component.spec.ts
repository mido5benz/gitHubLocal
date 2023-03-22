import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpontaneousTakeoverTableComponent } from './spontaneous-takeover-table.component';

describe('SpontaneousTakeoverTableComponent', () => {
  let component: SpontaneousTakeoverTableComponent;
  let fixture: ComponentFixture<SpontaneousTakeoverTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpontaneousTakeoverTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpontaneousTakeoverTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
