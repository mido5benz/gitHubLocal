import { async, ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TourSelectionComponent } from './tour-selection.component';
import { apiService } from 'src/app/_services/api.service';
import { ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from 'src/app/Global/search.pipe';
import { ModalModule } from 'ngx-bootstrap';

describe('TourSelectionComponent', () => {
  let component: TourSelectionComponent;
  let fixture: ComponentFixture<TourSelectionComponent>;
  let injector: TestBed;
  let service: apiService;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TourSelectionComponent, SearchPipe],
      imports: [
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        RouterTestingModule,
        FormsModule,
        ModalModule.forRoot(),

      ],
      providers: [apiService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourSelectionComponent);
    component = fixture.componentInstance;
    injector = getTestBed();
    service = injector.get(apiService);
    httpMock = injector.get(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    // httpMock.expectNone(service.env.baseURL+'/tourSelection/');
    // httpMock.expectNone(service.env.baseURL+'/tourSelection/save');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should activate the selection state', () => {
    component.toggleSelectionState(true);
    expect(component.selectionState).toBeTrue();
  });

  it('should deactivate the selection state', () => {
    component.toggleSelectionState(false);
    expect(component.selectionState).toBeFalse();
  });


  // it('should select box', () => {
  //   spyOn(component, 'toggleSelection').and.callThrough();
  //   let toggleSelection = fixture.debugElement.nativeElement.querySelector('.innerSquare');
  //   let data = {
  //     tourId: 21322,
  //     tourNr: '2100',
  //     niederlassungId: '21322',
  //     loginName: 'DRIVES01',
  //     isSavedByLoginUser: false,
  //     isSavedByAnotherUser: '',
  //     selectionState: false,
  //   }
  //   component.tourArray = [];
  //   component.tourArray.push({
  //     tourId: 21322,
  //     tourNr: '2100',
  //     niederlassungId: 21322,
  //     loginName: 'DRIVES01',
  //     isSavedByLoginUser: false,
  //     isSavedByAnotherUser: '',
  //     selectionState: false,
  //   });

  //   component.toggleSelection(data, 0, '');
  //   fixture.whenStable().then(() => {
  //     expect(component.toggleSelection).toHaveBeenCalled();
  //   });
  // });

  it('should save selection', () => {
    spyOn(component, 'saveTours').and.callThrough();
    let saveTours = fixture.debugElement.nativeElement.querySelector('.save-btn');
    saveTours.click();
    fixture.whenStable().then(() => {
      expect(component.saveTours).toHaveBeenCalled();
    });
  });

  it('should get tours', () => {
    service.getTourSelection('DRIVES01')
      .subscribe((data) => {
        expect(data.length).toBeDefined();
        // done();
      });

    const req = httpMock.match(service.env.baseURL + '/tourSelection/');
    expect(req[0].request.method).toBe("PUT");

  });

  it('should save tours', () => {
    let data = {
      tourId: 21322,
      tourNr: '2100',
      niederlassungId: '21322',
      loginName: 'DRIVES01',
      isSavedByLoginUser: false,
      isSavedByAnotherUser: '',
      selectionState: false,
    }
    service.saveTourSelections(data)
      .subscribe((data) => {
        expect(data).toBeDefined();
      });

    const req = httpMock.match(service.env.baseURL + '/tourSelection/save');
    expect(req[0].request.method).toBe("POST");

  });

  it('should scrollFunction function scroll true', async(() => {
    spyOn(component, 'scrollFunction').and.callThrough();
    component.scrollFunction(true, 0);
    expect(component.scrollFunction).toHaveBeenCalled();
  }));

  it('should test scrollTop greaterthan 0', () => {
    window.scrollTo(0, 500);
    fixture.detectChanges();
    component.topFunction();
    expect(fixture.debugElement.nativeElement.querySelector('.testScrollClass')).toBeTruthy();
  });

  it('should test scrollTop lessthan 0', () => {
    window.scrollTo(0, 500);
    fixture.detectChanges();
    component.topFunction();
    expect(fixture.debugElement.nativeElement.querySelector('.testScrollClass')[0]).not.toBeTruthy();
  });

  it('should fire window onkeypress event', () => {
    const event: Event = new KeyboardEvent('onkeypress', {
      'code': '13'  //Code for the key
    });
    window.dispatchEvent(event);
    fixture.detectChanges();
    expect(component.onkeypress).toBeTruthy();
  });

});
