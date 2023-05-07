import { TestBed } from '@angular/core/testing';

import { TipoEstructuraService } from './tipo-estructura.service';

describe('TipoEstructuraService', () => {
  let service: TipoEstructuraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoEstructuraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
