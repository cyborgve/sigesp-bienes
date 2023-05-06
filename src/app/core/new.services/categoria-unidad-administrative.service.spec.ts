import { TestBed } from '@angular/core/testing';

import { CategoriaUnidadAdministrativeService } from './categoria-unidad-administrative.service';

describe('CategoriaUnidadAdministrativeService', () => {
  let service: CategoriaUnidadAdministrativeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriaUnidadAdministrativeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
