import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddSynonymFormComponent} from '@modules/stammdaten/views';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

describe('AddSynonymFormComponent', () => {
  let component: AddSynonymFormComponent;
  let fixture: ComponentFixture<AddSynonymFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddSynonymFormComponent],
      imports: [FormsModule, ReactiveFormsModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSynonymFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
