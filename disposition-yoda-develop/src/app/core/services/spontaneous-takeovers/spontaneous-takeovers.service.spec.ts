import { TestBed } from '@angular/core/testing';

import { SpontaneousTakeoversService } from './spontaneous-takeovers.service';

describe('SpontaneousTakeoversService', () => {
  let service: SpontaneousTakeoversService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpontaneousTakeoversService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
