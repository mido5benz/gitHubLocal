import { TestBed } from '@angular/core/testing';

import { SendungDetailService } from './sendung-detail.service';

describe('SendungDetailService', () => {
  let service: SendungDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendungDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
