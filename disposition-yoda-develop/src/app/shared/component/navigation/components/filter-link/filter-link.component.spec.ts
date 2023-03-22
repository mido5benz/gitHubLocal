/* eslint-disable @typescript-eslint/no-unused-vars */
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {FilterLinkComponent} from './filter-link.component';

describe('FilterLinkComponent', () => {
  let component: FilterLinkComponent;
  let fixture: ComponentFixture<FilterLinkComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FilterLinkComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('isActive class should not be applied to filterIcon because the filter is not active', () => {
    component.mapFilterActive = false;
    fixture.detectChanges();
    const filterIcon = fixture.debugElement.nativeElement.querySelector(
      '.fa-filter'
    );
    expect(filterIcon.classList.contains('isActive')).toBeFalse();
  });

  it('isActive class should be applied to filterIcon because the filter is active', () => {
    component.mapFilterActive = true;
    fixture.detectChanges();
    const filterIcon = fixture.debugElement.nativeElement.querySelector(
      '.fa-filter'
    );
    expect(filterIcon.classList.contains('isActive')).toBeTrue();
  });

  it('event emitter should emit on click', () => {
    spyOn(component.openFilterClicked, 'emit');

    const icon = fixture.debugElement.nativeElement.querySelector('.nav-link');
    icon.click();
    fixture.detectChanges();

    expect(component.openFilterClicked.emit).toHaveBeenCalledTimes(1);
  });
});
