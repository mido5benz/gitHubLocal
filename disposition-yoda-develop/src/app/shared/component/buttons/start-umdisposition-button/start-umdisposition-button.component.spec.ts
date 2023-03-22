import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StartUmdispositionButtonComponent} from './start-umdisposition-button.component';

describe('StartUmdispositionButtonComponent', () => {
  let component: StartUmdispositionButtonComponent;
  let fixture: ComponentFixture<StartUmdispositionButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StartUmdispositionButtonComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartUmdispositionButtonComponent);
    component = fixture.componentInstance;
    fixture.componentInstance.selectedStopps = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
