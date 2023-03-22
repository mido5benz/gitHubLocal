import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavBadgeIconLinkComponent } from './nav-badge-icon-link.component';

describe('NavBadgeIconLinkComponent', () => {
  let component: NavBadgeIconLinkComponent;
  let fixture: ComponentFixture<NavBadgeIconLinkComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [NavBadgeIconLinkComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBadgeIconLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
