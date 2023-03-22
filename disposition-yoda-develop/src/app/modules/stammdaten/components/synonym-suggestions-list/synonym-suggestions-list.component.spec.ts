import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SynonymSuggestionsListComponent} from './synonym-suggestions-list.component';
import {DialogService} from '@modules/dialog/services/dialog.service';

describe('SynonymSuggestionsListComponent', () => {
  let component: SynonymSuggestionsListComponent;
  let fixture: ComponentFixture<SynonymSuggestionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SynonymSuggestionsListComponent],
      providers: [DialogService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SynonymSuggestionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
