import { CausaMovimientoService } from '@core/services/definiciones/causa-movimiento.service';
import { DenominacionCausaMovimientoPipe } from './denominacion-causa-movimiento.pipe';

describe('DenominacionCausaMovimientoPipe', () => {
  it('create an instance', () => {
    let _causaMovimiento: CausaMovimientoService;
    const pipe = new DenominacionCausaMovimientoPipe(_causaMovimiento);
    expect(pipe).toBeTruthy();
  });
});
