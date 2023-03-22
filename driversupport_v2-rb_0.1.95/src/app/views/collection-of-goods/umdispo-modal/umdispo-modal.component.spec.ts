import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UmdispoModalComponent } from './umdispo-modal.component';

describe('UmdispoModalComponent', () => {
  let component: UmdispoModalComponent;
  let fixture: ComponentFixture<UmdispoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UmdispoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UmdispoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
