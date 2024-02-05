import { TestBed } from '@angular/core/testing';

import { UsuarioSigespGuard } from './usuario-sigesp.guard';

describe('UsuarioSigespGuard', () => {
  let guard: UsuarioSigespGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UsuarioSigespGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
