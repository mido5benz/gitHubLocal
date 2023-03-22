import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SuppliesListComponent } from './supplies-list.component';
import {RouterTestingModule} from '@angular/router/testing';

describe('SuppliesListComponent', () => {
  let component: SuppliesListComponent;
  let fixture: ComponentFixture<SuppliesListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SuppliesListComponent ],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppliesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
