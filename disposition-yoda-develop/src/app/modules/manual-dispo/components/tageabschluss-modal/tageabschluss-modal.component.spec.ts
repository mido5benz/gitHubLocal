import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TageabschlussModalComponent} from './tageabschluss-modal.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BsModalService} from 'ngx-bootstrap';
import {BsModalRef, ModalModule} from 'ngx-bootstrap/modal';
import {provideMockStore} from '@ngrx/store/testing';

describe('TageabschlussModalComponent', () => {
  let component: TageabschlussModalComponent;
  let fixture: ComponentFixture<TageabschlussModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TageabschlussModalComponent],
      imports: [HttpClientTestingModule, ModalModule.forRoot()],
      providers: [BsModalService, BsModalRef, provideMockStore({})]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TageabschlussModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
