import { map } from 'rxjs/operators';
import { CuentaContableProceso } from '@core/models/auxiliares/cuenta-contable-proceso';
import { pipe } from 'rxjs';

export const adaptarCuentaContableProceso = () => pipe(map(adaptar));
export const adaptarCuentasContablesProceso = () =>
  pipe(map((cuentasContables: any[]) => cuentasContables.map(adaptar)));

const adaptar = (cuentaContable: any) =>
  <CuentaContableProceso>{
    empresaId: Number(cuentaContable.empresaId),
    id: Number(cuentaContable.id),
    cuentaContable: cuentaContable.cuentaContable,
    proceso: Number(cuentaContable.proceso),
    denominacion: cuentaContable.denominacion,
    procedencia: cuentaContable.procedencia,
    monto: Number(cuentaContable.monto),
    creado: cuentaContable.creado,
    modificado: cuentaContable.modificado,
  };
