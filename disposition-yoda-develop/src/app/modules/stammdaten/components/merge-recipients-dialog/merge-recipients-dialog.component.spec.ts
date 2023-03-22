import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MergeRecipientsDialogComponent } from '@modules/stammdaten/components';
import {DialogConfig} from '@modules/dialog/models/dialog-config.model';

describe('MergeRecipientsDialogComponent', () => {
  let component: MergeRecipientsDialogComponent;
  let fixture: ComponentFixture<MergeRecipientsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MergeRecipientsDialogComponent ],
      providers: [DialogConfig]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MergeRecipientsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
