import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateMaschinelleDispoModalComponent } from './activate-maschinelle-dispo-modal.component';

describe('ActivateMaschinelleDispoModalComponent', () => {
  let component: ActivateMaschinelleDispoModalComponent;
  let fixture: ComponentFixture<ActivateMaschinelleDispoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivateMaschinelleDispoModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivateMaschinelleDispoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
