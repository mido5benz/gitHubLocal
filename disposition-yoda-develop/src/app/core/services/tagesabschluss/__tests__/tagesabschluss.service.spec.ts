import {TestBed} from '@angular/core/testing';

import {TagesabschlussService} from '../tagesabschluss.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('TagesabschlussService', () => {
  let service: TagesabschlussService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(TagesabschlussService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
