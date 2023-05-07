import { TestBed } from '@angular/core/testing';

import { CausaMovimientoService } from './causa-movimiento.service';

describe('CausaMovimientoService', () => {
  let service: CausaMovimientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CausaMovimientoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
