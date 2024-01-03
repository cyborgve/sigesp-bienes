import { TestBed } from '@angular/core/testing';

import { ContabilizacionService } from './contabilizacion';

describe('ContabilizacionService', () => {
  let service: ContabilizacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContabilizacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
