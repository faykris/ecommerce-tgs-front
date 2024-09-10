import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";


describe('UserService', () => {
  let service: UsersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersService],
    });
    service = TestBed.inject(UsersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register a user and bring back token', () => {
    const dummyData = {
      username: "perpesoco@gmail.com",
      password: "perpe123",
      firstname: "Perpetuo",
      lastname: "Socorro",
      phone: "3123456789"
    };

    const dummyResponse = {
      token: 'some-token'
    };

    service.addUser(dummyData).subscribe((response) => {
      expect(response).toBeTruthy();
      expect(response.token).toBeDefined();
      expect(typeof response.token).toBe('string');
    });

    const request = httpMock.expectOne(service['apiUrl'] + '/auth/register');
    expect(request.request.method).toBe('POST');
    request.flush(dummyResponse);
  });
});
