import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {SollStoppNrComponent} from '@manual-dispo-components/index';
import {SollStoppNumberPipe} from '@shared/pipes';

describe('SollStoppNrComponent', () => {
  let component: SollStoppNrComponent;
  let fixture: ComponentFixture<SollStoppNrComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SollStoppNrComponent, SollStoppNumberPipe]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SollStoppNrComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.stopp = {
      soll_stopp: 1,
      ambient: false,
      ausliefertag: '',
      colCount: 1,
      dispostopp_id: 1,
      isReloadStopp: false,
      nachladebereich: '11',
      palCount: 1,
      planAnkunft: '',
      planBearbeitungszeit: 1,
      planStartBearbeitung: '',
      planStrecke: 0,
      planZeitFenster: '',
      raster_ebene_id: 1,
      sendungen: [],
      sendungendCount: 0,
      shuttle_tour_id: 1,
      sum: undefined,
      tour_id: 1,
      tournr: '22',
      uebernahmen: [],
      weight: 2,
      ziel_name: undefined
    };
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
