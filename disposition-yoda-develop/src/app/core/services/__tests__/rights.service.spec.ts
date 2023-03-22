import {TestBed} from '@angular/core/testing';

import {RightsService} from '../rights/rights.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {KeycloakService} from 'keycloak-angular';

describe('RightsService', () => {
  let service: RightsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [KeycloakService]
    });
    service = TestBed.inject(RightsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
