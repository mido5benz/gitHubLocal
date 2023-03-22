import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualDispoErrorViewComponent } from './manual-dispo-error-view.component';

describe('ManualDispoErrorViewComponent', () => {
  let component: ManualDispoErrorViewComponent;
  let fixture: ComponentFixture<ManualDispoErrorViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManualDispoErrorViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualDispoErrorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
