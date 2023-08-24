import { TestBed } from '@angular/core/testing';

import { InformacionProcesoService } from './informacion-proceso.service';

describe('InformacionProcesoService', () => {
  let service: InformacionProcesoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InformacionProcesoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
