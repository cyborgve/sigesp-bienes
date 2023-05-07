import { TestBed } from '@angular/core/testing';

import { PropositoSemovienteService } from './proposito-semoviente.service';

describe('PropositoSemovienteService', () => {
  let service: PropositoSemovienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropositoSemovienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
