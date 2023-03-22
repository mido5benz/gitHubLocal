import {TestBed} from '@angular/core/testing';

import {EmergencyButtonService} from '../emergency-button.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('EmergencyButtonService', () => {
  let service: EmergencyButtonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(EmergencyButtonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
