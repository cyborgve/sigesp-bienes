import { TestBed } from '@angular/core/testing';

import { ActivoDetalleService } from './activo-detalle.service';

describe('ActivoDetalleService', () => {
  let service: ActivoDetalleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivoDetalleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
