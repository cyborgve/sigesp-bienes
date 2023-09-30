import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { MCuentaInstitucional } from 'sigesp';
import { CuentaContable } from '@core/models/otros-modulos/cuenta-contable';
export const adaptarCuentasContables = () =>
  pipe(
    map((cuentas: MCuentaInstitucional[]) =>
      cuentas.map(
        cta =>
          <CuentaContable>{
            empresaId: undefined,
            id: cta.cuenta,
            codigo: cta.cuenta,
            denominacion: cta.denominacion,
            creado: new Date(),
            modificado: new Date(),
          }
      )
    )
  );
