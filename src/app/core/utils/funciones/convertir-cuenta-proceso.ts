import { CuentaContableProceso } from '@core/models/auxiliares/cuenta-contable-proceso';
import { CuentaContable } from '@core/models/otros-modulos/cuenta-contable';

export const convertirCuentaProceso = (
  cuentaContable: CuentaContable,
  procedencia?: 'D' | 'H',
  monto?: number
) => {
  return <CuentaContableProceso>{
    empresaId: 0,
    id: 0,
    proceso: undefined,
    cuentaContable: cuentaContable.id,
    denominacion: cuentaContable.denominacion,
    procedencia: procedencia,
    monto: monto,
    creado: cuentaContable.creado,
    modificado: cuentaContable.modificado,
  };
};
