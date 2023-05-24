import { TestBed } from '@angular/core/testing';

import { SigespService } from './sigesp.service';

describe('SigespService', () => {
  let service: SigespService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SigespService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
