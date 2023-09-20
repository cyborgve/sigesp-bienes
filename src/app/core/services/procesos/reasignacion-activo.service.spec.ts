import { TestBed } from '@angular/core/testing';

import { ReasignacionActivoService } from './reasignacion-activo.service';

describe('ReasignacionActivoService', () => {
  let service: ReasignacionActivoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReasignacionActivoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
