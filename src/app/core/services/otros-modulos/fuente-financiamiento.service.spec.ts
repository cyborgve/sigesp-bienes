import { TestBed } from '@angular/core/testing';

import { FuenteFinanciamientoService } from './fuente-financiamiento.service';

describe('FuenteFinanciamientoService', () => {
  let service: FuenteFinanciamientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FuenteFinanciamientoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
