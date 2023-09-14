import { TestBed } from '@angular/core/testing';

import { DesincorporacionCuentaService } from './desincorporacion-cuenta.service';

describe('DesincorporacionCuentaService', () => {
  let service: DesincorporacionCuentaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DesincorporacionCuentaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
