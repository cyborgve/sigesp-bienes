import { TestBed } from '@angular/core/testing';

import { TipoMarcaService } from './tipo-marca.service';

describe('TipoMarcaService', () => {
  let service: TipoMarcaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoMarcaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
