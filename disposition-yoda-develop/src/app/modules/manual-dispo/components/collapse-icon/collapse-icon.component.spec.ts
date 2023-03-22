import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CollapseIconComponent } from './collapse-icon.component';

describe('CollapseIconComponent', () => {
  let component: CollapseIconComponent;
  let fixture: ComponentFixture<CollapseIconComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CollapseIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollapseIconComponent);
    component = fixture.componentInstance;
    component.delivery = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
