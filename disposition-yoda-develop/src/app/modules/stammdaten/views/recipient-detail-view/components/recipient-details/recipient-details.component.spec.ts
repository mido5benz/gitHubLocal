import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipientDetailsComponent } from './recipient-details.component';

describe('RecipientDetailsComponent', () => {
  let component: RecipientDetailsComponent;
  let fixture: ComponentFixture<RecipientDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipientDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipientDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
