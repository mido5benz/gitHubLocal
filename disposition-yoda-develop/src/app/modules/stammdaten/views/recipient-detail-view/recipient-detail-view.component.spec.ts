import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RecipientDetailViewComponent} from '@modules/stammdaten/views';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {DialogService} from '@modules/dialog/services/dialog.service';
import {provideMockStore} from '@ngrx/store/testing';

describe('RecipientDetailViewComponent', () => {
  let component: RecipientDetailViewComponent;
  let fixture: ComponentFixture<RecipientDetailViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipientDetailViewComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [DialogService, provideMockStore({})]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipientDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
