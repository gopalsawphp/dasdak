import { TestBed } from '@angular/core/testing';

import { UserCheckAuthenticationService } from './user-check-authentication.service';

describe('UserCheckAuthenticationService', () => {
  let service: UserCheckAuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserCheckAuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
