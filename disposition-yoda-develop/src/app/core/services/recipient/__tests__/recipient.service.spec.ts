import {TestBed} from '@angular/core/testing';

import {RecipientService} from '../recipient.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('RecipientService', () => {
  let service: RecipientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(RecipientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
