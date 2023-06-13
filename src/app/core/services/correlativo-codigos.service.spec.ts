import { TestBed } from '@angular/core/testing';

import { CorrelativoCodigosService } from './correlativo-codigos.service';

describe('CorrelativoCodigosService', () => {
  let service: CorrelativoCodigosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorrelativoCodigosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
