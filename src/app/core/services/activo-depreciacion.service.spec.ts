import { TestBed } from '@angular/core/testing';

import { ActivoDepreciacionService } from './activo-depreciacion.service';

describe('ActivoDepreciacionService', () => {
  let service: ActivoDepreciacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivoDepreciacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
