import { TestBed } from '@angular/core/testing';

import { ActaPrestamoActivoService } from './acta-prestamo-activo.service';

describe('ActaPrestamoActivoService', () => {
  let service: ActaPrestamoActivoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActaPrestamoActivoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
