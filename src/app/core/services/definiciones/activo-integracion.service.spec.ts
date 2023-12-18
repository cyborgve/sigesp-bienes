import { TestBed } from '@angular/core/testing';

import { ActivoIntegracionService } from './activo-integracion.service';

describe('ActivoIntegracionService', () => {
  let service: ActivoIntegracionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivoIntegracionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
