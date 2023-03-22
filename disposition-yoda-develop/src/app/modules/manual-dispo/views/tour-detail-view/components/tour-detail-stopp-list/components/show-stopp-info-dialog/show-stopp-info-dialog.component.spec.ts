import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowStoppInfoDialogComponent } from './show-stopp-info-dialog.component';

describe('ShowStoppInfoDialogComponent', () => {
  let component: ShowStoppInfoDialogComponent;
  let fixture: ComponentFixture<ShowStoppInfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowStoppInfoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowStoppInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
