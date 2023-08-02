import { TestBed } from '@angular/core/testing';

import { TipoCoberturaService } from './tipo-cobertura.service';

describe('TipoCoberturaService', () => {
  let service: TipoCoberturaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoCoberturaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
