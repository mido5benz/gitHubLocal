import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendungsDetailsLibComponent } from './sendungs-details-lib.component';

describe('SendungsDetailsLibComponent', () => {
  let component: SendungsDetailsLibComponent;
  let fixture: ComponentFixture<SendungsDetailsLibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendungsDetailsLibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendungsDetailsLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
