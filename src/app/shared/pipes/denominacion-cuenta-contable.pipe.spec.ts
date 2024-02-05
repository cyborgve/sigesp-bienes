import { CuentaContableService } from '@core/services/otros-modulos/cuenta-contable.service';
import { DenominacionCuentaContablePipe } from './denominacion-cuenta-contable.pipe';

describe('DenominacionCuentaContablePipe', () => {
  it('create an instance', () => {
    let _cuentaContable: CuentaContableService;
    const pipe = new DenominacionCuentaContablePipe(_cuentaContable);
    expect(pipe).toBeTruthy();
  });
});
