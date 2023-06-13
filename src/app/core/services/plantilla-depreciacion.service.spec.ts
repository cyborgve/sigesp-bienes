import { TestBed } from '@angular/core/testing';

import { PlantillaDepreciacionService } from './plantilla-depreciacion.service';

describe('PlantillaDepreciacionService', () => {
  let service: PlantillaDepreciacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlantillaDepreciacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
