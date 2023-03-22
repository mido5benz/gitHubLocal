import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpontaneousTakeoverLayoutComponent } from './spontaneous-takeover-layout.component';

describe('SpontaneousTakeoverLayoutComponent', () => {
  let component: SpontaneousTakeoverLayoutComponent;
  let fixture: ComponentFixture<SpontaneousTakeoverLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpontaneousTakeoverLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpontaneousTakeoverLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
