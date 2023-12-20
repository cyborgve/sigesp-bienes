import { TestBed } from '@angular/core/testing';

import { EntregaUnidadActivoService } from './entrega-unidad-activo.service';

describe('EntregaUnidadActivoService', () => {
  let service: EntregaUnidadActivoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntregaUnidadActivoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
