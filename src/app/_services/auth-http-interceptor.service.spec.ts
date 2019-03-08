import { TestBed } from '@angular/core/testing';

import { AuthHttpInterceptorService } from './auth-http-interceptor.service';

describe('AuthHttpInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthHttpInterceptorService = TestBed.get(AuthHttpInterceptorService);
    expect(service).toBeTruthy();
  });
});
