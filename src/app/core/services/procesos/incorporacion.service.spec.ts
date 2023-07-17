import { TestBed } from '@angular/core/testing';

import { IncorporacionService } from './incorporacion.service';

describe('IncorporacionService', () => {
  let service: IncorporacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncorporacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
