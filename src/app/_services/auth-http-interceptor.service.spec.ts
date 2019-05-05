import { TestBed } from '@angular/core/testing';

import { AuthHttpInterceptorService } from './auth-http-interceptor.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from './authentication.service';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

const TEST_ACCESS_TOKEN = 'exampleAccessToken';
const TEST_BEARER_TOKEN_STRING = `Bearer ${TEST_ACCESS_TOKEN}`;
const TEST_API_ENDPOINT = '/backend/example';

class AuthenticationServiceMock {
  getToken () {
    return TEST_ACCESS_TOKEN;
  }
}

describe('AuthHttpInterceptorService', () => {
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  let interceptor: AuthHttpInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        AuthHttpInterceptorService,
        {
          provide: AuthenticationService,
          useValue: new AuthenticationServiceMock()
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthHttpInterceptorService,
          multi: true
        }
      ]
    });

    httpClient = TestBed.get(HttpClient);
    httpMock = TestBed.get(HttpTestingController);
    interceptor = TestBed.get(AuthHttpInterceptorService);
  });

  it('should be created', () => {
    expect(interceptor).toBeDefined();
  });

  it('should put Authorization header on requests', () => {
    httpClient.get(TEST_API_ENDPOINT).subscribe(res => {
      expect(res).toBeTruthy();
    });

    const httpRequest = httpMock.expectOne(TEST_API_ENDPOINT);
    expect(httpRequest.request.headers.has('Authorization')).toBe(true);
  });

  it('should set Authorization header\'s value in \'Bearer <access-token>\' format', () => {
    httpClient.get(TEST_API_ENDPOINT).subscribe(res => {
      expect(res).toBeTruthy();
    });

    const httpRequest = httpMock.expectOne(TEST_API_ENDPOINT);
    expect(httpRequest.request.headers.get('Authorization')).toBe(TEST_BEARER_TOKEN_STRING);
  });

  it('should use access token from AuthenticationService', () => {
    httpClient.get(TEST_API_ENDPOINT).subscribe(res => {
      expect(res).toBeTruthy();
    });

    const httpRequest = httpMock.expectOne(TEST_API_ENDPOINT);
    const actualToken = httpRequest.request.headers.get('Authorization').split(' ')[1];
    const expectedToken = TEST_ACCESS_TOKEN;

    expect(actualToken).toBe(expectedToken);
  });
});
