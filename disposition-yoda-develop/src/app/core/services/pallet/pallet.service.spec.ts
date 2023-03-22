import {TestBed} from '@angular/core/testing';

import {PalletService} from './pallet.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('PalletService', () => {
  let service: PalletService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PalletService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
