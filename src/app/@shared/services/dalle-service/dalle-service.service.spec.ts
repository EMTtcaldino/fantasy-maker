import { TestBed } from '@angular/core/testing';

import { DalleServiceService } from './dalle-service.service';

describe('DalleServiceService', () => {
  let service: DalleServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DalleServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
