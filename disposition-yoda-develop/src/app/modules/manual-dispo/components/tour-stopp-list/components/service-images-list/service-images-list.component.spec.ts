import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ServiceImagesListComponent} from './service-images-list.component';

describe('ServiceImagesListComponent', () => {
  let component: ServiceImagesListComponent;
  let fixture: ComponentFixture<ServiceImagesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiceImagesListComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceImagesListComponent);
    component = fixture.componentInstance;
    component.dispoSum = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
