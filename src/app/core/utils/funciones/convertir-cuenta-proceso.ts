import { CuentaContableProceso } from '@core/models/auxiliares/cuenta-contable-proceso';
import { CuentaContable } from '@core/models/otros-modulos/cuenta-contable';

export function convertirCuentaProceso(
  cuentaContable: CuentaContable
): CuentaContableProceso {
  return <CuentaContableProceso>{
    empresaId: 0,
    id: 0,
    cuentaContable: cuentaContable.id,
    denominacion: cuentaContable.denominacion,
    proceso: undefined,
    creado: cuentaContable.creado,
    modificado: cuentaContable.modificado,
  };
}
