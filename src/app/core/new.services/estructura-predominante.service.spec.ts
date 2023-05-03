import { TestBed } from '@angular/core/testing';

import { EstructuraPredominanteService } from './estructura-predominante.service';

describe('EstructuraPredominanteService', () => {
  let service: EstructuraPredominanteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstructuraPredominanteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
