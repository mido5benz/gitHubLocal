import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpressServiceListComponent } from './express-service-list.component';

describe('ExpressServiceListComponent', () => {
  let component: ExpressServiceListComponent;
  let fixture: ComponentFixture<ExpressServiceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpressServiceListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpressServiceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
