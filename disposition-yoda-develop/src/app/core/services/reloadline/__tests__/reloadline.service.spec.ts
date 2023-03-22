import {TestBed} from '@angular/core/testing';

import {ReloadlineService} from '../reloadline.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ReloadlineService', () => {
  let service: ReloadlineService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClientTestingModule],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ReloadlineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
