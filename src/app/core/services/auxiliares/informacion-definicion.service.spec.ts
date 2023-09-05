import { TestBed } from '@angular/core/testing';

import { InformacionDefinicionService } from './informacion-definicion.service';

describe('InformacionDefinicionService', () => {
  let service: InformacionDefinicionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InformacionDefinicionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
