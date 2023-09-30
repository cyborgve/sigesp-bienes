import { map } from 'rxjs/operators';
import { CuentaContableProceso } from '@core/models/auxiliares/cuenta-contable-proceso';
import { pipe } from 'rxjs';

export const adaptarCuentaContableProceso = () =>
  pipe(
    map(
      (cuentaProceso: any) =>
        <CuentaContableProceso>{
          empresaId: Number(cuentaProceso.empresaId),
          id: Number(cuentaProceso.Id),
          cuentaContable: cuentaProceso.cuentaContable,
          proceso: Number(cuentaProceso.proceso),
          denominacion: cuentaProceso.denominacion,
          creado: cuentaProceso.creado,
          modificado: cuentaProceso.modificado,
        }
    )
  );
