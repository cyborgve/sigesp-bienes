import { TestBed } from '@angular/core/testing';

import { CondicionCompraService } from './condicion-compra.service';

describe('CondicionCompraService', () => {
  let service: CondicionCompraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CondicionCompraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
