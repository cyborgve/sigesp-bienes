import { TestBed } from '@angular/core/testing';

import { RetornoService } from './retorno.service';

describe('RetornoService', () => {
  let service: RetornoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RetornoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
