import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GeopositionFormComponent} from './geoposition-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

describe('GeopositionFormComponent', () => {
  let component: GeopositionFormComponent;
  let fixture: ComponentFixture<GeopositionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeopositionFormComponent],
      imports: [ReactiveFormsModule, FormsModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeopositionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
