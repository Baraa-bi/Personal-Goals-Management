import { TestBed } from '@angular/core/testing';

import { AuthenticateUserService } from './authenticate-user.service';

describe('AuthenticateUserService', () => {
  let service: AuthenticateUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticateUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
