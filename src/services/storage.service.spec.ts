import { TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';

import { StorageService } from './storage.service';
import { of } from 'rxjs';

describe('StorageService', () => {
  let service: StorageService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [StorageService]
    });
    service = TestBed.inject(StorageService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get data from database', () => {
    const responseData = [{ _id: '1', logNumber: 1, owner: "TestOwner", make: "TestMake", model: "TestModel", type: "TestType", serialNumber: "TestSerialNumber" },
    { _id: '2', logNumber: 2, owner: "TestOwner2", make: "TestMake2", model: "TestModel2", type: "TestType2", serialNumber: "TestSerialNumber2" }];

    // creating a spy to watch the get request and response
    spyOn(httpClient, 'get').and.returnValue(of(responseData));

    const gunData$ = service.getLocker();

    gunData$.subscribe(data => {
      expect(data).toEqual([
        { id: '1', logNumber: 1, owner: "TestOwner", make: "TestMake", model: "TestModel", type: "TestType", serialNumber: "TestSerialNumber" },
        { id: '2', logNumber: 2, owner: "TestOwner2", make: "TestMake2", model: "TestModel2", type: "TestType2", serialNumber: "TestSerialNumber2" }
      ]);
    });

    expect(httpClient.get).toHaveBeenCalledWith(service.endpoint + '/', {
      headers: new HttpHeaders().set('Access-Control-Allow-Origin', '*')
    });
  });
});
