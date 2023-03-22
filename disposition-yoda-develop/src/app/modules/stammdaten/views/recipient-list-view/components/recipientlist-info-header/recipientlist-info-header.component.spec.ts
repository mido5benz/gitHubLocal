import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RecipientlistInfoHeaderComponent} from '@modules/stammdaten/views';
import {RouterTestingModule} from '@angular/router/testing';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';
import {DialogService} from '@modules/dialog/services/dialog.service';

describe('RecipientlistInfoHeaderComponent', () => {
  let component: RecipientlistInfoHeaderComponent;
  let fixture: ComponentFixture<RecipientlistInfoHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipientlistInfoHeaderComponent],
      imports: [RouterTestingModule],
      providers: [
        DialogService,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({id: 123})
          }
        }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipientlistInfoHeaderComponent);
    component = fixture.componentInstance;
    component.selectedRecipients = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
