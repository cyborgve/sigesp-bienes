import { TestBed } from '@angular/core/testing';

import { IncorporacionActivoService } from './incorporacion-activo.service';

describe('IncorporacionActivoService', () => {
  let service: IncorporacionActivoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncorporacionActivoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
