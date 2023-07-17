import { TestBed } from '@angular/core/testing';

import { ModificacionService } from './modificacion.service';

describe('ModificacionService', () => {
  let service: ModificacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModificacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
