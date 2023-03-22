import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SynonymSuggestionListItemComponent} from './synonym-suggestion-list-item.component';

describe('SynonymSuggestionListItemComponent', () => {
  let component: SynonymSuggestionListItemComponent;
  let fixture: ComponentFixture<SynonymSuggestionListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SynonymSuggestionListItemComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SynonymSuggestionListItemComponent);
    component = fixture.componentInstance;
    component.item = {
      geoadresse_fehler_id: 1,
      hausnr: '1',
      landCode: 'de',
      strasse: '123',
      ziel_name_id: 1,
      geoadresse_id: 1,
      dispostopp_id: 1,
      sendung_id: 1,
      plz: '123',
      name1: '',
      name2: '',
      name3: '',
      ort: ''
    };
    component.originalClickedItem = {
      geoadresse_fehler_id: 1,
      hausnr: '1',
      landCode: 'de',
      strasse: '123',
      ziel_name_id: 1,
      geoadresse_id: 1,
      dispostopp_id: 1,
      sendung_id: 1,
      plz: '123',
      name1: '',
      name2: '',
      name3: '',
      ort: ''
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
