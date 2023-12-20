import { TestBed } from '@angular/core/testing';

import { DesincorporacionUbicacionService } from './desincorporacion-ubicacion.service';

describe('DesincorporacionUbicacionService', () => {
  let service: DesincorporacionUbicacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DesincorporacionUbicacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
