import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunPtvSearchComponent } from './run-ptv-search.component';

describe('RunPtvSearchComponent', () => {
  let component: RunPtvSearchComponent;
  let fixture: ComponentFixture<RunPtvSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RunPtvSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RunPtvSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
