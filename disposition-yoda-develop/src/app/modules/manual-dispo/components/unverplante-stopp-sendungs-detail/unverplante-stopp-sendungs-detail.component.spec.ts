import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnverplanteStoppSendungsDetailComponent } from './unverplante-stopp-sendungs-detail.component';

describe('UnverplanteStoppSendungsDetailComponent', () => {
  let component: UnverplanteStoppSendungsDetailComponent;
  let fixture: ComponentFixture<UnverplanteStoppSendungsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnverplanteStoppSendungsDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnverplanteStoppSendungsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
