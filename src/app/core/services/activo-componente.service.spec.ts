import { TestBed } from '@angular/core/testing';

import { ActivoComponenteService } from './activo-componente.service';

describe('ActivoComponenteService', () => {
  let service: ActivoComponenteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivoComponenteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
