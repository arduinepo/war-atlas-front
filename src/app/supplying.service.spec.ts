import { TestBed } from '@angular/core/testing';

import { SupplyingService } from './supplying.service';

describe('SupplyingService', () => {
  let service: SupplyingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupplyingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
