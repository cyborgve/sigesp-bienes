import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { CuentaContableProceso } from '@core/models/auxiliares/cuenta-contable-proceso';
export const adaptarCuentasContablesProceso = () =>
  pipe(
    map((cuentasContablesProceso: any[]) =>
      cuentasContablesProceso.map(
        cuentaProceso =>
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
    )
  );
