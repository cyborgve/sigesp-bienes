import { TestBed } from '@angular/core/testing';
import { ComponenteActivoService } from './componente-activo.service';

describe('ComponenteActivoService', () => {
  let service: ComponenteActivoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComponenteActivoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
