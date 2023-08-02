import { TestBed } from '@angular/core/testing';

import { EstadoUsoService } from './estado-uso.service';

describe('EstadoUsoService', () => {
  let service: EstadoUsoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadoUsoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
