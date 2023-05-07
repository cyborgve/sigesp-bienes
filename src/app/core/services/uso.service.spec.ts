import { TestBed } from '@angular/core/testing';

import { UsoService } from './uso.service';

describe('UsoService', () => {
  let service: UsoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
