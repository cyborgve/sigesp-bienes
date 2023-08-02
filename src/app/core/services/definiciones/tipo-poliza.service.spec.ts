import { TestBed } from '@angular/core/testing';

import { TipoPolizaService } from './tipo-poliza.service';

describe('TipoPolizaService', () => {
  let service: TipoPolizaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoPolizaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
