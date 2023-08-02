import { TestBed } from '@angular/core/testing';

import { ActivoUbicacionService } from './activo-ubicacion.service';

describe('ActivoUbicacionService', () => {
  let service: ActivoUbicacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivoUbicacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
