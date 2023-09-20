import { TestBed } from '@angular/core/testing';

import { RetornoActivoService } from './retorno-activo.service';

describe('RetornoActivoService', () => {
  let service: RetornoActivoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RetornoActivoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
