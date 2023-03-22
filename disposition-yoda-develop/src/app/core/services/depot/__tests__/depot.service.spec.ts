import {TestBed} from '@angular/core/testing';

import {DepotService} from '../depot.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {KeycloakService} from 'keycloak-angular';

describe('DepotService', () => {
  let service: DepotService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [KeycloakService]
    });
    service = TestBed.inject(DepotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
