import { TestBed } from '@angular/core/testing';

import { PlantillaIntegracionService } from './plantilla-integracion.service';

describe('PlantillaIntegracionService', () => {
  let service: PlantillaIntegracionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlantillaIntegracionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
