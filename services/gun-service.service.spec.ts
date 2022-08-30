import { TestBed } from '@angular/core/testing';

import { GunServiceService } from './gun-service.service';

describe('GunServiceService', () => {
  let service: GunServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GunServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
