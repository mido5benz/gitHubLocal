import { TestBed } from '@angular/core/testing';

import { ReleaseProcessService } from './release-process.service';

describe('ReleaseProcessService', () => {
  let service: ReleaseProcessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReleaseProcessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
