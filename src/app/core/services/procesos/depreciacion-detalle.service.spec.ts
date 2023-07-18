import { TestBed } from '@angular/core/testing';

import { DepreciacionDetalleService } from './depreciacion-detalle.service';

describe('DepreciacionDetalleService', () => {
  let service: DepreciacionDetalleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepreciacionDetalleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
