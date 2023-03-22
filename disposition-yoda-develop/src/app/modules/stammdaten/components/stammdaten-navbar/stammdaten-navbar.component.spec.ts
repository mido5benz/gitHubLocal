import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StammdatenNavbarComponent } from './stammdaten-navbar.component';

describe('StammdateNavbarComponent', () => {
  let component: StammdatenNavbarComponent;
  let fixture: ComponentFixture<StammdatenNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StammdatenNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StammdatenNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
