import { TestBed } from '@angular/core/testing';

import { CambioResponsableService } from './cambio-responsable.service';

describe('CambioResponsableService', () => {
  let service: CambioResponsableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CambioResponsableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
