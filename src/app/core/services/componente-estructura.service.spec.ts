import { TestBed } from '@angular/core/testing';

import { ComponenteEstructuraService } from './componente-estructura.service';

describe('ComponenteEstructuraService', () => {
  let service: ComponenteEstructuraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComponenteEstructuraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
