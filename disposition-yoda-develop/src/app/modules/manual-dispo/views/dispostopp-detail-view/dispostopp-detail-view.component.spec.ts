import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {DispostoppDetailViewComponent} from '@modules/manual-dispo/views';
import {RouterTestingModule} from '@angular/router/testing';
import {DialogService} from '@modules/dialog/services/dialog.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';
import {provideMockStore} from '@ngrx/store/testing';

describe('DispostoppDetailViewComponent', () => {
  let component: DispostoppDetailViewComponent;
  let fixture: ComponentFixture<DispostoppDetailViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DispostoppDetailViewComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [DialogService, provideMockStore({}), {
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
            paramMap: of({
              get: () => 10
            })
          },
          parent: {
            params: of({
              get: () => 10
            }),
            paramMap: of({
              get: () => 10
            })
          }
        }
      }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispostoppDetailViewComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
