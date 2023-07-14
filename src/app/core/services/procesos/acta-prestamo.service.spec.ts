import { TestBed } from '@angular/core/testing';

import { ActaPrestamoService } from './acta-prestamo.service';

describe('ActaPrestamoService', () => {
  let service: ActaPrestamoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActaPrestamoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
