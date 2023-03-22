import {TestBed} from '@angular/core/testing';

import {AppInfoService} from '../app-info.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AppInfoService', () => {
  let service: AppInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AppInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
