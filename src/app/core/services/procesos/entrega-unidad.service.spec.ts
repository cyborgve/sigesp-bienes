import { TestBed } from '@angular/core/testing';

import { EntregaUnidadService } from './entrega-unidad.service';

describe('EntregaUnidadService', () => {
  let service: EntregaUnidadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntregaUnidadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
