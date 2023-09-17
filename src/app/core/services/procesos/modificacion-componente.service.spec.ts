import { TestBed } from '@angular/core/testing';

import { ModificacionComponenteService } from './modificacion-componente.service';

describe('ModificacionComponenteService', () => {
  let service: ModificacionComponenteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModificacionComponenteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
