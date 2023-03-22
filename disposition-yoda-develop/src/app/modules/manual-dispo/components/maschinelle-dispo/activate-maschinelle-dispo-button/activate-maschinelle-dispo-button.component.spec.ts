import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateMaschinelleDispoButtonComponent } from './activate-maschinelle-dispo-button.component';

describe('ActivateMaschinelleDispoButtonComponent', () => {
  let component: ActivateMaschinelleDispoButtonComponent;
  let fixture: ComponentFixture<ActivateMaschinelleDispoButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivateMaschinelleDispoButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivateMaschinelleDispoButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
