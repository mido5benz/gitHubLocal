import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StoppListComponent } from './stopp-list.component';

describe('StoppListComponent', () => {
  let component: StoppListComponent;
  let fixture: ComponentFixture<StoppListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StoppListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoppListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
