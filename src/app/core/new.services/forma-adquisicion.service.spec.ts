import { TestBed } from '@angular/core/testing';

import { FormaAdquisicionService } from './forma-adquisicion.service';

describe('FormaAdquisicionService', () => {
  let service: FormaAdquisicionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormaAdquisicionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
