import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationDeliveryItemComponent } from './navigation-delivery-item.component';

describe('NavigationDeliveryItemComponent', () => {
  let component: NavigationDeliveryItemComponent;
  let fixture: ComponentFixture<NavigationDeliveryItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationDeliveryItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationDeliveryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
