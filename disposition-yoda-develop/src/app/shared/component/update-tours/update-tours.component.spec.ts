import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateToursComponent } from './update-tours.component';

describe('UpdateToursComponent', () => {
  let component: UpdateToursComponent;
  let fixture: ComponentFixture<UpdateToursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateToursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateToursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
