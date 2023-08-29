import { TestBed } from '@angular/core/testing';

import { AutorizacionSalidaActivoService } from './autorizacion-salida-activo.service';

describe('AutorizacionSalidaActivoService', () => {
  let service: AutorizacionSalidaActivoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutorizacionSalidaActivoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
