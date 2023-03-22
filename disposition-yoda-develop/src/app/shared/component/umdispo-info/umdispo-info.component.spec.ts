import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UmdispoInfoComponent} from '@shared/component';
import {DialogService} from '@modules/dialog/services/dialog.service';
import {provideMockStore} from '@ngrx/store/testing';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {TourlistFacade} from '@store/manual-dispo/tour/facades/tourlist.facade';
import {of} from 'rxjs';

describe('UmdispoInfoComponent', () => {
  let component: UmdispoInfoComponent;
  let fixture: ComponentFixture<UmdispoInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UmdispoInfoComponent],
      imports: [BsDropdownModule.forRoot()],
      providers: [
        {
          provider: TourlistFacade,
          useFactory: () => {
            return {};
          }
        },
        DialogService, provideMockStore({})]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UmdispoInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const mockedTourlistFacade: TourlistFacade = TestBed.get(TourlistFacade);
    mockedTourlistFacade.getCompleteTourList$ = of([]);
    expect(component).toBeTruthy();
  });
});
