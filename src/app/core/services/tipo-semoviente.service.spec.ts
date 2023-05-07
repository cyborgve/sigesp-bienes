import { TestBed } from '@angular/core/testing';

import { TipoSemovienteService } from './tipo-semoviente.service';

describe('TipoSemovienteService', () => {
  let service: TipoSemovienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoSemovienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
