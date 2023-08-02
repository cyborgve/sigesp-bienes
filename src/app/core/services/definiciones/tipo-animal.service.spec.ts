import { TestBed } from '@angular/core/testing';

import { TipoAnimalService } from './tipo-animal.service';

describe('TipoAnimalService', () => {
  let service: TipoAnimalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoAnimalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
