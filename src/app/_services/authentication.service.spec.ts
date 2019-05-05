import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

function LocalStorageMock () {
  const store = {};

  return {
    setItem: (key, val) => store[key] = val,
    getItem: (key) => store[key] || null,
    removeItem: (key) => delete store[key]
  };
}

const ACCESS_TOKEN_KEY = 'accessToken';
const ACCESS_TOKEN_VALUE = 'accessTokenValue';
const ROLES_KEY = 'roles';
const ROLES_VALUE = '[\"admin\", \"manager\"]';

describe('AuthenticationService', () => {
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  let service: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        AuthenticationService
      ]
    });

    const localStorageMock = LocalStorageMock();
    localStorageMock.setItem(ACCESS_TOKEN_KEY, ACCESS_TOKEN_VALUE);
    localStorageMock.setItem(ROLES_KEY, ROLES_VALUE);
    spyOn(localStorage, 'setItem').and.callFake(localStorageMock.setItem);
    spyOn(localStorage, 'getItem').and.callFake(localStorageMock.getItem);
    spyOn(localStorage, 'removeItem').and.callFake(localStorageMock.removeItem);

    httpClient = TestBed.get(HttpClient);
    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(AuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return access token from localStorage', () => {
    expect(service.getToken()).toBe(ACCESS_TOKEN_VALUE);
  });

  it('should return roles from localStorage as object', () => {
    expect(service.getRoles()).toEqual(JSON.parse(ROLES_VALUE));
  });

  it('should wipe out accessToken and roles from localStorage on logout', () => {
    expect(service.getToken()).toBe(ACCESS_TOKEN_VALUE);
    expect(service.getRoles()).toEqual(JSON.parse(ROLES_VALUE));

    service.logout();

    expect(service.getToken()).toBe(null);
    expect(service.getRoles()).toBe(null);
  });

  it('should store accessToken and roles array in localStorage after successful login', (done) => {
    const actualAccessToken = 'someNiceAccessToken';
    const actualRoles = [ 'admin', 'manager' ];

    service.login('exampleUser', 'examplePassword').then(() => {
      expect(service.getToken()).toBe(actualAccessToken);
      expect(service.getRoles()).toEqual(actualRoles);
      done();
    });

    httpMock.expectOne('/backend/login').flush({
      success: true,
      accessToken: actualAccessToken,
      roles: actualRoles
    });
  });

  it('should reject with error when bad credentials given on login', (done) => {
    const errorResponse = {
      success: false,
      message: 'Bad credentials'
    };

    service.login('badUser', 'badPassword').catch(res => {
      expect(res.error).toEqual(errorResponse);
      done();
    });

    httpMock.expectOne('/backend/login').flush(errorResponse, { status: 401, statusText: 'Unauthorized' });
  });

  it('should reject with error when network error occurs on login', (done) => {
    const errorType = 'NetworkError';

    service.login('someUser', 'somePasswd').catch(res => {
      expect(res.error.type).toBe(errorType);
      done();
    });

    httpMock.expectOne('/backend/login').error(new ErrorEvent(errorType));
  });
});
