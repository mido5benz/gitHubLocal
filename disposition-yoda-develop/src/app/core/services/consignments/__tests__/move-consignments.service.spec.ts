import {TestBed} from '@angular/core/testing';

import {ConsignmentService} from '../consignment.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('MoveSendungenService', () => {
  let service: ConsignmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ConsignmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
