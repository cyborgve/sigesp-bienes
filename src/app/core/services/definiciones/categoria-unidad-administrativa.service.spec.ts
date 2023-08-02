import { TestBed } from '@angular/core/testing';

import { CategoriaUnidadAdministrativaService } from './categoria-unidad-administrativa.service';

describe('CategoriaUnidadAdministrativaService', () => {
  let service: CategoriaUnidadAdministrativaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriaUnidadAdministrativaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
