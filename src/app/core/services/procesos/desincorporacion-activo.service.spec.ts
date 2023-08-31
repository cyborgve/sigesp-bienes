import { TestBed } from '@angular/core/testing';

import { DesincorporacionActivoService } from './desincorporacion-activo.service';

describe('DesincorporacionActivoService', () => {
  let service: DesincorporacionActivoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DesincorporacionActivoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
