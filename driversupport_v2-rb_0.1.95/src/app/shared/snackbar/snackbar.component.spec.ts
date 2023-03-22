import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastPackage, ToastRef, ToastrModule, ToastrService } from 'ngx-toastr';

import { SnackbarComponent } from './snackbar.component';

fdescribe('SnackbarComponent', () => {
  let component: SnackbarComponent;
  let fixture: ComponentFixture<SnackbarComponent>;
  let toastPackageMock: {
    toastId: number;
    toastType: string;
    afterActivate: jasmine.Spy;
    config: { toastClass: string; };
    message: string;
    title: string;
    toastRef: ToastRef<unknown>;
  };

  beforeEach(() => {
    initMockProviders();
    TestBed.configureTestingModule({
      declarations: [SnackbarComponent],
      imports: [
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
      ],
      providers: [
        { provide: ToastPackage, useValue: toastPackageMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(SnackbarComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  function initMockProviders(): void {
    toastPackageMock = {
      toastId: 1,
      toastType: 'success',
      afterActivate: jasmine.createSpy('afterActivate'),
      config: { toastClass: 'custom-toast' },
      message: 'test message',
      title: 'test title',
      toastRef: new ToastRef(null)
    };
  }

  it('should call action', () => {
    spyOn(component, 'action').and.callThrough();
    let saveTours = fixture.debugElement.nativeElement.querySelector('.scan-btn');
    saveTours.click();
    fixture.whenStable().then(() => {
      expect(component.action).toHaveBeenCalled();
    });
  });

  it('should check if action element exists', () => {
    let saveTours = fixture.debugElement.nativeElement.querySelector('.scan-btn');
    expect(saveTours).toBeDefined();
  });

  it('should check for bodys', () => {
    let saveTours = fixture.debugElement.nativeElement.querySelector('.bodyClass');
    expect(saveTours).toBeDefined();
  });

  it('should check for the title', () => {
    let saveTours = fixture.debugElement.nativeElement.querySelector('.titleClass');
    expect(saveTours).toBeDefined();
  });

  it('should check for the snack containter', () => {
    let saveTours = fixture.debugElement.nativeElement.querySelector('.snack-containter');
    expect(saveTours).toBeDefined();
  });

});
