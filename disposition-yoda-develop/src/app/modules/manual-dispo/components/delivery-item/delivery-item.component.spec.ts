import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DeliveryItemComponent } from './delivery-item.component';

describe('DeliveryItemComponent', () => {
  let component: DeliveryItemComponent;
  let fixture: ComponentFixture<DeliveryItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DeliveryItemComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryItemComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {

    const del = {
      sendung_id: 1,
      colli: 1,
      paletten: 1,
      gesamtgewicht: 1,
      plus8: true,
      plus9: true,
      frueh: true,
      vormittag: true,
      abend: true,
      amb: true,
      kuehl_raum: true,
      gefahrgut: true,
      pickup: true,
      delivery: true,
      shuttletour: true,
      name1: 'string',
      name2: 'string',
      name3: null,
      strasse: 'sting',
      hausnr: 'string',
      plz: 'string',
      ort: 'string'
    };

    component.delivery = del;
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});
