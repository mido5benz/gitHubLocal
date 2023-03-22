import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DialogControlsComponent } from './dialog-controls.component';

describe('DialogControlsComponent', () => {
  let component: DialogControlsComponent;
  let fixture: ComponentFixture<DialogControlsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [DialogControlsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
