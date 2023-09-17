import { TestBed } from '@angular/core/testing';

import { ModificacionCuentaContableService } from './modificacion-cuenta-contable.service';

describe('ModificacionCuentaContableService', () => {
  let service: ModificacionCuentaContableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModificacionCuentaContableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
