import { TestBed } from '@angular/core/testing';

import { EstadoConservacionService } from './estado-conservacion.service';

describe('EstadoConservacionService', () => {
  let service: EstadoConservacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadoConservacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
