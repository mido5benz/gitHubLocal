import { TestBed } from '@angular/core/testing';

import { RescheduleService } from './reschedule.service';

describe('RescheduleService', () => {
  let service: RescheduleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RescheduleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
