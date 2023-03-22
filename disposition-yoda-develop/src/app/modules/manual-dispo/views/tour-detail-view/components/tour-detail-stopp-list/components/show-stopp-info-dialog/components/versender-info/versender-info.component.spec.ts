import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersenderInfoComponent } from './versender-info.component';

describe('VersenderInfoComponent', () => {
  let component: VersenderInfoComponent;
  let fixture: ComponentFixture<VersenderInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VersenderInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VersenderInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
