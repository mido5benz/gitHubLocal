import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StoppInfoButtonComponentCellRendererComponent} from './stopp-info-button-component-cell-renderer.component';
import {DialogService} from '@modules/dialog/services/dialog.service';

describe('StoppInfoButtonComponent', () => {
  let component: StoppInfoButtonComponentCellRendererComponent;
  let fixture: ComponentFixture<StoppInfoButtonComponentCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StoppInfoButtonComponentCellRendererComponent],
      providers: [DialogService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoppInfoButtonComponentCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
