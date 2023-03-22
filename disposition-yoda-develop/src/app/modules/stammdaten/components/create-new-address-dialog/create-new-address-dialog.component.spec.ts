import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewAddressDialogComponent } from './create-new-address-dialog.component';

describe('CreateNewAddressDialogComponent', () => {
  let component: CreateNewAddressDialogComponent;
  let fixture: ComponentFixture<CreateNewAddressDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewAddressDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewAddressDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
