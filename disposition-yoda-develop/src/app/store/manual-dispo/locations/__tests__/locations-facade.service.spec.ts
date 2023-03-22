import { TestBed } from '@angular/core/testing';

import { LocationsFacade } from '../facades/locations.facade';
import {provideMockStore} from '@ngrx/store/testing';

describe('LocationsFacadeService', () => {
  let service: LocationsFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({})]
    });
    service = TestBed.inject(LocationsFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
