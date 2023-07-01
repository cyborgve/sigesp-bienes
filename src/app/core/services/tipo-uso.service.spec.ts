import { TestBed } from '@angular/core/testing';

import { TipoUsoService } from './tipo-uso.service';

describe('TipoUsoService', () => {
  let service: TipoUsoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoUsoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
