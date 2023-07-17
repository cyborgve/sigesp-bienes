import { TestBed } from '@angular/core/testing';

import { DesincorporacionService } from './desincorporacion.service';

describe('DesincorporacionService', () => {
  let service: DesincorporacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DesincorporacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
