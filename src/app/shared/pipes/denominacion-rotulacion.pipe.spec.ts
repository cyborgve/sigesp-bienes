import { RotulacionService } from '@core/services/definiciones/rotulacion.service';
import { DenominacionRotulacionPipe } from './denominacion-rotulacion.pipe';

describe('DenominacionRotulacionPipe', () => {
  it('create an instance', () => {
    let _rotulacion: RotulacionService;
    const pipe = new DenominacionRotulacionPipe(_rotulacion);
    expect(pipe).toBeTruthy();
  });
});
