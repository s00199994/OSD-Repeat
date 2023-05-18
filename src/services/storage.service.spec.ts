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

  // Testing the GET
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

  // Testing the POST
  it('should send a POST request with the correct endpoint, firearm, and headers', () => {
    const firearm = {
      id: '1', 
      logNumber: 1, 
      owner: "TestOwner", 
      make: "TestMake", 
      model: "TestModel", 
      type: "TestType", 
      serialNumber: "TestSerialNumber"
    };

    spyOn(httpClient, 'post').and.returnValue(of({}));

    service.addFirearm(firearm).subscribe();

    expect(httpClient.post).toHaveBeenCalledWith(service.endpoint + '/create', firearm, {
      headers: new HttpHeaders().set('Access-Control-Allow-Origin', '*')
    });
  });
  
  // Testing the DELETE
  it('should send a DELETE request', () => {
    const firearm = {
      id: '1',
      logNumber: 1, 
      owner: "TestOwner", 
      make: "TestMake", 
      model: "TestModel", 
      type: "TestType", 
      serialNumber: "TestSerialNumber"
    };

    spyOn(httpClient, 'delete').and.returnValue(of({}));

    service.deleteFirearm(firearm).subscribe();

    expect(httpClient.delete).toHaveBeenCalledWith(service.endpoint + '/' + firearm.id, {
      headers: new HttpHeaders().set('Access-Control-Allow-Origin', '*')
    })
  });

  // Testing the PUT
  it('should send a PUT request with the correct endpoint, firearm, and headers', () => {
    const firearm = {
      id: '1',
      logNumber: 1,
      owner: 'TestOwner',
      make: 'TestMake',
      model: 'TestModel',
      type: 'TestType',
      serialNumber: 'TestSerialNumber'
    };
  
    const editURL = service.endpoint + '/' + firearm.id;
  
    const expectedBody = {
      logNumber: firearm.logNumber,
      owner: firearm.owner,
      make: firearm.make,
      model: firearm.model,
      type: firearm.type,
      serialNumber: firearm.serialNumber
    };
  
    spyOn(httpClient, 'put').and.returnValue(of({}));
  
    service.editFirearm(firearm).subscribe();
  
    expect(httpClient.put).toHaveBeenCalledWith(editURL, expectedBody, {
      headers: new HttpHeaders().set('Access-Control-Allow-Origin', '*')
    });
  });
});
