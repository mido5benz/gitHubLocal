import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RecipientListViewComponent} from '@modules/stammdaten/views';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {DialogService} from '@modules/dialog/services/dialog.service';
import {provideMockStore} from '@ngrx/store/testing';

describe('RecipientListViewComponent', () => {
  let component: RecipientListViewComponent;
  let fixture: ComponentFixture<RecipientListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipientListViewComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [DialogService, provideMockStore({})]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipientListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
