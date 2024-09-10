import { TestBed } from '@angular/core/testing';

import { OptionsService } from './options.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('OptionsService', () => {
  let service: OptionsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OptionsService],
    });
    service = TestBed.inject(OptionsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
