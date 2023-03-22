import { TestBed } from '@angular/core/testing';

import { SendungsDetailsLibService } from './sendungs-details-lib.service';

describe('SendungsDetailsLibService', () => {
  let service: SendungsDetailsLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendungsDetailsLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
