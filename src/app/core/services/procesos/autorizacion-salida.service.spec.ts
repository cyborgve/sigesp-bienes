import { TestBed } from '@angular/core/testing';

import { AutorizacionSalidaService } from './autorizacion-salida.service';

describe('AutorizacionSalidaService', () => {
  let service: AutorizacionSalidaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutorizacionSalidaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
