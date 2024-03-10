import { TestBed } from '@angular/core/testing';

import { CriteresReaderService } from './criteres-reader.service';

describe('CriteresReaderService', () => {
  let service: CriteresReaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CriteresReaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
