import { TestBed } from '@angular/core/testing';

import { XLSXService } from './xlsx.service';

describe('XLSXService', () => {
  let service: XLSXService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XLSXService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
