import { TestBed } from '@angular/core/testing';

import { RotulacionService } from './rotulacion.service';

describe('RotulacionService', () => {
  let service: RotulacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RotulacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
