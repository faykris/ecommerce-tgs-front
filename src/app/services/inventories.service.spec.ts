import { TestBed } from '@angular/core/testing';

import { InventoriesService } from './inventories.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('InventoriesService', () => {
  let service: InventoriesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [InventoriesService]
    });
    service = TestBed.inject(InventoriesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
