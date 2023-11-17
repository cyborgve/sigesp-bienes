import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { CuentaContable } from '@core/models/otros-modulos/cuenta-contable';

export const adaptarCuentaContable = () => pipe(map(adaptar));
export const adaptarCuentasContables = () =>
  pipe(map((cuentasContables: any[]) => cuentasContables.map(adaptar)));

const adaptar = (cuentaContable: any) =>
  <CuentaContable>{
    empresaId: undefined,
    id: cuentaContable.cuenta,
    codigo: cuentaContable.cuenta,
    denominacion: cuentaContable.denominacion,
    creado: new Date(),
    modificado: new Date(),
  };
