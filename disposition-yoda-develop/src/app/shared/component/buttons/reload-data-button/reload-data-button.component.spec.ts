import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReloadDataButtonComponent } from './reload-data-button.component';

describe('ReloadDataButtonComponent', () => {
  let component: ReloadDataButtonComponent;
  let fixture: ComponentFixture<ReloadDataButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReloadDataButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReloadDataButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
