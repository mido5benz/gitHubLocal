import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTableInfoDialogComponent } from './show-table-info-dialog.component';

describe('ShowTableInfoDialogComponent', () => {
  let component: ShowTableInfoDialogComponent;
  let fixture: ComponentFixture<ShowTableInfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowTableInfoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowTableInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
