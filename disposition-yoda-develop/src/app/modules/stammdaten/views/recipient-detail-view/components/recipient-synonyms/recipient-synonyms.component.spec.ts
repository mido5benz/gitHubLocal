import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RecipientSynonymsComponent} from '@modules/stammdaten/views';
import {DialogService} from '@modules/dialog/services/dialog.service';

describe('RecipientSynonymsComponent', () => {
  let component: RecipientSynonymsComponent;
  let fixture: ComponentFixture<RecipientSynonymsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipientSynonymsComponent],
      providers: [DialogService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipientSynonymsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
