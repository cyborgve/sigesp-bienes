import { TestBed } from '@angular/core/testing';

import { MensajeDialogoSpinnerService } from './mensaje-dialogo-spinner.service';

describe('MensajeDialogoSpinnerService', () => {
  let service: MensajeDialogoSpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MensajeDialogoSpinnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
