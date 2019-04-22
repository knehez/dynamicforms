import { TestBed } from '@angular/core/testing';

import { AuthHttpInterceptorService } from './auth-http-interceptor.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthHttpInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
      RouterTestingModule
    ]
  }));

  it('should be created', () => {
    const service: AuthHttpInterceptorService = TestBed.get(AuthHttpInterceptorService);
    expect(service).toBeTruthy();
  });
});
